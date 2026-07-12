export default function ProgressHeader({ steps, currentStep, onStepClick }) {
  const step = steps.find((s) => s.id === currentStep)
  const progress = (currentStep / steps.length) * 100

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2 text-xs text-pebble">
        <span>
          Step {currentStep} of {steps.length}
          <span className="text-stone"> - {step.eyebrow}</span>
        </span>
        <span className="text-ink dark:text-white font-medium">{step.title}</span>
      </div>
      <div className="w-full bg-fog dark:bg-white/10 h-2 rounded-full overflow-hidden">
        <div
          className="bg-ink dark:bg-white h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="hidden sm:flex justify-between mt-3">
        {steps.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => s.id < currentStep && onStepClick(s.id)}
            disabled={s.id > currentStep}
            className={`w-2 h-2 rounded-full transition ${
              s.id === currentStep
                ? 'bg-ink dark:bg-white scale-125'
                : s.id < currentStep
                ? 'bg-ink/40 dark:bg-white/40 hover:bg-ink dark:hover:bg-white cursor-pointer'
                : 'bg-fog dark:bg-white/10 cursor-default'
            }`}
            aria-label={`Go to step ${s.id}: ${s.title}`}
          />
        ))}
      </div>
    </div>
  )
}