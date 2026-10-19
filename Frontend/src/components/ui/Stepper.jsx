function Stepper({ steps, currentStep, setStep }) {
  return (
    <div className="flex items-center justify-between mb-8">

      {steps.map((label, index) => {
        const stepNumber = index + 1;

        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={index} className="flex-1 flex items-center">

            {/* Circle */}
            <div
              onClick={() => setStep(stepNumber)}
              className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer font-semibold
                ${isActive ? "bg-blue-600 text-white"
                  : isCompleted ? "bg-green-500 text-white"
                  : "bg-gray-300 text-black"}`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            {/* Label */}
            <div className="ml-2 text-sm hidden md:block">
              {label}
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2
                ${currentStep > stepNumber ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}

          </div>
        );
      })}

    </div>
  );
}

export default Stepper;