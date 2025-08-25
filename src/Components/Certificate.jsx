import React, { useState } from "react";
import { X } from "lucide-react";

const Certificate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    course: "",
    date: "",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2); // File is ready
    }, 2000);
  };

  const handleDownloadFile = () => {
    setLoading(true);

    // simulate fake certificate file download
    setTimeout(() => {
      const blob = new Blob(["This is a fake certificate file."], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      a.click();
      URL.revokeObjectURL(url);

      setLoading(false);
      setStep(3); // Payment info
    }, 2000);
  };

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">Certificate</h2>

      {loading && (
        <div className="flex justify-center items-center">
          <p className="animate-pulse text-yellow-600 font-semibold">
            {step === 1
              ? "Processing your certificate..."
              : step === 2
              ? "Downloading file..."
              : ""}
          </p>
        </div>
      )}

      {!loading && step === 1 && (
        <div className="bg-white rounded-lg shadow-lg w-full md:w-2/3 mx-auto p-6 relative text-center text-black">
          <button
            onClick={() => window.history.back()}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-800 cursor-pointer"
          >
            <X size={20} />
          </button>
          <h4 className="text-xl mb-4 italic">
            Fill your Certificate Info below as you want it to appear.
          </h4>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              type="text"
              placeholder="Training Name"
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              required
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

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold w-full cursor-pointer"
            >
              Continue
            </button>
          </form>
        </div>
      )}

      {!loading && step === 2 && (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Your file is ready</h3>
          <button
            onClick={handleDownloadFile}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold cursor-pointer"
          >
            Download Now
          </button>
        </div>
      )}

      {!loading && step === 3 && (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
          <p className="text-gray-700 mb-4">
            Please proceed with payment to unlock your certificate download
            permanently.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold cursor-pointer">
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificate;
