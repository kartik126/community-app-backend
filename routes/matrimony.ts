import addMatrimony from "../controllers/addMatrimony";
import getMatrimony from "../controllers/getMatrimony";

var express = require('express');
var router = express.Router();

router.post('/register',addMatrimony);
router.post('/',getMatrimony);


module.exports = router;