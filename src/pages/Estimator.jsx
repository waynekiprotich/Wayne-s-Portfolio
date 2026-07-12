import { useState } from 'react'
import PillTag from '../components/UI/PillTag'
import ProgressHeader from '../components/Estimator/ProgressHeader'
import OptionCard from '../components/Estimator/OptionCard'
import CheckboxCard from '../components/Estimator/CheckboxCard'
import FeatureChecklist from '../components/Estimator/FeatureChecklist'
import FormField from '../components/Estimator/FormField'
import FileDropzone from '../components/Estimator/FileDropzone'
import EstimateSummary from '../components/Estimator/EstimateSummary'
import { sendInquiry } from '../utils/api'
import { calculateEstimate } from '../utils/estimatorPricing'
import {
  PROJECT_TYPES,
  INDUSTRIES,
  PROJECT_NATURE,
  ESTIMATED_USERS,
  FEATURE_GROUPS,
  INTEGRATIONS,
  DESIGN_STYLES,
  TECHNICAL_REQUIREMENTS,
  TIMELINES,
  BUDGETS,
  MEETING_PLATFORMS,
  ACCEPTED_FILE_TYPES,
  WIZARD_STEPS,
  INITIAL_ESTIMATOR_DATA,
} from '../utils/estimatorConfig'

const TOTAL_STEPS = WIZARD_STEPS.length

