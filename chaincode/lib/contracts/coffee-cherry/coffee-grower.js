"use strict";

const { CoffeeCherryContractBase } = require("./coffee-cherry-Contract-base");
const CoffeeCherry = require("../../models/coffee-cherry");
const getDate = require("../../helper/get-date");
const CoffeeGrower = require("../../models/coffee-grower");
class CoffeeCherryGrowerContract extends CoffeeCherryContractBase
{
  constructor()
  {
    super("CoffeeCherryGrowerContract");
    this.txId = "";
  }
  async beforeTransaction(ctx)
  {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }
  async initLedger(ctx)
  {
    const coffeeCherryBuffer = CoffeeCherry.from({
      deliveryId: "deliveryId",
      batchNumber: "batchNumber",
      quantity: "quantity",
      unitOfMeasure: "unitOfMeasure",
      farmPlace: "farmPlace",
      coffeegrower: "coffeegrower",
      collectionDate: "collectionDate",
      deliveredTo: "deliveredTo",
      deliveryDate: "deliveryDate",
      sellingPrice: "sellingPrice",
      warehouse: "warehouse",
      currency: "sellingPrice",
      longitude: "36° 49' 59.99\" E",
      latitude: "7° 39' 59.99\" N",
      txId: this.txId,
    }).toBuffer();
    await ctx.stub.putState(
      this._createCoffeeCherryCK(ctx.stub, [
        "deliveredTo",
        "batchNumber",
        "deliveryId",
      ]),
      coffeeCherryBuffer
    );
  }

