import React from "react";

const materials = [
  // {
  //   name: "Primer",
  //   description: "Used as the first coat to prepare surfaces before painting.",
  //   image: "https://via.placeholder.com/300x200?text=Primer",
  // },
  {
    name: "Paint Brush",
    description: "High-quality brush for smooth and even application.",
    image: "ImageFolder/brush2.jpg",
  },
  {
    name: "Roller",
    description: "Perfect for large wall areas, ensuring even coverage.",
    image: "ImageFolder/Facebook.jpg",
  },
  // {
  //   name: "Thinner",
  //   description: "Used to dilute paint and clean brushes after use.",
  //   image: "https://via.placeholder.com/300x200?text=Thinner",
  // },
  {
    name: "Masking Tape",
    description: "Helps achieve clean paint lines without bleeding.",
    image: "ImageFolder/tape.jpg",
  },
  {
    name: "Sandpaper",
    description: "Smoothens surfaces before applying primer or paint.",
    image: "ImageFolder/sand2.jpg",
  },
];

const PaintMaterials = () => {
  return (
    <section className="py-16 bg-gray-50" id="paint-materials">
      <h2 className="text-3xl font-bold text-center mb-10">Paint Materials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {materials.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex 
            flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className=" w-full h-80 object-cover rounded-md mb-4 "
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 flex-grow">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaintMaterials;
