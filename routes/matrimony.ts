import addMatrimony from "../controllers/matrimony-controller/addMatrimony";
import editMatrimony from "../controllers/matrimony-controller/editMatrimony";
import getMatrimony from "../controllers/matrimony-controller/getMatrimony";
import likeMatrimony from "../controllers/matrimony-controller/likeMatrimony";
import verifyToken from "../middleware/verifyToken";
const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage: storage });

var express = require("express");
var router = express.Router();

router.post("/register", upload.single("profile_image"), verifyToken, addMatrimony);
router.post("/", getMatrimony);
router.post("/:id", upload.single("image"), editMatrimony);
router.post("/like/:userId", likeMatrimony);


module.exports = router;