export default function Estimator() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL_ESTIMATOR_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const update = (patch) => setData((d) => ({ ...d, ...patch }))
  const updateNested = (key, patch) => setData((d) => ({ ...d, [key]: { ...d[key], ...patch } }))

  const toggleInArray = (key, id) =>
    setData((d) => ({
      ...d,
      [key]: d[key].includes(id) ? d[key].filter((item) => item !== id) : [...d[key], id],
    }))

  const goNext = () => {
    setError('')
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  const goBack = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 1))
  }
  const goToStep = (target) => {
    setError('')
    setStep(target)
  }

  const SKIPPABLE_STEPS = [2, 3, 5, 6, 7, 8, 10]

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!data.projectType
      case 2:
        return data.business.country.trim() && data.business.phone.trim() && data.business.email.trim()
      case 4:
        return data.scope.pages > 0 && !!data.scope.estimatedUsers
      case 9:
        return !!data.timeline && !!data.budget
      case 11:
        return data.contact.fullName.trim() && data.contact.email.trim()
      default:
        return true
    }
  }

  const estimate = calculateEstimate(data)

  const handleSubmit = async () => {
    if (!canProceed()) {
      setError('Please add your name and email so I can reach you.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const payload = {
        ...data,
        design: {
          ...data.design,
          designFiles: data.design.designFiles.map((f) => ({ name: f.name, size: f.size })),
        },
        projectFiles: data.projectFiles.map((f) => ({ name: f.name, size: f.size })),
        estimate,
      }
      await sendInquiry(payload)
      setSubmitted(true)
    } catch (err) {
      setError('Failed to send request. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
      <div className="text-center mb-8 sm:mb-10">
        <PillTag>Project Estimator</PillTag>
        <h1 className="font-serif text-2xl sm:text-4xl text-ink dark:text-white mt-4 sm:mt-6 leading-tight">
          Get a Detailed Project Estimate
        </h1>
        <p className="text-pebble text-sm sm:text-base mt-3 max-w-sm sm:max-w-none mx-auto">
          A short discovery process that helps us understand your project and give you a realistic estimate.
        </p>
      </div>

      {/* Scrolls horizontally on narrow screens instead of wrapping/overflowing */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar mb-4 sm:mb-0">
        <ProgressHeader steps={WIZARD_STEPS} currentStep={step} onStepClick={goToStep} />
      </div>

      <div className="bg-surface p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-apple-lg border border-fog dark:border-white/5 min-h-[280px] sm:min-h-[320px] flex flex-col">
        <div className="flex-1 text-ink dark:text-white">
          {step === 1 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">What kind of project is this?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => (
                  <OptionCard
                    key={type.id}
                    label={type.label}
                    selected={data.projectType === type.id}
                    onClick={() => {
                      update({ projectType: type.id })
                      goNext()
                    }}
                    dense
                  />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-5">Tell us about your business</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Company name"
                  value={data.business.companyName}
                  onChange={(v) => updateNested('business', { companyName: v })}
                  placeholder="Acme Ltd"
                />
                <FormField
                  label="Industry"
                  type="select"
                  value={data.business.industry}
                  onChange={(v) => updateNested('business', { industry: v })}
                  options={INDUSTRIES}
                />
                <FormField
                  label="Country"
                  value={data.business.country}
                  onChange={(v) => updateNested('business', { country: v })}
                  required
                />
                <FormField
                  label="Phone number"
                  type="tel"
                  value={data.business.phone}
                  onChange={(v) => updateNested('business', { phone: v })}
                  placeholder="+254 7XX XXX XXX"
                  required
                />
                <FormField
                  label="Email"
                  type="email"
                  value={data.business.email}
                  onChange={(v) => updateNested('business', { email: v })}
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">What are we building?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PROJECT_NATURE.map((item) => (
                    <OptionCard
                      key={item.id}
                      label={item.label}
                      description={item.description}
                      selected={data.goals.nature === item.id}
                      onClick={() => updateNested('goals', { nature: item.id })}
                    />
                  ))}
                </div>
              </div>
              <div>
                <FormField
                  label="What problem are you solving?"
                  type="textarea"
                  rows={3}
                  value={data.goals.problem}
                  onChange={(v) => updateNested('goals', { problem: v })}
                  placeholder="Describe the core problem this project addresses"
                />
                <button
                  type="button"
                  onClick={goNext}
                  className="text-xs text-stone dark:text-pebble underline mt-2"
                >
                  Skip this question
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold">Pages and scope</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Number of pages"
                  type="number"
                  min={1}
                  value={data.scope.pages}
                  onChange={(v) => updateNested('scope', { pages: v })}
                  required
                />
                <FormField
                  label="Estimated users"
                  type="select"
                  value={data.scope.estimatedUsers}
                  onChange={(v) => updateNested('scope', { estimatedUsers: v })}
                  options={ESTIMATED_USERS}
                  required
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-ink dark:text-white mb-1.5">
                  Do you need an Admin Dashboard?
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard
                    label="Yes"
                    selected={data.scope.adminArea === true}
                    onClick={() => updateNested('scope', { adminArea: true })}
                    dense
                  />
                  <OptionCard
                    label="No"
                    selected={data.scope.adminArea === false}
                    onClick={() => updateNested('scope', { adminArea: false })}
                    dense
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">Which features do you need?</h2>
              <p className="text-pebble text-sm mb-4">Select all that apply. Skip anything you are not sure about yet.</p>
              <FeatureChecklist
                groups={FEATURE_GROUPS}
                selected={data.features}
                onToggle={(id) => toggleInArray('features', id)}
              />
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">Any integrations you need?</h2>
              <p className="text-pebble text-sm mb-4">Select any external tools or platforms this should connect with.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTEGRATIONS.map((integration) => (
                  <CheckboxCard
                    key={integration.id}
                    label={integration.label}
                    checked={data.integrations.includes(integration.id)}
                    onToggle={() => toggleInArray('integrations', integration.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Design direction</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DESIGN_STYLES.map((style) => (
                    <OptionCard
                      key={style}
                      label={style}
                      selected={data.design.style === style}
                      onClick={() => updateNested('design', { style })}
                      dense
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <CheckboxCard
                  label="I have existing branding"
                  checked={data.design.hasExistingBranding}
                  onToggle={() => updateNested('design', { hasExistingBranding: !data.design.hasExistingBranding })}
                />
                <CheckboxCard
                  label="I need a logo"
                  checked={data.design.needLogo}
                  onToggle={() => updateNested('design', { needLogo: !data.design.needLogo })}
                />
                <CheckboxCard
                  label="I need UI/UX design"
                  checked={data.design.needUIUX}
                  onToggle={() => updateNested('design', { needUIUX: !data.design.needUIUX })}
                />
              </div>
              <FormField
                label="Color preferences"
                value={data.design.colorPreferences}
                onChange={(v) => updateNested('design', { colorPreferences: v })}
                placeholder="Any brand colors or preferences"
              />
              <FormField
                label="Inspiration websites"
                value={data.design.inspirationSites}
                onChange={(v) => updateNested('design', { inspirationSites: v })}
                placeholder="Links to sites you like"
              />
              <FileDropzone
                label="Upload Figma files, logos, or brand PDFs"
                accept={ACCEPTED_FILE_TYPES}
                files={data.design.designFiles}
                onFilesChange={(files) => updateNested('design', { designFiles: files })}
              />
            </div>
          )}

          {step === 8 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">Technical requirements</h2>
              <p className="text-pebble text-sm mb-4">Select everything you expect to need at launch.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TECHNICAL_REQUIREMENTS.map((req) => (
                  <CheckboxCard
                    key={req.id}
                    label={req.label}
                    checked={data.technical.includes(req.id)}
                    onToggle={() => toggleInArray('technical', req.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">What is your timeline?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIMELINES.map((item) => (
                    <OptionCard
                      key={item.id}
                      label={item.label}
                      selected={data.timeline === item.id}
                      onClick={() => update({ timeline: item.id })}
                      dense
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">What is your budget range?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUDGETS.map((item) => (
                    <OptionCard
                      key={item}
                      label={item}
                      selected={data.budget === item}
                      onClick={() => update({ budget: item })}
                      dense
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 10 && (
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold">Tell us more about the project</h2>
              <FormField
                label="Project description"
                type="textarea"
                rows={7}
                value={data.description}
                onChange={(v) => update({ description: v })}
                placeholder="Share as much detail as you can about what you want to build"
              />
              <FileDropzone
                label="Upload any reference documents"
                accept={ACCEPTED_FILE_TYPES}
                files={data.projectFiles}
                onFilesChange={(files) => update({ projectFiles: files })}
              />
            </div>
          )}

          {step === 11 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-5">How can we reach you?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Full name"
                  value={data.contact.fullName}
                  onChange={(v) => updateNested('contact', { fullName: v })}
                  required
                />
                <FormField
                  label="Email"
                  type="email"
                  value={data.contact.email}
                  onChange={(v) => updateNested('contact', { email: v })}
                  required
                />
                <FormField
                  label="Phone number"
                  type="tel"
                  value={data.contact.phone}
                  onChange={(v) => updateNested('contact', { phone: v })}
                />
                <FormField
                  label="Company"
                  value={data.contact.company}
                  onChange={(v) => updateNested('contact', { company: v })}
                />
                <FormField
                  label="Preferred meeting platform"
                  type="select"
                  value={data.contact.meetingPlatform}
                  onChange={(v) => updateNested('contact', { meetingPlatform: v })}
                  options={MEETING_PLATFORMS}
                />
              </div>
            </div>
          )}

          {step === 12 && !submitted && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-5">Your Estimate</h2>
              <EstimateSummary data={data} estimate={estimate} />
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-6 bg-ink text-surface dark:bg-white dark:text-black px-8 py-3.5 sm:py-3 rounded-full font-medium hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending Request...' : 'Send Request'}
              </button>
            </div>
          )}

          {step === 12 && submitted && (
            <div className="text-center py-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">Request Sent</h2>
              <p className="text-pebble dark:text-white/80 text-sm sm:text-base">
                Thanks {data.contact.fullName.split(' ')[0]}. We will reach out at {data.contact.email} within 24 hours
                to schedule a discovery call.
              </p>
            </div>
          )}
        </div>

        {step > 1 && step < 12 && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-8 pt-6 border-t border-fog dark:border-white/5">
            <button
              onClick={goBack}
              className="text-stone dark:text-pebble underline text-sm text-center sm:text-left py-1"
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              {SKIPPABLE_STEPS.includes(step) && (
                <button
                  onClick={goNext}
                  className="flex-1 sm:flex-none border border-fog dark:border-white/20 text-stone dark:text-pebble px-5 py-2.5 sm:py-2 rounded-full text-sm hover:border-ink dark:hover:border-white transition"
                >
                  Skip
                </button>
              )}
              <button
                onClick={goNext}
                disabled={!canProceed()}
                className="flex-1 sm:flex-none bg-ink text-surface dark:bg-white dark:text-black px-6 py-2.5 sm:py-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 12 && !submitted && (
          <div className="flex justify-start mt-4">
            <button onClick={goBack} className="text-stone dark:text-pebble underline text-sm py-1">
              Back
            </button>
          </div>
        )}
      </div>
    </section>
  )
}