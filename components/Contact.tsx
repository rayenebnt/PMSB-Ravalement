import React from 'react';

export default function Contact() {
  return (
    <>
      <style>
        {`
        .contact-button {
          display: inline-block;
          padding: 10px 20px;
          color: #fff;
          background-color: #404040;
          border: 2px solid #77b5fe;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-button:hover {
          background-color: #77b5fe;
          color: #404040;
        }

        @media (max-width: 768px) {
          .contact-button {
            font-size: 14px;
            padding: 8px 16px;
          }
        }
        `}
      </style>
      <a
        id="contact-button"
        className="contact-button"
        href="#contact"
        target="_self"
      >
        Nous contacter
      </a>
    </>
  );
}
