// import React, { useState } from "react";
// import { X, Loader2, Download } from "lucide-react";

// const videos = [
//   {
//     title: "Colour Matching A-Z",
//     url: "mov_bbb.mp4",
//   },
//   {
//     title: "Using Colour Charts & Codes",
//     url: "portfolio.mp4",
//   },
//   {
//     title: "Identifying Paint Chemicals",
//     url: "https://www.youtube.com/embed/tgbNymZ7vqY",
//   },
// ];

// // Load Paystack script dynamically
// const loadPaystackScript = () => {
//   return new Promise((resolve, reject) => {
//     if (window.PaystackPop) return resolve(true);
//     const script = document.createElement("script");
//     script.src = "https://js.paystack.co/v1/inline.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => reject(false);
//     document.body.appendChild(script);
//   });
// };

// const handleClose = () => {
//   alert("Payment window closed");
// };

// const handleSuccess = (response) => {
//   console.log("Payment successful:", response);
//   alert("✅ Payment successful! You can now play videos.");
// };

// const handlePaystackPayment = async (onSuccess) => {
//   const scriptLoaded = await loadPaystackScript();
//   if (!scriptLoaded) return alert("Failed to load payment page");

//   const handler = window.PaystackPop.setup({
//     key: "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b", // Replace with your Paystack public key
//     email: "user@example.com",
//     amount: 300000, // in kobo
//     currency: "NGN",
//     ref: "PS_" + Math.floor(Math.random() * 1000000000 + 1),
//     callback: (response) => {
//       handleSuccess(response);
//       if (onSuccess) onSuccess();
//     },
//     onClose: handleClose,
//   });

//   handler.openIframe();
// };

// const AllInOneVideos = () => {
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [readyToDownload, setReadyToDownload] = useState(false);
//   const [fetching, setFetching] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);
//   const [isPaid, setIsPaid] = useState(false);
//   const [tooltip, setTooltip] = useState(null);

//   const openPanel = (video) => {
//     setActiveVideo(video);
//     setLoading(true);
//     setReadyToDownload(false);
//     setShowPayment(false);
//     setFetching(false);

//     // Simulate processing
//     setTimeout(() => {
//       setLoading(false);
//       setReadyToDownload(true);
//     }, 3000);
//   };

//   const closePanel = () => {
//     setActiveVideo(null);
//     setLoading(false);
//     setReadyToDownload(false);
//     setFetching(false);
//     setShowPayment(false);
//   };

