"use strict";
const { SupplyCoffeeContractBase } = require("./supply-coffee-contract-base");
const supplyCoffee = require("../../models/supply-coffee");
const WashedSupplyCoffeeProcessingWarehousngInd = require("../../models/washed-supply-coffee-processing-warehousing-ind");
const NaturalSupplyCoffeeProcessingWarehousngInd = require("../../models/natural-supply-coffee-processing-warehousing-ind");
const CoffeeprocessStatus = require("../../enums/coffee-process-status");
const CoffeeQualityStatus = require("../../enums/coffee-quality-status");
const getDate = require("../../helper/get-date");

class SupplyCoffeeRegionalOrganContract extends SupplyCoffeeContractBase {
  constructor() {
    super("SupplyCoffeeRegionalOrganContract");
    this.txId = "";
  }
  async beforeTransaction(ctx) {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }

  async initLedger(ctx) {
    console.log("cherry coffee init on investor");
  }

  async registerWashedCoffeeProcessingWarehouseInd(
    ctx,
    id,
    name,
    owner,
    address,
    size,
    distanceFromRiver,
    hasSortingTable,
    hasFermentationPlace,
    hasWashingCanal,
    hasSkinDring,
    warehouseSize,
    hasWeightingScale,
    hasMoistureCalibrator,
    latitude,
    longitude
  ) {
    const inds = WashedSupplyCoffeeProcessingWarehousngInd.from({
      id: id,
      name: name,
      owner: owner,
      address: address,
      size: size,
      distanceFromRiver: distanceFromRiver,
      hasSortingTable: hasSortingTable,
      hasFermentationPlace,
      hasFermentationPlace,
      hasWashingCanal: hasWashingCanal,
      hasSkinDring: hasSkinDring,
      warehouseSize: warehouseSize,
      hasWeightingScale: hasWeightingScale,
      hasMoistureCalibrator: hasMoistureCalibrator,
      latitude: latitude,
      longitude: longitude,
      txID: this.txId,
    }).toBuffer();

    await ctx.stub.putState(
      this._createWashedCoffeeIndCK(ctx.stub, [id]),
      inds
    );
  }
  async _doesWashedCoffeeProcessingWarehouseIndExist(stub, key) {
    const savedWashedCoffeeProcessingWarehouseIndBytes = await stub.getState(
      this._createWashedCoffeeIndCK(stub, key)
    );
    return (
      !!savedWashedCoffeeProcessingWarehouseIndBytes &&
      savedWashedCoffeeProcessingWarehouseIndBytes.toString().length > 0
    );
  }

  async _getWashedSupplyCoffeeProcessingWarehousngInd(stub, id) {
    const indByte = await stub.getState(
      this._createWashedCoffeeIndCK(stub, [id])
    );
    return WashedSupplyCoffeeProcessingWarehousngInd.from(indByte);
  }
  async UpdateWashedCoffeeProcessingWarehouseInd(
    ctx,
    id,
    name,
    owner,
    address,
    size,
    distanceFromRiver,
    hasSortingTable,
    hasFermentationPlace,
    hasWashingCanal,
    hasSkinDring,
    warehouseSize,
    hasWeightingScale,
    hasMoistureCalibrator,
    latitude,
    longitude
  ) {
    this._require(id, "id");
    this._require(owner, "owner");
    if (
      !(await this._doesWashedCoffeeProcessingWarehouseIndExist(ctx.stub, [id]))
    ) {
      throw new Error(
        `Washed coffee processing warehouse industry with id: ${id} does not exist`
      );
    }
    const _inds = await this._getWashedSupplyCoffeeProcessingWarehousngInd(
      ctx.stub,
      id
    );
    _inds.id = id;
    (_inds.name = name), (_inds.owner = owner);
    _inds.address = address;
    _inds.size = size;
    _inds.distanceFromRiver = distanceFromRiver;
    _inds.hasSortingTable = hasSortingTable;
    _inds.hasFermentationPlace = hasFermentationPlace;
    _inds.hasWashingCanal = hasWashingCanal;
    _inds.hasSkinDring = hasSkinDring;
    _inds.warehouseSize = warehouseSize;
    _inds.hasWeightingScale = hasWeightingScale;
    _inds.hasMoistureCalibrator = hasMoistureCalibrator;
    _inds.latitude = latitude;
    _inds.longitude = longitude;

    await ctx.stub.putState(
      this._createWashedCoffeeIndCK(ctx.stub, [id]),
      _inds.toBuffer()
    );
  }

  async RemoveWashedCoffeeProcessingWarehouseInd(ctx, id) {
    this._require(id, "id");
    await ctx.stub.deleteState(this._createWashedCoffeeIndCK(ctx.stub, [id]));
  }

