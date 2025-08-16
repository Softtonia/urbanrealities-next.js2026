"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./AgentCard.module.css";
import Link from "next/link";
import { Modal, Button, Form } from "react-bootstrap";

export default function AgentCard({ agent }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.card}>
      <div className={styles.topBadge}>Top Agent</div>

      <div className={styles.leftSection}>
        <Image
          src={agent.image}
          alt={agent.name}
          width={70}
          height={70}
          className={styles.profilePic}
        />
      </div>
      <div className="w-100">
        <h3 className={styles.name}>
          {agent.name}
          <span className={styles.company}>({agent.company})</span>
        </h3>
        <div
          className={` ${styles.middlesection} d-flex justify-content-between`}
        >
          <div className={styles.stats}>
            <div className={styles.agentstats}>
              <p className={styles.statsNumber}>{agent.rent}+</p>
              <p className="m-0"> Properties for rent</p>
            </div>
            <div className={` ${styles.agentstats} borderNone `}>
              <p className={styles.statsNumber}>{agent.sale}+</p>
              <p className="m-0">Properties for Sell </p>
            </div>
            {/* <div className={` ${styles.agentstats} borderNone `}>
            <p className={styles.statsNumber}>
              {agent.deals}+ 
            </p>
            <p className="m-0">Deals Closed</p> 
            </div> */}
          </div>

          <div className={styles.rightSection}>
            <button onClick={handleShow} className={styles.callBtn}>
              Request a Call Back
            </button>
            <Link
              href="/all-agent/agent-profile-details"
              className={styles.visitBtn}
            >
              Visit Property
            </Link>
          </div>
        </div>

        <div className={styles.locations}>
          Operates in
          <p className={styles.locationspara}>{agent.locations}</p>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact {agent.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter your phone" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your message"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <button className={`${styles.vygh} btn-AddTicket `}>
            Contact Agent
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
