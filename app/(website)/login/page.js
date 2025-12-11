import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      
      {/* 1. ANIMATED BACKGROUND GRADIENTS (The "Mind-Blowing" Part) */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* Deep Blue Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050298] via-[#030150] to-black"></div>
        
        {/* Glowing Orbs - Positioned to look cool behind the glass */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#FFC107] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* 2. THE GLASS CARD */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        {/* The Glass Effect Container */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"></div>
        
        {/* Card Content */}
        <div className="relative z-20 px-4 py-6 sm:px-8">
          
          {/* Logo / Header Area */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10 mb-4 border border-white/20 shadow-inner">
               <span className="text-3xl">⚖️</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Legal Digital<span className="text-[#FFC107]">NG</span>
            </h2>
            <p className="mt-2 text-blue-200 text-sm">
              Access the future of Nigerian case law.
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder=" "
                  className="peer w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-300"
                />
                <label 
                  htmlFor="email"
                  className="absolute left-4 top-3 text-blue-200 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-300 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#FFC107] peer-focus:bg-[#050298] peer-focus:px-1 rounded pointer-events-none"
                >
                  Email Address
                </label>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder=" "
                  className="peer w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-300"
                />
                <label 
                  htmlFor="password"
                  className="absolute left-4 top-3 text-blue-200 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-300 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#FFC107] peer-focus:bg-[#050298] peer-focus:px-1 rounded pointer-events-none"
                >
                  Password
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-blue-200 hover:text-white cursor-pointer transition-colors">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-[#FFC107] rounded border-white/20 bg-transparent focus:ring-0 focus:ring-offset-0" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="font-medium text-[#FFC107] hover:text-yellow-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <div className="space-y-3 pt-2">
              <button
                formAction={login}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#FFC107] to-[#FFD54F] hover:from-[#FFD54F] hover:to-[#FFE082] text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Sign In
              </button>
              
              <button
                formAction={signup}
                className="w-full py-3.5 px-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-200"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-blue-300/60">
              By accessing the platform, you agree to our Terms of Service.
              <br/>Protected by Legal Digital NG Encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}