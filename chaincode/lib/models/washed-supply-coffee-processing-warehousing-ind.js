"use strict";

class WashedSupplyCoffeeProcessingWarehousngInd {
  constructor() {
    this.id = "";
    this.txId = "";
    this.name = "";
    this.owner = "";
    this.address = "";
    this.size = "";
    this.distanceFromRiver = "";
    this.hasSortingTable = "";
    this.hasFermentationPlace = "";
    this.hasWashingCanal = "";
    this.hasSkinDring = "";
    this.warehouseSize = "";
    this.hasWeightingScale = "";
    this.hasMoistureCalibrator = "";
    this.startDate = "";
    this.endDate = "";
    this.givenBy = "";
    this.givenDate = "";
    this.status = ""; //granted, revoked
    this.latitude = "";
    this.longitude = "";
  }

  static from(bufferOrJson) {
    if (Buffer.isBuffer(bufferOrJson)) {
      if (!bufferOrJson.length) {
        return;
      }
      bufferOrJson = JSON.parse(bufferOrJson.toString("utf-8"));
    }
    const ind = new WashedSupplyCoffeeProcessingWarehousngInd();
    ind.id = bufferOrJson.id;
    ind.name = bufferOrJson.name;
    ind.txId = bufferOrJson.txId;
    ind.owner = bufferOrJson.owner;
    ind.address = bufferOrJson.address;
    ind.size = bufferOrJson.size;
    ind.distanceFromRiver = bufferOrJson.distanceFromRiver;
    ind.hasSortingTable = bufferOrJson.hasSortingTable;
    ind.hasFermentationPlace = bufferOrJson.hasFermentationPlace;
    ind.hasWashingCanal = bufferOrJson.hasWashingCanal;
    ind.hasSkinDring = bufferOrJson.hasSkinDring;
    ind.warehouseSize = bufferOrJson.warehouseSize;
    ind.hasWeightingScale = bufferOrJson.hasWeightingScale;
    ind.hasMoistureCalibrator = bufferOrJson.hasMoistureCalibrator;
    ind.startDate = bufferOrJson.startDate;
    ind.endDate = bufferOrJson.endDate;
    ind.givenBy = bufferOrJson.givenBy;
    ind.givenDate = bufferOrJson.givenDate;
    ind.status = bufferOrJson.status;
    ind.latitude = bufferOrJson.latitude;
    ind.longitude = bufferOrJson.longitude;
    return ind;
  }
  toJson() {
    return JSON.stringify(this);
  }
  toBuffer() {
    return Buffer.from(this.toJson());
  }
}

module.exports = WashedSupplyCoffeeProcessingWarehousngInd;
