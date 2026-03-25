const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`
      bg-white rounded-xl border border-secondary-100
      ${hover ? "transition-all duration-300 hover:shadow-card-hover hover:border-secondary-200" : "shadow-card"}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-secondary-100 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div
    className={`px-6 py-4 border-t border-secondary-100 bg-secondary-50 ${className}`}
  >
    {children}
  </div>
);

export default Card;
