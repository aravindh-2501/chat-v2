const AuthImagePattern = ({ subtitle, title }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="w-2/3 text-center">
        {/* Decorative Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-2xl bg-primary/10 ${index % 2 === 0 ? "animate-pulse" : ""}`}
            ></div>
          ))}
        </div>

        {/* Title and Subtitle */}
        <h2 className="text-4xl font-bold mb-4 text-primary">{title}</h2>
        <div className="text-base-content/60 text-lg">{subtitle}</div> {/* Changed to div */}
      </div>
    </div>
  );
};

export default AuthImagePattern;
