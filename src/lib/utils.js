const generateDummyChars = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const encodeId = (id) => {
  if (!id) return id;
  try {
    const dummyPrefix = generateDummyChars(10);
    return dummyPrefix + btoa(id.toString()).replace(/=+$/, "");
  } catch (e) {
    return id;
  }
};

export const decodeId = (encodedId) => {
  if (!encodedId) return encodedId;
  try {
    if (encodedId.length > 10) {
      let actualBase64 = encodedId.substring(10);
      while (actualBase64.length % 4 !== 0) {
        actualBase64 += "=";
      }
      return atob(actualBase64);
    }
    return atob(encodedId);
  } catch (e) {
    return encodedId;
  }
};
