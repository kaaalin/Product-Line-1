import assert from 'node:assert/strict'
import { dashboardRows, endpoints, screens, filterDashboardRows } from '../src/data.js'

assert.equal(screens.length, 4, 'Expected four clickable screens')
assert.equal(dashboardRows.length, 4, 'Expected four dashboard rows')
assert.equal(filterDashboardRows('Enterprise').length, 1, 'Enterprise filter should return one row')
assert.equal(filterDashboardRows('All segments').length, dashboardRows.length, 'All segments should return all rows')
assert.ok(endpoints.some((endpoint) => endpoint.status === 'Blocked'), 'Expected one blocked endpoint example')

console.log('Smoke tests passed')
