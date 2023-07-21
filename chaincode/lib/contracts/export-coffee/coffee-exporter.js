"use strict";

const { ExportCoffeeContractBase } = require("./export-coffee-contract-base");
const ExportCoffee = require("../../models/export-coffee");
const CoffeeprocessStatus = require("../../enums/coffee-process-status");
const CoffeeQualityStatus = require("../../enums/coffee-quality-status");
const CoffeeType = require("../../enums/coffee-type");
const getDate = require("../../helper/get-date");
const SupplyCoffee = require("../../models/supply-coffee");
class ExportCoffeeExporterContract extends ExportCoffeeContractBase
{
  constructor()
  {
    super("ExportCoffeeExporterContract");
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

  async produceExportCoffee(
    ctx,
    id,
    quantity,
    bagSize,
    supplyCoffeeBatchNumber,
    unit,
    productionPlace,
    owner
  )
  {
    this._require(id, "id");
    this._require(quantity, "quantity");
    this._require(bagSize, "bagSize");
    this._require(supplyCoffeeBatchNumber, "supplyCoffeeBatchNumber");
    this._require(unit, "unit");
    this._require(productionPlace, "productionPlace");

    //const owner = ctx.clientIdentity.getMSPID();
    //this._requireExportCoffeeProductionPlace(ctx.status, owner, productionPlace);
    if (
      !(await this._requireExportCoffeeProductionPlace(
        ctx.stub,
        owner,
        productionPlace
      ))
    )
    {
      throw new Error(
        `Export coffee production industry does not exist with id: ${productionPlace}`
      );
    }
    const keys = [];
    keys.push(owner);
    keys.push(supplyCoffeeBatchNumber);
    console.log("_supplyCoffee");
    console.log(keys);
    console.log("A::---------------------");
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "SupplyCoffee",
      keys
    ))
    {
      console.log("B::---------------------");
      const strValue = JSON.parse(Buffer.from(value).toString("utf8"));
      const _supplyCoffee = SupplyCoffee.from(strValue);
      console.log("_supplyCoffee");
      console.log(_supplyCoffee);

      if (_supplyCoffee.status === CoffeeprocessStatus.UNPROCESSED)
      {
        //Add quality inspection
        const _batchNo = "BNO_N_" + id;

        for (let i = 0; i < quantity; i++)
        {
          const _bagId = "BAG_ID_" + id + "_" + i;
          const _exportCoffee = ExportCoffee.from({
            bagId: _bagId,
            bagSize: bagSize,
            batchNumber: _batchNo,
            supplyCoffeeBatchNumber: supplyCoffeeBatchNumber,
            measurmentUnit: unit,
            productionPlace: productionPlace,
            productionDate: getDate(),
            coffeeType: _supplyCoffee.coffeeType,
            owner: owner,
            origin: _supplyCoffee.origin,
            status: CoffeeprocessStatus.UNPROCESSED,
            traceability: {
              supplyCoffeeBatchnumber: _supplyCoffee.batchNumber,
              supplyCoffeeProductionIndId:
                _supplyCoffee.naturalCoffeeProductionPlace,
              coffeeCheryDeliveryId: _supplyCoffee.traceability.deliveryId,
              coffeeCherryBatchNumber: _supplyCoffee.traceability.batchNumber,
              farmPlace: _supplyCoffee.traceability.farmPlace,
              coffeegrower: _supplyCoffee.traceability.coffeegrower,
              coffeeCherryDeliveryDate: _supplyCoffee.traceability.deliveryDate,
            },
            grade: _supplyCoffee.grade,
          }).toBuffer();
          await ctx.stub.putState(
            this._createCK(ctx.stub, [owner, _batchNo, _bagId]),
            _exportCoffee
          );
        }

        _supplyCoffee.status = CoffeeprocessStatus.PROCESSED;
        await ctx.stub.putState(
          this._createSupplyCoffeeCK(ctx.stub, [
            _supplyCoffee.owner,
            _supplyCoffee.batchNumber,
            _supplyCoffee.bagId,
          ]),
          _supplyCoffee.toBuffer()
        );
      }
    }
  }


  async coffeeGrading(ctx, owner, batchNumber, grade)
  {

    this._require(batchNumber, "batchNumber");
    this._require(owner, "owner");
    this._require(grade, "grade");
    this._require(gradeBy, "gradeBy");
    // const owner = ctx.clientIdentity.getMSPID();
    const keys = [];
    keys.push(owner);
    keys.push(batchNumber);

    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "ExportCoffee",
      keys
    ))
    {
      const strValue = JSON.parse(Buffer.from(value).toString("utf8"));
      const coffee = SupplyCoffee.from(strValue);
      coffee.grade = grade;
      coffee.gradeBy = ctx.clientIdentity.getMSPID();
      coffee.gradeDate = getDate();
      await ctx.stub.putState(
        this._createCK(ctx.stub, [owner, batchNumber, coffee.bagId]),
        coffee.toBuffer()
      );
    }
  }



  async getAllExportCoffee(ctx)
  {
    const keys = [];
    const allResults = [];

    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "ExportCoffee",
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

  async getExportCoffeeOfOwner(ctx, owner)
  {
    const keys = [];
    const allResults = [];

    keys.push(owner);
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "ExportCoffee",
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

  async removeExportCoffeeBatch(ctx, owner, batchNumber)
  {
    // this._requireCoffeeProcessor(ctx);
    this._require(owner, "owner");
    this._require(batchNumber, "batchNumber");

    const keys = [];
    keys.push(owner);
    keys.push(batchNumber);
    await ctx.stub.deleteState(this._createCK(ctx.stub, keys));
  }


  async _requireExportCoffeeProductionPlace(stub, owner, productionPlace)
  {
    const exportCoffeeIndBytes = await stub.getState(
      this._createExportCoffeeProcessingIndCK(stub, [owner, productionPlace])
    );
    return !!exportCoffeeIndBytes && exportCoffeeIndBytes.toString().length > 0;
  }
}

module.exports = ExportCoffeeExporterContract;
