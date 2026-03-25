const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-secondary-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2.5 rounded-lg
          border ${error ? "border-red-300 focus:ring-red-500" : "border-secondary-200 focus:ring-primary-500"}
          bg-white text-secondary-900 placeholder-secondary-400
          focus:outline-none focus:ring-2 focus:border-transparent
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
