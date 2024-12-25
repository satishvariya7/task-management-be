const path = require("path");
const fs = require("fs");

const removeImage = (oldImage) => {
  const filePath = path.join(__dirname, "../users-images", oldImage);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  } else console.log("Image path is not found!");
};

module.exports = removeImage;
