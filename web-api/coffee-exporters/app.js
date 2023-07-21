const express = require("express");
const connectDB = require('./src/config/db');
const app = express();
var cors = require("cors");
require("dotenv").config();
connectDB();
app.use(cors());

const coffeeDailyPriceRoute = require("./src/Routes/coffee-daily-price");
const supplyCoffeeRoute = require("./src/Routes/supply-coffee");
const exportCoffee = require("./src/Routes/export-coffee");
const coffeeContractDelivery = require("./src/Routes/coffee-contract-delivery");
const coffeeDeliveryContract = require("./src/Routes/coffee-delivery-contract");


app.use(express.json());
app.use('/api/auth', require('./src/Routes/auth'))
app.use("/api/coffee-daily-price", coffeeDailyPriceRoute);
app.use("/api/supply-coffee", supplyCoffeeRoute);
app.use("/api/export-coffee", exportCoffee);
/* app.use(
  "/api/coffee-transportation-certificate",
  coffeeTransportationCertivicate
); */
app.use("/api/coffee-contract-delivery", coffeeContractDelivery);
app.use("/api/coffee-delivery-contract", coffeeDeliveryContract);
/* app.get('/', (req, res) => {
    res.send('API is running...');
}); */


const port = process.env.PORT || 3055;

const start = async () =>
{
  app.listen(port, () =>
  {
    console.log(`app started on port:${port}`);
  });
};

start();
