"use client";
import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have an API endpoint for handling form submissions
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Form submitted successfully!");
      // You can reset the form or perform other actions here
    } else {
      console.error("Failed to submit form.");
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>

        <TextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Message"
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      <Typography>or email us at curatrs@gmail.com</Typography>
    </Container>
  );
};

export default ContactForm;
