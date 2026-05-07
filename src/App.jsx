import React, { useMemo, useState } from 'react'
import { buildSteps, dashboardRows, endpoints, filterDashboardRows, guardrails, screens } from './data.js'

const icons = {
  browser: 'M4 5h16v14H4z M4 9h16 M8 5v4 M12 5v4 M16 5v4',
  spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z M5 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1z',
  grid: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  db: 'M4 6c0-2 16-2 16 0s-16 2-16 0 M4 6v12c0 2 16 2 16 0V6 M4 12c0 2 16 2 16 0',
  user: 'M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2 M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.8',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3 M6 11h12v10H6z',
  check: 'M20 6 9 17l-5-5',
  arrow: 'M5 12h14 M13 5l7 7-7 7',
  play: 'M8 5v14l11-7z',
  refresh: 'M20 12a8 8 0 0 1-14 5 M4 12a8 8 0 0 1 14-5 M18 3v4h-4 M6 21v-4h4',
  rocket: 'M5 19l4-1 9-9 2-6-6 2-9 9-1 4z M15 9h.01 M5 19l-2 2 M9 18l-2 4',
  table: 'M4 5h16v14H4z M4 10h16 M9 5v14 M15 5v14',
  chart: 'M5 19V9 M12 19V5 M19 19v-8',
  layers: 'M12 2 2 7l10 5 10-5-10-5z M2 12l10 5 10-5 M2 17l10 5 10-5',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  code: 'M16 18l6-6-6-6 M8 6l-6 6 6 6 M14 4l-4 16',
}

function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name] || icons.spark} />
    </svg>
  )
}

function Pill({ children, tone = 'red' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

function Button({ children, icon = 'arrow', variant = 'primary', onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {variant === 'secondary' && <Icon name={icon} size={17} />}
      <span>{children}</span>
      {variant !== 'secondary' && <Icon name={icon} size={17} />}
    </button>
  )
}

function SideNav({ screen, setScreen }) {
  const active = screens.find((item) => item.id === screen) || screens[0]
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><Icon name="layers" /></div>
        <div>
          <div className="eyebrow">Kendo concept</div>
          <h1>Agentic UI Composer</h1>
        </div>
      </div>

      <nav className="nav">
        {screens.map((item) => (
          <button key={item.id} className={`nav-item ${screen === item.id ? 'active' : ''}`} onClick={() => setScreen(item.id)}>
            <span><Icon name={item.icon} size={17} />{item.label}</span>
            <Icon name="arrow" size={16} />
          </button>
        ))}
      </nav>

      <div className="jtbd">
        <div><Icon name="code" size={18} /> <strong>JTBD</strong></div>
        <p>Create new usage of existing backends by customizing them for individual users or teams.</p>
      </div>

      <div className="current">
        <div className="eyebrow">Current screen</div>
        <strong><Icon name={active.icon} size={18} /> {active.label}</strong>
      </div>
    </aside>
  )
}

function MiniBrowser({ setScreen, buildProgress, setBuildProgress }) {
  const nextStep = () => {
    const next = Math.min(4, buildProgress + 1)
    setBuildProgress(next)
    if (next >= 4) setScreen('preview')
  }

  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="dot red" /><span className="dot gold" /><span className="dot dark" />
        <div className="url">app.company.com/sales-dashboard</div>
      </div>

      <div className="browser-body">
        <section className="old-app">
          <div className="section-head">
            <div>
              <div className="eyebrow red-text">Existing web application</div>
              <h2>Sales workspace</h2>
            </div>
            <Pill tone="dark">Original UX</Pill>
          </div>

          <div className="placeholder-grid">
            {['Pipeline', 'Leads', 'Forecast'].map((item) => (
              <div className="placeholder-card" key={item}>
                <div className="line short" />
                <h3>{item}</h3>
                <div className="mini-chart" />
                <div className="line" />
                <div className="line half" />
              </div>
            ))}
          </div>

          <div className="problem">
            <Icon name="browser" />
            <div>
              <h3>User problem</h3>
              <p>The existing app works, but the user wants a simpler view: only revenue, conversion, segments and export actions.</p>
            </div>
          </div>
        </section>

        <section className="addon-panel">
          <div className="addon-title">
            <div className="icon-circle"><Icon name="spark" /></div>
            <div>
              <div className="eyebrow red-text">Browser add-on</div>
              <h3>AI UI Composer</h3>
            </div>
            <Pill>Active</Pill>
          </div>

          <div className="request">
            <div className="eyebrow">User request</div>
            <p>Create a BI board over the PostgreSQL backend with segment revenue, conversion, filters and export.</p>
          </div>

          <div className="steps">
            {buildSteps.map((step, index) => {
              const done = index < buildProgress
              return (
                <div className="step" key={step}>
                  <span className={done ? 'step-dot done' : 'step-dot'}>{done ? <Icon name="check" size={14} /> : index + 1}</span>
                  {step}
                </div>
              )
            })}
          </div>

          <Button icon="play" onClick={nextStep}>{buildProgress < 4 ? 'Run next agent step' : 'Open generated UI'}</Button>
          <Button icon="spark" variant="secondary" onClick={() => setScreen('composer')}>Open composer</Button>
        </section>
      </div>
    </div>
  )
}

