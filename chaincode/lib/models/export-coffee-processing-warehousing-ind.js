"use strict";

class ExportCoffeeProcessingWarehousngInd {
  constructor() {
    this.id = "";
    this.txId = "";
    this.name = "";
    this.machineSpec = "";
    this.owner = "";
    this.address = "";
    this.size = "";
    this.warehouseSize = "";
    this.hasAirConditioner = false;
    this.hasPreCleaner = false;
    this.hasPneumaticAspirate = false;
    this.hasDensmetricSeparator = false;
    this.hasScreanGrading = false;
    this.hasColorSorter = false;
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
    const ind = new ExportCoffeeProcessingWarehousngInd();
    ind.id = bufferOrJson.id;
    ind.txId = bufferOrJson.txId;
    ind.name = bufferOrJson.name;
    ind.owner = bufferOrJson.owner;
    ind.machineSpec = bufferOrJson.machineSpec;
    ind.address = bufferOrJson.address;
    ind.size = bufferOrJson.size;
    ind.hasAirConditioner = bufferOrJson.hasAirConditioner;
    ind.hasPreCleaner = bufferOrJson.hasPreCleaner;
    ind.hasPneumaticAspirate = bufferOrJson.hasPneumaticAspirate;
    ind.hasDensmetricSeparator = bufferOrJson.hasDensmetricSeparator;
    ind.hasScreanGrading = bufferOrJson.hasScreanGrading;
    ind.hasColorSorter = bufferOrJson.hasColorSorter;
    ind.warehouseSize = bufferOrJson.warehouseSize;
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

module.exports = ExportCoffeeProcessingWarehousngInd;
