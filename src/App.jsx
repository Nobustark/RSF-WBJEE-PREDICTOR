import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Sparkles, Building2, Microscope, BookOpen, Loader2, AlertCircle, Phone, Mail } from 'lucide-react';

import Predictor from './components/Predictor';
import CollegeExplorer from './components/CollegeExplorer';
import BranchExplorer from './components/BranchExplorer';
import Guidance from './components/Guidance';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // App State - Unique Lists
  const [categories, setCategories] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [quotas, setQuotas] = useState([]);

  // View State
  const [activeView, setActiveView] = useState('predictor');

  useEffect(() => {
    // Load CSV Data
    Papa.parse('./All_Predicted_WBJEE_Ranks.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data.map(item => {
          if (item.category) {
            const cat = item.category.trim().toLowerCase();
            if (cat === 'tfw' || cat === 'tuition fee waiver') {
              item.category = 'Tuition Fee Waiver (TFW)';
            }
          }
          return item;
        });
        setData(parsedData);

        // Extract unique lists efficiently
        const uniqueCategories = new Set();
        const uniqueRounds = new Set();
        const uniqueInstitutes = new Set();
        const uniqueBranches = new Set();
        const uniqueQuotas = new Set();

        parsedData.forEach(item => {
          if (item.category) uniqueCategories.add(item.category);
          if (item.round) uniqueRounds.add(item.round);
          if (item.institute) uniqueInstitutes.add(item.institute);
          if (item.program) uniqueBranches.add(item.program);
          if (item.quota) uniqueQuotas.add(item.quota);
        });

        setCategories([...uniqueCategories].sort());
        setRounds([...uniqueRounds].sort());
        setInstitutes([...uniqueInstitutes].sort());
        setBranches([...uniqueBranches].sort());
        setQuotas([...uniqueQuotas].sort());

        setLoading(false);
      },
      error: (err) => {
        console.error('Error loading CSV:', err);
        setError('Failed to load prediction data. Please try again later.');
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-surface brutalist-border-ultra p-8 brutalist-shadow text-center text-primary-container">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="font-headline-md font-black">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="font-body-md text-on-background overflow-x-hidden min-h-screen flex flex-col relative selection:bg-primary-container selection:text-on-primary-container">

      {/* TopAppBar */}
      <nav className="bg-background dark:bg-background docked full-width top border-b-8 border-on-secondary-fixed flex flex-col xl:flex-row justify-between items-center w-full py-4 px-4 md:px-8 max-w-full z-40 sticky top-0 gap-4 xl:gap-0">
        <div
          className="bg-on-secondary-fixed text-primary px-2 py-1 md:px-4 md:py-2 text-body-lg font-body-lg md:text-headline-md md:font-headline-md font-black border-4 border-on-secondary-fixed uppercase tracking-tight cursor-pointer flex items-center gap-2 text-center"
          onClick={() => setActiveView('predictor')}
        >
          <img src="./rsf/rsf-logo.png" alt="RSF Logo" className="h-6 w-6 md:h-8 md:w-8 object-cover rounded-full flex-shrink-0" />
          <span className="hidden sm:inline">WBJEE COLLEGE AND BRANCH PREDICTOR</span>
          <span className="sm:hidden">WBJEE PREDICTOR</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-6 w-full xl:w-auto">
          <button
            className={`text-label-bold font-label-bold uppercase transform transition-all duration-100 p-2 ${activeView === 'predictor' ? 'text-primary border-b-4 border-primary scale-95' : 'text-on-surface hover:text-primary hover:bg-primary-container hover:text-on-primary-container'}`}
            onClick={() => setActiveView('predictor')}
          >
            PREDICT
          </button>
          <button
            className={`text-label-bold font-label-bold uppercase transform transition-all duration-100 p-2 ${activeView === 'college' ? 'text-primary border-b-4 border-primary scale-95' : 'text-on-surface hover:text-primary hover:bg-primary-container hover:text-on-primary-container'}`}
            onClick={() => setActiveView('college')}
          >
            COLLEGES
          </button>
          <button
            className={`text-label-bold font-label-bold uppercase transform transition-all duration-100 p-2 ${activeView === 'branch' ? 'text-primary border-b-4 border-primary scale-95' : 'text-on-surface hover:text-primary hover:bg-primary-container hover:text-on-primary-container'}`}
            onClick={() => setActiveView('branch')}
          >
            BRANCHES
          </button>
          <button
            className={`text-label-bold font-label-bold uppercase transform transition-all duration-100 p-2 ${activeView === 'guide' ? 'text-primary border-b-4 border-primary scale-95' : 'text-on-surface hover:text-primary hover:bg-primary-container hover:text-on-primary-container'}`}
            onClick={() => setActiveView('guide')}
          >
            MANIFESTO
          </button>
        </div>

        <button className="brutalist-border bg-primary-container text-on-primary-container px-6 py-2 text-label-bold font-label-bold uppercase brutalist-shadow hover:bg-primary transition-colors hidden xl:block">
          SUPPORT US
        </button>
      </nav>

      {/* Red Banner Slogan */}
      <div className="w-full bg-primary-container text-on-primary-container py-4 border-b-8 border-on-surface -skew-y-2 transform origin-left z-20 relative overflow-hidden mt-8">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          <h2 className="text-headline-md font-headline-md md:text-headline-lg md:font-headline-lg uppercase px-4 inline-block font-black">
            AN INITIATIVE BY REVOLUTIONARY STUDENTS FRONT /// CHANGE THE WORLD! /// CHANGE THE EDUCATION SYSTEM! /// CHANGE YOURSELF! ///
          </h2>
          <h2 className="text-headline-md font-headline-md md:text-headline-lg md:font-headline-lg uppercase px-4 inline-block font-black">
            AN INITIATIVE BY REVOLUTIONARY STUDENTS FRONT /// CHANGE THE WORLD! /// CHANGE THE EDUCATION SYSTEM! /// CHANGE YOURSELF! ///
          </h2>
        </div>
      </div>

      <main className="flex-grow w-full relative max-w-7xl mx-auto px-gutter md:px-grid-margin mt-8 mb-16 z-10">
        {activeView === 'predictor' && (
          <Predictor
            data={data}
            categories={categories}
            rounds={rounds}
            quotas={quotas}
          />
        )}

        {activeView === 'college' && (
          <CollegeExplorer
            data={data}
            institutes={institutes}
            categories={categories}
          />
        )}

        {activeView === 'branch' && (
          <BranchExplorer
            data={data}
            branches={branches}
            categories={categories}
          />
        )}

        {activeView === 'guide' && (
          <Guidance />
        )}
      </main>

      <footer className="bg-primary dark:bg-primary-container block w-full border-t-8 border-on-secondary-fixed flex flex-col gap-4 md:gap-stack-lg px-4 md:px-grid-margin py-8 md:py-stack-lg text-center z-40 relative mt-auto">
        <div className="text-headline-md md:text-headline-lg font-headline-md md:font-headline-lg font-black text-on-primary uppercase break-words leading-none">
          © 2024 AN INITIATIVE BY REVOLUTIONARY STUDENTS FRONT. LONG LIVE WORKERS PEASANTS STUDENTS UNITY!
        </div>

        <div className="bg-surface-variant text-on-surface-variant border-4 border-on-surface p-6 max-w-2xl mx-auto mt-4 brutalist-shadow transform rotate-1">
          <h3 className="font-headline-md text-headline-md uppercase font-black mb-2 border-b-4 border-on-surface pb-2">Reach Out To Us</h3>
          <p className="font-body-lg text-body-lg font-bold mb-4">Please contact if you need any help and concerns</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 font-label-bold text-label-bold uppercase">
            <a href="tel:+918420269015" className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
              <Phone size={20} className="text-primary" />
              +91 8420269015
            </a>
            <a href="mailto:chhatrafauj.rsf@gmail.com" className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
              <Mail size={20} className="text-primary" />
              chhatrafauj.rsf@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <a className="text-on-primary/80 hover:text-surface transition-all text-body-lg font-body-lg uppercase font-bold underline decoration-4 underline-offset-4" href="#">Privacy Policy</a>
          <a className="text-on-primary/80 hover:text-surface transition-all text-body-lg font-body-lg uppercase" href="#">Terms of Service</a>
          <a className="text-on-primary/80 hover:text-surface transition-all text-body-lg font-body-lg uppercase" href="#">Contact Support</a>
          <a className="text-on-primary/80 hover:text-surface transition-all text-body-lg font-body-lg uppercase" href="#">Archive</a>
        </div>
      </footer>

    </div>
  );
}

export default App;
