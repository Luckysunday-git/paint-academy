import React, { useState, useEffect } from "react";
import { Download, X, Search, Loader2 } from "lucide-react";

const paintTypesData = [
  {
    name: "P.O.P Paints",
    description: "Durable paints for plaster of Paris surfaces.",
    chemicals: ["Calcium Carbonate", "PVA Binder", "Water"],
  },
  {
    name: "Emulsion Paints",
    description: "Water-based paints with smooth finish.",
    chemicals: ["Titanium Dioxide", "Acrylic Emulsion", "Additives"],
  },
  {
    name: "Textured Paints",
    description: "Rough, stylish paints for design surfaces.",
    chemicals: ["Silica Sand", "Binder", "Pigments"],
  },
  {
    name: "Flex/Pattern Paints",
    description: "Elastic decorative paints for patterns.",
    chemicals: ["Latex Binder", "Colorants", "Fillers"],
  },
  {
    name: "Matt Paints",
    description: "Non-reflective finish, hides imperfections.",
    chemicals: ["Calcium Carbonate", "Emulsion", "Defoamer"],
  },
  {
    name: "Silk/Satin Paints",
    description: "Soft sheen with smooth finish.",
    chemicals: ["Resins", "Pigments", "Thickeners"],
  },
  {
    name: "Gloss/Oil Paint",
    description: "Shiny, oil-based finish for wood & metal.",
    chemicals: ["Linseed Oil", "Alkyd Resin", "Solvent"],
  },
  {
    name: "Graftex Paint",
    description: "Protective & decorative coating.",
    chemicals: ["Granules", "Binder", "Pigments"],
  },
  {
    name: "Road Marking Paint",
    description: "Durable reflective paints for roads.",
    chemicals: ["Thermoplastic Resin", "Glass Beads", "Pigments"],
  },
  {
    name: "Stucco Paint",
    description: "Textured cement-based paint.",
    chemicals: ["Cement", "Lime", "Pigments"],
  },
];

// load Paystack dynamically
const loadPaystackScript = () =>
  new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.appendChild(script);
  });

