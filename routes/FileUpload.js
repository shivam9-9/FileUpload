const express = require("express");
const router = express.Router();

const {imageUpload , videoUpload , SizeReducer , localFileUpload} = require("../controllers/fileUpload");

router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/localFileUpload", localFileUpload);
router.post("/SizeReducer", SizeReducer);


module.exports = router;