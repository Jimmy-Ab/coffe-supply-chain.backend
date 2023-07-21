"use strict";

const { Contract } = require("fabric-contract-api");
const ExportCoffee = require("../../models/export-coffee");
const ExportCoffeeProcessingWarehousngInd = require("../../models/export-coffee-processing-warehousing-ind");

class ExportCoffeeContractBase extends Contract {
  constructor(namespace) {
    super(namespace);
  }
  _createCK(stub, keys) {
    return stub.createCompositeKey("ExportCoffee", keys);
  }
  async _getExportCoffee(stub, key) {
    const exportCoffeeByte = await stub.getState(this._createCK(stub, key));
    return ExportCoffee.from(exportCoffeeByte);
  }

  _createSupplyCoffeeCK(stub, keys) {
    return stub.createCompositeKey("SupplyCoffee", keys);
  }

  async _doesExportCoffeeProcessingIndExist(stub, key) {
    const ExportCoffeeProcessingIndBytes = await stub.getState(
      this._createExportCoffeeProcessingIndCK(stub, key)
    );
    return (
      !!ExportCoffeeProcessingIndBytes &&
      ExportCoffeeProcessingIndBytes.toString().length > 0
    );
  }

  async _getExportCoffeeProcessingInd(stub, key) {
    const exportCoffeeByte = await stub.getState(
      this._createExportCoffeeProcessingIndCK(stub, key)
    );
    return ExportCoffeeProcessingWarehousngInd.from(exportCoffeeByte);
  }

  _createExportCoffeeProcessingIndCK(stub, keys) {
    return stub.createCompositeKey("ExportCoffeeProcessingInd", keys);
  }

  _require(value, name) {
    if (!value) {
      throw new Error(`Parameter ${name} is missing.`);
    }
  }

  _toBuffer(obj) {
    return Buffer.from(JSON.stringify(obj));
  }

  _fromBuffer(buffer) {
    if (Buffer.isBuffer(buffer)) {
      if (!buffer.length) {
        return;
      }
    }

    return JSON.parse(buffer.toString("utf-8"));
  }
}

module.exports = { ExportCoffeeContractBase };