export default function PaintTypes({ searchTerm = "" }) {
  const [activePaint, setActivePaint] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [finalDownload, setFinalDownload] = useState(false);

  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    course: "",
    provider: "",
    duration: "",
    date: "",
    certNumber: "",
  });

  useEffect(() => setFilter(searchTerm), [searchTerm]);

  const resetStates = () => {
    setDownloading(false);
    setFileReady(false);
    setShowPayment(false);
    setSelectedType(null);
    setFinalDownload(false);
    setShowForm(false);
    setFormData({ fullName: "", course: "", date: "" });
  };

  const openPanel = (paint) => {
    setActivePaint(paint);
    resetStates(false); // just added this one to be
  };

  const closePanel = () => {
    setActivePaint(null);
    resetStates();
  };

  const handleDownloadClick = (type) => {
    setSelectedType(type);

    if (type === "certificate") {
      // show loading before form
      setDownloading(true);
      setTimeout(() => {
        setDownloading(false);
        setShowForm(true);
      }, 1500);
      return;
    }

    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setFileReady(true);
    }, 4000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setFileReady(true);
    }, 3000);
  };

  const triggerFakeFileDownload = () => {
    setFinalDownload(true);
    setTimeout(() => {
      let blob, fileName;
      if (selectedType === "video") {
        blob = new Blob(
          ["This is a restricted video file. Pay to get the real one"],
          {
            type: "video/mp4",
          }
        );
        fileName = `${activePaint.name}_video_Tutorial.mp4`;
      } else if (selectedType === "certificate") {
        blob = new Blob([`Certificate for ${formData.fullName}`], {
          type: "application/pdf",
        });
        fileName = "paint_production_training_certificate.pdf";
      } else if (selectedType === "chemicals") {
        blob = new Blob(
          ["This is a restricted pdf guide for chemicals/measurement."],
          {
            type: "application/pdf",
          }
        );
        fileName = "paint_chemicals_measurement.pdf";
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      setFinalDownload(false);
      setShowPayment(true);
    }, 2000);
  };

  const handlePaystackPayment = async () => {
    const scriptLoaded = await loadPaystackScript();
    if (!scriptLoaded) return alert("Failed to load Payment page");
    const handler = window.PaystackPop.setup({
      key: "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b",
      email: "user@example.com",
      amount: 300000,
      currency: "NGN",
      ref: "PS_" + Math.floor(Math.random() * 1000000000 + 1),
      callback: (r) => alert("Payment successful! Ref: " + r.reference),
      onClose: () => alert("Payment window closed"),
    });
    handler.openIframe();
  };

  const filteredPaints = paintTypesData.filter((paint) =>
    paint.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="py-24 px-6 bg-gray-50" id="paintTypes">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Paint Types/Videos
      </h2>

      {/* Search */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center border rounded-md px-2 py-1 bg-white">
          <Search size={18} className="text-gray-600 " />
          <input
            type="text"
            placeholder="Search paints..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 px-2 py-1 outline-none text-gray-800 "
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredPaints.map((paint, i) => (
          <div
            key={i}
            className="bg-white shadow-md p-6 rounded-xl hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {paint.name}
            </h3>
            <p className="text-gray-600 mb-3">{paint.description}</p>
            <ul className="list-disc list-inside text-gray-500 text-sm mb-4">
              {paint.chemicals.map((c, j) => (
                <li key={j}>{c}</li>
              ))}
            </ul>
            <button
              onClick={() => openPanel(paint)}
              className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium w-full cursor-pointer"
            >
              <Download size={16} /> Download
            </button>
          </div>
        ))}
      </div>

      {/* Popup Panel */}
      {activePaint && (
        <div className="fixed inset-0 bg-yellow-500 bg-opacity-50 flex justify-center items-center z-50 animate-slideDown">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative ">
            <button
              onClick={closePanel}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:bg-red-500"
            >
              <X size={20} />
            </button>

            {/* Heading changes depending on certificate or others */}
            <h3 className="text-xl font-bold text-gray-800 mb-3 underline text-center ">
              {selectedType === "certificate"
                ? `${`Certificate - Downloads`}`
                : `${activePaint.name} - Downloads`}
            </h3>

            {/* Options */}
            {!downloading &&
              !fileReady &&
              !showPayment &&
              !finalDownload &&
              !showForm && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleDownloadClick("video")}
                    className="flex items-center gap-2 py-2 px-3 bg-yellow-100 hover:bg-yellow-200 rounded-md cursor-pointer active:bg-yellow-400"
                  >
                    <Download size={18} />
                    Download Video Tutorial
                  </button>
                  <button
                    onClick={() => handleDownloadClick("chemicals")}
                    className="flex items-center gap-2 py-2 px-3 bg-yellow-100 hover:bg-yellow-200 rounded-md cursor-pointer active:bg-yellow-400"
                  >
                    <Download size={18} /> Download Chemicals/Measurement
                  </button>
                  <button
                    onClick={() => handleDownloadClick("certificate")}
                    className="flex items-center gap-2 py-2 px-3 bg-yellow-100 hover:bg-yellow-200 rounded-md cursor-pointer active:bg-yellow-400"
                  >
                    <Download size={18} />
                    Download Certificate
                  </button>
                </div>
              )}

            {/* Form */}
            {showForm && (
              <form
                onSubmit={handleFormSubmit}
                className="space-y-1 animate-slideDown"
              >
                <p className="text-sm mb-3 italic text-gray-700 font-semibold">
                  Fill your certificate info below as you want it to appear
                  after downloading.
                </p>

                {/* Full Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2  focus:ring-2 focus:ring-yellow-400 outline-none"
                />

                {/* Training / Course Title */}
                <input
                  type="text"
                  placeholder="Training / Course Title"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2  focus:ring-2 focus:ring-yellow-400 outline-none"
                />

                {/* Training Provider / Institution */}
                <input
                  type="text"
                  placeholder="Training Provider / Institution"
                  value={formData.provider}
                  onChange={(e) =>
                    setFormData({ ...formData, provider: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2  focus:ring-2 focus:ring-yellow-400 outline-none"
                />

                {/* Duration */}
                <input
                  type="text"
                  placeholder="Duration (e.g. 3 days, 40 hours)"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2  focus:ring-2 focus:ring-yellow-400 outline-none"
                />

                {/* Date of Completion */}
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2  focus:ring-2 focus:ring-yellow-400 outline-none"
                />

                {/* Certificate Number (optional) */}
                <input
                  type="text"
                  placeholder="Certificate Number (optional)"
                  value={formData.certNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, certNumber: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2  focus:ring-2 focus:ring-yellow-400 outline-none"
                />

                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg w-full cursor-pointer animate-slideDown"
                >
                  Continue
                </button>
              </form>
            )}

            {/* Preparing */}
            {downloading && (
              <div className="flex flex-col items-center py-8">
                <Loader2
                  size={28}
                  className="animate-spin text-green-500 mb-2"
                />
                <p className="text-gray-700">Preparing your file...</p>
              </div>
            )}

            {/* Ready */}

            {fileReady && !showPayment && !finalDownload && (
              <div className="text-center">
                <div className="text-green-700 mb-3 font-bold italic">
                  {selectedType === "certificate"
                    ? `${`Your Certificate is ready`} ✅ `
                    : `${`Your File is ready`} ✅`}
                  {selectedType === "certificate" ? (
                    <p className=" italic text-green-700 mb-1 text-sm font-normal">
                      Other basic information is added !{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  onClick={triggerFakeFileDownload}
                  className="flex items-center font-semibold gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg mx-auto cursor-pointer"
                >
                  <Download size={18} /> Download Now
                </button>
              </div>
            )}

            {/* Downloading */}
            {finalDownload && (
              <div className="flex flex-col items-center py-6">
                <Loader2
                  size={28}
                  className="animate-spin text-green-500 mb-2"
                />
                <p className="text-gray-700">Downloading file...</p>
              </div>
            )}

            {/* Payment */}
            {showPayment && (
              <div className="text-center mt-6">
                <p className="text-red-700 font-medium mb-5">
                  ❌ Oops! Your download was interrupted. It seems you haven't
                  paid for your certificate.
                  <p className="text-sm italic mt-2 text-black">
                    Downloads are only enabled for users who have paid for their
                    certificate.
                  </p>
                </p>
                <button
                  onClick={handlePaystackPayment}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg animate-boun cursor-pointer"
                >
                  Pay Now 💳
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