//   // Simulate fake download
//   const simulateDownload = () => {
//     // create a fake blob video
//     const blob = new Blob(
//       [
//         "This is a restricted video file content. Pay for your certificate to get links to access the real ones.",
//       ],
//       {
//         type: "video/mp4",
//       }
//     );
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${activeVideo.title}_video_Tutorial.mp4`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <section className="py-24 bg-white" id="all-in-one-videos">
//       <h2 className="text-3xl font-bold text-center mb-8">All-in-1 Videos</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
//         {videos.map((video, i) => (
//           <div
//             key={i}
//             className="bg-gray-100 shadow-md rounded-lg p-4 relative"
//           >
//             <h3 className="font-semibold mb-2">{video.title}</h3>

//             <div className="relative w-full h-48 mb-3">
//               <iframe
//                 className={`w-full h-full rounded ${
//                   isPaid ? "pointer-events-auto" : "pointer-events-none"
//                 }`}
//                 src={
//                   isPaid
//                     ? `${video.url}?controls=1&modestbranding=1`
//                     : `${video.url}?controls=0&modestbranding=1&disablekb=1`
//                 }
//                 title={video.title}
//                 allowFullScreen={isPaid}
//               ></iframe>

//               {!isPaid && (
//                 <div
//                   onClick={() => setTooltip(i)}
//                   className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center text-sm px-4 cursor-pointer rounded"
//                 ></div>
//               )}

//               {tooltip === i && !isPaid && (
//                 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-2 rounded shadow-lg animate-fadeIn">
//                   ❌ You cannot play this video automatically. <br />
//                   Click the <span className="font-bold">"Download"</span> button
//                   below it to continue.
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={() => openPanel(video)}
//               className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition cursor-pointer"
//             >
//               <Download size={16} /> {isPaid ? "Re-Download" : "Download"}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Panel */}
//       {activeVideo && (
//         <div className="fixed inset-0 bg-yellow-500 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative animate-slideUp">
//             <button
//               onClick={closePanel}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//             >
//               <X size={20} className="text-red-900 hover:bg-gray-200" />
//             </button>

//             <h3 className="text-xl font-bold text-gray-800 mb-4">
//               {activeVideo.title} - Download
//             </h3>

//             {loading && (
//               <div className="flex flex-col items-center justify-center">
//                 <Loader2 className="animate-spin text-yellow-500" size={40} />
//                 <p className="text-gray-600 mt-1">
//                   Processing your video file...
//                 </p>
//               </div>
//             )}

//             {readyToDownload && !fetching && !showPayment && (
//               <div className="text-center">
//                 <p className="text-green-700  mb-6 font-semibold italic">
//                   Your video is ready ✅
//                 </p>
//                 <button
//                   onClick={() => {
//                     setReadyToDownload(false);
//                     setFetching(true);
//                     // simulate fetching, then download file, then show payment
//                     setTimeout(() => {
//                       simulateDownload(); // actual fake download
//                       setFetching(false);
//                       setShowPayment(true);
//                     }, 3000);
//                   }}
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold cursor-pointer"
//                 >
//                   Download Now
//                 </button>
//               </div>
//             )}

//             {fetching && (
//               <div className="flex flex-col items-center justify-center py-6">
//                 <Loader2
//                   className="animate-spin text-green-600 mt-1"
//                   size={40}
//                 />
//                 <p className="text-gray-600 mt-3">Downloading video...</p>
//               </div>
//             )}

//             {showPayment && (
//               <div className="text-center">
//                 {!isPaid ? (
//                   <>
//                     <p className="text-red-800 font-medium mb-6">
//                       ❌ Oops! Your download was disabled. Please pay for your
//                       certificate to enable it.
//                     </p>
//                     <button
//                       onClick={() =>
//                         handlePaystackPayment(() => setIsPaid(true))
//                       }
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold cursor-pointer"
//                     >
//                       Pay Now 💳
//                     </button>
//                   </>
//                 ) : (
//                   <p className="text-green-600 font-medium">
//                     ✅ Payment complete! You can now watch videos.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

import React, { useState } from "react";
import { X, Loader2, Download } from "lucide-react";

const videos = [
  { title: "Colour Matching A-Z", url: "mov_bbb.mp4" },
  {
    title: "Quick Formula to get any colour",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  { title: "How to use Colour Charts & Codes", url: "portfolio.mp4" },
  {
    title: "How to start paint business",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    title: "How to market your paint",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },

  {
    title: "How to 10x your profit in paint business",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
];

// Load Paystack script dynamically
const loadPaystackScript = () => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.appendChild(script);
  });
};

const handleClose = () => {
  alert("Payment window closed");
};

const handleSuccess = (response) => {
  console.log("Payment successful:", response);
  alert("✅ Payment successful! You can now play videos.");
};

const handlePaystackPayment = async (onSuccess) => {
  const scriptLoaded = await loadPaystackScript();
  if (!scriptLoaded) return alert("Failed to load payment page");

  const handler = window.PaystackPop.setup({
    key: "pk_live_f1cd72816e1e7939f2026803b200eb1f6ac00c1b", // Replace with your Paystack public key
    email: "user@example.com",
    amount: 300000, // in kobo
    currency: "NGN",
    ref: "PS_" + Math.floor(Math.random() * 1000000000 + 1),
    callback: (response) => {
      handleSuccess(response);
      if (onSuccess) onSuccess();
    },
    onClose: handleClose,
  });

  handler.openIframe();
};

