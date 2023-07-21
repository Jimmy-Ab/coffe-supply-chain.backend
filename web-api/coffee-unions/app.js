const express = require("express");
const app = express();
var cors = require("cors");
const connectDB = require('./src/config/db');
require("dotenv").config();
connectDB(); 
app.use(cors());

const coffeeGrowerRoutes = require("./src/Routes/coffee-grower");
const coffeeWarehouseRoutes = require("./src/Routes/coffee-warehouse");
const coffeeCherryRoutes = require("./src/Routes/coffee-cherry");
const coffeeDailyPriceRoute = require("./src/Routes/coffee-daily-price");

const supplyCoffeeRoute = require("./src/Routes/supply-coffee");
const exportCoffee = require("./src/Routes/export-coffee");
const coffeeTransportationCertivicate = require("./src/Routes/coffee-transportation-certificate");

app.use(express.json());
app.use('/api/auth', require('./src/Routes/auth'))
app.use("/api/coffee-grower", coffeeGrowerRoutes);
app.use("/api/coffee-warehouse", coffeeWarehouseRoutes);
app.use("/api/coffee-daily-price", coffeeDailyPriceRoute);
app.use("/api/coffee-cherry", coffeeCherryRoutes);

app.use("/api/supply-coffee", supplyCoffeeRoute);
app.use("/api/export-coffee", exportCoffee);
app.use(
  "/api/coffee-transportation-certificate",
  coffeeTransportationCertivicate
);

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
