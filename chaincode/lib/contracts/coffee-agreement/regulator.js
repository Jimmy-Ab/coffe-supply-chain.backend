"use strict";

const {
  CoffeeAgreementContractBase,
} = require("./coffee-agreement-contract-base");
const CoffeeDeliveryAgreementStatus = require("../../enums/coffee-delivery-agreement-status");

class CoffeeAgreementRegulatorContract extends CoffeeAgreementContractBase
{
  constructor()
  {
    super("CoffeeAgreementRegulatorContract");
    this.txId = "";
  }
  async beforeTransaction(ctx)
  {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }

  async initLedger(ctx)
  {
    console.log("cherry coffee init on investor");
  }

  async contractApproval(ctx, id, ectRemark)
  {
    this._require(id, "id");
    this._require(ectRemark, "ectRemark");

    if (!(await this._doesCoffeeAgreementExist(ctx.stub, id)))
    {
      throw new Error(`Delivery contract not exist`);
    }

    let _coffeeAgrement = await this._getCoffeeAgreement(ctx.stub, id);

    if (
      _coffeeAgrement.contractStatus !== CoffeeDeliveryAgreementStatus.SIGNED
    )
    {
      throw new Error(`The contract is not on the signing stage`);
    }

    _coffeeAgrement.contractStatus = CoffeeDeliveryAgreementStatus.APPROVED;
    _coffeeAgrement.ectRemark = ectRemark;
    _coffeeAgrement.signedDate = new Date();
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      _coffeeAgrement.toBuffer()
    );
  }

  async contractTermination(ctx, id, terminationReason)
  {
    this._require(id, "id");
    this._require(terminationReason, "terminationReason");
    if (!(await this._doesCoffeeAgreementExist(ctx.stub, id)))
    {
      throw new Error(`Delivery contract not exist`);
    }

    let _coffeeAgrement = await this._getCoffeeAgreement(ctx.stub, id);
    if (
      _coffeeAgrement.contractStatus !==
      CoffeeDeliveryAgreementStatus.APPROVED
    )
    {
      throw new Error(`The contract is not approval to terminate`);
    }
    _coffeeAgrement.contractStatus = CoffeeDeliveryAgreementStatus.TERMINATED;
    _coffeeAgrement.terminationDate = new Date();
    _coffeeAgrement.terminationReason = terminationReason;
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      _coffeeAgrement.toBuffer()
    );
  }

  async removeCoffeeDeliveryAgreement(ctx, id)
  {
    this._require(id, "id");

    await ctx.stub.deleteState(this._createCK(ctx.stub, id));
  }

  async getCoffeeDeliveryAgreement(ctx, id)
  {
    const coffeeGrowerBytes = await ctx.stub.getState(
      this._createCK(ctx.stub, id)
    );
    if (!coffeeGrowerBytes || coffeeGrowerBytes.length === 0)
    {
      throw new Error(`Coffee delivery contract with id: ${id} not exist`);
    }
    return coffeeGrowerBytes.toString();
  }

  async getAllCoffeeDeliveryAgreement(ctx)
  {
    const keys = [];
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeAgreement",
      keys
    ))
    {
      const strValue = Buffer.from(value).toString("utf8");
      let record;
      try
      {
        record = JSON.parse(strValue);
      } catch (err)
      {
        console.log(err);
        record = strValue;
      }
      allResults.push({ Key: key, Record: record });
    }
    console.info(allResults);
    return JSON.stringify(allResults);
  }
}

module.exports = CoffeeAgreementRegulatorContract;
