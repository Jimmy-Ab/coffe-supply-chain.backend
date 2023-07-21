"use strict";
const { SupplyCoffeeContractBase } = require("./supply-coffee-contract-base");
const SupplyCoffee = require("../../models/supply-coffee");
const CoffeeCherry = require("../../models/coffee-cherry");
const WashedSupplyCoffeeProcessingWarehousngInd = require("../../models/washed-supply-coffee-processing-warehousing-ind");
const CoffeeTranporationCertificate = require("../../models/coffee-transportation-certificate");
const CoffeeprocessStatus = require("../../enums/coffee-process-status");
const CoffeeQualityStatus = require("../../enums/coffee-quality-status");
const ShipmentStatus = require("../../enums/shipment-status");
const CoffeeType = require("../../enums/coffee-type");
const CertificateStatus = require("../../enums/certificate-status");

const getDate = require("../../helper/get-date");
const SupplyCoffeeShipment = require("../../models/supply-coffee-shipment");
class SupplyCoffeeCoffeeSupplierContract extends SupplyCoffeeContractBase
{
  constructor()
  {
    super("SupplyCoffeeCoffeeSupplierContract");
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

  async produceNaturalCoffee(
    ctx,
    id,
    quantity,
    bagSize,
    owner,
    coffeeCherryBatchNo,
    measurmentUnit,
    naturalCoffeeProductionPlace
  )
  {
    this._require(id, "id");
    this._require(quantity, "quantity");
    this._require(bagSize, "bagSize");
    this._require(coffeeCherryBatchNo, "coffeeCherryBatchNo");
    console.log("A::---------------------");

    const keys = [];
    keys.push(owner);
    keys.push(coffeeCherryBatchNo);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeCherry",
      keys
    ))
    {
      console.log("B::---------------------");
      const strValue = JSON.parse(Buffer.from(value).toString("utf8"));
      const coffeeCherry = CoffeeCherry.from(strValue);
      console.log("coffeeCherry::---------------------");
      console.log(coffeeCherry);

      const batchNo = "BNO_N_" + id;
      if (coffeeCherry.status !== CoffeeprocessStatus.UNPROCESSED)
      {

      }
      for (let i = 0; i < quantity; i++)
      {
        const _bagId = "BAG_ID_" + id + "_" + i;
        console.log(ctx.clientIdentity.getMSPID());
        const naturalCoffeeBuffer = SupplyCoffee.from({
          id: id,
          bagId: _bagId,
          bagSize: bagSize,
          coffeeCherryBatchNo: coffeeCherryBatchNo,
          coffeeType: CoffeeType.NATURAL_COFFEE,
          batchNumber: batchNo,
          measurmentUnit: measurmentUnit,
          productionPlace: naturalCoffeeProductionPlace,
          productionDate: getDate(),
          owner: ctx.clientIdentity.getMSPID(),
          status: CoffeeprocessStatus.UNPROCESSED,
          isShipped: false,
          txId: this.txId,
          traceability: {
            deliveryId: coffeeCherry.deliveryId,
            batchNumber: coffeeCherry.batchNumber,
            farmPlace: coffeeCherry.farmPlace,
            coffeegrower: coffeeCherry.coffeegrower,
            deliveryDate: coffeeCherry.deliveryDate,
          },
        }).toBuffer();

        console.log(SupplyCoffee.from(naturalCoffeeBuffer));
        await ctx.stub.putState(
          this._createCK(ctx.stub, [
            ctx.clientIdentity.getMSPID(),
            batchNo,
            _bagId,
          ]),
          naturalCoffeeBuffer
        );
      }

      coffeeCherry.status = CoffeeprocessStatus.PROCESSED;
      await ctx.stub.putState(
        this._createCoffeeCherryCK(ctx.stub, [
          coffeeCherry.deliveredTo,
          coffeeCherryBatchNo,
          coffeeCherry.deliveryId,
        ]),
        coffeeCherry.toBuffer()
      );
    }
  }

  async produceWashedSupplyCoffee(
    ctx,
    id,
    quantity,
    bagSize,
    owner,
    coffeeCherryBatchNo,
    measurmentUnit,
    naturalCoffeeProductionPlace
  )
  {
    this._require(id, "id");
    this._require(quantity, "quantity");
    this._require(bagSize, "bagSize");
    this._require(coffeeCherryBatchNo, "coffeeCherryBatchNo");
    // this._requireNaturalCoffeeProductionPlace(ctx, owner, naturalCoffeeProductionPlace);

    const keys = [];
    keys.push(owner);
    keys.push(coffeeCherryBatchNo);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeCherry",
      keys
    ))
    {
      const strValue = JSON.parse(Buffer.from(value).toString("utf8"));
      const coffeeCherry = CoffeeCherry.from(strValue);
      console.log("coffeeCherry::---------------------");
      console.log(coffeeCherry);

      const batchNo = "BNO_N_" + id;

      for (let i = 0; i < quantity; i++)
      {
        const _bagId = "BAG_ID_" + id + "_" + i;
        console.log(ctx.clientIdentity.getMSPID());
        const naturalCoffeeBuffer = SupplyCoffee.from({
          id: id,
          bagId: _bagId,
          bagSize: bagSize,
          coffeeCherryBatchNo: coffeeCherryBatchNo,
          coffeeType: CoffeeType.WASHED_COFFEE,
          batchNumber: batchNo,
          measurmentUnit: measurmentUnit,
          productionPlace: naturalCoffeeProductionPlace,
          productionDate: getDate(),
          owner: ctx.clientIdentity.getMSPID(),
          status: CoffeeprocessStatus.UNPROCESSED,
          isShipped: false,
          txId: this.txId,
          traceability: {
            deliveryId: coffeeCherry.deliveryId,
            batchNumber: coffeeCherry.batchNumber,
            farmPlace: coffeeCherry.farmPlace,
            coffeegrower: coffeeCherry.coffeegrower,
            deliveryDate: coffeeCherry.deliveryDate,
          },
        }).toBuffer();

        console.log(SupplyCoffee.from(naturalCoffeeBuffer));
        await ctx.stub.putState(
          this._createCK(ctx.stub, [
            ctx.clientIdentity.getMSPID(),
            batchNo,
            _bagId,
          ]),
          naturalCoffeeBuffer
        );
      }

      coffeeCherry.status = CoffeeprocessStatus.PROCESSED;
      await ctx.stub.putState(
        this._createCoffeeCherryCK(ctx.stub, [
          coffeeCherry.deliveredTo,
          coffeeCherryBatchNo,
          coffeeCherry.deliveryId,
        ]),
        coffeeCherry.toBuffer()
      );
      //  }
    }
  }

  async getSupplyCoffeeOfOwner(ctx, owner)
  {
    const keys = [];
    const allResults = [];

    keys.push(owner);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "SupplyCoffee",
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

  async coffeeGrading(ctx, owner, batchNumber, grade)
  {
    this._require(batchNumber, "batchNumber");
    this._require(grade, "grade");
    const keys = [];
    keys.push(owner);
    keys.push(batchNumber);

    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "SupplyCoffee",
      keys
    ))
    {
      const strValue = JSON.parse(Buffer.from(value).toString("utf8"));
      const coffee = SupplyCoffee.from(strValue);
      coffee.grade = grade;
      coffee.gradeBy = ctx.clientIdentity.getMSPID();
      coffee.gradeDate = getDate();
      await ctx.stub.putState(
        this._createCK(ctx.stub, [batchNumber, coffee.bagId]),
        coffee.toBuffer()
      );
    }
  }
  async deleteSupplyCoffee(ctx, owner, batchNumber)
  {
    console.info(owner);
    console.info(batchNumber);
    if (ctx.clientIdentity.getMSPID() !== owner)
    {
      throw new Error(
        `Sorry, you are not allowed to delete supply coffee which does not belongs to you.`
      );
    }
    const keys = [];
    keys.push(owner);
    keys.push(batchNumber);

    console.info(keys);
    await ctx.stub.deleteState(this._createCK(ctx.stub, keys));
  }

  async supplyCoffeeShipment(
    ctx,
    id,
    owner,
    destination,
    batchNo,
    transporter,
    truck,
    shipmentDate
  )
  {
    const supplyCoffeeKeys = [];
    supplyCoffeeKeys.push(owner);
    supplyCoffeeKeys.push(batchNo);

    if (!(await this._doesCoffeeTransporterExist(ctx.stub, [transporter])))
    {
      throw new Error(
        `Coffee transporter does not exist with id: ${transporter}`
      );
    }
    const shipment = SupplyCoffeeShipment.from({
      id: id,
      txId: this.txId,
      transporter: transporter,
      truck: truck,
      shipmentDate: shipmentDate,
      supplyCoffeeBatch: batchNo,
      owner: owner,
      destination: destination,
      status: ShipmentStatus.SHIPPED,
    });
    console.log("shipment");
    console.log(shipment);
    shipment.bags = [];
    console.log("shipment two");
    console.log(shipment);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "SupplyCoffee",
      supplyCoffeeKeys
    ))
    {
      const strValue = JSON.parse(Buffer.from(value).toString("utf8"));
      const _supplyCoffee = SupplyCoffee.from(strValue);
      console.log("_supplyCoffee.isShipped");
      console.log(_supplyCoffee.isShipped);
      if (_supplyCoffee.isShipped === false)
      {
        _supplyCoffee.shipment.transporter = transporter;
        _supplyCoffee.shipment.truck = truck;
        _supplyCoffee.shipment.destination = destination;
        _supplyCoffee.shipment.shipmentDate = shipmentDate;
        _supplyCoffee.isShipped = true;

        await ctx.stub.putState(
          this._createCK(ctx.stub, [
            _supplyCoffee.owner,
            _supplyCoffee.batchNumber,
            _supplyCoffee.bagId,
          ]),
          _supplyCoffee.toBuffer()
        );
        console.log("_supplyCoffee");
        console.log(_supplyCoffee);
        shipment.bags.push(_supplyCoffee.bagId);
        shipment.coffeeType = _supplyCoffee.coffeeType;
        shipment.coffeeType = _supplyCoffee.coffeeType;
        shipment.quantity = shipment.bags.length;
        shipment.deliveryDate = "";
      }
    }
    if (shipment.bags.length > 0)
    {
      console.log("shipment");
      console.log(shipment);
      await ctx.stub.putState(
        this._createShipmentCK(ctx.stub, [id]),
        shipment.toBuffer()
      );
    } else
    {
      throw new Error(
        `All supply coffee with batch number ${batchNo} transported`
      );
    }
  }

  async deliverShipment(ctx, id, deliveryDate, recievedBy)
  {
    this._require(id, "id");
    this._require(deliveryDate, "deliveryDate");
    this._require(recievedBy, "recievedBy");

    const _shipmentBytes = await ctx.stub.getState(
      this._createShipmentCK(ctx.stub, [id])
    );
    const _shipment = SupplyCoffeeShipment.from(_shipmentBytes);
    if (_shipment)
    {
      if (_shipment.status !== ShipmentStatus.SHIPPED)
      {
        throw new Error(`Delivery is not the right operation on this shipment`);
      }
      _shipment.deliveryDate = deliveryDate;
      _shipment.recievedBy = recievedBy;
      _shipment.status = ShipmentStatus.DELIVERED;
      await ctx.stub.putState(
        this._createShipmentCK(ctx.stub, [id]),
        _shipment.toBuffer()
      );
    }
  }
  async returnShipment(ctx, id, returnDate, recievedBy)
  {
    this._require(id, "id");
    this._require(returnDate, "returnDate");
    this._require(recievedBy, "recievedBy");

    const _shipmentBytes = await ctx.stub.getState(
      this._createShipmentCK(ctx.stub, [id])
    );
    const _shipment = SupplyCoffeeShipment.from(_shipmentBytes);
    if (_shipment)
    {
      if (_shipment.owner !== recievedBy)
      {
        throw new Error(`The shipment is returned to the wrong owner`);
      }
      if (_shipment.status !== ShipmentStatus.SHIPPED)
      {
        throw new Error(`Return is not the right operation on this shipment`);
      }
      _shipment.returnDate = returnDate;
      _shipment.recievedBy = recievedBy;
      _shipment.status = ShipmentStatus.RETURNED;

      for (let i = 0; i < _shipment.bags.length; i++)
      {
        var _supplyCoffeeKeys = [];
        _supplyCoffeeKeys.push(_shipment.owner);
        _supplyCoffeeKeys.push(_shipment.supplyCoffeeBatch);
        _supplyCoffeeKeys.push(_shipment.bags[i]);

        const _supplyCoffee = await this._getSupplyCoffee(
          ctx.stub,
          _supplyCoffeeKeys
        );
        _supplyCoffee.isShipped = false;
        await ctx.stub.putState(
          this._createCK(ctx.stub, _supplyCoffeeKeys),
          _supplyCoffee.toBuffer()
        );
      }
      await ctx.stub.putState(
        this._createShipmentCK(ctx.stub, [id]),
        _shipment.toBuffer()
      );
    }
  }

  async _getSupplyCoffee(stub, id)
  {
    const supplyCoffeeBytes = await stub.getState(this._createCK(stub, id));
    return SupplyCoffee.from(supplyCoffeeBytes);
  }

  async getAllSupplyCoffeeShipment(ctx)
  {
    const keys = [];
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "SupplyCoffeeShipment",
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

  async deleteSupplyCoffeeShipment(ctx, id)
  {
    this._require(id, "id");

    await ctx.stub.deleteState(this._createShipmentCK(ctx.stub, [id]));
  }

  async getSupplyCoffeeShipment(ctx, id)
  {
    const warehouseBytes = await ctx.stub.getState(
      this._createShipmentCK(ctx.stub, [id])
    );
    if (!warehouseBytes || warehouseBytes.length === 0)
    {
      throw new Error(`${id} dpes not exist`);
    }
    return warehouseBytes.toString();
  }

  async _requireWashedCoffeeProductionPlace(ctx, owner, productionPlace)
  {
    const washedCoffeeProcessingBytes = await ctx.stub.getState(
      this._createWashedCoffeeIndCK(ctx.stub, [owner, productionPlace])
    );
    return (
      !!washedCoffeeProcessingBytes &&
      washedCoffeeProcessingBytes.toString().length > 0
    );
  }

  async _requireNaturalCoffeeProductionPlace(ctx, owner, productionPlace)
  {
    const naturealCoffeeIndsBytes = await ctx.stub.getState(
      this._createNaturalCoffeeIndCK(ctx.stub, [owner, productionPlace])
    );
    return (
      !!naturealCoffeeIndsBytes && naturealCoffeeIndsBytes.toString().length > 0
    );
  }

  async _doesCoffeeTransporterExist(stub, key)
  {
    const savedCoffeeTransporterBytes = await stub.getState(
      this._coffeeTransporterCK(stub, key)
    );
    if (
      !!savedCoffeeTransporterBytes &&
      savedCoffeeTransporterBytes.toString().length > 0
    )
    {
      const transporter = CoffeeTranporationCertificate.from(
        savedCoffeeTransporterBytes
      );
      if (transporter.status === CertificateStatus.CERTIFIED)
      {
        return true;
      } else
      {
        false;
      }
    } else
    {
      return false;
    }
    //return !!savedCoffeeTransporterBytes && savedCoffeeTransporterBytes.toString().length > 0;
  }

  async _getCoffeeWarehouse(stub, id)
  {
    const warehouseBytes = await stub.getState(this._createCK(stub, id));
    return CoffeeWarehouse.from(warehouseBytes);
  }

  _coffeeTransporterCK(stub, keys)
  {
    return stub.createCompositeKey("CoffeeTranporationCertificate", keys);
  }
}

module.exports = SupplyCoffeeCoffeeSupplierContract;
