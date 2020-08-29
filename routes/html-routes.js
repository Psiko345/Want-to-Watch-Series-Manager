// Requiring our custom middleware for checking if a user is logged in
const db = require("../models");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.render("index", {
      user: req.user
    });
  });

  app.get("/signup", (req, res) => {
    res.render("signup", {
      user: req.user
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
    .get(async (req, res) => {
      const tvShows = await db.tvShows.findAll({
        where: {
          UserId: req.user.id
        }
      });
      console.log("tvShows");
      res.render("members", {
        user: req.user,
        tvShows: tvShows
      });
      res.end();
    })
    .post((req, res) => {
      db.tvShows.findOrCreate({
        seriesUUID: req.body.imdbID,
        UserId: req.user.id
      });
      res.end();
    });

  app.delete("/members", (req, res) => {
    db.tvShows.destroy({
      where: {
        UserId: req.user.id,
        seriesUUID: req.body.imdbID
      }
    });
    res.end();
  });
};
