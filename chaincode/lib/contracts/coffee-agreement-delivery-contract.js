"use strict";
const { Contract } = require("fabric-contract-api");
const SupplyCoffeeShipment = require("../models/supply-coffee-shipment");
const CoffeeAgreementDelivery = require("../models/coffee-agreement-delivery");
const CoffeeDeliveryAgreement = require("../models/coffee-delivery-agreement");
const coffeeDeliveryAgreementStatus = require("../enums/coffee-delivery-agreement-status");
const CoffeeAgreementDeliveryStatus = require("../enums/coffee-agreement-delivery-status");
const ShipmentStatus = require("../enums/shipment-status");

class CoffeeAgreementDeliveryContract extends Contract
{
  constructor()
  {
    super("CoffeeAgreementDeliveryContract");
    this.txId = "";
  }

  async initLedger(ctx)
  {
    console.log("CoffeeAgreementDeliveryContract");
  }

  async contractDeliveryRequest(
    ctx,
    id,
    contractId,
    quantity,
    deliveryCountry,
    deliveryCity,
    deliveryLongtitude,
    deliveryLatitude,
    coffeePrice,
    coffeeType,
    deliveryDate,
    shipmentId
  )
  {
    this._require(id, "id");
    this._require(contractId, "contractId");
    this._require(quantity, "quantity");
    this._require(deliveryCountry, "deliveryCountry");
    this._require(deliveryCity, "deliveryCity");
    this._require(deliveryLongtitude, "deliveryLongtitude");
    this._require(deliveryLatitude, "deliveryLatitude");
    this._require(coffeeType, "coffeeType");
    this._require(coffeePrice, "coffeePrice");
    this._require(deliveryDate, "deliveryDate");
    this._require(shipmentId, "shipmentId");

    //check for delvery contract
    if (!(await this._doesDeliveryAgreementExist(ctx.stub, [contractId])))
    {
      throw new Error(`Delivery contract not exist`);
    }

    let _deliveryAgreement = await this._getCoffeeDeliveryAgreement(
      ctx.stub,
      contractId
    );
    console.log("_deliveryAgreement");
    console.log(_deliveryAgreement);
    if (
      _deliveryAgreement.contractStatus !==
      coffeeDeliveryAgreementStatus.APPROVED
    )
    {
      throw new Error(`The contract is not approved to deliver product`);
    }
    /* if (
      _deliveryAgreement.deliveryCountry !== deliveryCountry ||
      _deliveryAgreement.deliveryCity !== deliveryCity ||
      _deliveryAgreement.deliveryLongtitude !== deliveryLongtitude ||
      _deliveryAgreement.deliveryLatitude !== deliveryLatitude
    ) {
      throw new Error(`The contract delivery place is not right`);
    } */

    //check for shipment
    let _shipment = await this._getshipmentDelivery(ctx.stub, shipmentId);
    if (_shipment.status !== ShipmentStatus.DELIVERED)
    {
      throw new Error(
        `The specified shipment is not delivered yet is is ${_shipment.status} status`
      );
    }

    /*  if (_shipment.quantity !== quantity) {
      throw new Error(
        `Please check that the delivered shipment quantity: ${_shipment.quantity} is different from this shipment delivery: ${quantity}`
      );
    } */
    let _coffeePrice =
      quantity *
      (coffeePrice + coffeePrice * _deliveryAgreement.pricePercentage);
    const _delivery = CoffeeAgreementDelivery.from({
      id: id,
      contractId: contractId,
      shipmentId: shipmentId,
      quantity: quantity,
      coffeePrice: _coffeePrice,
      coffeeType: coffeeType,
      deliveryDate: deliveryDate,
      status: CoffeeAgreementDeliveryStatus.REQUESTED,
    }).toBuffer();
    await ctx.stub.putState(
      this._createAgreementDeliveryCK(ctx.stub, [contractId, id]),
      _delivery
    );
  }
  async contractDeliveryApproval(ctx, id, contractId)
  {
    this._require(id, "id");
    this._require(contractId, "contractId");
    var _key = [];
    _key.push(contractId);
    _key.push(id);
    let _agreementDelivery = await this._getCoffeeAgreementDelivery(
      ctx.stub,
      _key
    );
    if (_agreementDelivery.status !== CoffeeAgreementDeliveryStatus.REQUESTED)
    {
      throw new Error(`This delivery is not at request state to approve`);
    }
    _agreementDelivery.status = CoffeeAgreementDeliveryStatus.APPROVED;
    await ctx.stub.putState(
      this._createAgreementDeliveryCK(ctx.stub, [contractId, id]),
      _agreementDelivery.toBuffer()
    );

    //add delivered quantity to contract
    let _deliveryAgreement = await this._getCoffeeDeliveryAgreement(
      ctx.stub,
      contractId
    );
    console.log("_deliveryAgreement");
    console.log(_deliveryAgreement);

    _deliveryAgreement.deliveredQuantity =
      parseInt(_deliveryAgreement.deliveredQuantity) + parseInt(_agreementDelivery.quantity);
    await ctx.stub.putState(
      this._createCoffeeDeliveryAgreementCK(ctx.stub, contractId),
      _deliveryAgreement.toBuffer()
    );
  }
  async contractDeliveryPayment(ctx, contractId, id)
  {
    this._require(id, "id");
    this._require(contractId, "contractId");
    var _key = [];
    _key.push(contractId);
    _key.push(id);
    let _agreementDelivery = await this._getCoffeeAgreementDelivery(
      ctx.stub,
      _key
    );
    if (_agreementDelivery.status !== CoffeeAgreementDeliveryStatus.APPROVED)
    {
      throw new Error(`This delivery is not at aproved state to be paid`);
    }
    _agreementDelivery.status = CoffeeAgreementDeliveryStatus.PAID;
    await ctx.stub.putState(
      this._createAgreementDeliveryCK(ctx.stub, [contractId, id]),
      _agreementDelivery.toBuffer()
    );
  }

