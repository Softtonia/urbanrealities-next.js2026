"use client";

import ProtectedRoute from "@/Components/protectedRoute";
import { PostPropertyProvider } from "./context/PostPropertyContext";
import Loading from "./loading";

import { Suspense } from "react";

export default function PostPropertyLayout({ children }) {
  console.log("PostPropertyLayout mounted");
  return (
    <Suspense fallback={<Loading />}>
      <PostPropertyProvider>
        <ProtectedRoute fallback={<Loading />}>
          {children}
        </ProtectedRoute>
      </PostPropertyProvider>
    </Suspense>
  );
}
