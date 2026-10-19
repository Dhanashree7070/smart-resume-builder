function StatCard  ({ title, value }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4">
      <p className="text-sm text-textSecondary">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
    </div>
  );
};

export default StatCard;