"use strict";

class CoffeeAgreementDelivery
{
  constructor()
  {
    this.txId = "";
    this.id = "";
    this.contractId = "";
    this.shipmentId = "";
    this.coffeeType = "";
    this.quantity = 0;
    this.deliveryDate = "";
    this.coffeePrice = "";
    this.status = ""; //Requested, approved, paied
  }

  static from(bufferOrJson)
  {
    if (Buffer.isBuffer(bufferOrJson))
    {
      if (!bufferOrJson.length)
      {
        return;
      }
      bufferOrJson = JSON.parse(bufferOrJson.toString("utf-8"));
    }
    const result = new CoffeeAgreementDelivery();
    result.txId = bufferOrJson.txId;
    result.id = bufferOrJson.id;
    result.contractId = bufferOrJson.contractId;
    result.shipmentId = bufferOrJson.shipmentId;
    result.coffeeType = bufferOrJson.coffeeType;
    result.quantity = bufferOrJson.quantity;
    result.deliveryDate = bufferOrJson.deliveryDate;
    result.coffeePrice = bufferOrJson.coffeePrice;
    result.status = bufferOrJson.status;

    return result;
  }

  toJson()
  {
    return JSON.stringify(this);
  }
  toBuffer()
  {
    return Buffer.from(this.toJson());
  }
}

module.exports = CoffeeAgreementDelivery;