const AllInOneVideos = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [readyToDownload, setReadyToDownload] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [sending, setSending] = useState(false);

  const openPanel = (video) => {
    setActiveVideo(video);
    setLoading(true);
    setReadyToDownload(false);
    setShowPayment(false);
    setFetching(false);
    setSending(false);

    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      setReadyToDownload(true);
    }, 3000);
  };

  const closePanel = () => {
    setActiveVideo(null);
    setLoading(false);
    setReadyToDownload(false);
    setFetching(false);
    setShowPayment(false);
    setSending(false);
  };

  // Simulate fake download
  const simulateDownload = () => {
    const blob = new Blob(
      [
        "This is a restricted video file content. Pay for your certificate to get links to access the real ones.",
      ],
      { type: "video/mp4" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeVideo.title}_video_Tutorial.mp4`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-24 bg-white" id="all-in-one-videos">
      <h2 className="text-3xl font-bold text-center mb-8">All-in-1 Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {videos.map((video, i) => (
          <div
            key={i}
            className="bg-gray-100 shadow-md rounded-lg p-4 relative hover:scale-105 transition"
          >
            <h3 className="font-semibold mb-2">{video.title}</h3>

            <div className="relative w-full h-48 mb-3">
              <iframe
                className={`w-full h-full rounded ${
                  isPaid ? "pointer-events-auto" : "pointer-events-none"
                }`}
                src={
                  isPaid
                    ? `${video.url}?controls=1&modestbranding=1`
                    : `${video.url}?controls=0&modestbranding=1&disablekb=1`
                }
                title={video.title}
                allowFullScreen={isPaid}
              ></iframe>

              {!isPaid && (
                <div
                  onClick={() => setTooltip(i)}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center text-sm px-4 cursor-pointer rounded"
                ></div>
              )}

              {tooltip === i && !isPaid && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-2 rounded shadow-lg animate-fadeIn">
                  ❌ You cannot play this video automatically. <br />
                  Click the <span className="font-bold">"Download"</span> button
                  below it to continue.
                </div>
              )}
            </div>

            <button
              onClick={() => openPanel(video)}
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition cursor-pointer active:bg-yellow-400"
            >
              <Download size={16} /> {isPaid ? "Re-Download" : "Download"}
            </button>
          </div>
        ))}
      </div>

      {/* Panel */}
      {activeVideo && (
        <div className="fixed inset-0 bg-yellow-500 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative animate-slideUp">
            <button
              onClick={closePanel}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} className="text-red-900 hover:bg-gray-200" />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {activeVideo.title} - Download
            </h3>

            {loading && (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-yellow-500" size={40} />
                <p className="text-gray-600 mt-1">
                  Processing your video file...
                </p>
              </div>
            )}

            {readyToDownload && !fetching && !showPayment && !sending && (
              <div className="text-center">
                <p className="text-green-700 mb-6 font-semibold italic">
                  Your video is ready ✅
                </p>
                <button
                  onClick={() => {
                    setReadyToDownload(false);
                    setSending(true);
                    // simulate sending message before actual download
                    setTimeout(() => {
                      setSending(false);
                      setFetching(true);
                      setTimeout(() => {
                        simulateDownload();
                        setFetching(false);
                        setShowPayment(true);
                      }, 2000);
                    }, 2000);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md font-semibold cursor-pointer active:bg-green-500"
                >
                  Download Now
                </button>
              </div>
            )}

            {sending && (
              <div className="flex flex-col items-center justify-center py-6">
                <Loader2
                  className="animate-spin text-green-600 mt-1"
                  size={40}
                />
                <p className="text-gray-600 mt-3">Sending your message...</p>
              </div>
            )}

            {fetching && (
              <div className="flex flex-col items-center justify-center py-6">
                <Loader2
                  className="animate-spin text-green-600 mt-1"
                  size={40}
                />
                <p className="text-gray-600 mt-3">Downloading video...</p>
              </div>
            )}

            {showPayment && (
              <div className="text-center">
                {!isPaid ? (
                  <>
                    <p className="text-red-800 font-medium mb-6">
                      ❌ Oops! Your download was disabled. Please pay for your
                      certificate to enable it.
                    </p>
                    <button
                      onClick={() =>
                        handlePaystackPayment(() => setIsPaid(true))
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold cursor-pointer"
                    >
                      Pay Now 💳
                    </button>
                  </>
                ) : (
                  <p className="text-green-600 font-medium">
                    ✅ Payment complete! You can now watch videos.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AllInOneVideos;

// export default AllInOneVideos;

// import React, { useState } from "react";

// const AllInOneVideos = ({ videos, isPaid }) => {
//   const [tooltip, setTooltip] = useState(null);

//   return (
//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {videos.map((video, i) => (
//         <div
//           key={i}
//           className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition relative"
//         >
//           <div className="relative w-full h-48 mb-3">
//             {video.url.includes("youtube.com") ? (
//               <iframe
//                 className={`w-full h-full rounded ${
//                   isPaid ? "pointer-events-auto" : "pointer-events-none"
//                 }`}
//                 src={
//                   isPaid
//                     ? `${video.url}?controls=1&modestbranding=1&autoplay=0`
//                     : `${video.url}?controls=0&modestbranding=1&disablekb=1&autoplay=0`
//                 }
//                 title={video.title}
//                 allowFullScreen={isPaid}
//               ></iframe>
//             ) : (
//               <video
//                 className="w-full h-full rounded"
//                 controls={isPaid}
//                 muted
//                 playsInline
//               >
//                 <source src={video.url} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             )}

//             {!isPaid && (
//               <div
//                 onClick={() => setTooltip(i)}
//                 className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center text-sm px-4 cursor-pointer rounded"
//               ></div>
//             )}
//           </div>

//           <h3 className="font-semibold text-lg text-gray-800">{video.title}</h3>
//           <p className="text-sm text-gray-500">{video.description}</p>

//           {/* Tooltip for locked content */}
//           {tooltip === i && !isPaid && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="bg-yellow-500 text-white px-4 py-2 rounded shadow">
//                 Please purchase to unlock this video
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllInOneVideos;
