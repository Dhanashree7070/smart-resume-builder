function Input ({ label, ...props }){
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-textPrimary">{label}</label>
      <input
        {...props}
        className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
      />
    </div>
  );
};

export default Input;
