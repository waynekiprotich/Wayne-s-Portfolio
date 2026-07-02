import { useState } from 'react';

export default function LivePreviewModal({ project, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceMode, setDeviceMode] = useState('desktop');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 dark:bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-surface border border-fog dark:border-white/10 rounded-2xl shadow-apple-xl flex flex-col overflow-hidden animate-fade-up">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-fog dark:border-white/10 bg-ink/5 dark:bg-white/5">
          <div className="flex gap-4 items-center">
            <h3 className="text-ink font-serif font-bold text-lg">
              {project.title}
            </h3>

            <div className="flex gap-2 bg-fog/50 dark:bg-black/50 p-1 rounded-lg border border-fog dark:border-white/10">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  deviceMode === 'desktop'
                    ? 'bg-surface text-ink shadow-sm'
                    : 'text-pebble hover:text-ink dark:hover:text-white'
                }`}
              >
                Desktop
              </button>

              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  deviceMode === 'mobile'
                    ? 'bg-surface text-ink shadow-sm'
                    : 'text-pebble hover:text-ink dark:hover:text-white'
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
              className="px-4 py-2 text-xs font-mono text-ink bg-ink/5 hover:bg-ink/10 dark:text-white dark:bg-white/10 dark:hover:bg-white/20 rounded-lg transition-colors"
            >
              View Source
            </a>

            <button
              onClick={onClose}
              className="p-2 text-pebble hover:text-ink dark:hover:text-white hover:bg-ink/5 dark:hover:bg-white/10 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 flex justify-center items-center bg-mist dark:bg-page">

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-ink dark:text-white font-mono animate-pulse pointer-events-none">
              [ INITIALIZING SANDBOX... ]
            </div>
          )}

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
              className={`transition-all duration-500 ease-out border border-fog dark:border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${
                deviceMode === 'mobile'
                  ? 'w-[375px] h-[812px] max-h-full rounded-[2.5rem] overflow-auto'
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