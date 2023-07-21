"use strict";

const {
  CoffeeAgreementContractBase,
} = require("./coffee-agreement-contract-base");
const CoffeeAgreement = require("../../models/coffee-agreement");
const CoffeeDeliveryAgreementStatus = require("../../enums/coffee-delivery-agreement-status");
class CoffeeAgreementCoffeeExporterContract extends CoffeeAgreementContractBase {
  constructor() {
    super("CoffeeAgreementCoffeeExporterContract");
    this.txId = "";
  }
  async beforeTransaction(ctx) {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }

  async initLedger(ctx) {
    console.log("cherry coffee init on investor");
  }

  async prepareContract(
    ctx,
    id,
    contractGoal,
    seller,
    buyer,
    sellerRight,
    sellerObligation,
    buyerRight,
    buyerObligation,
    BuyerRemark,
    cta,
    expectedQuantity,
    unit,
    deliveryAddress,
    pricePercentage,
    contractType,
    startDate,
    endDate
  ) {
    this._require(id, "id");
    this._require(contractGoal, "contractGoal");
    this._require(seller, "seller");
    this._require(buyer, "buyer");
    this._require(sellerRight, "sellerRight");
    this._require(sellerObligation, "sellerObligation");
    this._require(buyerRight, "buyerRight");
    this._require(buyerObligation, "buyerObligation");
    this._require(BuyerRemark, "BuyerRemark");
    this._require(cta, "cta");
    this._require(expectedQuantity, "expectedQuantity");
    this._require(unit, "unit");
    this._require(deliveryAddress, "deliveryAddress");
    this._require(pricePercentage, "pricePercentage");
    this._require(contractType, "contractType");
    this._require(startDate, "startDate");
    this._require(endDate, "endDate");

    const _coffeeAgreementBuffer = CoffeeAgreement.from({
      id: id,
      contractGoal: contractGoal,
      seller: seller,
      buyer: buyer,
      sellerRight: sellerRight,
      sellerObligation: sellerObligation,
      buyerRight: buyerRight,
      buyerObligation: buyerObligation,
      BuyerRemark: BuyerRemark,
      cta: cta,
      expectedQuantity: expectedQuantity,
      deliveredQuantity: 0,
      unit: unit,
      deliveryAddress: deliveryAddress,
      pricePercentage: pricePercentage,
      contractType: contractType,
      startDate: startDate,
      endDate: endDate,
      initiatedDate: new Date(),
      contractStatus: CoffeeDeliveryAgreementStatus.REQUESTED,
      txId: this.txId,
    }).toBuffer();
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      _coffeeAgreementBuffer
    );
  }
}

module.exports = CoffeeAgreementCoffeeExporterContract;
