import addMatrimony from "../controllers/addMatrimony";
import editMatrimony from "../controllers/editMatrimony";
import getMatrimony from "../controllers/getMatrimony";

var express = require('express');
var router = express.Router();

router.post('/register',addMatrimony);
router.post('/',getMatrimony);
router.post('/:id',editMatrimony)


module.exports = router;