"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./AgentCard.module.css";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


export default function AgentCard({ agent }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, message } = formData;

    // Simple validation
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Phone is required";
    if (!message) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/agent/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, agentId: agent.id })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Submission failed");

      // Optional: show success message, reset form
      alert("Request sent successfully!");
      setFormData({ name: "", phone: "", message: "" });
      handleClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.topBadge}>Top Agent</div>

      <div className={styles.leftSection}>
        <Image
          src={
            agent.profile_photo
              ? agent.profile_photo
              : "https://images.unsplash.com/photo-1755398105124-6ab63def4afb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={agent.name || "Agent"}
          width={70}
          height={70}
          className={styles.profilePic}
        />
      </div>

      <div className="w-100">
        <h3 className={styles.name}>
          {agent.first_name} <span className={styles.company}>({agent.role_name})</span>
        </h3>

        <div className={` ${styles.middlesection} d-flex justify-content-between`}>
          <div className={styles.stats}>
            <div className={styles.agentstats}>
              <p className={styles.statsNumber}>{agent.rent || '15'}+</p>
              <p className="m-0"> Properties for rent</p>
            </div>
            <div className={` ${styles.agentstats} borderNone `}>
              <p className={styles.statsNumber}>{agent.sale || '40'}+</p>
              <p className="m-0">Properties for Sell</p>
            </div>
          </div>

          <div className={styles.rightSection}>
            <button onClick={handleShow} className={styles.callBtn}>
              Request a Call Back
            </button>
            <Link href={`/all-agent/${agent.id}`} className={styles.visitBtn}>
              Visit Property
            </Link>
          </div>
        </div>

        <div className={styles.locations}>
          Operates in
          <p className={styles.locationspara}>{agent.area_locality === 'N/A' ? 'not Specified' : agent.area_locality}</p>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact {agent.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
            </Form.Group>

            <button type="submit" className={`${styles.vygh} btn-AddTicket`} disabled={loading}>
              {loading ? "Sending..." : "Contact Agent"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div >
  );
}
