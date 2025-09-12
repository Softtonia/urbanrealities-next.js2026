export const slugify = (text) =>
text
  .toString()
  .toLowerCase()
  .trim()
  .replace(/&/g, "__and__")   
  .replace(/\//g, "__slash__")
  .replace(/[\s\W-]+/g, "-")   // replace spaces & special chars with "-"
  .replace(/^-+|-+$/g, "");    // remove leading/trailing "-"

  export const deslugify = (slug) => {
    if (!slug) return "";
  
    // remove the trailing "-id" (number or alphanumeric)
    const cleaned = slug.replace(/[-_](\w+)$/, "");
  
    return cleaned
      .toString()
      .replace(/__and__/g, "&") 
      // decode back "__slash__" into "/"
      .replace(/__slash__/g, "/")
      // replace "-" with space
      .replace(/-/g, " ")
      // capitalize words
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };
  
// ✅ New: Extract the ID (last segment after "-" or last "/")
export const extractIdFromSlug = (slug) => {
if (!slug) return null;
const parts = slug.split("-");
return parts[parts.length - 1]; // get last piece
};

