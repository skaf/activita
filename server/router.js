var express = require('express'),
    router = express.Router();

router.use("/", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/about", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/contact", express.static(process.env.APP_CLIENT_FOLDER));
router.use("/404", express.static(process.env.APP_CLIENT_FOLDER));

module.exports = router;