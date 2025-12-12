import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-montserrat">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#050298] text-white overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#050298] via-[#030150] to-black opacity-90"></div>
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFC107] rounded-full mix-blend-overlay filter blur-[120px] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-6 backdrop-blur-sm">
             🚀 Nigeria's Premier E-Law Reporting
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Simplifying Law Reporting<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-yellow-200">
              Empowering Legal Minds
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Access Nigeria's most comprehensive legal database with AI-powered research tools, real-time case updates, and expert legal analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/posts" 
              className="px-8 py-4 bg-[#FFC107] hover:bg-[#ffcf40] text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto"
            >
              View our Subscription Plans
            </Link>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all w-full sm:w-auto">
              Watch Demo
            </button>
          </div>

          {/* Search Bar Widget */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
             <div className="relative flex items-center bg-white rounded-xl overflow-hidden">
                <div className="pl-6 text-gray-400">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search judgments, cases, or legal topics..." 
                  className="w-full px-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none"
                />
                <button className="mr-2 px-6 py-2 bg-[#050298] text-white rounded-lg font-medium hover:bg-blue-900 transition-colors">
                  Search
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Legal Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Three core services that revolutionize how legal professionals work in Nigeria.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[#050298] mb-6 text-2xl">
                  📚
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Law Reporting</h3>
               <p className="text-gray-600 mb-6 leading-relaxed">Access the most comprehensive database of Nigerian case law with real-time updates and expert annotations.</p>
               <Link href="/posts" className="text-[#050298] font-semibold hover:underline flex items-center">
                 Learn More &rarr;
               </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[#050298] mb-6 text-2xl">
                  🤖
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">AI Legal Tools</h3>
               <p className="text-gray-600 mb-6 leading-relaxed">Leverage cutting-edge AI technology for legal research, document analysis, and automated legal writing.</p>
               <Link href="#" className="text-[#050298] font-semibold hover:underline flex items-center">
                 Explore AI &rarr;
               </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6 text-2xl">
                  👥
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Lawyer Network</h3>
               <p className="text-gray-600 mb-6 leading-relaxed">Connect with legal professionals across Nigeria, share insights, collaborate on cases, and build your network.</p>
               <Link href="#" className="text-orange-600 font-semibold hover:underline flex items-center">
                 Join Network &rarr;
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST JUDGMENTS (Dark Section) */}
      <section className="py-24 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <div>
               <h2 className="text-3xl font-bold mb-2">Latest Judgments & Updates</h2>
               <p className="text-gray-400">Stay current with the most recent court decisions.</p>
             </div>
             <Link href="/posts" className="hidden md:inline-flex px-6 py-3 bg-[#050298] hover:bg-blue-800 rounded-lg font-medium transition-colors">
               View All Judgments
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock Case 1 */}
            <div className="bg-[#112240] p-6 rounded-xl border border-white/5 hover:border-[#FFC107]/50 transition-colors group">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-[#FFC107] bg-[#FFC107]/10 px-2 py-1 rounded">Supreme Court</span>
                  <span className="text-xs text-gray-400">Dec 15, 2024</span>
               </div>
               <h3 className="text-lg font-bold mb-3 group-hover:text-[#FFC107] transition-colors">Constitutional Law: Fundamental Rights Protection</h3>
               <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  Landmark ruling on the interpretation of fundamental rights under the 1999 Constitution regarding seamless enforcement...
               </p>
               <Link href="#" className="text-sm font-semibold text-blue-400 hover:text-blue-300">Read Summary &rarr;</Link>
            </div>

            {/* Mock Case 2 */}
            <div className="bg-[#112240] p-6 rounded-xl border border-white/5 hover:border-[#FFC107]/50 transition-colors group">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">Court of Appeal</span>
                  <span className="text-xs text-gray-400">Dec 12, 2024</span>
               </div>
               <h3 className="text-lg font-bold mb-3 group-hover:text-[#FFC107] transition-colors">Commercial Law: Contract Enforcement</h3>
               <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  Important precedent set regarding the enforcement of commercial contracts in Nigeria where digital signatures are involved...
               </p>
               <Link href="#" className="text-sm font-semibold text-blue-400 hover:text-blue-300">Read Summary &rarr;</Link>
            </div>

             {/* Mock Case 3 */}
            <div className="bg-[#112240] p-6 rounded-xl border border-white/5 hover:border-[#FFC107]/50 transition-colors group">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded">Federal High Court</span>
                  <span className="text-xs text-gray-400">Dec 10, 2024</span>
               </div>
               <h3 className="text-lg font-bold mb-3 group-hover:text-[#FFC107] transition-colors">Criminal Law: Evidence Procedure</h3>
               <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  Significant development in criminal procedure and evidence admissibility standards for electronic evidence...
               </p>
               <Link href="#" className="text-sm font-semibold text-blue-400 hover:text-blue-300">Read Summary &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">Trusted by Legal Professionals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               <div className="p-8 bg-gray-50 rounded-2xl">
                  <div className="flex text-[#FFC107] mb-4">★★★★★</div>
                  <p className="text-gray-600 italic mb-6">"Legal Digital NG has revolutionized how we conduct legal research. The AI-powered tools save us hours of work daily."</p>
                  <div>
                     <p className="font-bold text-gray-900">Adebayo Ogundimu SAN</p>
                     <p className="text-xs text-gray-500">Senior Advocate of Nigeria</p>
                  </div>
               </div>
               <div className="p-8 bg-gray-50 rounded-2xl">
                  <div className="flex text-[#FFC107] mb-4">★★★★★</div>
                  <p className="text-gray-600 italic mb-6">"The comprehensive database and real-time updates have significantly improved our court's efficiency."</p>
                  <div>
                     <p className="font-bold text-gray-900">Dr. Funmi Adeoye</p>
                     <p className="text-xs text-gray-500">Chief Judge, Lagos State</p>
                  </div>
               </div>
               <div className="p-8 bg-gray-50 rounded-2xl">
                  <div className="flex text-[#FFC107] mb-4">★★★★★</div>
                  <p className="text-gray-600 italic mb-6">"The Digital Lawyer Network has connected us with brilliant legal minds across Nigeria. It's invaluable."</p>
                  <div>
                     <p className="font-bold text-gray-900">Chidi Okwu</p>
                     <p className="text-xs text-gray-500">Managing Partner</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. CTA BOTTOM BANNER */}
      <section className="py-20 bg-[#050298] relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Legal Practice?</h2>
            <p className="text-blue-200 mb-10 text-lg">Join thousands of legal professionals who have already revolutionized their practice with Legal Digital NG.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button className="px-8 py-4 bg-white text-[#050298] font-bold rounded-lg hover:bg-gray-100 transition-colors">
                 View our Subscription Plans
               </button>
               <button className="px-8 py-4 bg-[#050298] border border-white text-white font-bold rounded-lg hover:bg-blue-900 transition-colors">
                  Watch Demo
               </button>
            </div>
         </div>
      </section>

    </div>
  )
}