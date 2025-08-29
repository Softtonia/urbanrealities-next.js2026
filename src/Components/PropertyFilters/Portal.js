"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }) {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    const node = document.createElement("div");
    node.id = "portal-root";
    document.body.appendChild(node);
    setPortalNode(node);

    return () => {
      document.body.removeChild(node);
    };
  }, []);

  if (!portalNode) return null;

  return createPortal(children, portalNode);
}