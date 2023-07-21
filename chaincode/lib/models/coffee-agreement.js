"use strict";

class CoffeeAgreement {
  constructor() {
    this.txId = "";
    this.id = "";
    this.contractGoal = "";
    this.seller = ""; //coffee producer and seller to buyer including grower, supplier,.. the one who recieve the contract request and sign initiate
    this.buyer = ""; /** coffee buyer including exporter */
    this.sellerRight = "";
    this.sellerObligation = "";
    this.buyerRight = "";
    this.buyerObligation = "";
    this.sellerRemark = "";
    this.BuyerRemark = "";
    this.cta = ""; /** contract approver */
    this.ectRemark = "";
    this.Unit = "";
    this.expectedQuantity = 0; // total quantity to be delivered
    this.deliveredQuantity = 0;
    this.deliveryAddress = "";
    this.pricePercentage = "";
    this.startDate = "";
    this.endDate = "";
    this.contractStatus = ""; //ContractStatus
    this.initiatedDate = "";
    this.terminationReason = "";
    this.terminationDate = "";
    this.contractType = "";
  }

  static from(bufferOrJson) {
    if (Buffer.isBuffer(bufferOrJson)) {
      if (!bufferOrJson.length) {
        return;
      }
      bufferOrJson = JSON.parse(bufferOrJson.toString("utf-8"));
    }
    const result = new CoffeeAgreement();
    result.txId = bufferOrJson.txId;
    result.id = bufferOrJson.id;
    result.contractGoal = bufferOrJson.contractGoal;
    result.seller = bufferOrJson.seller;
    result.buyer = bufferOrJson.buyer;
    result.sellerRight = bufferOrJson.sellerRight;
    result.sellerObligation = bufferOrJson.sellerObligation;
    result.buyerRight = bufferOrJson.buyerRight;
    result.buyerObligation = bufferOrJson.buyerObligation;
    result.sellerRemark = bufferOrJson.sellerRemark;
    result.BuyerRemark = bufferOrJson.BuyerRemark;
    result.ectRemark = bufferOrJson.ectRemark;
    result.cta = bufferOrJson.cta;
    result.expectedQuantity = bufferOrJson.expectedQuantity;
    result.deliveredQuantity = bufferOrJson.deliveredQuantity;
    result.Unit = bufferOrJson.Unit;
    result.deliveryAddress = bufferOrJson.deliveryAddress;
    result.pricePercentage = bufferOrJson.pricePercentage;
    result.startDate = bufferOrJson.startDate;
    result.endDate = bufferOrJson.endDate;
    result.contractStatus = bufferOrJson.contractStatus;
    result.initiatedDate = bufferOrJson.initiatedDate;
    result.terminationReason = bufferOrJson.terminationReason;
    result.terminationDate = bufferOrJson.terminationDate;
    result.contractType = bufferOrJson.contractType;
    return result;
  }
  toJson() {
    return JSON.stringify(this);
  }
  toBuffer() {
    return Buffer.from(this.toJson());
  }
}

module.exports = CoffeeAgreement;
