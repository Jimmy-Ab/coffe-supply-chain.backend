const contractDeliveryApproval = require("./contractDeliveryApproval");
const contractDeliveryPayment = require("./contractDeliveryPayment");
const contractDeliveryRejection = require("./contractDeliveryRejection");
const contractDeliveryRequest = require("./contractDeliveryRequest");
const getAllDeliveryAgreements = require("./getAllDeliveryAgreements");
const getContractDelivery = require("./getContractDelivery");
const getContractDeliveryPerContract = require("./getContractDeliveryPerContract");
const removeContractDelivery = require("./removeContractDelivery");

module.exports = {
    contractDeliveryApproval,
    contractDeliveryPayment,
    contractDeliveryRejection,
    contractDeliveryRequest,
    getAllDeliveryAgreements,
    getContractDelivery,
    getContractDeliveryPerContract,
    removeContractDelivery
};
