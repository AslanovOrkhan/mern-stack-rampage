// ContactInfo.tsx
import React from "react";

const ContactInfo = () => {
  return (
    <section className="w-full  max-w-5xl mx-auto px-6 lg:py-28 py-6">
      <h2 className="text-3xl md:text-4xl lg:my-6 my:0 font-semibold mb-6">Communication</h2>
      <div className="rounded-xl border border-gray-100 shadow-lg overflow-hidden">
        {/* Address */}
        <div className="lg:py-9 py-6 lg:px-6 px-3 grid grid-cols-3 items-center gap-3 border-b border-gray-100">
          <span className="text-gray-600 font-medium text-left">Address:</span>
          <span className="col-span-2 text-center text-gray-700">
            Arnavutköy / Istanbul
          </span>
        </div>

        {/* Telephone */}
        <div className="lg:py-9 py-6 lg:px-6 px-3 grid grid-cols-3 items-center gap-3 border-b border-gray-100">
          <span className="text-gray-600 font-medium text-left">
            Telephone:
          </span>
          <span className="col-span-2 text-center text-gray-700">
            444 7 899
          </span>
        </div>

        {/* Email */}
        <div className="lg:py-9 py-6 lg:px-6 px-3 grid grid-cols-3 items-center gap-3">
          <span className="text-gray-600 font-medium text-left">Email:</span>
          <span className="col-span-2 text-center text-gray-700 break-all">
            destek@segment.com.tr
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
