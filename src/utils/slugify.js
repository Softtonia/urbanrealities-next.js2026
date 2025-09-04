// utils/slugify.js
export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    // encode "/" before replacing other chars
    .replace(/\//g, "__slash__")
    .replace(/[\s\W-]+/g, "-")   // replace spaces & special chars with "-"
    .replace(/^-+|-+$/g, "");    // remove leading/trailing "-"

export const deslugify = (slug) =>
  slug
    .toString()
    // decode back "__slash__" into "/"
    .replace(/__slash__/g, "/")
    // replace "-" with space
    .replace(/-/g, " ")
    // capitalize words
    .replace(/\b\w/g, (c) => c.toUpperCase());
