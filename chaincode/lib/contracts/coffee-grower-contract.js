"use strict";
const { Contract } = require("fabric-contract-api");
const CoffeeGrower = require("../models/coffee-grower");
const ClientIdentity = require("fabric-shim").ClientIdentity;
const getDate = require("../helper/get-date");
class CoffeeGrowerContract extends Contract {
  constructor() {
    //  super('de.adeymeselesh.CoffeeGrowerContract');
    super("CoffeeGrowerContract");
    //DataModel
    this.txId = "";
    this.Cid = {};
  }
  async beforeTransaction(ctx) {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);

    //create client identity instance
    this.Cid = new ClientIdentity(ctx.stub);

    //get the MDPID from the invoker
    console.log(this.Cid.getMSPID());

    //a string in the form of "x509::{subject DN}::{issuer DB}" will be returned

    // const cert = this._splitId(this.Cid.getID());
  }

  async afterTransaction(ctx, result) {
    console.log("transaction done, R: ", result);
  }

  unknownTransaction(ctx) {
    let ret = ctx.stub.getFunctionAndParameters();
    throw new Error(`CC method ${ret.fcn} not defined`);
  }

  async initLedger(ctx) {
    const growerBuffer = CoffeeGrower.from({
      id: "id",
      nationalityId: "nationalityId",
      fullName: "fullName",
      farmPlace: "farmPlace",
      farmSize: "farmSize",
      deliveries: [],
      registeredAt: getDate(),
      longitude: "36° 49' 59.99\" E",
      latitude: "7° 39' 59.99\" N",
      txId: this.txId,
    }).toBuffer();
    // await ctx.stub.putState(this._createCK(ctx.stub, 'nationalityId'), Buffer.from(JSON.stringify(grower)));
    await ctx.stub.putState(this._createCK(ctx.stub, "id"), growerBuffer);
  }
  async registerCoffeeGrower(
    ctx,
    id,
    nationalityId,
    fullName,
    gender,
    farmPlace,
    farmSize,
    maritalStatus,
    dateOfBirth,
    latitude,
    longitude
  ) {
    this._require(id, "id");
    this._require(nationalityId, "nationalityId");
    this._require(fullName, "fullName");
    this._require(farmPlace, "farmPlace");
    this._require(farmSize, "farmSize");

    if (await this._doesCoffeeGrowerExist(ctx.stub, [id])) {
      throw new Error(`Coffee grower: ${fullName} is already created`);
    }
    const coffeeGrowerBuffer = CoffeeGrower.from({
      id: id,
      nationalityId: nationalityId,
      gender: gender,
      fullName: fullName,
      maritalStatus: maritalStatus,
      dateOfBirth: dateOfBirth,
      farmPlace: farmPlace,
      farmSize: farmSize,
      registeredAt: getDate(),
      deliveries: [],
      latitude: latitude,
      longitude: longitude,
      txId: this.txId,
    }).toBuffer();
    await ctx.stub.putState(this._createCK(ctx.stub, id), coffeeGrowerBuffer);
  }

  async _doesCoffeeGrowerExist(stub, key) {
    const savedCoffeeGrowerBytes = await stub.getState(
      this._createCK(stub, key)
    );
    return (
      !!savedCoffeeGrowerBytes && savedCoffeeGrowerBytes.toString().length > 0
    );
  }

  async updateCoffeeGrower(
    ctx,
    id,
    nationalityId,
    fullName,
    gender,
    farmPlace,
    farmSize,
    maritalStatus,
    dateOfBirth,
    latitude,
    longitude
  ) {
    this._require(fullName, "fullName");
    this._require(farmPlace, "farmPlace");
    this._require(farmSize, "farmSize");

    if (!(await this._doesCoffeeGrowerExist(ctx.stub, [id]))) {
      throw new Error(
        `Coffee grower: ${fullName} with id: ${id} does not exist`
      );
    }
    const _coffeeGrower = await this._getCoffeeGrower(ctx.stub, id);
    console.log("_coffeeGrower: " + _coffeeGrower);
    _coffeeGrower.id = id;
    _coffeeGrower.nationalityId = nationalityId;
    _coffeeGrower.gender = gender;
    _coffeeGrower.fullName = fullName;
    _coffeeGrower.maritalStatus = maritalStatus;
    _coffeeGrower.dateOfBirth = dateOfBirth;
    _coffeeGrower.farmPlace = farmPlace;
    _coffeeGrower.farmSize = farmSize;
    _coffeeGrower.latitude = latitude;
    _coffeeGrower.longitude = longitude;
    console.info(`_coffeeGrower: {_coffeeGrower}`);
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      _coffeeGrower.toBuffer()
    );
  }
  async addDelivery(
    ctx,
    id,
    deliveryId,
    batchNumber,
    quantity,
    unitOfMeasure,
    deliveredDate,
    sellingPrice
  ) {
    //get grower and add current delivery
    this._require(id, "id");

    const coffeeGrower = await this._getCoffeeGrower(ctx.stub, id);

    const delivery = {
      deliveryId: deliveryId,
      batchNumber: batchNumber,
      quantity: quantity,
      unitOfMeasure: unitOfMeasure,
      deliveredDate: deliveredDate,
      sellingPrice: sellingPrice,
    };

    coffeeGrower.deliveries.push(delivery);
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      Buffer.from(JSON.stringify(coffeeGrower))
    );
  }

  async removeCoffeeGrower(ctx, id) {
    // this._requireCoffeeProcessor(ctx);
    this._require(id, "id");

    await ctx.stub.deleteState(this._createCK(ctx.stub, id));
  }

  async getCoffeeGrower(ctx, id) {
    const coffeeGrowerBytes = await ctx.stub.getState(
      this._createCK(ctx.stub, id)
    );
    if (!coffeeGrowerBytes || coffeeGrowerBytes.length === 0) {
      throw new Error(`${id} dpes not exist`);
    }
    return coffeeGrowerBytes.toString();
  }

  async getCoffeeGrowerByName(ctx, fullName) {
    let queryString = {};
    queryString.selector = { fullName: fullName };
    let iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    let result = await this._getIteratorData(iterator);
    return result;
  }

  async _getIteratorData(iterator) {
    let resultArr = [];
    while (true) {
      let res = await iterator.next();
      let resJson = {};
      //res.value.key
      //res.value.value
      if (res.value && res.value.value.toString()) {
        resJson.key = res.value.key;
        resJson.value = JSON.parse(res.value.value.toString("utf-8"));
        resultArr.push(resJson);
      }

      if (res.done) {
        await iterator.close();
        return resultArr;
      }
    }
  }
  async getAllCoffeeGrowers(ctx) {
    const keys = [];
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeGrower",
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

  _createCK(stub, id) {
    return stub.createCompositeKey("CoffeeGrower", [`${id}`]);
  }

  async _getCoffeeGrower(stub, id) {
    const coffeeGrowerByte = await stub.getState(this._createCK(stub, id));
    return CoffeeGrower.from(coffeeGrowerByte);
  }
  _require(value, name) {
    if (!value) {
      throw new Error(`Parameter ${name} is missing.`);
    }
  }

  _hasAttribute(allowedAttribute) {
    let status = false;
    for (let i = 0; i < allowedAttribute.length; i++) {
      if (this.Cid.getAttributeValue(allowedAttribute[i], "true")) {
        status = true;
        break;
      }
    }
    return status;
  }

  _splitId(x509) {
    let a = x509.split("::"),
      cert = {};
    cert.typ = a[0];
    cert.subject = this._splitInfo(a[1]);
    cert.issuer = this._splitInfo(a[2]);
    return cert;
  }

  _splitInfo(data) {
    let dataA = data.split("/");
    return dataA.reduce(function (result, item) {
      let i = item.split("=");
      if (i[0] !== "") {
        result[i[0]] = i[1];
      }
      return result;
    });
  }
}

module.exports = CoffeeGrowerContract;
