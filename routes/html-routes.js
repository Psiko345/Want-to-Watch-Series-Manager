// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index", {
      user: req.user,
    });
  });

  app.get("/signup", (req, res) => {
    res.render("signup", {
      user: req.user,
    });
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  // merged all "/members" API calls
  app
    .route("/members")
    .all((req, res, next) => {
      console.log("Ajax call here");
      isAuthenticated;
      next();
    })
    .get((req, res) => {
      res.render("members", {
        user: req.user,
      });
      res.end();
    })
    .post((req, res) => {
      console.log("got data ok");
      console.log(req.body);
      res.end();
      // req.body prints imdbID which is the movie ID that we want to save in SeriesDB
    });
};
