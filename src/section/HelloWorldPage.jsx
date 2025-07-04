// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // Added useState
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import TypeWriter from "../components/TypeWriter";
import OptimizedProfileImage from "../components/OptimizedProfileImage";
import { Snackbar, Alert } from "@mui/material"; // Added Snackbar and Alert
import TiltedCard from "../components/TiltedCard"; // Assuming TiltedCard is a custom component

function HelloWorldPage() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleDownloadCVClick = () => {
    setSnackbar({
      open: true,
      message: "CV is not available at the moment. Please check back later!",
      severity: "info",
    });
    setTimeout(() => {
      setSnackbar({ ...snackbar, open: false });
    }, 3000);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <div
        className="w-11/12 pt-20 md:pt-24 min-h-screen mx-auto text-white bg-dark"
        id="home"
      >
        <div className="md:w-5/6 mx-auto ">
          <div className="flex flex-col md:flex-row justify-between items-center pt-16 md:pt-32">
            {/* Left side content */}
            <div
              className="space-y-3 md:w-1/2 text-center md:text-left cursor-default"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <p className="text-md md:text-lg text-color1">Hello World, I'm</p>
              <h1
                className="text-2xl md:text-6xl font-bold text-color1"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                Irsyan Ramadhan
              </h1>
              <div data-aos="fade-up" data-aos-delay="200">
                <TypeWriter />
              </div>
              <p
                className="text-md md:text-lg"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Welcome to my personal website{" "}
                <span className="inline-block animate-wave">👋</span>
              </p>
              <div data-aos="zoom-in" data-aos-delay="500">
                <button
                  onClick={handleDownloadCVClick}
                  className="bg-color1 cursor-pointer text-black px-6 py-3 rounded-md hover:bg-opacity-90 hover:shadow-primary/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                >
                  Download CV
                </button>
              </div>
            </div>

            {/* Right side content */}
            <div
              className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div className="relative ms-auto">
                <TiltedCard
                  containerWidth="300px"
                  containerHeight="300px"
                  rotateAmplitude={12}
                  scaleOnHover={1}
                >
                  <OptimizedProfileImage />
                </TiltedCard>

                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-4">
                    <a
                      className="bg-white p-2 rounded-full text-black hover:bg-color1 transition-colors"
                      href="mailto:irsyanramadhan72@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-aos="fade-up"
                      data-aos-delay="800"
                    >
                      <FaEnvelope size={20} />
                    </a>
                    <a
                      href="https://github.com/Irsyan12"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-2 rounded-full text-black hover:bg-color1 transition-colors"
                      data-aos="fade-up"
                      data-aos-delay="700"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="https://instagram.com/irsan.rmd_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-2 rounded-full text-black hover:bg-color1 transition-colors"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/irsyanramadhan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-2 rounded-full text-black hover:bg-color1 transition-colors"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default HelloWorldPage;
