"use strict";

class SupplyCoffeeShipment {
  constructor() {
    this.txId = "";
    this.id = "";
    this.transporter = "";
    this.truck = "";
    this.owner = "";
    this.supplyCoffeeBatch = "";
    this.quantity = "";
    this.destination = "";
    this.bags = [];
    this.shipmentDate = "";
    this.deliveryDate = "";
    this.coffeeType = "";
    this.status = "";
    this.returnDate = "";
    this.recievedBy = "";
  }

  static from(bufferOrJson) {
    if (Buffer.isBuffer(bufferOrJson)) {
      if (!bufferOrJson.length) {
        return;
      }

      bufferOrJson = JSON.parse(bufferOrJson.toString("utf-8"));
    }

    const result = new SupplyCoffeeShipment();
    result.txId = bufferOrJson.txId;
    result.id = bufferOrJson.id;
    result.transporter = bufferOrJson.transporter;
    result.truck = bufferOrJson.truck;
    result.owner = bufferOrJson.owner;
    result.supplyCoffeeBatch = bufferOrJson.supplyCoffeeBatch;
    result.quantity = bufferOrJson.quantity;
    result.shipmentDate = bufferOrJson.shipmentDate;
    result.deliveryDate = bufferOrJson.deliveryDate;
    result.destination = bufferOrJson.destination;
    result.bags = bufferOrJson.bags;
    result.coffeeType = bufferOrJson.coffeeType;
    result.returnDate = bufferOrJson.returnDate;
    result.status = bufferOrJson.status;
    result.recievedBy = bufferOrJson.recievedBy;

    return result;
  }

  toJson() {
    return JSON.stringify(this);
  }

  toBuffer() {
    return Buffer.from(this.toJson());
  }
}

module.exports = SupplyCoffeeShipment;
