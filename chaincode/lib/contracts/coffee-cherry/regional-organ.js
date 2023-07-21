"use strict";

const { CoffeeCherryContractBase } = require("./coffee-cherry-Contract-base");
const CoffeeCherry = require("../../models/coffee-cherry");
const getDate = require("../../helper/get-date");
const ClientIdentity = require("fabric-shim").ClientIdentity;

class CoffeeCherryRegionalOrganContract extends CoffeeCherryContractBase {
  constructor() {
    super("CoffeeCherryRegionalOrganContract");
    this.txId = "";
    this.Cid = {};
  }

  async beforeTransaction(ctx) {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
    //create client identity instance
    this.Cid = new ClientIdentity(ctx.stub);
    //get the MDPID from the invoker
    console.log("CoffeeCherryRegionalOrganContract" + this.Cid.getMSPID());
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

  async qualityInspection(ctx, deliveredTo, batchNumber, deliveryId, quality) {
    //this._requireRegionalOrgan(ctx);
    this._require(batchNumber, "batchNumber");
    const key = [deliveredTo, batchNumber, deliveryId];
    var _cheryCoffeedelivery = await this._getCoffeeCherry(ctx.stub, key);

    console.log(_cheryCoffeedelivery);
    _cheryCoffeedelivery.qualityStatus = quality;
    _cheryCoffeedelivery.qualityInspectionDate = getDate();
    await ctx.stub.putState(
      this._createCoffeeCherryCK(ctx.stub, [
        deliveredTo,
        batchNumber,
        deliveryId,
      ]),
      _cheryCoffeedelivery.toBuffer()
    );
  }

  _requireRegionalOrgan(ctx) {
    if (ctx.ClientIdentity.getMSPID() !== "RegionalOrganMSP") {
      throw new Error(
        "This chaincode function can only called by regional organ"
      );
    }
  }
}

module.exports = CoffeeCherryRegionalOrganContract;
