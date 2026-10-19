function Textarea ({ label, ...props }){
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <textarea
        {...props}
        className="border border-border rounded-lg px-3 py-2 min-h-[100px] focus:ring-2 focus:ring-primary outline-none"
      />
    </div>
  );
};

export default Textarea;  
