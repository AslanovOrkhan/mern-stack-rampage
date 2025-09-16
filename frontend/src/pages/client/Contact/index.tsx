// ContactInfo.tsx
import React from "react";

const ContactInfo = () => {
  return (
    <section className="w-full  max-w-5xl mx-auto lg:px-6 px-2 lg:py-28 py-6">
      <h2 className="text-3xl md:text-4xl lg:my-6 my:0 font-semibold mb-6">
        Communication
      </h2>
      <div className="rounded-xl border border-gray-100 shadow-lg overflow-hidden">
        {/* Address */}
        <div className="lg:py-9 py-6 lg:px-6 px-3 grid grid-cols-3 items-center gap-3 border-b border-gray-100">
          <span className="text-gray-600 lg:text-xl text-lg font-medium text-left">Address:</span>
          <span className="col-span-2 text-center text-gray-700 lg:text-xl text-lg">
            Arnavutköy / Istanbul
          </span>
        </div>

        {/* Telephone */}
        <div className="lg:py-9 py-6 lg:px-6 px-3 grid grid-cols-3 items-center gap-3 border-b border-gray-100">
          <span className="text-gray-600 lg:text-xl text-lg  font-medium text-left">
            Telephone:
          </span>
          <span className="col-span-2 text-center text-gray-700 lg:text-xl text-lg">
            444 7 899
          </span>
        </div>

        {/* Email */}
        <div className="lg:py-9 py-6 lg:px-6 px-3 grid grid-cols-3 items-center gap-3">
          <span className="text-gray-600 lg:text-xl text-lg font-medium text-left">Email:</span>
          <span className="col-span-2 text-center text-gray-700 break-all lg:text-xl text-lg">
            destek@segment.com.tr
          </span>
        </div>
      </div>

      {/* Form Title */}
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 mt-18 capitalize">Get in touch</h2>

      {/* Form Card */}
      <div className="rounded-2xl border border-gray-100 shadow-lg bg-white p-5 md:p-7">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {/* Full name */}
          <div className="md:col-span-1">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your full name"
              required
              className="block outline-none w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="block outline-none w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm placeholder:text-gray-400"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Write your message..."
              required
              className="block w-full rounded-xl outline-none border border-gray-200 bg-white px-4 py-3 shadow-sm placeholder:text-gray-400 resize-y"
            />
          </div>

          {/* Footer / Actions */}
          <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mt-2">
            <p className="text-sm text-gray-500">
              We usually respond within{" "}
              <span className="font-medium text-gray-700">24 hours</span>.
            </p>

            <div className="md:ml-auto">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold
                           text-white bg-gradient-to-r from-black to-gray-800
                           shadow-md hover:shadow-xl active:scale-[0.99]
                           transition"
              >
                Send message
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactInfo;
