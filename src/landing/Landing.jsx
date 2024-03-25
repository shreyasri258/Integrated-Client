import React from "react";
import Navbar from "../components/navbar/Navbar";
import "./landing.css";
import Devtool from "../images/devtool.jpg";
import FaceVerification from "../images/face-verification.png";
import FullScreen from "../images/full-screen.jpeg";
import MultipleFaces from "../images/multiple-face.png";
import MultipleTabs from "../images/multiple-tabs.jpg";
import Footer from "../components/LandingFooter/Footer.jsx";
import infinite from "../assets/infinite.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleClick=()=>{
    navigate("/role-selection");
  }
  return (
    <React.Fragment>
      <Navbar />

      <div className="section-type landing-page">
        <div className="landing-content">
          <div className="headings">
            <span className="sub-text">ProctorPal</span>
            <span className="main-heading gradient-text">
              Smart Examination Proctoring System
            </span>
          </div>

          <p className="desc">
            A straightforward framework built for online proctoring to create
            online tests within minutes, <i>effortlessly</i>.
            <Button 
            variant="contained" 
            color="primary" 
            onClick={handleClick}
            style={{marginTop:"60px"}}>Get Started<KeyboardDoubleArrowRightIcon /></Button>
          </p>
        </div>

        <div className="features-content">
          <div className="curr-heading">
            <p className="gradient-text">
              <b>Powerful</b> & Lightweight
            </p>
            <h2 className="title-heading">Features</h2>
          </div>

          <div className="carousel-container">
            <Slider {...settings}>
              {[
                { image: Devtool, text: "Devtools Check" },
                { image: FaceVerification, text: "Face Verification" },
                { image: FullScreen, text: "Full Screen Check" },
                { image: MultipleFaces, text: "Multiple People Detection" },
                { image: MultipleTabs, text: "Multiple Tabs Check" },
              ].map((item, index) => (
                <div key={index} className="single-feature">
                  <img src={item.image} alt={`Feature ${index}`} />
                  <p className="image-text">{item.text}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="final-features">
          <div className="top-sec">
            <div className="left-text">
              <h3 className="gradient-text">Effortlessly integrates with</h3>
              <h1 className="title-heading">
                Creates Customized Exams
              </h1>
            </div>
            <div className="infinite">
              <img src={infinite} alt="infinite" />
            </div>

            <div className="right-text">
              <h3 className="gradient-text">The best part?</h3>
              <h1 className="title-heading">Live Status on Admin Dashboard</h1>
            </div>
          </div>

          <div className="mid-cta final-cta">
            <p className="phew">
              And it’s <b>free</b>.
              <br />
              What are you waiting for?
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Landing;
