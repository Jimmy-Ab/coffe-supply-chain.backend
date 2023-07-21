const initiateContract = require("./initiateContract");
const signContract = require("./signContract");
const contractApproval = require("./contractApproval");
const contractTermination = require("./contractTermination");
const removeCoffeeDeliveryAgreement = require("./removeCoffeeDeliveryAgreement");
const getCoffeeDeliveryAgreement = require("./getCoffeeDeliveryAgreement");
const getAllCoffeeDeliveryAgreement = require("./getAllCoffeeDeliveryAgreement");

module.exports = {
  initiateContract,
  signContract,
  contractApproval,
  contractTermination,
  removeCoffeeDeliveryAgreement,
  getCoffeeDeliveryAgreement,
  getAllCoffeeDeliveryAgreement,
};
