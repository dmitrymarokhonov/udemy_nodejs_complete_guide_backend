const path = require('path');
const fs = require('fs');

exports.clearImage = (paramFilePath) => {
  let filePath = paramFilePath;
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(`${err}`));
};
