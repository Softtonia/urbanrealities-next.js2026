"use client";

import { PostPropertyProvider } from "./context/PostPropertyContext";
export default function PostPropertyLayout({ children }) {
    console.log("PostPropertyLayout mounted");
  return (
    <PostPropertyProvider>
      {children}
    </PostPropertyProvider>
  );
}
