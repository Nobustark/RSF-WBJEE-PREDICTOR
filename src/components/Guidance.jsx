import React from 'react';

const Guidance = () => {
  return (
    <div className="flex flex-col w-full relative z-10">
      {/* Hero Section: The Mission */}
      <section className="w-full min-h-[600px] flex flex-col md:flex-row border-b-8 border-on-secondary-fixed border-8 border-on-surface">
        {/* Left: Typography Block */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center border-b-8 md:border-b-0 md:border-r-8 border-on-surface relative overflow-hidden bg-surface-variant">
          <div className="absolute top-0 right-0 w-32 h-32 diagonal-stripes opacity-20"></div>
          <h1 className="text-headline-lg-mobile md:text-display-xl font-headline-lg-mobile md:font-display-xl uppercase text-on-surface leading-none mb-8 relative z-10 break-normal mix-blend-multiply tracking-tighter">
            GUIDE<br />
            <span className="text-primary">UNITE</span><br />
            CONQUER
          </h1>
          <div className="border-t-4 border-on-surface pt-6 mt-auto">
            <p className="text-headline-md font-headline-md text-on-surface uppercase leading-tight font-bold">
              We reject the commodification of education. This predictor is a tool for the masses, built by students, for students.
            </p>
          </div>
        </div>
        {/* Right: Image Block */}
        <div className="w-full md:w-1/2 relative bg-on-surface h-[400px] md:h-auto overflow-hidden group">
          <img alt="Revolutionary poster depicting unified workers and students marching with flags" className="w-full h-full object-cover filter grayscale contrast-150 group-hover:grayscale-0 transition-all duration-500 opacity-80 mix-blend-luminosity" src="/rsf/Screenshot 2026-06-25 202229.jpg" />
          <div className="absolute inset-0 bg-primary mix-blend-color opacity-40"></div>
          {/* Overlay Banner */}
          <div className="absolute bottom-16 -left-8 bg-primary-container border-4 border-on-surface p-6 transform -rotate-6 hard-shadow">
            <h2 className="text-headline-lg font-headline-lg text-on-primary uppercase m-0 leading-none">ABOUT RSF</h2>
          </div>
        </div>
      </section>

      {/* Counseling Process Section: Constructivist Grid */}
      <section className="w-full py-20 px-4 md:px-16 bg-surface-bright relative border-l-8 border-r-8 border-on-surface border-b-8 mt-8">
        <h2 className="text-headline-lg font-headline-lg text-on-surface mb-16 uppercase border-b-8 border-on-surface pb-4 inline-block font-black tracking-tighter">The Path Forward</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">

          {/* Step 1 */}
          <div className="md:col-span-5 bg-surface border-4 border-on-surface p-8 brutalist-shadow relative transform md:-translate-y-8">
            <div className="absolute -top-10 -left-6 text-[100px] font-display-xl font-black text-primary leading-none" style={{ WebkitTextStroke: '2px #1c1b1b', color: 'transparent' }}>1</div>
            <h3 className="text-headline-md font-headline-md uppercase mt-8 mb-4 border-b-4 border-on-surface pb-2 font-black">Analyze Rank</h3>
            <p className="text-body-lg font-body-lg font-bold">Input your WBJEE metrics. The algorithm cross-references historical data to find your true standing among peers.</p>
          </div>

          {/* Connector Arrow (Desktop) */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center">
            <span className="material-symbols-outlined text-[80px] text-primary transform rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_downward</span>
          </div>

          {/* Step 2 */}
          <div className="md:col-span-5 bg-on-surface text-on-primary p-8 relative transform md:translate-y-12" style={{ boxShadow: '8px 8px 0px 0px #d80000' }}>
            <div className="absolute -top-10 -right-6 text-[100px] font-display-xl font-black text-surface leading-none" style={{ WebkitTextStroke: '2px #aa0000', color: 'transparent' }}>2</div>
            <h3 className="text-headline-md font-headline-md uppercase mt-8 mb-4 border-b-4 border-surface pb-2 text-primary font-black">Target Colleges</h3>
            <p className="text-body-lg font-body-lg font-bold">Identify institutions where the working class and peasantry have historically found footing. Build your preference list strategically.</p>
          </div>

          {/* Step 3 */}
          <div className="md:col-span-7 bg-primary-container text-on-primary border-4 border-on-surface p-8 brutalist-shadow relative mt-8 md:mt-24">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[100px] font-display-xl font-black text-surface leading-none" style={{ WebkitTextStroke: '2px #1c1b1b', color: 'transparent' }}>3</div>
            <h3 className="text-headline-md font-headline-md uppercase mt-8 mb-4 border-b-4 border-surface pb-2 text-center font-black">Execute Strategy</h3>
            <p className="text-body-lg font-body-lg text-center max-w-2xl mx-auto font-bold">Lock in your choices during counseling rounds. Do not yield to pressure from private, profit-driven institutions. Stand firm on your calculated path.</p>
          </div>

          {/* Decorative Image */}
          <div className="md:col-span-5 relative mt-8 md:mt-24 h-64 border-4 border-on-surface overflow-hidden bg-surface-dim">
            <img alt="Raw, passionate handwriting spelling out a revolutionary slogan on a rough wall" className="w-full h-full object-cover filter contrast-125 sepia" src="/rsf/Screenshot 2026-06-25 201739.jpg" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guidance;
