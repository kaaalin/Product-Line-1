export const screens = [
  { id: 'addon', label: 'Browser add-on', icon: 'browser' },
  { id: 'composer', label: 'AI composer', icon: 'spark' },
  { id: 'preview', label: 'Generated UI', icon: 'grid' },
  { id: 'governance', label: 'Governance', icon: 'shield' },
]

export const buildSteps = [
  'Inspect backend capability layer',
  'Map entities, endpoints and permissions',
  'Generate Kendo UI grid, charts and filters',
  'Validate workflow and role access',
]

export const endpoints = [
  { name: 'GET /sales/monthly', type: 'Read', status: 'Approved' },
  { name: 'GET /customers/segments', type: 'Read', status: 'Approved' },
  { name: 'POST /reports/export', type: 'Action', status: 'Review' },
  { name: 'PATCH /opportunities/{id}', type: 'Write', status: 'Blocked' },
]

export const dashboardRows = [
  { segment: 'Enterprise', revenue: '€428k', conversion: '18.4%', change: '+12%' },
  { segment: 'Mid-market', revenue: '€312k', conversion: '22.1%', change: '+8%' },
  { segment: 'SMB', revenue: '€146k', conversion: '12.7%', change: '-3%' },
  { segment: 'Partners', revenue: '€205k', conversion: '16.9%', change: '+15%' },
]

export const guardrails = [
  {
    title: 'Approved endpoints only',
    body: 'Generated frontends can call only endpoints explicitly approved by the application owner.',
  },
  {
    title: 'Permission inheritance',
    body: 'Every generated view inherits the current user roles and permissions from the backend.',
  },
  {
    title: 'Sandbox before production',
    body: 'New screens are tested with sandbox data before production publication.',
  },
  {
    title: 'Audit trail and rollback',
    body: 'Every generated UI has version history, logs and one-click rollback.',
  },
]

export function filterDashboardRows(filter) {
  if (filter === 'All segments') return dashboardRows
  return dashboardRows.filter((row) => row.segment === filter)
}
