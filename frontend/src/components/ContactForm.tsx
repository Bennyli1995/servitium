import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface FormData {
  toEmail: string;
  subject: string;
  body: string;
}

interface LocationState {
  email: string;
}

const ContactForm = () => {
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
  });
  const location = useLocation<LocationState>();
  const [emailData, setEmailData] = useState<FormData>({
    toEmail: location.state?.email || "",
    subject: "",
    body: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:5001/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then(() => {
        setNotification({
          message: "Email sent successfully!",
          isVisible: true,
        });
        setEmailData({
          toEmail: "",
          subject: "",
          body: "",
        });

        setTimeout(() => {
          setNotification({ ...notification, isVisible: false }); // Hide notification
        }, 2000); // 2 seconds delay
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto my-8 p-6 max-w-md bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="toEmail"
          >
            To Email
          </label>
          <input
            type="email"
            id="toEmail"
            name="toEmail"
            value={emailData.toEmail}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="body"
          >
            Message
          </label>
          <textarea
            id="body"
            name="body"
            value={emailData.body}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Email
          </button>
        </div>
        {notification.isVisible && (
          <div
            className="mt-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            {notification.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
