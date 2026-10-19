function Section ({ title, children }){
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium text-textPrimary">{title}</h2>
      <Card>{children}</Card>
    </div>
  );
};

export default Section;