  async getWashedCoffeeInd(ctx, id) {
    const keys = [];
    const allResults = [];

    keys.push(id);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "WashedCoffeeInd",
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

  async getAllWashedCoffeeInd(ctx) {
    const keys = [];
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "WashedCoffeeInd",
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

  async registerNaturalCoffeeProcessingWarehouseInd(
    ctx,
    id,
    name,
    owner,
    address,
    size,
    machineSpec,
    dringAreaSize,
    warehouseSize,
    hasWeightingScale,
    hasMoistureCalibrator,
    latitude,
    longitude
  ) {
    this._require(id, "id");
    this._require(owner, "owner");

    const inds = NaturalSupplyCoffeeProcessingWarehousngInd.from({
      id: id,
      name: name,
      owner: owner,
      address: address,
      size: size,
      machineSpec: machineSpec,
      dringAreaSize: dringAreaSize,
      warehouseSize: warehouseSize,
      hasWeightingScale: hasWeightingScale,
      hasMoistureCalibrator: hasMoistureCalibrator,
      latitude: latitude,
      longitude: longitude,
      txId: this.txId,
    }).toBuffer();
    await ctx.stub.putState(
      this._createNaturalCoffeeIndCK(ctx.stub, [id]),
      inds
    );
  }

  //!TODO
  async _doesNaturalCoffeeProcessingWarehouseIndExist(stub, key) {
    const savedWashedCoffeeProcessingWarehouseIndBytes = await stub.getState(
      this._createNaturalCoffeeIndCK(stub, key)
    );
    return (
      !!savedWashedCoffeeProcessingWarehouseIndBytes &&
      savedWashedCoffeeProcessingWarehouseIndBytes.toString().length > 0
    );
  }

  async _getNaturalSupplyCoffeeProcessingWarehousngInd(stub, id) {
    const indByte = await stub.getState(
      this._createNaturalCoffeeIndCK(stub, [id])
    );
    return WashedSupplyCoffeeProcessingWarehousngInd.from(indByte);
  }

  async updateNaturalCoffeeProcessingWarehouseInd(
    ctx,
    id,
    name,
    owner,
    address,
    size,
    machineSpec,
    dringAreaSize,
    warehouseSize,
    hasWeightingScale,
    hasMoistureCalibrator,
    latitude,
    longitude
  ) {
    this._require(id, "id");
    this._require(owner, "owner");
    if (
      !(await this._doesNaturalCoffeeProcessingWarehouseIndExist(ctx.stub, [
        id,
      ]))
    ) {
      throw new Error(
        `Washed coffee processing warehouse industry with id: ${id} does not exist`
      );
    }
    const _inds = await this._getNaturalSupplyCoffeeProcessingWarehousngInd(
      ctx.stub,
      id
    );

    _inds.id = id;
    _inds.name = name;
    _inds.owner = owner;
    _inds.address = address;
    _inds.size = size;
    _inds.machineSpec = machineSpec;
    _inds.dringAreaSize = dringAreaSize;
    _inds.warehouseSize = warehouseSize;
    _inds.hasWeightingScale = hasWeightingScale;
    _inds.hasMoistureCalibrator = hasMoistureCalibrator;
    _inds.latitude = latitude;
    _inds.longitude = longitude;
    await ctx.stub.putState(
      this._createNaturalCoffeeIndCK(ctx.stub, [id]),
      _inds.toBuffer()
    );
  }

  async RemoveNaturalCoffeeProcessingWarehouseInd(ctx, id) {
    this._require(id, "id");
    await ctx.stub.deleteState(this._createNaturalCoffeeIndCK(ctx.stub, [id]));
  }

  async getNaturalCoffeeInd(ctx, owner) {
    const keys = [];
    const allResults = [];

    keys.push(owner);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "NaturalCoffeeInd",
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

  async getAllNaturalCoffeeInd(ctx) {
    const keys = [];
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "NaturalCoffeeInd",
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
  async regionalQaulityInspection(
    ctx,
    year,
    month,
    date,
    batchNumber,
    owner,
    moistureLevel
  ) {
    this._require(batchNumber, "batchNumber");
    this._require(year, "year");
    this._require(month, "month");
    this._require(date, "date");
    this._require(owner, "owner");
    const keys = [];
    keys.push(owner);
    keys.push(year);
    keys.push(month);
    keys.push(date);
    keys.push(batchNumber);
    const supplyCoffeeBytes = await ctx.stub.getState(
      this._createCK(ctx.stub, [owner, year, month])
    );
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "supplyCoffee",
      keys
    )) {
      const strValue = JSON.parse(Buffer.from(value).toString("utf8"));
      const _supplyCoffee = Coffee.from(strValue);

      const _id = idGenerator();
      _supplyCoffee.quality.sampleId = _id;
      _supplyCoffee.quality.moistureLevel = moistureLevel;
      _supplyCoffee.quality.checkedAt = getDate();

      await ctx.stub.putState(
        this._createCK(ctx, stub, [
          owner,
          year,
          month,
          date,
          batchNumber,
          _supplyCoffee.bagId,
        ]),
        _supplyCoffee
      );
    }
  }
}

module.exports = SupplyCoffeeRegionalOrganContract;
