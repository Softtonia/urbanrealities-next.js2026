"use client";

import ProtectedRoute from "@/Components/protectedRoute";
import { PostPropertyProvider } from "./context/PostPropertyContext";
import Loading from "./loading";

export default function PostPropertyLayout({ children }) {
  console.log("PostPropertyLayout mounted");
  return (
    <PostPropertyProvider>
      <ProtectedRoute fallback={<Loading />}>
        {children}
      </ProtectedRoute>
    </PostPropertyProvider>
  );
}
