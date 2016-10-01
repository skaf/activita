/****************************************************
 *                                                  *
 *          Public configration file                *
 *                                                  *
 ****************************************************/
var path = require("path");


/****************************************************
 *                                                  *
 *        Dynamic environment settings              *
 *                                                  *
 ****************************************************/
process.env.APP_OPTIONS_ENVIRONMENT = "development"; //development || production
/**
 *	Runs through arguments followed by path
 *
 *	Options are listed above
 */
process.argv.slice(2).forEach(function(argument) {
	var split = argument.split("=");
	process.env[split[0]] = split[1];
});

process.env.APP_CLIENT_FOLDER                                   = path.join(__dirname, "../public/dist");

process.env.APP_ROUTER                                          = path.join(__dirname, "./router.js");

process.env.APP_EXPRESS_REPONSE                                 = path.join(__dirname, "LIB/EXPRESS/response.js");

/****************************************************
 *                                                  *
 *         Private configration file - Dev          *
 *    Set /config.js as needed with below options   *
 *                                                  *
 ****************************************************/
if (process.env.APP_OPTIONS_ENVIRONMENT !== "production") {
    process.env.APP_SERVER_SECRET               = "I'm a dummy secret";
    process.env.APP_SERVER_KEY                  = "PlaceIt";
}