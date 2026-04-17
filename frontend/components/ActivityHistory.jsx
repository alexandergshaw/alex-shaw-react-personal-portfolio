function ActivityHistory({ activities }) {
  if (!activities.length) {
    return <p>No activity recorded yet.</p>;
  }

  return (
    <div>
      <h2>Activity History</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.date} - {activity.steps} steps
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityHistory;
