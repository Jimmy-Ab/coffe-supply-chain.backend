const produceWashedSupplyCoffee = require("./produceWashedSupplyCoffee");
const produceNaturalCoffee = require("./produceNaturalCoffee");
const coffeeGrading = require("./coffeeGrading");
const deleteSupplyCoffee = require("./deleteSupplyCoffee");
const supplyCoffeeShipment = require("./supplyCoffeeShipment");
const registerWashedCoffeeProcessingInd = require("./registerWashedCoffeeProcessingInd");
const registerNaturalCoffeeProcessingInd = require("./registerNaturalCoffeeProcessingInd");

const getWashedCoffeeInd = require("./getWashedCoffeeInd");
const getAllWashedCoffeeInd = require("./getAllWashedCoffeeInd");
const getNaturalCoffeeInd = require("./getNaturalCoffeeInd");
const getAllNaturalCoffeeInd = require("./getAllNaturalCoffeeInd");
const getSupplyCoffeeOfOwner = require("./getSupplyCoffeeOfOwner");
const deleteSupplyCoffeeShipment = require("./deleteSupplyCoffeeShipment");
const getAllSupplyCoffeeShipment = require("./getAllSupplyCoffeeShipment");
const getSupplyCoffeeShipment = require("./getSupplyCoffeeShipment");
const deliverShipment = require("./deliverShipment");
const returnShipment = require("./returnShipment");
const RemoveWashedCoffeeProcessingWarehouseInd = require("./RemoveWashedCoffeeProcessingWarehouseInd");
const RemoveNaturalCoffeeProcessingWarehouseInd = require("./RemoveNaturalCoffeeProcessingWarehouseInd");
const UpdateWashedCoffeeProcessingWarehouseInd = require("./UpdateWashedCoffeeProcessingWarehouseInd");
const updateNaturalCoffeeProcessingWarehouseInd = require("./updateNaturalCoffeeProcessingWarehouseInd");
module.exports = {
  produceWashedSupplyCoffee,
  produceNaturalCoffee,
  coffeeGrading,
  deleteSupplyCoffee,
  supplyCoffeeShipment,
  registerWashedCoffeeProcessingInd,
  registerNaturalCoffeeProcessingInd,

  getAllNaturalCoffeeInd,
  getNaturalCoffeeInd,
  getAllWashedCoffeeInd,
  getWashedCoffeeInd,
  getSupplyCoffeeOfOwner,
  deleteSupplyCoffeeShipment,
  getAllSupplyCoffeeShipment,
  getSupplyCoffeeShipment,
  deliverShipment,
  returnShipment,
  RemoveWashedCoffeeProcessingWarehouseInd,
  RemoveNaturalCoffeeProcessingWarehouseInd,
  UpdateWashedCoffeeProcessingWarehouseInd,
  updateNaturalCoffeeProcessingWarehouseInd
};
