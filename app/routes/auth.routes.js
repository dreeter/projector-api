const { verifySignUp } = require("../middleware/index");
const authController = require("../controllers/auth.controller");
const express = require('express');
const router = express.Router();

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post(
//     "/api/auth/signup",
//     [
//       verifySignUp.checkDuplicateUsernameOrEmail,
//       verifySignUp.checkRolesExisted
//     ],
//     authController.signup
//   );

//   app.post("/api/auth/signin", authController.signin);
// };

//signup uses the verifysignup to ensure user does not already exist
router.post('/signup',[verifySignUp.checkDuplicateUsernameOrEmail], authController.signup);

router.post('/signin', authController.signin);

module.exports = router;