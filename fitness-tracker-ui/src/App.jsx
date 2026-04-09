import './App.css'

const stats = [
  { label: 'Active minutes', value: '72', change: '+8%', tone: 'positive' },
  { label: 'Calories burned', value: '1,245', change: '+6%', tone: 'positive' },
  { label: 'Steps', value: '10,580', change: '+12%', tone: 'positive' },
  { label: 'Workouts', value: '4', change: '+1', tone: 'positive' },
]

const activities = [
  { name: 'Morning run', duration: '28 min', energy: '430 kcal', status: 'Completed' },
  { name: 'Yoga flow', duration: '22 min', energy: '140 kcal', status: 'Completed' },
  { name: 'Strength training', duration: '35 min', energy: '520 kcal', status: 'In progress' },
]

const goals = [
  { label: 'Move', value: 85, color: 'var(--accent)' },
  { label: 'Exercise', value: 60, color: 'var(--secondary)' },
  { label: 'Stand', value: 90, color: 'var(--success)' },
]

function App() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="badge">Fitness tracker</span>
          <h1>Stay consistent with every workout.</h1>
          <p>
            Track activity, calories, and weekly progress from one clean dashboard.
          </p>
        </div>
        <div className="header-summary">
          <span>Current streak</span>
          <strong>8 days</strong>
        </div>
      </header>

      <section className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <h2>{stat.value}</h2>
            <span className={`stat-change ${stat.tone}`}>{stat.change}</span>
          </article>
        ))}
      </section>

      <section className="panels-grid">
        <article className="panel progress-panel">
          <div className="panel-title">
            <div>
              <p>Weekly progress</p>
              <h2>Goal completion</h2>
            </div>
            <span className="chip">72%</span>
          </div>

          <div className="progress-chart">
            <div className="bar">
              <span>Mon</span>
              <strong style={{ height: '38%' }} />
            </div>
            <div className="bar">
              <span>Tue</span>
              <strong style={{ height: '52%' }} />
            </div>
            <div className="bar">
              <span>Wed</span>
              <strong style={{ height: '68%' }} />
            </div>
            <div className="bar">
              <span>Thu</span>
              <strong style={{ height: '78%' }} />
            </div>
            <div className="bar">
              <span>Fri</span>
              <strong style={{ height: '88%' }} />
            </div>
            <div className="bar">
              <span>Sat</span>
              <strong style={{ height: '94%' }} />
            </div>
            <div className="bar">
              <span>Sun</span>
              <strong style={{ height: '100%' }} />
            </div>
          </div>

          <div className="goal-summary">
            {goals.map((goal) => (
              <div key={goal.label} className="goal-item">
                <span>{goal.label}</span>
                <strong>{goal.value}%</strong>
                <div className="goal-bar">
                  <div className="goal-fill" style={{ width: `${goal.value}%`, background: goal.color }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel activity-panel">
          <div className="panel-title">
            <div>
              <p>Latest activities</p>
              <h2>Workout summary</h2>
            </div>
            <button className="action-button">Add workout</button>
          </div>

          <ul className="activity-list">
            {activities.map((activity) => (
              <li key={activity.name} className="activity-item">
                <div>
                  <h3>{activity.name}</h3>
                  <p>{activity.duration} • {activity.energy}</p>
                </div>
                <span className={`status ${activity.status === 'Completed' ? 'completed' : 'in-progress'}`}>
                  {activity.status}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  )
}

export default App
