"use strict";

class CoffeeCherry {
  constructor() {
    this.deliveryId = "";
    this.batchNumber = "";
    this.quantity = 0;
    this.unitOfMeasure = "";
    this.farmPlace = "";
    this.coffeegrower = "";
    this.collectionDate = "";
    this.deliveredTo = "";
    this.deliveryDate = "";
    this.sellingPrice = "";
    this.currency = "";
    this.paidPrice = "";
    this.warehouseId = "";
    this.deliveries = [];
    this.latitude = "";
    this.longitude = "";
    this.txDate = "";

    this.status = ""; //processed  & unprocessed
    this.qualityStatus = ""; //passed & failed
    this.qualityInspectionDate = "";
  }

  static from(bufferOrJson) {
    if (Buffer.isBuffer(bufferOrJson)) {
      if (!bufferOrJson.length) {
        return;
      }

      bufferOrJson = JSON.parse(bufferOrJson.toString("utf-8"));
    }

    const result = new CoffeeCherry();
    result.deliveryId = bufferOrJson.deliveryId;
    result.batchNumber = bufferOrJson.batchNumber;
    result.quantity = bufferOrJson.quantity;
    result.unitOfMeasure = bufferOrJson.unitOfMeasure;
    result.sellingPrice = bufferOrJson.sellingPrice;
    result.currency = bufferOrJson.currency;
    result.farmPlace = bufferOrJson.farmPlace;
    result.coffeegrower = bufferOrJson.coffeegrower;
    result.deliveredTo = bufferOrJson.deliveredTo;
    result.deliveryDate = bufferOrJson.deliveryDate;
    result.warehouseId = bufferOrJson.warehouseId;
    result.paidPrice = bufferOrJson.paidPrice;
    result.txDate = bufferOrJson.txDate;
    result.collectionDate = bufferOrJson.collectionDate;
    result.qualityStatus = bufferOrJson.qualityStatus;
    result.qualityInspectionDate = bufferOrJson.qualityInspectionDate;
    result.status = bufferOrJson.status;
    result.deliveries = bufferOrJson.deliveries;
    result.latitude = bufferOrJson.latitude;
    result.longitude = bufferOrJson.longitude;
    return result;
  }
  toJson() {
    return JSON.stringify(this);
  }
  toBuffer() {
    return Buffer.from(this.toJson());
  }
}

module.exports = CoffeeCherry;
