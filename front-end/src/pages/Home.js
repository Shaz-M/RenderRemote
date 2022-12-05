import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assests/chick-black-white.jpg";
import "../styles/Home.css";
import GoogleTranslate from "../components/GoogleTranslate";
import { useEffect,useState} from "react";

function Home() {

  let count = 0;

  const googleTranslateElementInit = () => {
    if(count === 0){
      console.log("HERE");
      new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
    }
    count++;
   }
   
   useEffect(() => {
     var addScript = document.createElement('script');
     addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
     document.body.appendChild(addScript);
     window.googleTranslateElementInit = googleTranslateElementInit;
   }, [])
  
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Chick-fil-a </h1>
        {/* <p> YASS</p> */}
        <Link to="/menu">
          <button> ORDER NOW </button>
        </Link>
        <div id="google_translate_element"></div>

      </div>
    </div>
  );
}

export default Home;