  async contractDeliveryRejection(ctx, contractId, id)
  {
    this._require(id, "id");
    this._require(contractId, "contractId");
    var _key = [];
    _key.push(contractId);
    _key.push(id);
    let _agreementDelivery = await this._getCoffeeAgreementDelivery(
      ctx.stub,
      _key
    );
    if (_agreementDelivery.status !== CoffeeAgreementDeliveryStatus.APPROVED)
    {
      throw new Error(`This delivery is not at aproved state to be rejected`);
    }

    _agreementDelivery.status = CoffeeAgreementDeliveryStatus.REJECTED;
    await ctx.stub.putState(
      this._createAgreementDeliveryCK(ctx.stub, [contractId, id]),
      _agreementDelivery.toBuffer()
    );
  }

  async removeContractDelivery(ctx, contractId, id)
  {
    this._require(id, "id");
    this._require(contractId, "contractId");
    var _key = [];
    _key.push(contractId);
    _key.push(id);
    let _deliveryAgreement = await this._getCoffeeDeliveryAgreement(
      ctx.stub,
      contractId
    );

    let _agreementDelivery = await this._getCoffeeAgreementDelivery(
      ctx.stub,
      _key
    );
    /* //reduce size
    _deliveryAgreement.deliveredQuantity =
      _deliveryAgreement.deliveredQuantity - _agreementDelivery.quantity; */

    _deliveryAgreement.deliveredQuantity =
      parseInt(_deliveryAgreement.deliveredQuantity) - parseInt(_agreementDelivery.quantity);
    await ctx.stub.putState(
      this._createCoffeeDeliveryAgreementCK(ctx.stub, contractId),
      _deliveryAgreement.toBuffer()
    );

    await ctx.stub.deleteState(
      this._createAgreementDeliveryCK(ctx.stub, [contractId, id])
    );
  }

  async getContractDelivery(ctx, contractId, id)
  {
    const coffeeGrowerBytes = await ctx.stub.getState(
      this._createAgreementDeliveryCK(ctx.stub, [contractId, id])
    );
    if (!coffeeGrowerBytes || coffeeGrowerBytes.length === 0)
    {
      throw new Error(`${id} dpes not exist`);
    }
    return coffeeGrowerBytes.toString();
  }

  async getContractDeliveryPerContract(ctx, contractId)
  {
    this._require(contractId, "contractId");
    const keys = [];
    const allResults = [];
    keys.push(contractId);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeAgreementDelivery",
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

  async getAllDeliveryAgreements(ctx)
  {
    const keys = [];
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeAgreementDelivery",
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

  /*   async _getCoffeeAgreementDelivery(stub, key) {
    const agreementDeliveryByte = await stub.getState(
      this._createAgreementDeliveryCK(stub, key)
    );
    return (agreementDeliveryByte = CoffeeAgreementDelivery.from(
      agreementDeliveryByte
    ));
  }
 */

  async _getCoffeeAgreementDelivery(stub, key)
  {
    const _shipmentBytes = await stub.getState(
      this._createAgreementDeliveryCK(stub, key)
    );
    return CoffeeAgreementDelivery.from(_shipmentBytes);
  }

  _createAgreementDeliveryCK(stub, keys)
  {
    return stub.createCompositeKey("CoffeeAgreementDelivery", keys);
  }

  async _getshipmentDelivery(stub, id)
  {
    const _shipmentBytes = await stub.getState(
      this._createShipmentCK(stub, [id])
    );
    return SupplyCoffeeShipment.from(_shipmentBytes);
  }

  _createShipmentCK(stub, keys)
  {
    return stub.createCompositeKey("SupplyCoffeeShipment", keys);
  }

  async _doesDeliveryAgreementExist(stub, id)
  {
    const existingDeliveryAgreementByte = await stub.getState(
      this._createCoffeeDeliveryAgreementCK(stub, id)
    );
    return (
      !!existingDeliveryAgreementByte &&
      existingDeliveryAgreementByte.toString().length > 0
    );
  }
  /*  async _getCoffeeDeliveryAgreement(stub, id) {
    const deliveryAgreementtByte = await stub.getState(
      this._createCoffeeDeliveryAgreementCK(stub, id)
    );
    return (deliveryAgreementtByte = CoffeeDeliveryAgreement.from(
      deliveryAgreementtByte
    ));
  } */

  async _getCoffeeDeliveryAgreement(stub, id)
  {
    const deliveryAgreementtByte = await stub.getState(
      this._createCoffeeDeliveryAgreementCK(stub, id)
    );
    return CoffeeDeliveryAgreement.from(deliveryAgreementtByte);
  }

  _createCoffeeDeliveryAgreementCK(stub, id)
  {
    return stub.createCompositeKey("CoffeeAgreement", [`${id}`]);
  }

  _require(value, name)
  {
    if (!value)
    {
      throw new Error(`Parameter ${name} is missing.`);
    }
  }
}

module.exports = CoffeeAgreementDeliveryContract;
