import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-7 mt-auto">
        <p className="text-sm items-center text-center justify-center">
          © {new Date().getFullYear()} SmartEvent. All rights reserved.
        </p>
    </footer>
  );
};

export default Footer;
