// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Snackbar, Alert } from "@mui/material";
import { sendFeedback } from "../utils/sendFeedback";

const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const success = await sendFeedback(feedback, setSnackbar);

    if (success) {
      setFeedback(""); // Kosongkan form setelah feedback berhasil dikirim
    }
    setLoading(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <footer className="bg-zinc-900 text-white py-6 w-full">
      <div className="container mx-auto text-center flex flex-col-reverse md:flex-row items-center md:justify-between px-4">
        <div className="mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
          <p className="mt-3 mb-2 text-sm">
            <span onClick={() => (window.location.href = "/login")}>
              &copy;
            </span>{" "}
            2025 Irsyan Ramadhan. Made with ❤️.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://github.com/Irsyan12"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/irsyanramadhan/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://instagram.com/irsan.rmd_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-auto flex flex-row items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Enter feedback..."
            className="px-4 py-2 w-full md:w-64 text-white rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-gray-500 md:mb-0"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            type="submit"
            className={`${
              loading ? "bg-opacity-70" : ""
            } md:ml-2 bg-color1 hover:bg-opacity-90 text-black px-4 py-2 rounded-md md:w-auto flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-t-2 border-t-transparent border-black rounded-full animate-spin"></span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </footer>
  );
};

export default Footer;
