import React, { useState, useMemo, useEffect } from 'react';

const BranchExplorer = ({ data, branches, categories }) => {
  const [selectedBranch, setSelectedBranch] = useState('');
  
  const availableCategories = useMemo(() => {
    if (!selectedBranch || !data || data.length === 0) return categories;
    const filtered = data.filter(item => item.program === selectedBranch);
    const cats = new Set(filtered.map(item => item.category).filter(Boolean));
    return [...cats].sort();
  }, [data, selectedBranch, categories]);

  const [selectedCategory, setSelectedCategory] = useState(availableCategories[0] || 'Open');

  useEffect(() => {
    if (availableCategories.length > 0 && !availableCategories.includes(selectedCategory)) {
      setSelectedCategory(availableCategories[0]);
    }
  }, [availableCategories, selectedCategory]);

  const filteredResults = useMemo(() => {
    if (!selectedBranch) return [];
    
    let results = data.filter(item => item.program === selectedBranch && item.category === selectedCategory);
    
    // Sort by closing rank
    return results.sort((a, b) => parseInt(a.Predicted_Closing_Rank, 10) - parseInt(b.Predicted_Closing_Rank, 10));
  }, [data, selectedBranch, selectedCategory]);

  return (
    <div className="flex flex-col gap-stack-lg w-full">
      {/* Search Section */}
      <section className="w-full z-20">
        <div className="bg-surface-variant p-8 border-border-ultra border-on-background hard-shadow transform skew-x-2 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay pointer-events-none"></div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mb-6 transform -skew-x-2 tracking-tighter relative z-10">
            COMPARE <span className="text-primary">BRANCHES</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 transform -skew-x-2 relative z-10">
            <div className="flex-grow flex flex-col">
              <label className="font-label-bold text-label-bold text-on-background uppercase mb-2">Select Branch / Program</label>
              <div className="relative">
                <select 
                  className="w-full bg-surface text-on-background font-label-bold text-label-bold py-4 pl-4 pr-12 border-border-thick border-on-background focus:outline-none focus:bg-surface-variant focus:border-primary-container appearance-none cursor-pointer" 
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="">-- CHOOSE A BRANCH --</option>
                  {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-on-background pointer-events-none" style={{fontVariationSettings: "'FILL' 1"}}>expand_more</span>
              </div>
            </div>

            <div className="flex-grow flex flex-col">
              <label className="font-label-bold text-label-bold text-on-background uppercase mb-2">Select Category</label>
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
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
        
        {/* Callout Sidebar (Spans 4 columns) */}
        <div className="xl:col-span-4 hidden xl:block">
          <div className="relative border-border-ultra border-on-background hard-shadow overflow-hidden bg-primary min-h-[400px] flex items-center justify-center p-8 group sticky top-24">
            <div className="absolute inset-0 bg-primary opacity-40 mix-blend-color z-10 pointer-events-none"></div>
            <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: "url('./rsf/Screenshot 2026-06-25 202201.jpg')"}}></div>
            
            <div className="relative z-10 text-center">
              <div className="bg-on-background text-on-primary font-headline-md text-headline-md uppercase font-black px-4 py-2 border-thick border-on-background inline-block transform -rotate-3">
                BRANCH AUDIT
              </div>
              <p className="font-label-bold text-label-bold text-on-background uppercase bg-surface p-2 inline-block mt-4 transform rotate-1">
                SEE WHERE YOU STAND.
              </p>
            </div>
          </div>
        </div>

        {/* Results Container (Spans 8 columns) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <div className="flex justify-between items-end border-b-border-thick border-on-background pb-2">
            <h2 className="font-headline-md text-headline-md text-on-background uppercase tracking-tighter">INSTITUTIONS</h2>
            <span className="font-label-bold text-label-bold bg-on-background text-on-primary px-2 py-1">{filteredResults.length} FOUND</span>
          </div>

          {!selectedBranch ? (
            <div className="bg-surface-variant p-8 border-border-thick border-on-background text-center flex flex-col items-center justify-center min-h-[300px]">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4" style={{fontVariationSettings: "'FILL' 1"}}>account_tree</span>
              <h2 className="text-headline-md font-headline-md uppercase font-black text-on-background">Select a Branch</h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant">Choose a discipline to see all offering institutes.</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="bg-error-container p-8 border-border-thick border-on-background text-center flex flex-col items-center justify-center min-h-[300px]">
              <span className="material-symbols-outlined text-6xl text-on-error-container mb-4" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
              <h2 className="text-headline-md font-headline-md uppercase font-black text-on-error-container">No Data Found</h2>
              <p className="text-body-lg font-body-lg text-on-error-container">The archives are empty for this combination.</p>
            </div>
          ) : (
            <article className="bg-surface border-border-thick border-on-background hard-shadow flex flex-col">
              <div className="bg-surface-container-highest p-6 border-b-border-thick border-on-background flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-background uppercase font-black tracking-tighter leading-none">{selectedBranch}</h3>
                  <p className="font-label-bold text-label-bold text-primary uppercase mt-2">ALL OFFERING INSTITUTIONS</p>
                </div>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-surface-variant border-b-border-thick border-on-background">
                      <th className="p-4 font-label-bold text-label-bold uppercase border-r-border-thick border-on-background">Institution</th>
                      <th className="p-4 font-label-bold text-label-bold uppercase border-r-border-thick border-on-background w-24 text-center">Round</th>
                      <th className="p-4 font-label-bold text-label-bold uppercase border-r-border-thick border-on-background w-32 text-center">Opening</th>
                      <th className="p-4 font-label-bold text-label-bold uppercase w-32 text-center">Closing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((item, index) => (
                      <tr key={index} className="border-b-border-thick border-on-background hover:bg-surface-container-low transition-colors">
                        <td className="p-4 font-body-md text-body-md font-bold border-r-border-thick border-on-background">{item.institute}</td>
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
      </section>
    </div>
  );
};

export default BranchExplorer;
