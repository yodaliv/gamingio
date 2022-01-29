module.exports = app => {
  const userController = require("../controllers/UserController.js");
  const priceController = require("../controllers/PriceController.js");
  const coinbaseController = require("../controllers/CoinbaseController.js")
  var router = require("express").Router();

  // // Create a new Tutorial
  // router.post("/", tutorials.create);

  // // Retrieve all Tutorials
  // router.get("/", tutorials.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  // app.use('/api/tutorials', router);

  router.post('/login', userController.login);
  router.post('/signup', userController.signup);
  router.post('/getBasePrice', priceController.getBasePrice);
  router.post('/deposit', priceController.deposit);
  router.post('/coinbaseCharges', coinbaseController.checkoutCharges);
  app.use('/api', router);
};
