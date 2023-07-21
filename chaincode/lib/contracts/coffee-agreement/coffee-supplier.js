"use strict";

const {
  CoffeeAgreementContractBase,
} = require("./coffee-agreement-contract-base");
const CoffeeDeliveryAgreementStatus = require("../../enums/coffee-delivery-agreement-status");

class CoffeeAgreementCoffeeSupplierContract extends CoffeeAgreementContractBase {
  constructor() {
    super("CoffeeAgreementCoffeeSupplierContract");
    this.txId = "";
  }
  async beforeTransaction(ctx) {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }

  async initLedger(ctx) {
    console.log("cherry coffee init on investor");
  }

  async signCoffeeContract(ctx, id, sellerRemark) {
    this._require(id, "id");
    this._require(sellerRemark, "sellerRemark");

    if (!(await this._doesCoffeeAgreementExist(ctx.stub, id))) {
      throw new Error(`Delivery contract not exist`);
    }

    let _coffeeAgrement = await this._getCoffeeAgreement(ctx.stub, id);
    if (_coffeeAgrement.seller !== ctx.clientIdentity.getMSPID()) {
      throw new Error(
        `You are not part of this supply coffee delivery contract`
      );
    }
    if (
      _coffeeAgrement.contractStatus !== CoffeeDeliveryAgreementStatus.REQUESTED
    ) {
      throw new Error(`The contract is not on the signing stage`);
    }

    _coffeeAgrement.contractStatus = CoffeeDeliveryAgreementStatus.SIGNED;
    _coffeeAgrement.sellerRemark = sellerRemark;
    _coffeeAgrement.signedDate = new Date();
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      _coffeeAgrement.toBuffer()
    );
  }
}


module.exports = CoffeeAgreementCoffeeSupplierContract;