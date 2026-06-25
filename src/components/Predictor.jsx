import React, { useState, useMemo, useEffect } from 'react';

const Predictor = ({ data, categories, rounds, quotas }) => {
  const [rank, setRank] = useState('');
  const [quota, setQuota] = useState(quotas[0] || 'Home State');

  // Dynamically compute available categories based on selected quota
  const availableCategories = useMemo(() => {
    if (!data || data.length === 0) return categories;
    const filtered = data.filter(item => item.quota === quota);
    const cats = new Set(filtered.map(item => item.category).filter(Boolean));
    return [...cats].sort();
  }, [data, quota, categories]);

  const [category, setCategory] = useState(availableCategories[0] || 'Open');
  const [round, setRound] = useState(rounds[rounds.length - 1] || 'Round 3');
  const [hasPredicted, setHasPredicted] = useState(false);

  // If the available categories change and the current category is no longer valid, reset it
  useEffect(() => {
    if (availableCategories.length > 0 && !availableCategories.includes(category)) {
      setCategory(availableCategories[0]);
    }
  }, [availableCategories, category]);

  const handlePredict = (e) => {
    e.preventDefault();
    if (!rank || isNaN(rank)) return;
    setHasPredicted(true);
  };

  const filteredResults = useMemo(() => {
    if (!hasPredicted || !rank) return [];

    const userRank = parseInt(rank, 10);

    const results = data.filter(item => {
      if (!item.Predicted_Closing_Rank || !item.Predicted_Opening_Rank) return false;

      const closingRank = parseInt(item.Predicted_Closing_Rank, 10);

      if (item.category !== category) return false;
      if (item.quota !== quota) return false;
      if (round !== 'All' && item.round !== round) return false;

      return userRank <= closingRank;
    });

    return results.sort((a, b) => parseInt(a.Predicted_Closing_Rank, 10) - parseInt(b.Predicted_Closing_Rank, 10));
  }, [data, rank, category, round, quota, hasPredicted]);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-12 min-h-screen md:min-h-[819px] w-full border-b-8 border-on-surface relative z-10">
        {/* Left Side: Form Block (5 cols) */}
        <div className="md:col-span-5 bg-surface-bright p-grid-margin flex flex-col justify-center border-r-0 md:border-r-8 border-on-surface relative z-20">
          <div className="bg-surface brutalist-border-ultra p-4 md:p-8 brutalist-shadow relative bg-white">
            <div className="absolute -top-6 -right-6 bg-on-surface text-on-primary px-4 py-1 text-label-bold font-label-bold uppercase transform rotate-6 border-4 border-on-surface">
              TOOL 01
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg uppercase mb-8 leading-none tracking-tighter text-on-surface">
              WBJEE 2026<br />
              <span className="text-primary-container">PREDICTOR</span>
            </h1>

            <form className="flex flex-col gap-6" onSubmit={handlePredict}>
              <div className="flex flex-col gap-2">
                <label className="text-label-bold font-label-bold uppercase text-on-surface" htmlFor="rank">Enter Your GMR / PMR Rank</label>
                <input
                  className="bg-surface-container-lowest brutalist-border p-4 text-body-lg font-body-lg focus:outline-none focus:bg-surface-variant focus:border-primary-container transition-colors w-full"
                  id="rank"
                  placeholder="e.g. 5432"
                  type="number"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-bold font-label-bold uppercase text-on-surface" htmlFor="quota">Select Quota</label>
                <select
                  className="bg-surface-container-lowest brutalist-border p-4 text-body-lg font-body-lg focus:outline-none focus:bg-surface-variant focus:border-primary-container transition-colors w-full appearance-none rounded-none"
                  id="quota"
                  value={quota}
                  onChange={(e) => setQuota(e.target.value)}
                >
                  {quotas.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-bold font-label-bold uppercase text-on-surface" htmlFor="category">Select Category</label>
                <select
                  className="bg-surface-container-lowest brutalist-border p-4 text-body-lg font-body-lg focus:outline-none focus:bg-surface-variant focus:border-primary-container transition-colors w-full appearance-none rounded-none"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-bold font-label-bold uppercase text-on-surface" htmlFor="round">Counseling Round</label>
                <select
                  className="bg-surface-container-lowest brutalist-border p-4 text-body-lg font-body-lg focus:outline-none focus:bg-surface-variant focus:border-primary-container transition-colors w-full appearance-none rounded-none"
                  id="round"
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                >
                  <option value="All">All Rounds</option>
                  {rounds.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <button
                className="mt-4 bg-primary-container text-on-primary-container text-headline-md font-headline-md uppercase py-6 brutalist-border brutalist-shadow w-full hover:bg-primary transition-all flex items-center justify-center gap-2"
                type="submit"
                disabled={!rank}
              >
                PREDICT NOW
                <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Hero Image/Mural (7 cols) */}
        <div className="md:col-span-7 relative bg-surface-variant overflow-hidden min-h-[500px] md:min-h-full flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img alt="Revolutionary mural depicting five leaders in high contrast red and black style" className="w-full h-full object-cover mix-blend-multiply grayscale contrast-150" src="./rsf/Screenshot 2026-06-26 011302.jpg" />
            <div className="absolute inset-0 bg-primary-container mix-blend-screen opacity-50"></div>
          </div>
          <div className="z-10 relative p-4 md:p-8">
            <div className="bg-on-surface text-on-primary p-6 brutalist-border transform -rotate-2 max-w-md ml-auto">
              <h3 className="text-headline-md font-headline-md uppercase mb-2">COLLECTIVE DATA</h3>
              <p className="text-body-md font-body-md">Empowering students through transparent, crowd-sourced cut-off analysis. Break the monopoly on information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="mt-8 mb-16 relative z-10">
        {!hasPredicted ? (
          <div className="p-grid-margin bg-surface-container-low min-h-[409px] flex items-center justify-center border-b-8 border-on-surface relative">
            <div className="diagonal-stripes absolute inset-0 opacity-20"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-6xl relative z-10">
              <div className="bg-surface brutalist-border-ultra brutalist-shadow p-4 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="bg-on-surface text-on-primary inline-block px-3 py-1 text-label-bold font-label-bold uppercase mb-4">
                    VANGUARD MISSION
                  </div>
                  <h2 className="text-headline-md font-headline-md uppercase mb-4 leading-tight">
                    Democratizing Technical Education
                  </h2>
                  <div className="w-16 h-4 bg-primary-container mb-6"></div>
                  <p className="text-body-lg font-body-lg mb-6">
                    Our predictor uses historical data and algorithmic transparency to guide working-class students through the complex admission process. Knowledge is our weapon.
                  </p>
                </div>
              </div>
              <div className="relative h-64 md:h-auto brutalist-border-ultra overflow-hidden bg-white">
                <img alt="Student protest with banners in constructivist art style" className="w-full h-full object-cover filter grayscale contrast-125" src="./rsf/Screenshot 2026-06-25 201942.jpg" />
                <div className="absolute bottom-0 left-0 bg-primary-container text-on-primary-container p-4 w-3/4 brutalist-border-t border-r-4 border-t-4 border-on-surface">
                  <p className="text-label-bold font-label-bold uppercase">Join the Movement</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface-bright border-4 md:border-8 border-on-surface p-4 md:p-8">
            <div className="flex justify-between items-end border-b-8 border-on-surface pb-4 mb-8">
              <h2 className="text-headline-lg font-headline-lg uppercase font-black tracking-tighter">
                ALLOTMENT <span className="text-primary">INTEL</span>
              </h2>
              <div className="text-headline-md font-headline-md font-bold bg-primary text-on-primary px-4 py-2 border-4 border-on-surface">
                {filteredResults.length} FOUND
              </div>
            </div>

            {filteredResults.length === 0 ? (
              <div className="bg-error-container text-on-error-container p-4 md:p-8 brutalist-border font-headline-md uppercase text-center">
                No matches found. The system gatekeeps. Adjust your rank, category, or round.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredResults.map((item, index) => (
                  <div key={index} className="bg-white brutalist-border brutalist-shadow p-6 flex flex-col justify-between hover:bg-surface-variant transition-colors">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-on-surface text-surface font-label-bold text-label-bold px-2 py-1 uppercase">{item.round}</span>
                        <span className="bg-primary-container text-on-primary font-label-bold text-label-bold px-2 py-1 uppercase border-2 border-on-surface">{item.seat_type}</span>
                      </div>
                      <h3 className="text-headline-md font-headline-md uppercase font-bold leading-tight mb-2">{item.institute}</h3>
                      <p className="text-body-lg font-body-lg border-l-4 border-primary pl-4 mb-6">{item.program}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t-4 border-on-surface pt-4">
                      <div>
                        <div className="text-label-bold font-label-bold uppercase text-on-surface-variant">Opening</div>
                        <div className="text-headline-md font-headline-md font-bold">{item.Predicted_Opening_Rank}</div>
                      </div>
                      <div>
                        <div className="text-label-bold font-label-bold uppercase text-on-surface-variant text-primary">Closing</div>
                        <div className="text-headline-md font-headline-md font-bold text-primary">{item.Predicted_Closing_Rank}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Predictor;
