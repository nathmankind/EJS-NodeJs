var express = require("express");
var path = require("path");

const myApp = express();

const { check, validationResult } = require("express-validator");
myApp.use(express.urlencoded({ extended: false }));

myApp.set("views", path.join(__dirname, "views"));

myApp.use(express.static(__dirname + "/public"));
myApp.set("view engine", "ejs");



myApp.get("/", (req, res) => {
  res.render("form");
});



const phoneRegex = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;

const validateRegex = (userInput, regexExp) => {
  if (regexExp.test(userInput)) {
    return true;
  } else {
    return false;
  }
};

const validatePhoneField = (value) => {
  if (!validateRegex(value, phoneRegex)) {
    throw new Error("Phone should be in the format xxx-xxx-xxxx");
  }
  return true;
};

// Product 1 - $5, product 2 - $2, product 3 - $4

const productPrice = {
  product1: 2,
  product2: 4,
  product3: 5,
};
const validateProductItem = (req) => {
  let product1 = parseInt(req.body.product1 || 0);
  let product2 = parseInt(req.body.product2 || 0);
  let product3 = parseInt(req.body.product3 || 0);

  const allSelectedProductPrice =
    productPrice["product1"] * product1 +
    productPrice["product2"] * product2 +
    productPrice["product3"] * product3;
  if (allSelectedProductPrice < 10) {
    return {
      type: "field",
      value: "",
      msg: "All products bought must be worth $10 or above",
      path: "product",
      location: "body",
    };
  }
  return true;
};

myApp.post(
  "/",
  [
    check("name", "Must have a name").not().isEmpty(),
    check(
      "email",
      "Must be a valid email address e.g johndoe@gmail.com"
    ).isEmail(),
    check("phone").custom(validatePhoneField),
    check("province", "Please enter a province").not().isEmpty(),
    check("city", "Enter a city").not().isEmpty(),
    check("address", "Enter an address").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    const productErr = validateProductItem(req);

    if (!errors.isEmpty()) {
      res.render("form", {
        errors: [...errors.array(), productErr],
      });
    } else {
      let name = req.body.name;
      let phone = req.body.phone;
      let email = req.body.email;
      let address = req.body.address;
      let province = req.body.province;
      let city = req.body.city;
      let product1 = req.body.product1 || 0;
      let product2 = req.body.product2 || 0;
      let product3 = req.body.product3 || 0;

      var subTotal =
        productPrice["product1"] * product1 +
        productPrice["product2"] * product2 +
        productPrice["product3"] * product3;

      var tax = subTotal * 0.13;
      var total = subTotal + tax;
      let productDataResponse = {
        name,
        phone,
        email,
        province,
        city,
        address,
        product1,
        product2,
        product3,
        subTotal,
        tax,
        total,
      };

      res.render("form", productDataResponse);
    }
  }
);

const port = 8000;

myApp.listen(port);
console.log(`App running on port : ${port}`);
