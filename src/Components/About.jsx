import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 bg-cover bg-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">About Us</h2>
        <p className="text-lg md:text-xl leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-yellow-400">Paint Academy</span>,
          your trusted platform for learning everything about paint production,
          chemicals, and applications.
          <br />
          <br />
          Our mission is to empower individuals and businesses with the right
          knowledge to create high-quality, durable, and beautiful paints.
          <br />
          <br />
          Whether you are a beginner experimenting with paint types or a
          professional looking to sharpen your skills, Paint Academy provides
          the resources and step-by-step guides you need.
        </p>
      </div>
    </section>
  );
};

export default About;
