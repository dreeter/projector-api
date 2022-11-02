const { authJwt } = require("../middleware/index");
const user = require("../controllers/user.controller");
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

// //   app.get("/api/test/all", controller.allAccess);

// //   app.get(
// //     "/api/test/user",
// //     [authJwt.verifyToken],
// //     controller.userBoard
// //   );

// //   app.get(
// //     "/api/test/mod",
// //     [authJwt.verifyToken, authJwt.isModerator],
// //     controller.moderatorBoard
// //   );

// //   app.get(
// //     "/api/test/admin",
// //     [authJwt.verifyToken, authJwt.isAdmin],
// //     controller.adminBoard
// //   );
// };

//get route for a user, uses the middleware to verify they have a valid token before finding that user
router.get("/", authJwt.verifyToken, user.findOne);

// router.post("/", user.create);

// router.delete("/:id", user.delete);

// router.put("/:id", user.update);

module.exports = router;