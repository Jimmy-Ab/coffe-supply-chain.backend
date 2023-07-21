"use strict";
const { Contract } = require("fabric-contract-api");
const CoffeeDeliveryAgreement = require("../models/coffee-delivery-agreement");
const CoffeeDeliveryAgreementStatus = require("../enums/coffee-delivery-agreement-status");

class CoffeeAgreementContract extends Contract
{
  constructor()
  {
    super("CoffeeAgreementContract");
    this.txId = "";
  }
  async beforeTransaction(ctx)
  {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }
  async initLedger(ctx)
  {
    console.log("CoffeeContract");
  }

  async initiateContract(
    ctx,
    id,
    contractGoal,
    seller,
    buyer,
    sellerRight,
    sellerObligation,
    buyerRight,
    buyerObligation,
    BuyerRemark,
    cta,
    expectedQuantity,
    unit,
    deliveryAddress,
    pricePercentage,
    contractType,
    startDate,
    endDate
  )
  {
    this._require(id, "id");
    this._require(contractGoal, "contractGoal");
    this._require(seller, "seller");
    this._require(buyer, "buyer");
    this._require(sellerRight, "sellerRight");
    this._require(sellerObligation, "sellerObligation");
    this._require(buyerRight, "buyerRight");
    this._require(buyerObligation, "buyerObligation");
    this._require(BuyerRemark, "BuyerRemark");
    this._require(cta, "cta");
    this._require(expectedQuantity, "expectedQuantity");
    this._require(unit, "unit");
    this._require(deliveryAddress, "deliveryAddress");
    this._require(pricePercentage, "pricePercentage");
    this._require(contractType, "contractType");
    this._require(startDate, "startDate");
    this._require(endDate, "endDate");

    const coffeeDeliveryAgreementBuffer = CoffeeDeliveryAgreement.from({
      id: id,
      contractGoal: contractGoal,
      seller: seller,
      buyer: buyer,
      sellerRight: sellerRight,
      sellerObligation: sellerObligation,
      buyerRight: buyerRight,
      buyerObligation: buyerObligation,
      BuyerRemark: BuyerRemark,
      cta: cta,
      expectedQuantity: expectedQuantity,
      deliveredQuantity: 0,
      unit: unit,
      deliveryAddress: deliveryAddress,
      pricePercentage: pricePercentage,
      contractType: contractType,
      startDate: startDate,
      endDate: endDate,
      initiatedDate: new Date(),
      contractStatus: CoffeeDeliveryAgreementStatus.REQUESTED,
      txId: this.txId,
    }).toBuffer();
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      coffeeDeliveryAgreementBuffer
    );
  }

  //sign the contract by seller
  async signContract(ctx, id, sellerRemark)
  {
    this._require(id, "id");
    this._require(sellerRemark, "sellerRemark");

    if (!(await this._doesDeliveryAgreementExist(ctx.stub, id)))
    {
      throw new Error(`Delivery contract not exist`);
    }

    let _deliveryContract = await this._getCoffeeDeliveryAgreement(
      ctx.stub,
      id
    );
    if (_deliveryContract.seller !== ctx.clientIdentity.getMSPID())
    {
      throw new Error(
        `You are not part of this supply coffee delivery contract`
      );
    }
    if (
      _deliveryContract.contractStatus !==
      CoffeeDeliveryAgreementStatus.REQUESTED
    )
    {
      throw new Error(`The contract is not on the signing stage`);
    }

    _deliveryContract.contractStatus = CoffeeDeliveryAgreementStatus.SIGNED;
    _deliveryContract.sellerRemark = sellerRemark;
    _deliveryContract.signedDate = new Date();
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      _deliveryContract.toBuffer()
    );
  }

  async contractApproval(ctx, id, ectRemark)
  {
    this._require(id, "id");
    this._require(ectRemark, "ectRemark");

    if (!(await this._doesDeliveryAgreementExist(ctx.stub, id)))
    {
      throw new Error(`Delivery contract not exist`);
    }

    let _deliveryContract = await this._getCoffeeDeliveryAgreement(
      ctx.stub,
      id
    );
    if (_deliveryContract.seller !== ctx.clientIdentity.getMSPID())
    {
      throw new Error(
        `You are not part of this supply coffee delivery contract`
      );
    }
    if (
      _deliveryContract.contractStatus !== CoffeeDeliveryAgreementStatus.SIGNED
    )
    {
      throw new Error(`The contract is not on the signing stage`);
    }

    _deliveryContract.contractStatus = CoffeeDeliveryAgreementStatus.APPROVED;
    _deliveryContract.ectRemark = ectRemark;
    _deliveryContract.signedDate = new Date();
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      _deliveryContract.toBuffer()
    );
  }

  async contractTermination(ctx, id, terminationReason)
  {
    this._require(id, "id");
    this._require(terminationReason, "terminationReason");
    if (!(await this._doesDeliveryAgreementExist(ctx.stub, id)))
    {
      throw new Error(`Delivery contract not exist`);
    }

    let _deliveryContract = await this._getCoffeeDeliveryAgreement(
      ctx.stub,
      id
    );
    if (
      _deliveryContract.contractStatus !==
      CoffeeDeliveryAgreementStatus.APPROVED
    )
    {
      throw new Error(`The contract is not approval to terminate`);
    }
    _deliveryContract.contractStatus = CoffeeDeliveryAgreementStatus.TERMINATED;
    _deliveryContract.terminationDate = new Date();
    _deliveryContract.terminationReason = terminationReason;
    await ctx.stub.putState(
      this._createCK(ctx.stub, id),
      _deliveryContract.toBuffer()
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
      "CoffeeContract",
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

  async _getCoffeeDeliveryAgreement(stub, id)
  {
    const deliveryAgreementtByte = await stub.getState(
      this._createCK(stub, id)
    );
    return CoffeeDeliveryAgreement.from(deliveryAgreementtByte);
  }

  async _doesDeliveryAgreementExist(stub, id)
  {
    const existingDeliveryAgreementByte = await stub.getState(
      this._createCK(stub, id)
    );
    return (
      !!existingDeliveryAgreementByte &&
      existingDeliveryAgreementByte.toString().length > 0
    );
  }

  _createCK(stub, id)
  {
    return stub.createCompositeKey("CoffeeContract", [`${id}`]);
  }

  _require(value, name)
  {
    if (!value)
    {
      throw new Error(`Parameter ${name} is missing.`);
    }
  }
}

module.exports = CoffeeAgreementContract;
