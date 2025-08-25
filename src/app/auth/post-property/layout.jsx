"use client";

import ProtectedRoute from "@/Components/protectedRoute";
import { PostPropertyProvider } from "./context/PostPropertyContext";
export default function PostPropertyLayout({ children }) {
  console.log("PostPropertyLayout mounted");
  return (

    <PostPropertyProvider>
      <ProtectedRoute>/
        {children}
      </ProtectedRoute>
    </PostPropertyProvider>

  );
}
