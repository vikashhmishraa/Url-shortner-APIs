const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookies = req.cookies?.token;
  req.user = null;
  if (!tokenCookies) return next();

  const token = tokenCookies;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    next();
  };
}

// ********* For Authorization with JWT Token ************
// function checkForAuthentication(req, res, next) {
//   const authorizationHeadervalue = req.headers["authorization"];
//   req.user = null;
//   if ( !authorizationHeadervalue || !authorizationHeadervalue.startsWith("Beaerer") )
//     return next();

//   const token = authorizationHeadervalue.split("Bearer ")[1];
//   const user = getUser(token);
//   req.user = user;
//   return next();
// }

// function restrictTo(req, res, next) {
//   return function (req, res, next) {
//     if (!req.user) return res.redirect("/login");
//     if (!roles.include(req.user.roles)) return res.end("UnA uthorized");
//     next();
//   };
// }

// ************** OLD CODE ***************
// async function restrictToLoggedinUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   console.log(req.headers);
//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer ")[1];
//   // const user = getUser(userUid);
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   console.log(req.headers);
//   const token = userUid.split("Bearer ")[1];
//   // const token =
//   //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNhMjRmYWQ4MmMwNDFlNmFmM2U4YWUiLCJlbWFpbCI6InZpa2FzQGhjLmNvbSIsImlhdCI6MTcwNzk2ODY5M30.Y2iyZFNjhGeOLBOT2IXZJiOhxumCd1SCuVXpOmO7fQU";
//   const user = await getUser(token); // Await getUser function
//   req.user = user;
//   next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo,
};
