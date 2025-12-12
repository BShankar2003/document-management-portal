const fs = require('fs');

exports.safeDelete = (filePath) => {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
};
