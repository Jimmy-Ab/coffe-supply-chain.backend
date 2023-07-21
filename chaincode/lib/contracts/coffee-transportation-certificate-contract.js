"use strict";

const { Contract } = require("fabric-contract-api");
const CoffeeTranporationCertificate = require("../models/coffee-transportation-certificate");
const getDate = require("../helper/get-date");
const CertificateStatus = require("../enums/certificate-status");

class CoffeeTranporationCertificateContract extends Contract
{
  constructor()
  {
    super("CoffeeTranporationCertificateContract");
    this.txId = "";
  }
  async beforeTransaction(ctx)
  {
    this.txId = ctx.stub.getTxID();
    console.log(`${this.txId}`);
  }

  async initLedger(ctx)
  {
    console.log("CoffeeTranporationCertificateContract");
  }
  async requestCertificate(
    ctx,
    id,
    givenFor,
    address,
    nationality,
    tinNumber,
    loadingTransportLicence,
    loadingTrucks
  )
  {
    this._require(id, "id");
    this._require(givenFor, "givenFor");
    this._require(address, "address");
    this._require(nationality, "nationality");
    this._require(tinNumber, "tinNumber");
    this._require(loadingTransportLicence, "loadingTransportLicence");
    this._require(loadingTrucks, "loadingTrucks");

    const cert = CoffeeTranporationCertificate.from({
      txId: this.txId,
      id: id,
      givenFor: givenFor,
      address: address,
      nationality: nationality,
      tinNumber: tinNumber,
      loadingTransportLicence: loadingTransportLicence,
      loadingTrucks: loadingTrucks,
      status: CertificateStatus.REQUESTED,
    }).toBuffer();

    await ctx.stub.putState(this._createCK(ctx.stub, [id]), cert);
  }

  async grantCertificate(ctx, id, startDate, endDate)
  {
    this._require(id, "id");
    /* if (await this._doesCertificateExist(ctx.stub, [id])) {
      throw new Error(`Coffee transportation certificate does not exist`);
    }
 */
    const certBytes = await ctx.stub.getState(this._createCK(ctx.stub, [id]));
    const cert = CoffeeTranporationCertificate.from(certBytes);
    console.log('certttttttttttttttttttttttttt');
    console.log(cert);


    cert.status = CertificateStatus.CERTIFIED;
    cert.startDate = startDate;
    cert.endDate = endDate;
    cert.givenBy = ctx.clientIdentity.getMSPID();
    await ctx.stub.putState(this._createCK(ctx.stub, [id]), cert.toBuffer());
  }

  async revokeCertificate(ctx, id)
  {
    this._require(id, "id");
    /*  if (await this._doesCertificateExist(ctx.stub, [id])) {
      throw new Error(`Coffee transportation certificate does not exist`);
    } */
    const certBytes = await ctx.stub.getState(this._createCK(ctx.stub, [id]));
    const cert = CoffeeTranporationCertificate.from(certBytes);
    cert.status = CertificateStatus.REVOKED;

    await ctx.stub.putState(this._createCK(ctx.stub, [id]), cert.toBuffer());
  }

  async deleteCertificate(ctx, id)
  {
    this._require(id, "id");

    await ctx.stub.deleteState(this._createCK(ctx.stub, [id]));
  }

  async getAllCertificate(ctx)
  {
    const keys = [];
    const allResults = [];
    for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey(
      "CoffeeTranporationCertificate",
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

  async getCertificate(ctx, id)
  {
    const coffeeGrowerBytes = await ctx.stub.getState(
      this._createCK(ctx.stub, [id])
    );
    if (!coffeeGrowerBytes || coffeeGrowerBytes.length === 0)
    {
      throw new Error(`${id} dpes not exist`);
    }
    return coffeeGrowerBytes.toString();
  }

  _require(value, name)
  {
    if (!value)
    {
      throw new Error(`Parameter ${name} is missing.`);
    }
  }

  //keys = [id]
  _createCK(stub, keys)
  {
    return stub.createCompositeKey("CoffeeTranporationCertificate", keys);
  }

  async _doesCertificateExist(stub, key)
  {
    const savedCertificateBytes = await stub.getState(
      this._createCK(stub, key)
    );
    return (
      !!savedCertificateBytes && savedCertificateBytes.toString().length > 0
    );
  }
}

module.exports = CoffeeTranporationCertificateContract;
