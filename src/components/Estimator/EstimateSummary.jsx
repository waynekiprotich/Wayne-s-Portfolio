import { PROJECT_TYPES, FEATURE_GROUPS, INTEGRATIONS, TIMELINES } from '../../utils/estimatorConfig'

const ALL_FEATURES = FEATURE_GROUPS.flatMap((g) => g.features)
const labelFor = (collection, id) => collection.find((item) => item.id === id)?.label || id

export default function EstimateSummary({ data, estimate }) {
  const projectTypeLabel = labelFor(PROJECT_TYPES, data.projectType)
  const timelineLabel = labelFor(TIMELINES, data.timeline)
  const featureLabels = data.features.map((id) => labelFor(ALL_FEATURES, id))
  const integrationLabels = data.integrations.map((id) => labelFor(INTEGRATIONS, id))

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-2">Project Summary</p>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-pebble dark:text-white/80">
          <p><span className="text-ink dark:text-white font-medium">Project type: </span>{projectTypeLabel}</p>
          <p><span className="text-ink dark:text-white font-medium">Company: </span>{data.business.companyName || 'Not provided'}</p>
          <p><span className="text-ink dark:text-white font-medium">Industry: </span>{data.business.industry || 'Not provided'}</p>
          <p><span className="text-ink dark:text-white font-medium">Pages: </span>{data.scope.pages}</p>
          <p><span className="text-ink dark:text-white font-medium">Timeline: </span>{timelineLabel}</p>
          <p><span className="text-ink dark:text-white font-medium">Budget: </span>{data.budget || 'Not specified'}</p>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-2">Selected Features</p>
        <p className="text-sm text-pebble dark:text-white/80">
          {featureLabels.length ? featureLabels.join(', ') : 'None selected'}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-2">Integrations</p>
        <p className="text-sm text-pebble dark:text-white/80">
          {integrationLabels.length ? integrationLabels.join(', ') : 'None selected'}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-mist dark:bg-white/5 p-5 rounded-2xl">
          <p className="text-xs uppercase tracking-wide text-stone mb-2">Complexity Rating</p>
          <p className="text-lg font-semibold text-ink dark:text-white">{estimate.complexityRating}</p>
        </div>
        <div className="bg-mist dark:bg-white/5 p-5 rounded-2xl">
          <p className="text-xs uppercase tracking-wide text-stone mb-2">Estimated Duration</p>
          <p className="text-lg font-semibold text-ink dark:text-white">{estimate.estimatedDuration}</p>
        </div>
      </div>

      <div className="bg-mist dark:bg-white/5 p-5 rounded-2xl">
        <p className="text-xs uppercase tracking-wide text-stone mb-3">Estimated Hours</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-ink dark:text-white font-semibold">{estimate.hours.development}h</p>
            <p className="text-stone text-xs">Development</p>
          </div>
          <div>
            <p className="text-ink dark:text-white font-semibold">{estimate.hours.design}h</p>
            <p className="text-stone text-xs">Design</p>
          </div>
          <div>
            <p className="text-ink dark:text-white font-semibold">{estimate.hours.testing}h</p>
            <p className="text-stone text-xs">Testing</p>
          </div>
          <div>
            <p className="text-ink dark:text-white font-semibold">{estimate.hours.deployment}h</p>
            <p className="text-stone text-xs">Deployment</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-2">Recommended Team</p>
        <p className="text-sm text-pebble dark:text-white/80">{estimate.teamRecommendation}</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-2">Technology Recommendation</p>
        <div className="flex flex-wrap gap-2">
          {[...estimate.techStack.frontend, ...estimate.techStack.backend, ...estimate.techStack.database, ...estimate.techStack.infra].map(
            (tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1.5 rounded-full bg-fog dark:bg-white/10 text-ink dark:text-white"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-stone mb-3">Price Breakdown</p>
        <div className="space-y-1.5">
          {estimate.priceBreakdown.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-pebble dark:text-white/80">{item.label}</span>
              <span className="text-ink dark:text-white font-medium">KES {item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-5 border-t border-fog dark:border-white/10">
        <p className="text-xs uppercase tracking-wide text-stone mb-2">Total Estimate</p>
        <p className="text-2xl font-serif text-ink dark:text-white">
          KES {estimate.low.toLocaleString()} - {estimate.high.toLocaleString()}
        </p>
        <p className="text-xs text-stone mt-3 leading-relaxed">
          This is a preliminary estimate based on the information provided. A detailed proposal with fixed pricing
          will be prepared after a discovery call to confirm scope and requirements.
        </p>
      </div>
    </div>
  )
}