import React from "react";

// Utility function to safely truncate HTML text
function truncateText(htmlString, wordLimit = 20) {
    if (!htmlString) return "";
    // Strip HTML tags
    const plainText = htmlString.replace(/<[^>]+>/g, "");
    // Split into words
    const words = plainText.trim().split(/\s+/);
    // Join first N words
    const shortText =
        words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : plainText;
    return shortText;
}

const DeveloperDescription = ({ description }) => {
    const truncated = truncateText(description, 20);

    return truncated
};

export default DeveloperDescription;
