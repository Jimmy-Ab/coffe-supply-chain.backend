"use strict";

class SupplyCoffee {
  constructor() {
    this.id = "";
    this.bagId = "";
    this.bagSize = "";
    this.coffeeCherryBatchNo = "";
    this.coffeeType = ""; //washed vs natural
    this.batchNumber = "";
    this.measurmentUnit = "";
    this.sellingPrice = 0;
    this.currency = "";
    this.productionDate = "";
    this.productionPlace = "";
    this.origin = ""; //sidama, jimma
    this.owner = "";
    this.grade = "";
    this.gradeBy = "";
    this.gradeDate = "";
    this.warehouseId = "";
    this.quality = "";
    this.traceability = [];
    this.shipment = {};
    this.status = ""; //prosessed and not ptossessed
    this.isShipped = false;
    this.shimpemntId = "";
    this.txId = "";
  }

  static from(bufferOrJson) {
    if (Buffer.isBuffer(bufferOrJson)) {
      if (!bufferOrJson.length) {
        return;
      }

      bufferOrJson = JSON.parse(bufferOrJson.toString("utf-8"));
    }

    const result = new SupplyCoffee();
    result.id = bufferOrJson.id;
    result.bagId = bufferOrJson.bagId;
    result.bagSize = bufferOrJson.bagSize;
    result.coffeeType = bufferOrJson.coffeeType;
    result.coffeeCherryBatchNo = bufferOrJson.coffeeCherryBatchNo;
    result.batchNumber = bufferOrJson.batchNumber;
    result.measurmentUnit = bufferOrJson.measurmentUnit;
    result.sellingPrice = bufferOrJson.sellingPrice;
    result.productionDate = bufferOrJson.productionDate;
    result.productionPlace = bufferOrJson.productionPlace;
    result.owner = bufferOrJson.owner;
    result.grade = bufferOrJson.grade;
    result.gradeBy = bufferOrJson.gradeBy;
    result.gradeDate = bufferOrJson.gradeDate;
    result.warehouseId = bufferOrJson.warehouseId;
    result.traceability = bufferOrJson.traceability;
    result.origin = bufferOrJson.origin;
    result.quality = bufferOrJson.quality;
    result.txId = bufferOrJson.txId;
    result.status = bufferOrJson.status;
    result.isShipped = bufferOrJson.isShipped;

    return result;
  }

  toJson() {
    return JSON.stringify(this);
  }

  toBuffer() {
    return Buffer.from(this.toJson());
  }
}

module.exports = SupplyCoffee;
