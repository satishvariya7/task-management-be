const getFullTime = () => {
  const now = new Date();
  const hours24 = now.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const amPm = hours24 >= 12 ? "PM" : "AM";

  return `${hours12}:${minutes}:${seconds} ${amPm}`;
};

module.exports = getFullTime;
