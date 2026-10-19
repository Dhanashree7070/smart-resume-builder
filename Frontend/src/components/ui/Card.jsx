function Card({ children }) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      {children}
    </div>
  );
}

export default Card;
