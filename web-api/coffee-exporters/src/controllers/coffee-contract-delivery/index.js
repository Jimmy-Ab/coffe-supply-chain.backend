const contractDeliveryApproval = require("./contractDeliveryApproval");
const contractDeliveryPayment = require("./contractDeliveryPayment");
const contractDeliveryRejection = require("./contractDeliveryRejection");
const getAllDeliveryAgreements = require("./getAllDeliveryAgreements");
const getContractDelivery = require("./getContractDelivery");
const getContractDeliveryPerContract = require("./getContractDeliveryPerContract");
const removeContractDelivery = require("./removeContractDelivery");

module.exports = {
    contractDeliveryApproval,
    contractDeliveryPayment,
    contractDeliveryRejection,
    getAllDeliveryAgreements,
    getContractDelivery,
    getContractDeliveryPerContract,
    removeContractDelivery
};
