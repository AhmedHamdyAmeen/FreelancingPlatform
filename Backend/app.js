require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const paypal = require("paypal-rest-sdk");

// const paymentRoute = require("./MVC/routes/payment.route");
const authRoute = require("./MVC/routes/auth.route");
const companyRouter = require("./MVC/routes/company.route");
const productRouter = require("./MVC/routes/product.route");

const teamRoutes = require("./MVC/routes/team.route");
const skillRoutes = require("./MVC/routes/skill.route");
const categoryRoutes = require("./MVC/routes/category.route");
const projectRoutes = require("./MVC/routes/project.route");

const adminRoute = require("./MVC/routes/admin.route");
const freelancerRoute = require("./MVC/routes/freelancer.route");
const reportRoute = require("./MVC/routes/report.route");
const testRoute = require("./MVC/routes/test.route");
const clintRoute = require("./MVC/routes/client.route");
const searchRoute = require("./MVC/routes/search.route");
const changePasswordRoute = require("./MVC/routes/changePassword.route");





// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id: process.env.CLIENT_ID,
//   client_secret: process.env.CLIENT_SECRET,
// });

const app = express();

const db = async () => {
  // ^ this changes for Jasmine unite test
  let db = await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB Connected");
      let port = process.env.PORT || 8080;
      app.listen(port, () => {
        console.log(`Listenning to port ${port}...`);
      });
    })
    .catch((error) => console.log("Db Connection Error " + error));

  return db;
};
db();

/****** middleware *******/
//1- MW url and method
app.use(morgan("dev")); //method-url-status-ms- :res[content-length]

//2- all users CORS MW
app.use(cors());

/****************** routes *****************/
// visualPath, static folder ==> http:localhost:port/visualPath/staticFolderDirectoryOnTheServer
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //body parsing

// app.use(loginRoute);
app.use(authRoute);
app.use(changePasswordRoute);

// app.use(paymentRoute);
app.use(freelancerRoute);
app.use(adminRoute);
app.use(reportRoute);
app.use(testRoute);

app.use("/team", teamRoutes);
app.use("/skill", skillRoutes);
app.use("/category", categoryRoutes);
app.use("/project", projectRoutes);

app.use(clintRoute);
app.use(searchRoute);
app.use(companyRouter);
app.use(productRouter);


// routes
// app.post("/payment", async (req, res) => {
//   const { product } = req.body;
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: product.name,
//           },
//           unit_amount: product.amount,
//         },
//         quantity: product.quantity,
//       },
//     ],
//     success_url: "http://localhost:8080/success",
//     cancel_url: "http://localhost:8080/cancel",
//   });
//   res.json({ session });
// });


//3- Not Found MW
app.use((request, response) => {
  console.log("Not Found MW");
  response.status(404).json({ msg: "Not Found" });
});

//4- Error MW
app.use((error, request, response, next) => {
  console.log("Error MW");
  let errorStatus = error.status || 500;

  response.status(errorStatus).json({ msg: `${error}` });
});

// Jasmine Unit Test
module.exports = { app, db };
