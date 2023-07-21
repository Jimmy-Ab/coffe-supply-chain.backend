"use strict";

const { ExportCoffeeContractBase } = require("./export-coffee-contract-base");
const ExportCoffeeProcessingWarehousngInd = require("../../models/export-coffee-processing-warehousing-ind");

class ExportCoffeeRegulatorContract extends ExportCoffeeContractBase {
  constructor() {
    super("ExportCoffeeRegulatorContract");
    this.txId = "";
  }

  async beforeTransaction(ctx) {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }

  async initLedger(ctx) {
    console.log("cherry coffee init on investor");
  }

  async registerExportCoffeeProductionInd(
    ctx,
    id,
    name,
    machineSpec,
    owner,
    address,
    size,
    warehouseSize,
    hasAirConditioner,
    hasPreCleaner,
    hasPneumaticAspirate,
    hasDensmetricSeparator,
    hasScreanGrading,
    hasColorSorter,
    latitude,
    longitude
  ) {
    this._require(id, "id");
    this._require(name, "name");
    this._require(machineSpec, "machineSpec");
    this._require(address, "address");
    this._require(owner, "owner");
    this._require(size, "size");

    const ind = ExportCoffeeProcessingWarehousngInd.from({
      id: id,
      name: name,
      machineSpec: machineSpec,
      owner: owner,
      address: address,
      size: size,
      warehouseSize: warehouseSize,
      hasAirConditioner: hasAirConditioner,
      hasPreCleaner: hasPreCleaner,
      hasPneumaticAspirate: hasPneumaticAspirate,
      hasDensmetricSeparator: hasDensmetricSeparator,
      hasScreanGrading: hasScreanGrading,
      hasColorSorter: hasColorSorter,
      latitude: latitude,
      longitude: longitude,
    }).toBuffer();

    await ctx.stub.putState(
      this._createExportCoffeeProcessingIndCK(ctx.stub, [owner, id]),
      ind
    );
  }

  async UpdateExportCoffeeProductionInd(
    ctx,
    id,
    name,
    machineSpec,
    owner,
    address,
    size,
    warehouseSize,
    hasAirConditioner,
    hasPreCleaner,
    hasPneumaticAspirate,
    hasDensmetricSeparator,
    hasScreanGrading,
    hasColorSorter,
    latitude,
    longitude
  ) {
    this._require(id, "id");
    this._require(name, "name");
    this._require(machineSpec, "machineSpec");
    this._require(address, "address");
    this._require(owner, "owner");
    this._require(size, "size");

    if (!(await this._doesExportCoffeeProcessingIndExist(ctx.stub, [id]))) {
      throw new Error(
        `Export coffee processing industry with id: ${id} does not exist`
      );
    }

    const _ind = await this.__getExportCoffeeProcessingInd(ctx.stub, [id]);
    _ind.id = id;
    _ind.name = name;
    _ind.machineSpec = machineSpec;
    _ind.owner = owner;
    _ind.address = address;
    _ind.size = size;
    _ind.warehouseSize = warehouseSize;
    _ind.hasAirConditioner = hasAirConditioner;
    _ind.hasPreCleaner = hasPreCleaner;
    _ind.hasPneumaticAspirate = hasPneumaticAspirate;
    _ind.hasDensmetricSeparator = hasDensmetricSeparator;
    _ind.hasScreanGrading = hasScreanGrading;
    _ind.hasColorSorter = hasColorSorter;
    _ind.latitude = latitude;
    _ind.longitude = longitude;

    await ctx.stub.putState(
        this._createExportCoffeeProcessingIndCK(ctx.stub, [owner, id]),
        ind.toBuffer()
      );
  }

  async removeExportCoffeeProductionInd(ctx, owner, id) {
    this._require(id, "id");
    await ctx.stub.deleteState(this._createExportCoffeeProcessingIndCK(ctx.stub, [owner, id]));
  }

  async getExportCoffeeProductionInd(ctx, owner, id) {
    const keys = [];
    const allResults = [];

    keys.push(owner);
    keys.push(id);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "ExportCoffeeProcessingInd",
      keys
    )) {
      const strValue = Buffer.from(value).toString("utf8");
      let record;
      try {
        record = JSON.parse(strValue);
        console.log(err);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push({ Key: key, Record: record });
    }
    console.info(allResults);
    return JSON.stringify(allResults);
  }

  async getAllExportCoffeeProductionInd(ctx, owner) {
    const keys = [];
    keys.push(owner);
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "ExportCoffeeProcessingInd",
      keys
    )) {
      const strValue = Buffer.from(value).toString("utf8");
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push({ Key: key, Record: record });
    }
    console.info(allResults);
    return JSON.stringify(allResults);
  }


}

module.exports = ExportCoffeeRegulatorContract;
