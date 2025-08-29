import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [certificateReady, setCertificateReady] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    fullName: "",
    course: "",
    provider: "",
    duration: "",
    date: "",
    certNumber: "",
  });

  // First button → show loading first, then form
  const handleCertificateClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowForm(true);
    }, 1500);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const closePanel = () => {
    setShowPanel(false);
  };

  // Form submit → show "Processing certificate..." then panel with download button
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setCertificateReady(true);
    }, 3000);
  };

  // Handle Download → show "Downloading..." animation, then trigger fake file
  const handleDownloadClick = () => {
    setCertificateReady(false);
    setDownloading(true);

    setTimeout(() => {
      setDownloading(false);
      // create fake certificate file
      const blob = new Blob(
        [
          `RESTRICTED CERTIFICATE\n\nName: ${formData.fullName}\nCourse: ${formData.course}\nProvider: ${formData.provider}\nDuration: ${formData.duration}\nDate: ${formData.date}\nCertificate No: ${formData.certNumber}\n\n--- This is a sample file ---`,
        ],
        { type: "application/pdf" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "paint_production_training_certificate.pdf";
      a.click();
      URL.revokeObjectURL(url);

      // after fake download → show error panel
      setShowPanel(true);
    }, 2000);
  };

  const handlePaystackPayment = () => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => {
      if (!window.PaystackPop) return alert("Failed to load payment page");

      const handler = window.PaystackPop.setup({
        key: "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b", // Replace with your Paystack public key
        email: "user@example.com", // Replace with customer email
        amount: 300000, // Amount in kobo (₦3000)
        currency: "NGN",
        ref: "PS_" + Math.floor(Math.random() * 1000000000 + 1),
        callback: function (response) {
          alert("Payment successful! Reference: " + response.reference);
        },
        onClose: function () {
          alert("Payment window closed.");
        },
      });
      handler.openIframe();
    };
    document.body.appendChild(script);
  };

  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Paint Academy
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Learn everything about Paint Production – from{" "}
          <span className="font-semibold">P.O.P Paints</span> to{" "}
          <span className="font-semibold">Stucco Paint</span>. Get step-by-step
          videos, mentorship, colour formulation, and business training to
          kickstart your paint journey!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a
            href="#paintTypes"
            className="bg-white text-yellow-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-100 transition active:bg-yellow-300"
          >
            Explore Paint Videos
          </a>

          <button
            onClick={handleCertificateClick}
            className="bg-yellow-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-800 transition cursor-pointer active:bg-yellow-600"
          >
            Download Certificate
          </button>
        </div>
      </div>

      {/* General Loading (Form / Processing) */}
      {loading && (
        <div className="fixed inset-0 bg-yellow-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 flex flex-col items-center">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
            <p className="text-gray-700 mt-4">Processing your certificate...</p>
          </div>
        </div>
      )}

      {/* Certificate Form */}
      {showForm && (
        <div className="fixed inset-0 bg-yellow-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-100 p-6 relative text-center text-black transform transition-all duration-500 animate-slideDown focus:ring-2 focus:ring-yellow-400">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-800 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl mb-4 italic">
              Fill your Certificate Info below as you want it to appear after
              downloading.
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Your full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="text"
                placeholder="Training received e.g Paint Production"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="text"
                placeholder="Training Provider e.g Paint Academy"
                value={formData.provider}
                onChange={(e) =>
                  setFormData({ ...formData, provider: e.target.value })
                }
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="text"
                placeholder="Duration (e.g. 2 weeks)"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="text"
                placeholder="Certificate Number (optional)"
                value={formData.certNumber}
                onChange={(e) =>
                  setFormData({ ...formData, certNumber: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
              />

              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold w-full cursor-pointer active:bg-yellow-500"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Ready Panel */}
      {certificateReady && !loading && (
        <div className="fixed inset-0 bg-yellow-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative text-center text-black">
            <button
              onClick={() => setCertificateReady(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-gray-800">
              Your Certificate is Ready.{" "}
            </h3>{" "}
            <p className=" italic text-green-700 mb-1 font-semibold">
              Other basic information is added !{" "}
            </p>
            <p className="mb-4">✅</p>
            <button
              onClick={handleDownloadClick}
              className="bg-green-500 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold cursor-pointer active:bg-green-400"
            >
              Download Now
            </button>
          </div>
        </div>
      )}

      {/* Downloading Animation */}
      {downloading && (
        <div className="fixed inset-0 bg-yellow-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 flex flex-col items-center">
            <Loader2 className="animate-spin text-green-500" size={40} />
            <p className="text-gray-700 mt-4">Downloading...</p>
          </div>
        </div>
      )}

      {/* Payment Panel */}
      {showPanel && (
        <div className="fixed inset-0 bg-yellow-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative text-center">
            <button
              onClick={closePanel}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-2 underline">
              Error
            </h3>
            <p className="font-medium mb-6 text-red-800">
              ❌ Oops! Download was disabled. We noticed you haven't paid for
              your certificate.
              <p className="text-sm italic mt-2 text-black">
                Downloads are only enabled for users who have paid for theirs.
              </p>
            </p>
            <button
              onClick={handlePaystackPayment}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold cursor-pointer active:bg-amber-400"
            >
              Pay Now 💳
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
