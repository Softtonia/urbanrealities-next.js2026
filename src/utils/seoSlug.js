// /utils/seoSlug.js

// 1) Label <-> slug mappings (extend as needed)
export const mappings = {
  popularChoices: {
    "Ready to Move": "ready-to-move",
    "Owner Properties": "owner-properties",
    "Budget Homes": "budget-homes",
    "Premium Homes": "premium-homes",
    "New Projects": "new-projects",
  },
  propertyTypes: {
    "Flats in Bangalore": "flats-in-bangalore",
    "House for Sale": "house-for-sale",
    "Villa in Bangalore": "villa-in-bangalore",
    "Plot in Bangalore": "plot-in-bangalore",
    "Office Space": "office-space",
  },
  budget: {
    "Under ₹ 50 Lac": "under-50-lac",
    "₹ 50 Lac - ₹ 1 Cr": "50-lac-to-1-cr",
    "₹ 1 Cr - ₹ 1.5 Cr": "1-cr-to-1-5-cr",
    "Above ₹ 1.5 Cr": "above-1-5-cr",
  },
  // optional: cities (if you want free-form, skip this and accept any city)
  cities: ["delhi", "bangalore", "mumbai", "pune", "hyderabad"],
};

// 2) Budget slug -> numeric range (₹)
export const budgetRanges = {
  "under-50-lac": { min: 0, max: 50_00_000 },
  "50-lac-to-1-cr": { min: 50_00_000, max: 1_00_00_000 },
  "1-cr-to-1-5-cr": { min: 1_00_00_000, max: 1_50_00_000 },
  "above-1-5-cr": { min: 1_50_00_000, max: Infinity },
};

// 3) Build a slug from selected filters
// filters = { popularChoice, propertyType, city, budget }
export function buildSlug(filters = {}) {
  const parts = [];

  if (filters.popularChoice) {
    const s = mappings.popularChoices[filters.popularChoice];
    if (s) parts.push(s);
  }

  if (filters.propertyType) {
    const s = mappings.propertyTypes[filters.propertyType];
    if (s) parts.push(s);
  }

  if (filters.city) {
    parts.push(`in-${slugify(filters.city)}`);
  }

  if (filters.budget) {
    const s = mappings.budget[filters.budget];
    if (s) parts.push(s);
  }

  // suffix like magicbricks
  return `${parts.filter(Boolean).join("-")}-pppf`;
}

// 4) Parse a slug back to filters usable in UI/API
export function parseSlug(slug = "") {
  const clean = slug.replace(/^-+|-+$/g, "").replace(/-pppf$/i, "");
  const tokens = clean.split("-");

  const filters = {
    popularChoice: null,
    propertyType: null,
    city: null,
    budget: null,
    priceMin: null,
    priceMax: null,
  };

  // Try to match whole phrases from mappings by scanning tokens
  const tokenStr = tokens.join("-");

  // popular choice
  for (const [label, val] of Object.entries(mappings.popularChoices)) {
    if (tokenStr.includes(val)) {
      filters.popularChoice = label;
      break;
    }
  }

  // property type
  for (const [label, val] of Object.entries(mappings.propertyTypes)) {
    if (tokenStr.includes(val)) {
      filters.propertyType = label;
      break;
    }
  }

  // budget
  for (const [label, val] of Object.entries(mappings.budget)) {
    if (tokenStr.includes(val)) {
      filters.budget = label;
      const range = budgetRanges[val];
      if (range) {
        filters.priceMin = range.min;
        filters.priceMax = range.max === Infinity ? null : range.max;
      }
      break;
    }
  }

  // city: look for "in-<city>"
//   const inIdx = tokens.findIndex((t) => t === "in");
//   if (inIdx !== -1 && tokens[inIdx + 1]) {
//     const citySlug = tokens[inIdx + 1];
//     filters.city = deslugify(citySlug);
//   } else {
//     // also support single token like "in-delhi"
//     const match = tokenStr.match(/in-([a-z-]+)/i);
//     if (match?.[1]) filters.city = deslugify(match[1]);
//   }


// city: match from mappings.cities
for (const city of mappings.cities) {
  if (tokenStr.includes(`in-${city}`)) {
    filters.city = deslugify(city);
    break;
  }
}
  return filters;
}

// helpers
function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/₹/g, "inr")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
function deslugify(s) {
  return s.replace(/-/g, " ").replace(/\binr\b/g, "₹").replace(/\b\w/g, (m) => m.toUpperCase());
}
