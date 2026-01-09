import React from "react";

const DataEntry = () => {
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="font-serif text-5xl text-center text-gray-900 mb-24">
          Data entry. Easy as pie.
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {/* Bank connections */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Bank connections
            </h3>
            <p className="text-sm text-gray-600">
              14,545 bank & financial service connections worldwide
            </p>
            <img
              src="/dataentry/ipad-connections.png"
              alt="Bank connections"
              className="mx-auto max-w-xs drop-shadow-lg"
            />
            <span className="text-[#b33556]">Learn more: Bank connections</span>
          </div>

          {/* Add in the app */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Add in the app</h3>
            <p className="text-sm text-gray-600">
              4 quick taps to add an expense or income
            </p>
            <img
              src="/dataentry/add-expense.png"
              alt="Add expense"
              className="mx-auto max-w-[180px] drop-shadow-lg"
            />
            <span className="text-[#b33556]">Learn more: Adding entries</span>
          </div>

          {/* Import from file */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Import from file
            </h3>
            <p className="text-sm text-gray-600">
              8 file import formats supported in the web app
            </p>
            <img
              src="/dataentry/formats.png"
              alt="Import formats"
              className="mx-auto max-w-xs drop-shadow-lg"
            />
            <span className="text-[#b33556]">Learn more: Importing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataEntry;
