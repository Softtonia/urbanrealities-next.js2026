export const formatprice = (value) => {
    if (!value) return "";

    // Remove commas before converting
    const num = Number(String(value).replace(/,/g, ""));

    if (isNaN(num)) return value;

    // Less than 1 Lakh → return formatted number only
    if (num < 100000) {
        return new Intl.NumberFormat("en-IN").format(num);
    }

    // 1 Lakh to less than 1 Crore → Lakh
    if (num >= 100000 && num < 10000000) {
        const lakhs = num / 100000;
        return lakhs % 1 === 0
            ? `${lakhs} Lac`
            : `${lakhs.toFixed(2)} Lac`;
    }

    // >= 1 Crore → Crore
    const crores = num / 10000000;
    return crores % 1 === 0
        ? `${crores} Crore`
        : `${crores.toFixed(2)} Crore`;
};
