const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');

let models = require('../../config/models')(mongoose);

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect("/login");
}

function checkRole(user) {
  return user.role;
}

async function getNextSequence() { 
  let y = models.counters.findOneAndUpdate(
    { name: 'orders' },
    { $inc: { counter: 1 } },
    { new: true },
  ).exec()

  

  return await y;
}

async function getNextOrderNumberInDay () {
  let y = models.counters.findOne(
      { name: 'orderinday' }
  ).exec().then(r => {

    let now = new Date()
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf() + 86400000
    let prevdate = new Date(r['newtrade'].prevdate.getFullYear(), r['newtrade'].prevdate.getMonth(), r['newtrade'].prevdate.getDate()).valueOf() + 86400000

    if (prevdate < today) {
      return models.counters.findOneAndUpdate(
          {name: 'orderinday'},
          {$set: {
            newtrade: {
              counter: 1,
              prevdate: new Date()
            }
          }},
          { new: true }
        ).exec()

    } else {
      return models.counters.findOneAndUpdate(
        { name: 'orderinday' },
        { $inc: { 'newtrade.counter': 1 } } ,
        { new: true },
      ).exec()
    }
  })

  return await y
  
}



module.exports = function (app, db, passport) {

  // ROUTE GET INFO DATA
  app
    .route("/api/getproducts")
    .get((req, res) => {
      db.collection("products").find({}).toArray((err, item) => {
        if (err) {
          res.send(err);
        } else {
          res.send(item);
        }
      })
    })

  app
    .route("/api/getproductprice/:priceid")
    .get(
    require("connect-ensure-login").ensureLoggedIn(),
    (req, res) => {

    let mainProductPrice = '';

      db.collection("products_price").findOne({}, (err, item) => {
        if (err) {
          res.send(err);
        } else {
          mainProductPrice = item[req.params.priceid]['Йошкар-Ола'];
          res.send(mainProductPrice.toString())
        }
      });
      
    });

  app
    .route("/api/getnewcouponnumber")
    .get(
    // require("connect-ensure-login").ensureLoggedIn(),
    (req, res) => {
      let objToSend = {
        number: 0,
        orderKsId: 0,
      }

      getNextSequence().then(r=>{
        objToSend.orderKsId = r.counter;
        return getNextOrderNumberInDay()
      })
      .then(r => {
        let str = r['newtrade'].counter.toString();
        let pad = "0000";
        let answer = pad.substring(0, pad.length - str.length) + str
        let number = r['newtrade'].shopnumber + answer + moment().format("DDMMYY")
        objToSend.number = number;
        res.send(objToSend) 
      });
          
    });

  app
    .route("/api/getnewksid")
    .get(
    // require("connect-ensure-login").ensureLoggedIn(),
    (req, res) => {
      getNextSequence().then((r) => {
        res.send(r.counter.toString()) 
      });
          
    });

  app
    .route('/api/checkeditable/:id')
    .get(
      (req,res) => {
        const orderID = req.params.id;
        const selector = { _id: new ObjectID(orderID) };
        
        db.collection('orders').findOne(selector, (err,item) => {
          res.send(Boolean(item.isOrderEditable))
        })
      }
    )

  // ROUTE AUTH & CHECK_AUTH
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

  // ROUTE ORDERS

  app
    .route('/api/postorder/')
    .post((req, res) => {
      
      
      // Генерим все недостающие поля

      let dateCreate = new Date();
      req.body.orderCreateAt = dateCreate;
      req.body.orderLastModify = dateCreate;

      
      db.collection('orders').insert(req.body);
      res.send('ok order post');
    })
  
  // API

  app
    .route("/api/getuser")
    .get(
    require("connect-ensure-login").ensureLoggedIn(),
      (req, res) => {
          res.send({ 
            user: req.user.username, 
            role: req.user.role, 
            rights: ''});
      }
    );

  app
    .route("/api/getproductprice/:priceid")
    .get(
    require("connect-ensure-login").ensureLoggedIn(),
    (req, res) => {
      
      //let selector = { priceid: req.params.priceid };

      db.collection("prices").findOne({}, (err, item) => {
        if (err) {
          res.send(err);
        } else {
          
          res.send(item[req.params.priceid]);
        }
      });
    });

  app
    .route("/api/getallorders")
    .get((req, res) => {
      let selector = {};
      db.collection("orders").find({ isDeleted: { $exists: false } }).toArray((err, item) => {
        if (err) {
          res.send(err);
        } else {
          console.log('а далше не пойдем');
          res.send(item);
        }
      })
    })

  app
    .route("/api/getorder/:id")
    .get((req, res) => {
      const orderID = req.params.id;
      const selector = { _id: new ObjectID(orderID) };
      db.collection("orders").find(selector).toArray((err, item) => {
        if (err) {
          res.send(err);
        } else {
          res.send(item);
        }
      })
    })

  app
    .route("/api/payorder/:id")
    .get((req, res) => {
      const orderID = req.params.id;
      res.send(req.params.id)
    })
    .put((req, res) => {
      const orderID = req.params.id;
      const selector = { _id: new ObjectID(orderID) };
      db
        .collection("orders")
        .update(selector, { $set: { payIsPayed: true, payPayDate: new Date() } }, (err, item) => {
          if (err) {
            res.send(err);
          } else {
            res.send(200);
          }
        })

    })

  app
    .route("/api/updateorder/:id")
    .put((req, res) => {
      
      const orderID = req.params.id;
      const selector = { _id: new ObjectID(orderID) };

      let updateObject = {};
      for (keyName in req.body) {
        if (keyName !== '_id') {
          updateObject[keyName] = req.body[keyName]
        }
      };

      console.log(updateObject)

      db
        .collection("orders")
        .update(selector, { $set: updateObject }, (err, item) => {
          if (err) {
            res.send(err);
          } else {
            res.send('ok we update it');
          }
        })

    })  

  // app
  //   .route('/api/postorder/')
  //   .post((req, res) => {
  //     getNextSequence().then((r) => {
  //       req.body.globalId = r.counter;
  //       db.collection('orders').insert(req.body);
  //       res.send('ok order post');
  //     });
      
  //   })

  // CLAIMS
  //  /api/postclaim/
  //  /api/getallclaims/:id

  app
    .route('/api/postclaim/')
    .post((req,res) => {
      db.collection('claims').insert(req.body);
      res.send('ok claim post');
    })  
  
  app
    .route('/api/getclaimsbyid/:orderid') // get all claims for order
    .get((req,res) => {
      let selector = { orderId: req.params.orderid } 

      db.collection('claims').find(selector).toArray((err,item) => {
        if (err) { 
          res.send(err)
        } else {
          res.send(item)
        }
      })
    })

  app
    .route('/api/getallclaims/')
    .get((req,res) => {
      let selector = {} 

      db.collection('claims').find(selector).toArray((err,item) => {
        if (err) { 
          res.send(err)
        } else {
          res.send(item)
        }
      })
    })

  app
    .route('/api/getclaim/:id')
    .get((req,res) => {
      const claimID = req.params.id;
      const selector = { _id: new ObjectID(claimID) };

      db.collection('claims').find(selector).toArray((err,item) => {
        if (err) { 
          res.send(err)
        } else {
          res.send(item)
        }
      })
    })  

   app
    .route('/api/updateclaim/:id')
    .put((req,res) => {
        const claimID = req.params.id;
        const selector = { _id: new ObjectID(claimID) };

        let updateObject = {};

        for (keyName in req.body) {
          updateObject[keyName] = req.body[keyName]
        };  

        db
          .collection("claims")
          .update(selector, { $set: updateObject }, (err, item) => {
            if (err) {
              res.send(err);
            } else {
              res.send('ok we update commentsArr in Claims');
            }
          })
      })
 
  // ARTASIANS
  //  
  //  

   app
     .route('/api/getallartasians/')
     .get((req, res) => {
       let selector = {}

       db.collection('artasians').find(selector).toArray((err, item) => {
         if (err) {
           res.send(err)
         } else {
           res.send(item)
         }
       })
     })

  app
    .route('/api/deleteorder/:id')
    .put((req, res) => {

      const orderID = req.params.id;
      const selector = { _id: new ObjectID(orderID) };

      db
        .collection("orders")
        .update(selector, { $set: { isDeleted: true } }, (err, item) => {
          // remove(selector, callback) // TODO: а как получить весь удаленный документ перед удалением? почему не работе fullresult
          if (err) {
            res.send(err);
          } else {
            res.send("We remove item. ID: " + item);
          }
        });
    })

  // app
  //   .route("/hqTest/hq")
  //   .get(
  //     require("connect-ensure-login").ensureLoggedIn("/hqTest/login"),
  //     (req, res) => {
  //       res.sendFile("/index.html", { root: "./" });
  //     }
  //   );

  // //
  // //  ROUTE /hqTest/login
  // //
  // //
  // //
  // //

  // app
  //   .route("/hqTest/login")
  //   .get((req, res) => {
  //     res.sendFile("/app/index.html", { root: "./" });
  //   })
  //   .post(
  //     passport.authenticate("local", { failureRedirect: "/hqTest/login" }),
  //     (req, res) => {
  //       //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  //       res.redirect("/hqTest/hq");
  //     }
  //   );

  //
  //  ROUTE /hqTest/logout
  //
  //
  //
  //

  // app.route("/hqTest/logout").get((req, res) => {
  //   req.logout();
  //   res.redirect("/hqTest/login");
  // });



  // app
  //   .route("/api/order/:id")
  //   // read (GET)
  //   .get((req, res) => {
  //     const orderID = new ObjectID(req.params.id); // 593ffe5083d1370b07c1f90f -> valid ObjectId value

  //     db.collection("notes").findOne(orderID, (err, item) => {
  //       if (err) {
  //         res.send(err);
  //       } else {
  //         res.send(item);
  //       }
  //     });
  //   })
  //   // update (PUT)
  //   .put((req, res) => {
  //     //  get ID
  //     const orderID = req.params.id;
  //     const selector = { _id: new ObjectID(orderID) };

  //     //  Init ORDER update object
  //     let orderUpdatedObject = {
  //       newText: req.body.data
  //     };

  //     // db.update
  //     db
  //       .collection("notes")
  //       .update(selector, orderUpdatedObject, (err, item) => {
  //         if (err) {
  //           res.send(err);
  //         } else {
  //           res.send(
  //             "item: " + item + " orderUpdatedObject: " + orderUpdatedObject
  //           );
  //         }
  //       });
  //   })
  //   // delete (DELETE)
  //   .delete((req, res) => {
  //     const orderID = req.params.id;
  //     const selector = { _id: new ObjectID(orderID) };

  //     db
  //       .collection("notes")
  //       .remove(selector, { fullResult: true }, (err, item) => {
  //         // remove(selector, callback) // TODO: а как получить весь удаленный документ перед удалением? почему не работе fullresult
  //         if (err) {
  //           res.send(err);
  //         } else {
  //           res.send("We remove item. ID: " + item);
  //         }
  //       });
  //   });

  // //
  // //  ROUTE /order
  // //

  // // create (POST)

};