  //* Coffee chery delivery
  async coffeeCherryDelivery(
    ctx,
    deliveryId,
    batchNumber,
    quantity,
    unitOfMeasure,
    farmPlace,
    coffeegrower,
    collectionDate,
    sellingPrice,
    currency,
    // deliveredTo,
    warehouseId,
    latitude,
    longitude
  )
  {
    this._require(deliveryId, "deliveryId");
    this._require(batchNumber, "batchNumber");
    this._require(quantity, "quantity");
    this._require(unitOfMeasure, "unitOfMeasure");
    this._require(farmPlace, "farmPlace");
    this._require(coffeegrower, "coffeegrower");
    this._require(sellingPrice, "sellingPrice");
    this._require(warehouseId, "warehouseId");

    if (
      await this._doesCoffeeCherryDeliveryExist(ctx.stub, [
        // deliveredTo,
        ctx.clientIdentity.getMSPID(),
        batchNumber,
        deliveryId,
      ])
    )
    {
      throw new Error(
        `Coffee cherry ${deliveryId} has already been delivered.`
      );
    }

    if (
      !await this._doesWareHouseExist(ctx.stub, warehouseId)
    )
    {
      throw new Error(
        `Warehouse with id: ${warehouseId} does not exist.`
      );
    }

    const coffeeCherryBuffer = CoffeeCherry.from({
      deliveryId: deliveryId,
      batchNumber: batchNumber,
      quantity: quantity,
      unitOfMeasure: unitOfMeasure,
      farmPlace: farmPlace,
      coffeegrower: coffeegrower,
      collectionDate: collectionDate,
      // deliveredTo: deliveredTo,
      deliveredTo: ctx.clientIdentity.getMSPID(),
      deliveryDate: getDate(),
      sellingPrice: sellingPrice,
      currency: currency,
      warehouseId: warehouseId,
      latitude: latitude,
      longitude: longitude,
      qualityStatus: 'Not Assigned',
      status: 'Collected',
      txId: this.txId,
    }).toBuffer();

    await ctx.stub.putState(
      this._createCoffeeCherryCK(ctx.stub, [
        //  deliveredTo,
        ctx.clientIdentity.getMSPID(),
        batchNumber,
        deliveryId,
      ]),
      coffeeCherryBuffer
    );

    const coffeeGrowerBytes = await ctx.stub.getState(
      this._createCoffeeGrowerCK(ctx.stub, coffeegrower)
    );
    const coffeeGrowerIns = CoffeeGrower.from(coffeeGrowerBytes);
    console.log("coffeeGrowerIns:::::::::::: ");
    console.log(coffeeGrowerIns);

    coffeeGrowerIns.deliveries.push({
      deliveryId: deliveryId,
      batchNumber: batchNumber,
      quantity: quantity,
      // deliveredTo: deliveredTo,
      deliveredTo: ctx.clientIdentity.getMSPID()
    });
    await ctx.stub.putState(
      this._createCoffeeGrowerCK(ctx.stub, coffeegrower),
      coffeeGrowerIns.toBuffer()
    );
  }
  //TODO updateCoffeeCherryDelivery
  async updateCoffeeCherryDelivery(
    ctx,
    deliveryId,
    batchNumber,
    quantity,
    unitOfMeasure,
    farmPlace,
    coffeegrower,
    collectionDate,
    sellingPrice,
    warehouseId,
    currency,
    deliveredTo,
    latitude,
    longitude
  )
  {
    this._require(deliveryId, "deliveryId");
    this._require(batchNumber, "batchNumber");
    this._require(quantity, "quantity");
    this._require(unitOfMeasure, "unitOfMeasure");
    this._require(farmPlace, "farmPlace");
    this._require(coffeegrower, "coffeegrower");
    this._require(warehouseId, "warehouseId");

    const key = [deliveredTo, batchNumber, deliveryId];

    if (!(await this._doesCofffeeCheryExist(ctx.stub, key)))
    {
      throw new Error(`Coffee cherry delivery: ${deliveryId} does not exist`);
    }

    if (
      !await this._doesWareHouseExist(ctx.stub, warehouseId)
    )
    {
      throw new Error(
        `Warehouse with id: ${warehouseId} does not exist.`
      );
    }

    //* get coffee cherry
    var _cheryCoffeedelivery = await this._getCoffeeCherry(ctx.stub, key);
    console.log("_cheryCoffeedelivery :::::::::BEFORE::::::");
    console.log(_cheryCoffeedelivery);
    //* get old coffee grower
    const _oldCoffeeGrowerIns = await this._getCoffeeGrower(
      ctx.stub,
      _cheryCoffeedelivery.coffeegrower
    );
    console.log("_oldCoffeeGrowerIns:::::");
    console.log(_oldCoffeeGrowerIns);
    //* get new grower
    const _newCoffeeGrowerIns = await this._getCoffeeGrower(
      ctx.stub,
      coffeegrower
    );
    console.log("_newCoffeeGrowerIns:::::");
    console.log(_newCoffeeGrowerIns);

    /*
     *if the coffee grower for this delivery changed remove it from old and add it to the current grower
     *else update existing grower coffee delivery
     */

    if (_oldCoffeeGrowerIns.id !== _newCoffeeGrowerIns.id)
    {
      //* remove from old
      if (_oldCoffeeGrowerIns.deliveries)
      {
        _oldCoffeeGrowerIns.deliveries = _oldCoffeeGrowerIns.deliveries.filter(
          (p) =>
          {
            return p.deliveryId !== deliveryId;
          }
        );
        await ctx.stub.putState(
          this._createCoffeeGrowerCK(
            ctx.stub,
            _cheryCoffeedelivery.coffeegrower
          ),
          _oldCoffeeGrowerIns.toBuffer()
        );
      }
      //* push to new
      _newCoffeeGrowerIns.deliveries.push({
        deliveryId: deliveryId,
        batchNumber: batchNumber,
        quantity: quantity,
        deliveredTo: deliveredTo,
      });
      await ctx.stub.putState(
        this._createCoffeeGrowerCK(ctx.stub, coffeegrower),
        _newCoffeeGrowerIns.toBuffer()
      );
    } else
    {
      //* get delivery index
      const indx = _oldCoffeeGrowerIns.deliveries.findIndex(
        (p) => p.deliveryId === deliveryId
      );
      //* update
      _oldCoffeeGrowerIns.deliveries[indx] = {
        ..._oldCoffeeGrowerIns.deliveries[indx],
        batchNumber: batchNumber,
        quantity: quantity,
        deliveredTo: deliveredTo,
      };
      //save
      await ctx.stub.putState(
        this._createCoffeeGrowerCK(ctx.stub, _cheryCoffeedelivery.coffeegrower),
        _oldCoffeeGrowerIns.toBuffer()
      );
    }

    _cheryCoffeedelivery.deliveryId = deliveryId;
    _cheryCoffeedelivery.batchNumber = batchNumber;
    _cheryCoffeedelivery.quantity = quantity;
    _cheryCoffeedelivery.unitOfMeasure = unitOfMeasure;
    _cheryCoffeedelivery.farmPlace = farmPlace;
    _cheryCoffeedelivery.coffeegrower = coffeegrower;
    _cheryCoffeedelivery.collectionDate = collectionDate;
    _cheryCoffeedelivery.sellingPrice = sellingPrice;
    _cheryCoffeedelivery.warehouseId = warehouseId;
    _cheryCoffeedelivery.currency = currency;
    _cheryCoffeedelivery.deliveredTo = deliveredTo;
    _cheryCoffeedelivery.latitude = latitude;
    _cheryCoffeedelivery.longitude = longitude;

    await ctx.stub.putState(
      this._createCoffeeCherryCK(ctx.stub, key),
      _cheryCoffeedelivery.toBuffer()
    );
  }
  ///* delete coffee cherry delivery
  async deletecoffeeCherryDelivery(ctx, deliveredTo, batchNumber, deliveryId)
  {
    this._require(deliveredTo, "deliveredTo");
    this._require(batchNumber, "batchNumber");
    this._require(deliveryId, "deliveryId");
    const key = [deliveredTo, batchNumber, deliveryId];

    var _cheryCoffeedelivery = await this._getCoffeeCherry(ctx.stub, key);

    const coffeeGrowerIns = await this._getCoffeeGrower(
      ctx.stub,
      _cheryCoffeedelivery.coffeegrower
    );

    console.log("coffeeGrowerIns: ***********Before*********************** ");
    console.log(coffeeGrowerIns);
    //remove delivery from
    if (coffeeGrowerIns)
    {
      coffeeGrowerIns.deliveries = coffeeGrowerIns.deliveries.filter((p) =>
      {
        return p.deliveryId !== deliveryId;
      });
      console.log("coffeeGrowerIns: ***********After*********************** ");
      console.log(coffeeGrowerIns);
      await ctx.stub.putState(
        this._createCoffeeGrowerCK(ctx.stub, _cheryCoffeedelivery.coffeegrower),
        coffeeGrowerIns.toBuffer()
      );
    }

    await ctx.stub.deleteState(this._createCoffeeCherryCK(ctx.stub, key));
  }

  async _getCoffeeGrower(stub, id)
  {
    const coffeeGrowerByte = await stub.getState(
      this._createCoffeeGrowerCK(stub, id)
    );
    return CoffeeGrower.from(coffeeGrowerByte);
  }

  async _doesCoffeeCherryDeliveryExist(stub, key)
  {
    const savedCoffeeCherryDeliveryBytes = await stub.getState(
      this._createCoffeeCherryCK(stub, key)
    );
    return (
      !!savedCoffeeCherryDeliveryBytes &&
      savedCoffeeCherryDeliveryBytes.toString().length > 0
    );
  }


  async _doesWareHouseExist(stub, id)
  {
    const savedWarehouseBytes = await stub.getState(this._createWarehouseCK(stub, id));
    return !!savedWarehouseBytes && savedWarehouseBytes.toString().length > 0;
  }

}

module.exports = CoffeeCherryGrowerContract;
