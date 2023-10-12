import React, { useState, useEffect } from "react";

function Home({ activeUser }) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 11) {
      setGreeting("Chào buổi sáng");
    } else if (currentHour >= 11 && currentHour < 13) {
      setGreeting("Chào buổi trưa");
    } else if (currentHour >= 13 && currentHour < 18) {
      setGreeting("Chào buổi chiều");
    } else {
      setGreeting("Chào buổi tối");
    }
  }, []);

  return (
    <div
      className="text-center vh-100"
      style={{
        backgroundImage: `url(${require("../../assets/images/pm-bg.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <h1
        className="text-secondary py-5 px-3 fw-bold"
        style={{ fontFamily: "Alfa Slab One", letterSpacing: "5px" }}
      >
        PROJECT MANAGEMENT APP
      </h1>
      <h5 className="fw-semibold">
        {greeting}, {activeUser}!
      </h5>
    </div>
  );
}

export default Home;
