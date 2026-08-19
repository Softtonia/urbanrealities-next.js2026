import React from 'react';
import TestimonialsSection from './components/TestimonialsSection';
import { getssr } from '@/lib/api';
const fetchReviews = async () => {
  try {
    const response = await getssr(`api/get-client-review`);
    const data = response?.data;
    console.log("=>", data)

    if (data) return data;
    return [];
  } catch (error) {
    console.error("Error fetching reviews", error);
    return [];
  }
};
const TestimonialsPage = async() => {
  const reviews = await fetchReviews()
  return (
    <div>
      <TestimonialsSection reviews={reviews} />
    </div>
  );
}

export default TestimonialsPage;
