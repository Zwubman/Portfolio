import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#080620]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 backdrop-blur-sm">
              <Compass size={48} className="animate-[spin_4s_linear_infinite]" />
            </div>
          </div>
          
          <h1
            className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-purple-200 via-fuchsia-200 to-purple-200 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            404
          </h1>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-purple-100 mb-4">
            Not Found
          </h2>
          
          <p className="text-purple-200/60 mb-10 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            The page you are looking for doesn't exist, has been moved, or you might have mistyped the URL.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/25 border border-white/10"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
