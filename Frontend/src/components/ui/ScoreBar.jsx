function ScoreBar ({ value }){
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-primary h-3 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ScoreBar;