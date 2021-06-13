const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024;

var path = require('path');
var appDir = path.dirname(require.main.filename);

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.query.name === 'dashboard') {
      cb(null, `${appDir}/public/uploads/users`);
    }
    else if(req.query.name === 'events') {
      cb(null, `${appDir}/public/uploads/events`);
    }
    else {
      cb(null, `${appDir}/public/uploads/posts`);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
  } else {
      cb("Type file is not access", false);
  }
};

let uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize }
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;