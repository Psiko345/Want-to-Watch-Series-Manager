// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });
};
