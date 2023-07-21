"use strict";

const { Contract } = require("fabric-contract-api");
const CoffeeDailyPrice = require("../models/coffee-daily-price");
const getDate = require("../helper/get-date");
class CoffeeDailyPriceContract extends Contract {
  constructor() {
    super("CoffeeDailyPriceContract");
    this.txId = "";
  }

  async beforeTransaction(ctx) {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }

  async initLedger(ctx) {
    console.log("coffee-daily-price");
  }

  async setCoffeeDailyPrice(
    ctx,
    id,
    date,
    coffeeType,
    grade,
    price,
    currency,
    measurmentUnit
  ) {
    this._require(id, "id");
    this._require(date, "date");
    this._require(coffeeType, "coffeeType");
    this._require(grade, "grade");
    this._require(price, "price");
    this._require(currency, "currency");
    this._require(measurmentUnit, "measurmentUnit");
   
    const _date = new Date(date);
    const year = _date.getFullYear();
    const month = _date.getMonth() + 1;
    const day = _date.getDate();

 
    const key = [
      year.toString(),
      month.toString(),
      day.toString(),
     id
    ];
    if (await this._doesCoffeeDailyPriceExist(ctx.stub, key)) {
      throw new Error(`Date: ${date} price is already created`);
    }
    const todayPrice = CoffeeDailyPrice.from({
      id: id,
      date: date,
      coffeeType: coffeeType,
      grade: grade,
      price: price,
      currency: currency,
      measurmentUnit: measurmentUnit,
      txId: this.txId,
    }).toBuffer();
    await ctx.stub.putState(
      this._createCK(ctx.stub, [
        year.toString(),
        month.toString(),
        day.toString(),
        id
      ]),
      todayPrice
    );
  }

  async updateCoffeeDailyPrice(
    ctx,
    id,
    date,
    coffeeType,
    grade,
    price,
    currency,
    measurmentUnit
  ) {
    this._require(date, "date");
    this._require(coffeeType, "coffeeType");
    this._require(grade, "grade");
    this._require(price, "price");
    this._require(currency, "currency");
    this._require(measurmentUnit, "measurmentUnit");

   
    const _date = new Date(date);
    const year = _date.getFullYear();
    const month = _date.getMonth() + 1;
    const day = _date.getDate();

    const key = [year.toString(), month.toString(), day.toString(), id];

    if (!(await this._doesCoffeeDailyPriceExist(ctx.stub, key))) {
      throw new Error(`Date: ${date} price is does not exist`);
    }

    const _dailyPrice = await this._getCoffeeDailyPrice(ctx.stub, key);
    _dailyPrice.date = date;
    _dailyPrice.coffeeType = coffeeType;
    _dailyPrice.grade = grade;
    _dailyPrice.price = price;
    _dailyPrice.currency = currency;
    _dailyPrice.measurmentUnit = measurmentUnit;

    await ctx.stub.putState(this._createCK(ctx.stub, key), _dailyPrice.toBuffer());
  }

  async deleteCoffeeDailyPrice(ctx, date, id) {
    this._require(date, "date");
    this._require(id, "id");
    const _date = new Date(date);
    const year = _date.getFullYear();
    const month = _date.getMonth() + 1;
    const day = _date.getDate();

    const key = [year.toString(), month.toString(), day.toString(), id];

    if (!(await this._doesCoffeeDailyPriceExist(ctx.stub, key))) {
      throw new Error(`Date: ${date} price is does not exist`);
    }


    await ctx.stub.deleteState(this._createCK(ctx.stub, key));
    
  }

  async _getCoffeeDailyPrice(stub, id) {
    const coffeeDailyPriceBytes = await stub.getState(this._createCK(stub, id));
    return CoffeeDailyPrice.from(coffeeDailyPriceBytes);
  }
  async _doesCoffeeDailyPriceExist(stub, key) {
    const savedCoffeeDailyPriceBytes = await stub.getState(
      this._createCK(stub, key)
    );
    return (
      !!savedCoffeeDailyPriceBytes &&
      savedCoffeeDailyPriceBytes.toString().length > 0
    );
  }


  async getTodayPrice(ctx, date) {
    const _date = new Date(date);
    const year = _date.getFullYear();
    const month = _date.getMonth() + 1;
    const day = _date.getDate();
    const keys = [];
    const allResults = [];

    keys.push(year.toString());
    keys.push(month.toString());
    keys.push(day.toString());

    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeDailyPrice",
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

  async getPricePerYear(ctx, date) {
    this._require(date, "date");
    const _date = new Date(date);
    const year = _date.getFullYear();
    const keys = [];
    const allResults = [];

    keys.push(year.toString());
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeDailyPrice",
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

  async getPricePerYearAndMonth(ctx, date) {
    this._require(date, "date");

    const _date = new Date(date);
    const year = _date.getFullYear();
    const month = _date.getMonth() + 1;

    const keys = [];
    const allResults = [];

    keys.push(year.toString());
    keys.push(month.toString());

    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeDailyPrice",
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

  async getAllDailyPrice(ctx) {
    const keys = [];
    const allResults = [];

    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeDailyPrice",
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

  _createCK(stub, keys) {
    return stub.createCompositeKey("CoffeeDailyPrice", keys);
  }

  _require(value, name) {
    if (!value) {
      throw new Error(`Parameter ${name} is missing.`);
    }
  }
}

module.exports = CoffeeDailyPriceContract;
