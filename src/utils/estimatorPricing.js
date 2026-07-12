import {
  PROJECT_TYPES,
  FEATURE_GROUPS,
  INTEGRATIONS,
  TECHNICAL_REQUIREMENTS,
  TIMELINES,
  COMPANY_SIZES,
  ESTIMATED_USERS,
} from './estimatorConfig'

const ALL_FEATURES = FEATURE_GROUPS.flatMap((group) => group.features)
const BLENDED_HOURLY_RATE = 1400
const MIN_ESTIMATE = 30000

const roundToThousand = (value) => Math.round(value / 1000) * 1000

const findById = (collection, id) => collection.find((item) => item.id === id)

const sumCosts = (collection, ids) =>
  ids.reduce((total, id) => {
    const match = findById(collection, id)
    return total + (match ? match.cost : 0)
  }, 0)

const getScopeMultiplier = (scope) => {
  const pagesFactor = 1 + Math.min(scope.pages || 0, 60) * 0.012
  const dashboardsFactor = 1 + Math.min(scope.dashboards || 0, 20) * 0.04
  const usersFactor = ESTIMATED_USERS.find((u) => u.id === scope.estimatedUsers)?.multiplier || 1
  return pagesFactor * dashboardsFactor * usersFactor
}

const getScopeFlatFees = (scope) => {
  let fee = 0
  if (scope.adminArea) fee += 30000
  if (scope.customerPortal) fee += 25000
  return fee
}

const getDesignCost = (design, baseAndFeatures) => {
  let cost = 0
  if (design.needUIUX) cost += baseAndFeatures * 0.2
  if (design.needLogo) cost += 15000
  if (design.hasExistingBranding) cost *= 0.7
  return cost
}

const getComplexityScore = (data) => {
  let score = data.features.length
  score += data.integrations.length * 1.5
  score += data.technical.length
  score += data.scope.dashboards > 0 ? 2 : 0
  score += data.scope.adminArea ? 1 : 0
  score += data.scope.customerPortal ? 1 : 0
  score += Math.min((data.scope.pages || 0) / 5, 6)
  return score
}

const getComplexityRating = (score) => {
  if (score <= 5) return 'Low'
  if (score <= 12) return 'Medium'
  if (score <= 20) return 'High'
  return 'Enterprise'
}

const getTeamRecommendation = (rating) => {
  switch (rating) {
    case 'Low':
      return '1 full-stack developer'
    case 'Medium':
      return '2 developers and 1 designer'
    case 'High':
      return '3-4 developers, 1 designer, 1 QA engineer'
    default:
      return 'Project lead, 3+ developers, 1 designer, 1 QA engineer, 1 DevOps engineer'
  }
}

const getTeamSize = (rating) => {
  switch (rating) {
    case 'Low':
      return 1
    case 'Medium':
      return 3
    case 'High':
      return 5
    default:
      return 8
  }
}

const getTechStack = (data, rating) => {
  const frontend = ['React']
  if (data.scope.pages > 3 || data.technical.includes('seo')) frontend.push('Next.js')

  const backend = []
  const hasAI = data.features.some((id) => ['ai-chatbot', 'ai-assistant', 'recommendations', 'document-analysis'].includes(id))
  const hasHeavyBackend = ['Enterprise', 'High'].includes(rating)
  if (hasAI) backend.push('Python / FastAPI')
  if (hasHeavyBackend) backend.push('Node.js')
  backend.push('Flask')

  const database = ['PostgreSQL']
  if (data.features.some((id) => ['login', 'registration', 'google-login', 'apple-login', 'otp'].includes(id))) {
    database.push('Supabase')
  }

  const infra = []
  if (hasHeavyBackend) {
    infra.push('AWS', 'Docker')
  } else {
    infra.push('Vercel')
  }

  return { frontend, backend: [...new Set(backend)], database, infra }
}

const PRICE_BREAKDOWN_WEIGHTS = {
  Discovery: 0.05,
  'UI/UX Design': 0.15,
  'Frontend Development': 0.25,
  'Backend Development': 0.25,
  Database: 0.08,
  Testing: 0.1,
  Deployment: 0.05,
  'Project Management': 0.05,
  Support: 0.02,
}

export const calculateEstimate = (data) => {
  const projectType = findById(PROJECT_TYPES, data.projectType)
  const base = projectType ? projectType.base : 150000

  const featuresCost = sumCosts(ALL_FEATURES, data.features)
  const integrationsCost = sumCosts(INTEGRATIONS, data.integrations)
  const technicalCost = sumCosts(TECHNICAL_REQUIREMENTS, data.technical)

  const companySizeMultiplier = COMPANY_SIZES.find((c) => c.id === data.business.companySize)?.multiplier || 1
  const timelineMultiplier = TIMELINES.find((t) => t.id === data.timeline)?.multiplier || 1
  const scopeMultiplier = getScopeMultiplier(data.scope)
  const scopeFlatFees = getScopeFlatFees(data.scope)

  const baseAndFeatures = base + featuresCost
  const designCost = getDesignCost(data.design, baseAndFeatures)

  const preTimelineSubtotal =
    (baseAndFeatures + integrationsCost + technicalCost + scopeFlatFees) * scopeMultiplier * companySizeMultiplier +
    designCost

  const total = Math.max(preTimelineSubtotal * timelineMultiplier, MIN_ESTIMATE)

  const low = Math.max(roundToThousand(total * 0.9), MIN_ESTIMATE)
  const high = roundToThousand(total * 1.25)
  const midpoint = (low + high) / 2

  const complexityScore = getComplexityScore(data)
  const complexityRating = getComplexityRating(complexityScore)
  const teamRecommendation = getTeamRecommendation(complexityRating)
  const teamSize = getTeamSize(complexityRating)

  const totalHours = Math.round(midpoint / BLENDED_HOURLY_RATE)
  const developmentHours = Math.round(totalHours * 0.55)
  const designHours = Math.round(totalHours * 0.2)
  const testingHours = Math.round(totalHours * 0.15)
  const deploymentHours = Math.round(totalHours * 0.1)

  const weeklyCapacityPerPerson = 25
  const estimatedWeeks = Math.max(1, Math.ceil(totalHours / (teamSize * weeklyCapacityPerPerson)))
  const estimatedDuration =
    estimatedWeeks <= 8 ? `${estimatedWeeks} week${estimatedWeeks > 1 ? 's' : ''}` : `${Math.round(estimatedWeeks / 4)} months`

  const priceBreakdown = Object.entries(PRICE_BREAKDOWN_WEIGHTS).map(([label, weight]) => ({
    label,
    amount: roundToThousand(midpoint * weight),
  }))

  const techStack = getTechStack(data, complexityRating)

  return {
    low,
    high,
    midpoint,
    complexityScore,
    complexityRating,
    teamRecommendation,
    estimatedDuration,
    hours: {
      development: developmentHours,
      design: designHours,
      testing: testingHours,
      deployment: deploymentHours,
      total: totalHours,
    },
    priceBreakdown,
    techStack,
  }
}