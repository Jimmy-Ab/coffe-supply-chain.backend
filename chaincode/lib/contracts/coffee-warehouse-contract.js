"use strict";
const { Contract } = require("fabric-contract-api");
const CoffeeWarehouse = require("../models/coffee-warehouse");

class CoffeeWarehouseContract extends Contract {
  constructor() {
    super("CoffeeWarehouseContract");
    this.txId = "";
  }

  async beforeTransaction(ctx) {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }

  async initLedger(ctx) {
    const warehouse = CoffeeWarehouse.from({
      id: "id1",
      warehouseNo: "WH_001",
      name: "Warehouse one",
      address: "Jimma",
      size: "1000m2",
      capacity: "10000",
      owner: "Abebe",
      longitude: "36° 49' 59.99\" E",
      latitude: "7° 39' 59.99\" N",
      txId: this.txId,
    }).toBuffer();

    await ctx.stub.putState(this._createCK(ctx.stub, "id1"), warehouse);
  }

  async addNewWarehouse(
    ctx,
    id,
    warehouseNo,
    name,
    address,
    size,
    capacity,
    owner,
    latitude,
    longitude
  ) {
    this._require(id, "id");
    this._require(warehouseNo, "warehouseNo");
    this._require(name, "name");
    this._require(address, "address");
    this._require(size, "size");
    this._require(capacity, "capacity");
    this._require(latitude, "latitude");
    this._require(longitude, "longitude");

    if (await this._doesWareHouseExist(ctx.stub, [id])) {
      throw new Error(`Warehouse: ${name} is already exist`);
    }
    const warehouse = CoffeeWarehouse.from({
      id: id,
      warehouseNo: warehouseNo,
      name: name,
      address: address,
      size: size,
      capacity: capacity,
      owner: owner,
      latitude: latitude,
      longitude: longitude,
      txId: this.txId,
    }).toBuffer();

    await ctx.stub.putState(this._createCK(ctx.stub, id), warehouse);
  }
  async _doesWareHouseExist(stub, key) {
    const savedWarehouseBytes = await stub.getState(this._createCK(stub, key));
    return !!savedWarehouseBytes && savedWarehouseBytes.toString().length > 0;
  }

  async updateWarehouse(
    ctx,
    id,
    warehouseNo,
    name,
    address,
    size,
    capacity,
    owner,
    latitude,
    longitude
  ) {
    this._require(id, "id");
    this._require(warehouseNo, "warehouseNo");
    this._require(name, "name");
    this._require(address, "address");
    this._require(size, "size");
    this._require(capacity, "capacity");
    this._require(latitude, "latitude");
    this._require(longitude, "longitude");

    if (!(await this._doesWareHouseExist(ctx.stub, [id]))) {
      throw new Error(
        `Warehouse: ${name} is does not exist with warehouse number: ${warehouseNo}`
      );
    }

    const warehouse = await this._getCoffeeWarehouse(ctx.stub, id);
    warehouse.id = id;
    warehouse.warehouseNo = warehouseNo;
    warehouse.name = name;
    warehouse.address = address;
    warehouse.size = size;
    warehouse.capacity = capacity;
    warehouse.owner = owner;
    warehouse.latitude = latitude;
    warehouse.longitude = longitude;

    await ctx.stub.putState(this._createCK(ctx.stub, id), warehouse.toBuffer());
  }
  async removeWarehouse(ctx, id) {
    this._require(id, "id");

    await ctx.stub.deleteState(this._createCK(ctx.stub, id));
  }

  async getWarehouse(ctx, id) {
    const warehouseBytes = await ctx.stub.getState(
      this._createCK(ctx.stub, id)
    );
    if (!warehouseBytes || warehouseBytes.length === 0) {
      throw new Error(`${id} dpes not exist`);
    }
    return warehouseBytes.toString();
  }

  async getAllWarehouse(ctx) {
    const keys = [];
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "Warehouse",
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

  async _getCoffeeWarehouse(stub, id) {
    const warehouseBytes = await stub.getState(this._createCK(stub, id));
    return CoffeeWarehouse.from(warehouseBytes);
  }

  _createCK(stub, warehouseNo) {
    return stub.createCompositeKey("Warehouse", [`${warehouseNo}`]);
  }

  _require(value, name) {
    if (!value) {
      throw new Error(`Parameter ${name} is missing.`);
    }
  }
}

module.exports = CoffeeWarehouseContract;
