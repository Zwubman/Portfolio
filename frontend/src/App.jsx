import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#0E0B24] flex items-center justify-center relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-700/15 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400/60" />
          <div className="w-2 h-2 rounded-full bg-purple-400/80 animate-pulse" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400/60" />
        </div>

        {/* Welcome badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/10 backdrop-blur-sm mb-8">
          <span className="text-purple-300 text-sm font-medium tracking-widest uppercase">
            Portfolio
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <span className="bg-gradient-to-r from-purple-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
            Welcome
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-purple-200/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
          Crafting digital experiences with passion and precision.
          <br />
          <span className="text-purple-300/50 text-base">My portfolio is coming soon.</span>
        </p>

        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-bounce [animation-delay:0ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 animate-bounce [animation-delay:150ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/80 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}

export default App
