// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index", { user: req.user });
  });

  app.get("/signup", (req, res) => {
    res.render("signup", { user: req.user });
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members", { user: req.user });
  });

  app.post("/members", isAuthenticated, (req, res) => {
    console.log("got data ok");
    console.log(req.body);
    // req.body prints imdbID which is the movie ID that we want to save in SeriesDB
  })
};
