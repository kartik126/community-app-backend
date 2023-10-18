import { NextFunction, Request, Response } from "express";
import addUser from "../controllers/user-controller/addUser";
import editUser from "../controllers/user-controller/editUser";
import verifyOTP from "../controllers/user-controller/verifyOTP";
import sendOTP from "../controllers/user-controller/sendOTP";
import verifyToken from "../middleware/verifyToken";
import getProfile from "../controllers/user-controller/getProfile";
import signupVerifyOTP from "../controllers/user-controller/signupVerifyOTP";
import addFamilyTree from "../controllers/matrimony-controller/addFamilyTree";
import deleteFamilyTree from "../controllers/matrimony-controller/deleteFamilyTree";
import editFamilyTree from "../controllers/matrimony-controller/editFamilyTree";
import getFamilyTree from "../controllers/matrimony-controller/getFamilyTree";
const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage: storage });

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/send-otp", sendOTP);
router.post("/register", addUser);
router.post("/verify-otp", verifyOTP);
router.post("/signup-verify-otp", signupVerifyOTP);
router.post(
  "/add-family-tree",
  upload.single("image"),
  verifyToken,
  addFamilyTree
);
router.delete(
  "/delete-family-tree/:familyTreeId",
  upload.single("image"),
  verifyToken,
  deleteFamilyTree
);
router.put(
  "/edit-family-tree/:familyTreeId",
  upload.single("image"),
  verifyToken,
  editFamilyTree
);
router.get(
  "/get-family-tree",
  verifyToken,
  getFamilyTree
);

router.post("/:id", editUser);
router.get("/get-profile", verifyToken, getProfile);

module.exports = router;
