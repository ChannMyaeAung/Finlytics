import React from "react";

const DataEntry = () => {
  return (
    <section className="bg-white py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        {/* Title */}
        <h2 className="text-5xl font-black text-center text-gray-900 mb-24">
          Data entry. Easy as pie.
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 text-center">
          {/* Bank connections */}
          <div className="space-y-6 flex items-center flex-col justify-between">
            <div className="space-y-4 mb-16">
              <h3 className="text-3xl font-semibold text-gray-900">
                Bank connections
              </h3>
              <p className="text-sm md:text-base">
                14545 bank & financial service connections worldwide
              </p>
            </div>
            <img
              src="/dataentry/ipad-connections.png"
              alt="Bank connections"
              className="mx-auto max-w-xs w-full h-full drop-shadow-lg"
            />
            <span className="text-[#b33556] text-xs md:text-base pt-16">
              Learn more: Bank connections
            </span>
          </div>

          {/* Add in the app */}
          <div className="space-y-6 flex items-center flex-col justify-between">
            <div className="space-y-4 mb-16">
              <h3 className="text-3xl font-semibold text-gray-900">
                Add in the app
              </h3>
              <p className="text-base">
                4 quick taps to add an expense or income
              </p>
            </div>
            <img
              src="/dataentry/add-expense.png"
              alt="Add expense"
              className="mx-auto max-w-45 drop-shadow-lg"
            />
            <span className="text-[#b33556] pt-16">
              Learn more: Adding entries
            </span>
          </div>

          {/* Import from file */}
          <div className="space-y-6 flex items-center flex-col justify-between">
            <div className="space-y-4 mb-16">
              <h3 className="text-3xl font-semibold text-gray-900">
                Import from file
              </h3>
              <p className="text-base">
                8 file import formats supported in the web app
              </p>
            </div>
            <img
              src="/dataentry/formats.png"
              alt="Import formats"
              className="mx-auto max-w-xs drop-shadow-lg"
            />
            <span className="text-[#b33556] pt-16">Learn more: Importing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataEntry;