function AddonScreen({ setScreen, buildProgress, setBuildProgress }) {
  return (
    <div className="hero-grid">
      <section className="hero-copy">
        <Pill>Browser-first B2C2B entry point</Pill>
        <h1>Let any user reshape the app they already use.</h1>
        <p>A browser add-on captures the user request, the agentic composer builds a Kendo UI frontend, and the enterprise backend remains the source of truth.</p>
        <div className="actions">
          <Button icon="spark" onClick={() => setScreen('composer')}>Create custom UI</Button>
          <Button icon="shield" variant="secondary" onClick={() => setScreen('governance')}>See guardrails</Button>
        </div>
        <div className="persona-grid">
          <div><span>Primary user</span><strong>Citizen builder</strong></div>
          <div><span>Buyer</span><strong>Product / Architect</strong></div>
          <div><span>Client</span><strong>Seat-buying org</strong></div>
        </div>
      </section>
      <MiniBrowser setScreen={setScreen} buildProgress={buildProgress} setBuildProgress={setBuildProgress} />
    </div>
  )
}

function ComposerScreen({ setScreen, buildProgress, setBuildProgress }) {
  const [useCase, setUseCase] = useState('bi')
  const prompts = {
    bi: 'Create a BI board over our PostgreSQL backend. Show revenue by segment, conversion, trend, top accounts and an export action.',
    support: 'Create a support console with open tickets, priority filters, customer history and escalation workflow.',
    approval: 'Create an approval cockpit for managers with pending approvals, risk flags and approve/reject actions.',
  }

  const cards = [
    { id: 'bi', title: 'BI board over PostgreSQL', icon: 'chart', body: 'Revenue, conversion and segment analytics over approved database endpoints.' },
    { id: 'support', title: 'Support console', icon: 'grid', body: 'Ticket triage, customer history, SLA alerts and escalation actions.' },
    { id: 'approval', title: 'Approval cockpit', icon: 'check', body: 'Role-specific approval flow over existing workflow endpoints.' },
  ]

  return (
    <div className="two-col">
      <section className="panel">
        <div className="panel-title">
          <div className="soft-icon"><Icon name="spark" /></div>
          <div>
            <div className="eyebrow red-text">Agentic prompt</div>
            <h2>What should change?</h2>
          </div>
        </div>
        <textarea value={prompts[useCase]} readOnly />
        <div className="choice-list">
          {cards.map((card) => (
            <button className={`choice ${useCase === card.id ? 'selected' : ''}`} key={card.id} onClick={() => setUseCase(card.id)}>
              <span><Icon name={card.icon} /></span>
              <div><strong>{card.title}</strong><p>{card.body}</p></div>
            </button>
          ))}
        </div>
        <div className="actions">
          <Button icon="play" onClick={() => { setBuildProgress(4); setScreen('preview') }}>Generate</Button>
          <Button icon="browser" variant="secondary" onClick={() => setScreen('addon')}>Back</Button>
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <div>
            <div className="eyebrow red-text">Agent build plan</div>
            <h2>From backend capability to Kendo UI</h2>
          </div>
          <Pill>4 agents</Pill>
        </div>

        <div className="agent-grid">
          {[
            ['db', 'Backend discovery', 'Reads schema, entities, available endpoints and endpoint descriptions.'],
            ['lock', 'Access mapping', 'Inherits current user permissions and blocks unapproved actions.'],
            ['grid', 'Kendo UI composition', 'Selects grids, forms, charts, filters, menus and dashboard layouts.'],
            ['shield', 'Judge and test', 'Checks workflow constraints, validation rules and publishing risk.'],
          ].map(([icon, title, body], index) => (
            <div className="agent-card" key={title}>
              <div className={index < buildProgress ? 'agent-icon done' : 'agent-icon'}><Icon name={icon} /></div>
              <Pill tone={index < buildProgress ? 'red' : 'dark'}>{index < buildProgress ? 'Done' : 'Ready'}</Pill>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function PreviewScreen({ setScreen }) {
  const [filter, setFilter] = useState('All segments')
  const visibleRows = useMemo(() => filterDashboardRows(filter), [filter])

  return (
    <section className="panel wide">
      <div className="section-head">
        <div>
          <div className="eyebrow red-text">Generated Kendo UI frontend</div>
          <h2>PostgreSQL BI board</h2>
        </div>
        <div className="actions">
          <Button icon="refresh" variant="secondary" onClick={() => setScreen('composer')}>Regenerate</Button>
          <Button icon="rocket" onClick={() => setScreen('governance')}>Send for approval</Button>
        </div>
      </div>

      <div className="kpi-grid">
        {[
          ['Revenue', '€1.09M', '+9.7%', 'chart'],
          ['Conversion', '18.2%', '+4.1%', 'play'],
          ['Accounts', '428', '+32', 'user'],
          ['Exports', '14', 'This week', 'table'],
        ].map(([label, value, note, icon]) => (
          <div className="kpi" key={label}>
            <span><Icon name={icon} /></span>
            <small>{note}</small>
            <p>{label}</p>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="section-head compact"><h3>Revenue trend</h3><Pill>Live endpoint</Pill></div>
          <div className="bar-chart">{[44, 58, 48, 72, 64, 84, 78, 92, 74, 98, 88, 110].map((h, i) => <span key={i} style={{ height: h }} />)}</div>
        </div>

        <div className="filter-card">
          <div className="section-head compact"><h3>Filters</h3><Icon name="grid" /></div>
          {['All segments', 'Enterprise', 'Mid-market', 'SMB', 'Partners'].map((item) => (
            <button className={filter === item ? 'filter active' : 'filter'} key={item} onClick={() => setFilter(item)}>
              {item}{filter === item && <Icon name="check" size={15} />}
            </button>
          ))}
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-title"><h3>Segment table</h3><button>Export CSV</button></div>
        <table>
          <thead><tr><th>Segment</th><th>Revenue</th><th>Conversion</th><th>Change</th></tr></thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.segment}>
                <td><strong>{row.segment}</strong></td>
                <td>{row.revenue}</td>
                <td>{row.conversion}</td>
                <td className={row.change.startsWith('+') ? 'positive' : 'negative'}>{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function GovernanceScreen({ setScreen }) {
  const [approved, setApproved] = useState(false)
  return (
    <div className="two-col governance">
      <section className="panel">
        <div className="section-head">
          <div>
            <div className="eyebrow red-text">Enterprise control plane</div>
            <h2>Approve the UI capability layer</h2>
          </div>
          <Pill tone={approved ? 'red' : 'warning'}>{approved ? 'Approved' : 'Pending review'}</Pill>
        </div>

        <div className="guardrail-grid">
          {guardrails.map((item, index) => (
            <div className="guardrail" key={item.title}>
              <div className="soft-icon"><Icon name={index === 0 ? 'lock' : index === 1 ? 'user' : index === 2 ? 'eye' : 'refresh'} /></div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        <div className="endpoint-list">
          <h3>Endpoint approval list</h3>
          {endpoints.map((endpoint) => (
            <div className="endpoint" key={endpoint.name}>
              <div><strong>{endpoint.name}</strong><span>{endpoint.type} endpoint</span></div>
              <Pill tone={endpoint.status === 'Blocked' ? 'dark' : endpoint.status === 'Review' ? 'warning' : 'red'}>{endpoint.status}</Pill>
            </div>
          ))}
        </div>
      </section>

      <aside className="publish-card">
        <div className="publish-title">
          <span><Icon name="rocket" /></span>
          <div><div className="eyebrow">Publish flow</div><h2>Vercel-ready prototype</h2></div>
        </div>
        {['Upload this project to GitHub', 'Import the repository into Vercel', 'Use npm run build', 'Publish generated frontend'].map((item, index) => (
          <div className="publish-step" key={item}><span>{index + 1}</span>{item}</div>
        ))}
        <div className="tradeoff">
          <h3>Leadership tradeoff</h3>
          <p>Prioritize governed enterprise adoption over unrestricted personal customization.</p>
        </div>
        <Button icon="check" onClick={() => setApproved(true)}>{approved ? 'Approved' : 'Approve generated UI'}</Button>
        <Button icon="eye" variant="secondary" onClick={() => setScreen('preview')}>Back to generated UI</Button>
      </aside>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('addon')
  const [buildProgress, setBuildProgress] = useState(1)

  return (
    <div className="app">
      <div className="bg-shape one" />
      <div className="bg-shape two" />
      <SideNav screen={screen} setScreen={setScreen} />

      <main className="main">
        <header className="mobile-head">
          <div><strong>Agentic UI Composer</strong><span>Kendo concept</span></div>
          <select value={screen} onChange={(event) => setScreen(event.target.value)}>
            {screens.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </header>

        <div className="canvas">
          {screen === 'addon' && <AddonScreen setScreen={setScreen} buildProgress={buildProgress} setBuildProgress={setBuildProgress} />}
          {screen === 'composer' && <ComposerScreen setScreen={setScreen} buildProgress={buildProgress} setBuildProgress={setBuildProgress} />}
          {screen === 'preview' && <PreviewScreen setScreen={setScreen} />}
          {screen === 'governance' && <GovernanceScreen setScreen={setScreen} />}
        </div>
      </main>
    </div>
  )
}
