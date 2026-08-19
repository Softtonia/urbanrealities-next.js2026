"'use client';";

import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialsSection.module.css"; // Import the CSS module
import CompanyBg from "../../components/company-bg/company-bg";

const testimonialsData = [
  // This data remains the same as in the previous example.
  // ... (all your testimonial objects)
  {
    id: 1,
    avatarSrc: "/ownerproperties4.png", // Paths are relative to the public folder
    name: "Hem Batra",
    location: "Delhi",
    rating: 5,
    text: "Magicbricks.com and I started in the Real Estate business at almost the same time. This web portal just provided the best platform I needed to make a launch. After 5 year, I have a l...",
  },
  {
    id: 2,
    avatarSrc: "/ownerproperties4.png",
    name: "Dalip Singh",
    location: "Kolkata",
    rating: 5,
    text: "It is with great pleasure that I am writing this letter to endorse MagicBricks.com. If you want a wide reach and top notch service, make MagicBricks your first choice. Their rates ar...",
  },
  {
    id: 3,
    avatarSrc: "/ownerproperties4.png",
    name: "Shri Ram",
    location: "Pune",
    rating: 5,
    text: "I really love this website. It has been a long time since I am using this website, which gives me all the information which one needs for a property, like email, SMS, and property ra...",
  },
  {
    id: 4,
    avatarSrc: "/ownerproperties4.png",
    name: "Vijay S. Mahadik",
    location: "Mumbai",
    rating: 5,
    text: "My Success Story: I am a lower category man, working in a private co. staying in a joint family in Mumbai. My parents withdrew me & my family from their house. I didn't have too muc...",
  },
  {
    id: 5,
    avatarSrc: "/ownerproperties4.png",
    name: "Shishir Gupta",
    location: "New Delhi",
    rating: 5,
    text: "Three years ago, I was searching for a flat to live in, having Rs 10 lakhs of savings in hand. I was worried about how I would find a property in Delhi/NCR. My wedding date was nearl...",
  },
  {
    id: 6,
    avatarSrc: "/ownerproperties4.png",
    name: "Milind Madhukar Pansare",
    location: "Kothrud, Pune",
    rating: 5,
    text: "I am really grateful to Magicbricks for the deal through them. The constant touch through other true calls really surprised me. This is my second deal. They sent their officer to get...",
  },
  {
    id: 7,
    avatarSrc: "/ownerproperties4.png",
    name: "Sumeet Sawlani",
    location: "Bhopal",
    rating: 5,
    text: "Our group has reached a huge number of people throughout the country through Magicbricks. The response is tremendous and we are glad to be a part of your website. Thank you. Keep up...",
  },
  {
    id: 8,
    avatarSrc: "/ownerproperties4.png",
    name: "Rumpa Dutta",
    location: "Delhi",
    rating: 5,
    text: "Magicbricks.com comes across as one of the most organised & informative websites in the country for real estate news, views, trends & much more. Personally I found a rented house wit...",
  },
  {
    id: 9,
    avatarSrc: "/ownerproperties4.png",
    name: "Milind Desai",
    location: "Ahmedabad",
    rating: 5,
    text: "I have been using Magicbricks.com as an individual since its launch, and as a real estate professional since a few years. It has helped give sound advice to aspiring property buyers...",
  },
  {
    id: 10,
    avatarSrc: "/ownerproperties4.png",
    name: "Ravindra Chavan",
    location: "Pune",
    rating: 5,
    text: "Excellent Portal and very good quality service. Magicbricks is providing great service to everyone looking for real estate. Anyone can easily find the property of their choice. Six m...",
  },
];

const TestimonialsSection = ({ reviews }) => {
  return (
    <section className={styles["testimonials-section"]}>
      {" "}
      {/* Use styles.className */}
      <div className={styles["section-header"]}>
        <CompanyBg />
        <h2>Customer Stories</h2>
      </div>
      <div className={styles["testimonials-content"]}>
        <div className={styles["testimonials-grid"]}>
          {(!reviews || reviews.length === 0 ? testimonialsData : reviews).map(
            (testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                avatarSrc={testimonial.client_photo || testimonial.avatarSrc}
                name={testimonial.title || testimonial.name}
                location={testimonial.short_description || testimonial.location}
                rating={testimonial.rating}
                text={testimonial.review || testimonial.text}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
