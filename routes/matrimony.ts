import addMatrimony from "../controllers/addMatrimony";
import getMatrimony from "../controllers/getMatrimony";

var express = require('express');
var router = express.Router();

router.post('/register',addMatrimony);
router.get('/',getMatrimony);



module.exports = router;