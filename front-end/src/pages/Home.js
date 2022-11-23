import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assests/chick-black-white.jpg";
import "../styles/Home.css";
import GoogleTranslate from "../components/GoogleTranslate";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Chick-fil-a </h1>
        {/* <p> YASS</p> */}
        <Link to="/menu">
          <button> ORDER NOW </button>
        </Link>
        <GoogleTranslate/>

      </div>
    </div>
  );
}

export default Home;