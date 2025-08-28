// import React from "react";
// import { useState } from "react";

// const [formData, setFormData] = useState({
//   fullName: "",
//   email: "",
//   number: "",
//   message: "",
// });

// const Contact = () => {
//   return (
//     <section id="contact" className="py-24 bg-gray-50 text-center">
//       <div className="max-w-3xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
//         <p className="text-lg text-gray-600 mb-8">
//           Have questions, feedback, or partnership inquiries? Fill out the form
//           below and our team will get back to you shortly.
//         </p>

//         {/* Contact Form */}
//         <form className="bg-gray-100 p-8 rounded-lg shadow-md space-y-4">
//           <input
//             type="text"
//             // value={formData.fullName}
//             placeholder="Your Name"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
//             required
//           />
//           <input
//             type="email"
//             // value={formData.email}
//             placeholder="Your Email"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
//             required
//           />
//           <input
//             type="number"
//             // value={formData.number}
//             placeholder="Your Phone number"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
//             required
//           />
//           <textarea
//             rows="4"
//             // value={formData.message}
//             placeholder="Your Message"
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="w-full bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition cursor-pointer"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Contact;

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending delay
    setTimeout(() => {
      console.log("Form Data Submitted:", formData);

      // Extract first name
      const extractedFirstName = formData.fullName.split(" ")[0];
      setFirstName(extractedFirstName);

      setSubmitted(true);
      setLoading(false);

      // Reset form after submission
      setFormData({
        fullName: "",
        email: "",
        number: "",
        message: "",
      });

      // Hide success message after 4s
      setTimeout(() => setSubmitted(false), 9000);
    }, 2000); // simulate 2s network delay
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 text-center relative">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          Have questions, feedback, or partnership inquiries? Fill out the form
          below and our team will get back to you shortly.
        </p>

        {/* Success Panel (Centered, reduced width) */}
        {submitted && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className={`transition-all duration-700 ease-in-out transform ${
                submitted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5 pointer-events-none"
              } bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl text-base font-medium max-w-md w-[90%] text-center`}
            >
              ✅ Thank you{" "}
              <span className="font-semibold capitalize">{firstName}</span>!
              <br />
              Your message has been sent successfully. We’ll be in touch soon.
            </div>
          </div>
        )}

        {/* Contact Form */}
        <form
          className="bg-gray-100 p-8 rounded-lg shadow-md space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
            required
          />
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Your Phone number"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
            required
          />
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
            required
          ></textarea>

          {/* Submit Button with Loader */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition cursor-pointer disabled:opacity-70"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white active:bg-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
