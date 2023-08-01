const express = require('express');
const imagesRouter = express.Router();
const {uploadImage} = require('../controller/images');

/*===================================================MULTER PART==========================================================*/

const multer = require('multer');
const aws = require("aws-sdk")
const multerS3 = require("multer-s3")
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

require("dotenv").config();
const cors = require('cors')



const BUCKET = process.env.bucketName
const s3 = new aws.S3({
  secretAccessKey: process.env.SecretKey,
  accessKeyId: process.env.AccessKey,
  region: process.env.region
});

const upload = multer({
  storage: multerS3({
    bucket: BUCKET,
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // contentType: image/jpeg,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, `picture-${Date.now()}-${file.originalname}`,);
    }
  })
});


imagesRouter.post('/uploadImage',upload.single('file'), uploadImage)

module.exports=imagesRouter;