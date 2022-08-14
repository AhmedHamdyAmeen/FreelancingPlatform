const mongoose = require("mongoose");
require("../models/product.model");

let product = mongoose.model("products");

/************multer */
const multer = require("multer");
const path = require("path");

const productStorage = multer.diskStorage({
  // Destination to store product
  destination: (re, file, cb) => {
    cb(null, "./public/productFiles");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports.productUpload = multer({
  storage: productStorage,
  limits: {
    fileSize: 1000000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(zip|jpg|png)$/)) {
      return cb(new Error("Please upload a product"));
    }
    cb(undefined, true);
  },
});
/****************************/

//get All products
module.exports.getAllProduct = (req, res, next) => {
  product
    .find({})
    .populate("ownerId")
    .populate({ path: "skills", select: "name" })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//get one
module.exports.getProductById = (req, res, next) => {
  product
    .findOne({
      _id: req.params.id,
    })
    .populate("ownerId")
    .populate({ path: "skills", select: "name" })
    .then((data) => {
      if (data == null) next(new Error("product not found"));
      data.views += 1;
      data.save(); //----->test
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

//create product
module.exports.createProduct = (req, res, next) => {
  product.find({ productName: req.body.productName }, { _id: 0, productName: 1 })
    .then((data) => {
      if (data.length) {
        next(new Error("Product Name Duplicated "));
      } else {
        let productPath = "";
        let imagePath = "";

        if (req.files) {
          for (file of req.files) {
            // console.log(file)
            if (file.path.match(/\.(zip)$/)) {
              productPath = file.path;
            } else if (file.path.match(/\.(jpg|png)$/)) {
              imagePath = file.path;
            }
          }
          if (!productPath) next(new Error("product file is required"));
          if (!imagePath) next(new Error("product  image is required"));
        } else {
          next(new Error("product file and image are required"));
        }

        let productobject = new product({
          productName: req.body.productName,
          description: req.body.description,
          price: req.body.price,
          skills: JSON.parse(req.body.skills),
          product: productPath,
          ownerId: req.body.teamId ? req.body.teamId : req.id,
          ownerModel: req.body.teamId ? "teams" : req.role + "s",
          image: imagePath,
        });

        productobject
          .save()
          .then((data) => {
            res.status(201).json({ data /*: "product created sucessfully"*/ });
          })
          .catch((error) => next(error));

      }
    })
};

//get update  property product
module.exports.updateProduct = (req, res, next) => {
  let productPath = "";
  let imagePath = "";
  product
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      if (req.files) {
        for (file of req.files) {
          if (file.path.match(/\.(zip)$/)) {
            productPath = file.path;
          } else if (file.path.match(/\.(jpg|png)$/)) {
            imagePath = file.path;
          }
        }
      }
      data.productName = req.body.productName || data.productName,
        data.description = req.body.description || data.description,
        data.price = req.body.price || data.price,
        data.skills = JSON.parse(req.body.skills) || data.skills,
        data.product = productPath || data.product,
        data.image = imagePath || data.image,

        data.save()
          .then((data) => {
            res.status(201).json({ data /*: "product created sucessfully"*/ });
          })
          .catch((error) => next(error));
    });
};

//update buyer id (id product , buyerId )
module.exports.updateBuyerId = (req, res, next) => {
  product.findOne({ _id: req.params.id }).then((data) => {
    let object = {
      id: req.id,
      type: req.role == "company" ? "company" : req.role + "s",
    };

    data.buyer.push(object);
    res.status(200).json({ buyers: data.buyer });
    data.save();
  });
};

//delete one product
module.exports.deleteProduct = (req, res, next) => {
  product
    .deleteOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.status(200).json({
        data: "deleted",
      });
    })
    .catch((error) => next(error));
};
