// routes/order_routes.js

const ObjectID = require("mongodb").ObjectID;

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect("/login");
}

function checkRole(user) {
  return user.role;
}

module.exports = function(app, db, passport) {

  app.route("/").get(checkAuth, (req, res) => {
    let userRole = checkRole(req.user);
    res.sendFile("/app/views/" + userRole + "/index.html", { root: "./" });
  });

  app
    .route("/login")
    .get((req, res) => {
      res.sendFile("/app/views/login/login.html", { root: "./" });
    })
    .post(
      passport.authenticate("local", { failureRedirect: "/login" }),
      (req, res) => {
        res.redirect("/");
      }
    );

  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

// API

  app
    .route("/api/getuser")
    .get(
      require("connect-ensure-login").ensureLoggedIn(),
      (req, res) => {
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4787/')
      res.send({ user: req.user.username, role: req.user.role});
    });

  app
    .route("/api/getproductprice/:priceid")
    .get(
      require("connect-ensure-login").ensureLoggedIn(),
        (req, res) => {
          console.log(req.params.priceid);
          let selector = { priceid: req.params.priceid };
          
          db.collection("prices").findOne(selector, (err, item) => {
            if (err) {
              res.send(err);
            } else {
              console.log(item);
              res.send(item);
            }
          });
    });

  app
    .route("/api/getallorders")
    .get((req,res) => {
      let selector = {};
      db.collection("notes").find({}).toArray( (err, item) => {
        if (err) {
              res.send(err);
            } else {
              console.log('а далше не пойдем');
              res.send(item);
            }
      })
    })

  app
    .route("/api/payorder/:id")
    .get ((req,res) => {
      const orderID = req.params.id;
      console.log(new ObjectID(orderID));
      res.send(req.params.id)
    })
    .put((req,res) => {
      
      const orderID = req.params.id;
      const selector = { _id: new ObjectID(orderID) };

      db
        .collection("notes")
        .update(selector, {$set : { filed1: "PAYED" }}, (err, item) => {
          if (err) {
            res.send(err);
          } else {
            res.send('ok we update it');
          }
        })

    })
  //
  //  ROUTE /hqTest/hq
  //
  //
  //
  //

  app
    .route("/hqTest/hq")
    .get(
      require("connect-ensure-login").ensureLoggedIn("/hqTest/login"),
      (req, res) => {
        res.sendFile("/index.html", { root: "./" });
      }
    );

  //
  //  ROUTE /hqTest/login
  //
  //
  //
  //

  app
    .route("/hqTest/login")
    .get((req, res) => {
      res.sendFile("/app/index.html", { root: "./" });
    })
    .post(
      passport.authenticate("local", { failureRedirect: "/hqTest/login" }),
      (req, res) => {
        //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

        res.redirect("/hqTest/hq");
      }
    );

  //
  //  ROUTE /hqTest/logout
  //
  //
  //
  //

  app.route("/hqTest/logout").get((req, res) => {
    req.logout();
    res.redirect("/hqTest/login");
  });

  //
  //  ROUTE /order/:id
  //
  //  id = ObjectID from mongodb
  //  .OPTIONS route need for preflight but now we use 'cors module'
  //
  app
    .route("/api/order/:id")
    // read (GET)
    .get((req, res) => {
      const orderID = new ObjectID(req.params.id); // 593ffe5083d1370b07c1f90f -> valid ObjectId value

      db.collection("notes").findOne(orderID, (err, item) => {
        if (err) {
          res.send(err);
        } else {
          res.send(item);
        }
      });
    })
    // update (PUT)
    .put((req, res) => {
      //  get ID
      const orderID = req.params.id;
      const selector = { _id: new ObjectID(orderID) };

      //  Init ORDER update object
      let orderUpdatedObject = {
        newText: req.body.data
      };

      // db.update
      db
        .collection("notes")
        .update(selector, orderUpdatedObject, (err, item) => {
          if (err) {
            res.send(err);
          } else {
            res.send(
              "item: " + item + " orderUpdatedObject: " + orderUpdatedObject
            );
          }
        });
    })
    // delete (DELETE)
    .delete((req, res) => {
      const orderID = req.params.id;
      const selector = { _id: new ObjectID(orderID) };

      db
        .collection("notes")
        .remove(selector, { fullResult: true }, (err, item) => {
          // remove(selector, callback) // TODO: а как получить весь удаленный документ перед удалением? почему не работе fullresult
          if (err) {
            res.send(err);
          } else {
            res.send("We remove item. ID: " + item);
          }
        });
    });

  //
  //  ROUTE /order
  //

  // create (POST)
  app.route("/order").post((req, res) => {
    const order = req.body;

    db.collection("notes").insert(order, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
