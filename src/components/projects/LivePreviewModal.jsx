import { useState } from 'react';

export default function LivePreviewModal({ project, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceMode, setDeviceMode] = useState('desktop');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-space-black border border-glass-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-glass-border bg-white/5">
          <div className="flex gap-4 items-center">
            <h3 className="text-white font-grotesk font-bold text-lg">
              {project.title}
            </h3>

            <div className="flex gap-2 bg-black/50 p-1 rounded-lg border border-glass-border">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  deviceMode === 'desktop'
                    ? 'bg-cyber-cyan text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Desktop
              </button>

              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  deviceMode === 'mobile'
                    ? 'bg-cyber-cyan text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mobile
              </button>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <a
              href={project.codeHref}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-mono text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              View Source
            </a>

            <button
              onClick={onClose}
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 flex justify-center items-center bg-black/90">

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-cyber-cyan font-mono animate-pulse pointer-events-none">
              [ INITIALIZING SANDBOX... ]
            </div>
          )}

          {/* iframe wrapper ensures proper scrolling */}
          <div
            className={`flex items-center justify-center w-full h-full transition-all ${
              deviceMode === 'mobile' ? 'p-4 sm:p-10' : 'p-0'
            }`}
          >
            <iframe
              src={project.liveHref}
              title={project.title}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onLoad={() => setIsLoaded(true)}
              className={`transition-all duration-500 ease-out border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] ${
                deviceMode === 'mobile'
                  ? 'w-[375px] h-[812px] max-h-full rounded-3xl overflow-auto'
                  : 'w-full h-full rounded-none overflow-auto'
              } ${
                isLoaded ? 'opacity-100' : 'opacity-0 scale-95'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}