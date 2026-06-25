import React, { useState, useMemo, useEffect } from 'react';

const CollegeExplorer = ({ data, institutes, categories }) => {
  const [selectedCollege, setSelectedCollege] = useState('');
  
  const availableCategories = useMemo(() => {
    if (!selectedCollege || !data || data.length === 0) return categories;
    const filtered = data.filter(item => item.institute === selectedCollege);
    const cats = new Set(filtered.map(item => item.category).filter(Boolean));
    return [...cats].sort();
  }, [data, selectedCollege, categories]);

  const [selectedCategory, setSelectedCategory] = useState(availableCategories[0] || 'Open');

  useEffect(() => {
    if (availableCategories.length > 0 && !availableCategories.includes(selectedCategory)) {
      setSelectedCategory(availableCategories[0]);
    }
  }, [availableCategories, selectedCategory]);

  const filteredResults = useMemo(() => {
    if (!selectedCollege) return [];
    
    let results = data.filter(item => item.institute === selectedCollege && item.category === selectedCategory);
    
    // Sort by closing rank
    return results.sort((a, b) => parseInt(a.Predicted_Closing_Rank, 10) - parseInt(b.Predicted_Closing_Rank, 10));
  }, [data, selectedCollege, selectedCategory]);

  return (
    <div className="flex flex-col gap-stack-lg w-full">
      {/* Search Section */}
      <section className="w-full z-20">
        <div className="bg-primary p-4 md:p-8 border-border-ultra border-on-background hard-shadow transform -skew-x-2 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay pointer-events-none"></div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary uppercase mb-6 transform skew-x-2 tracking-tighter relative z-10">
            EXPLORE THE INSTITUTIONS
          </h1>
          <div className="flex flex-col md:flex-row gap-4 transform skew-x-2 relative z-10">
            <div className="flex-grow flex flex-col">
              <label className="font-label-bold text-label-bold text-on-primary uppercase mb-2">Select Institution</label>
              <div className="relative">
                <select 
                  className="w-full bg-surface text-on-background font-label-bold text-label-bold py-4 pl-4 pr-12 border-border-thick border-on-background focus:outline-none focus:bg-surface-variant focus:border-primary-container appearance-none cursor-pointer" 
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                >
                  <option value="">-- CHOOSE A COLLEGE --</option>
                  {institutes.map(inst => <option key={inst} value={inst}>{inst}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-on-background pointer-events-none" style={{fontVariationSettings: "'FILL' 1"}}>expand_more</span>
              </div>
            </div>

            <div className="flex-grow flex flex-col">
              <label className="font-label-bold text-label-bold text-on-primary uppercase mb-2">Select Category</label>
              <div className="relative">
                <select 
                  className="w-full bg-surface text-on-background font-label-bold text-label-bold py-4 pl-4 pr-12 border-border-thick border-on-background focus:outline-none focus:bg-surface-variant focus:border-primary-container appearance-none cursor-pointer" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-on-background pointer-events-none" style={{fontVariationSettings: "'FILL' 1"}}>expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-8 relative z-10">
        {/* Results Container (Spans 8 columns) */}
        <div className="xl:col-span-8 flex flex-col gap-4 md:gap-8">
          <div className="flex justify-between items-end border-b-border-thick border-on-background pb-2">
            <h2 className="font-headline-md text-headline-md text-on-background uppercase tracking-tighter">RESULTS</h2>
            <span className="font-label-bold text-label-bold bg-on-background text-on-primary px-2 py-1">{filteredResults.length} FOUND</span>
          </div>

          {!selectedCollege ? (
            <div className="bg-surface-variant p-4 md:p-8 border-border-thick border-on-background text-center flex flex-col items-center justify-center min-h-[300px]">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4" style={{fontVariationSettings: "'FILL' 1"}}>account_balance</span>
              <h2 className="text-headline-md font-headline-md uppercase font-black text-on-background">Awaiting Orders</h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant">Select an institution from the command console above.</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="bg-error-container p-4 md:p-8 border-border-thick border-on-background text-center flex flex-col items-center justify-center min-h-[300px]">
              <span className="material-symbols-outlined text-6xl text-on-error-container mb-4" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
              <h2 className="text-headline-md font-headline-md uppercase font-black text-on-error-container">No Data Found</h2>
              <p className="text-body-lg font-body-lg text-on-error-container">The archives are empty for this combination.</p>
            </div>
          ) : (
            <article className="bg-surface border-border-thick border-on-background hard-shadow flex flex-col">
              <div className="bg-surface-container-highest p-6 border-b-border-thick border-on-background flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-background uppercase font-black tracking-tighter leading-none">{selectedCollege}</h3>
                  <p className="font-label-bold text-label-bold text-primary uppercase mt-2">SELECTED INSTITUTION</p>
                </div>
                <div className="bg-on-background text-on-primary font-label-bold text-label-bold uppercase px-3 py-1 text-center min-w-[80px]">
                  ALL DATA
                </div>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-surface-variant border-b-border-thick border-on-background">
                      <th className="p-4 font-label-bold text-label-bold uppercase border-r-border-thick border-on-background">Branch</th>
                      <th className="p-4 font-label-bold text-label-bold uppercase border-r-border-thick border-on-background w-24 text-center">Round</th>
                      <th className="p-4 font-label-bold text-label-bold uppercase border-r-border-thick border-on-background w-32 text-center">Opening</th>
                      <th className="p-4 font-label-bold text-label-bold uppercase w-32 text-center">Closing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((item, index) => (
                      <tr key={index} className="border-b-border-thick border-on-background hover:bg-surface-container-low transition-colors">
                        <td className="p-4 font-body-md text-body-md font-bold border-r-border-thick border-on-background">{item.program}</td>
                        <td className="p-4 font-label-bold text-label-bold text-center border-r-border-thick border-on-background">{item.round}</td>
                        <td className="p-4 font-label-bold text-label-bold text-center border-r-border-thick border-on-background">{item.Predicted_Opening_Rank}</td>
                        <td className="p-4 font-label-bold text-label-bold text-center text-primary">{item.Predicted_Closing_Rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          )}
        </div>

        {/* Callout Sidebar (Spans 4 columns) */}
        <div className="xl:col-span-4">
          <div className="relative border-border-ultra border-on-background hard-shadow overflow-hidden bg-primary min-h-[400px] flex items-center justify-center p-4 md:p-8 group sticky top-24">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: "url('./rsf/Screenshot 2026-06-25 202121.jpg')"}}></div>
            {/* Content Overlay */}
            <div className="relative z-10 text-center">
              <h2 className="font-display-xl text-headline-lg-mobile md:text-headline-lg text-on-primary uppercase font-black leading-none mb-4 tracking-tighter transform -skew-x-6 bg-on-background inline-block px-4 py-2">
                KNOWLEDGE
              </h2>
              <h2 className="font-display-xl text-headline-lg-mobile md:text-headline-lg text-on-background uppercase font-black leading-none mb-6 tracking-tighter transform skew-x-6 bg-primary-fixed inline-block px-4 py-2 mt-2">
                IS POWER
              </h2>
              <p className="font-label-bold text-label-bold text-on-primary uppercase bg-on-background p-2 inline-block">
                DEMAND TRANSPARENCY IN ADMISSIONS.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollegeExplorer;
