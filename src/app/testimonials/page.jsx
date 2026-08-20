import React from 'react';
import TestimonialsSection from './components/TestimonialsSection';
import { getssr } from '@/lib/api';
const fetchReviews = async () => {
  try {
    const response = await getssr(`/api/frontend/client-reviews?limit=6`);
    
    // Handle both direct array and paginated response structures
    let data = response?.data;
    if (data?.data) {
      data = data.data;
    }
    
    console.log("=>", data)

    if (Array.isArray(data)) return data;
    return [];
  } catch (error) {
    console.error("Error fetching reviews", error);
    return [];
  }
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const TestimonialsPage = async() => {
  const reviews = await fetchReviews()
  return (
    <div>
      <TestimonialsSection reviews={reviews} />
    </div>
  );
}

export default TestimonialsPage;
