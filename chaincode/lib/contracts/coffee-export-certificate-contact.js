'use strict'

const { Contract } = require('fabric-contract-api');
const CoffeeExportCertificate = require('../models/coffee-export-certificate');
const getDate = require('../helper/get-date');
class CoffeeExportCertificateContract extends Contract {
    constructor() {
        super('CoffeeExportCertificateContract');
        this.txId = '';
    }
    async beforeTransaction(ctx) {
        this.txId = ctx.stub.getTxID();
        console.log(`${this.txId}`);
    }

    async initLedger(ctx) {
        console.log("coffee-export-certificate");
    }

    async GiveCertificate(ctx, givenFor, startDate, endDate) {
        this._require(givenFor, 'givenFror');
        this._require(endDate, 'endDate');

        const date = new Date();
        const year = date.getFullYear();
        const cert = CoffeeExportCertificate.from({
            txId: this.txId,
            givenFor: givenFor,
            startDate: startDate,
            endDate: endDate,
            givenDate: getDate(),
            txId: this.txId,
            status: 'granted'
        }).toBuffer();

        await ctx.stub.putState(this._createCK(ctx.stub,), [year, givenFor, this.txId].cert);
    }
    async revokeCertificate(ctx, givenFor, year, id) {
        const certificateBytes = await ctx.stub.getState(this._createCK(ctx.stub, [year, exporter, id]));
        const certificate = CoffeeExportCertificate.from(certificateBytes);
        certificate.status = 'revoked';

        await ctx.stub.putState(this._createCK(ctx.stub, [year, givenFor, id]), certificate.toBuffer());

    }
    async remove(ctx, id) {
        this._require(id, 'id');

        await ctx.stub.deleteState(this._createCK(ctx.stub, id));
    }

    //renewal

    async getCertificationPerYear(ctx, year) {
        this._require(year, 'year');
        const keys = [];
        keys.push(year);
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('CoffeeExportCertificate', keys)) {
            const strValue = Buffer.from(value).toString('utf8');
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

    async getExporterCertificate(cert, year, exporter) {
        this._require(year, 'year');
        this._require(exporter, 'exporter');

        const certificateBytes = await ctx.stub.getState(this._createCK(ctx.stub, [year, exporter]));
        if (!certificateBytes || certificateBytes.length === 0) {
            throw new Error(`${id} certificate not exist`);
        }
        return certificateBytes.toString();
    }
    async getAllCertificate(ctx) {
        const keys = [];
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('CoffeeExportCertificate', keys)) {
            const strValue = Buffer.from(value).toString('utf8');
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
        return stub.createCompositeKey('CoffeeExportCertificate', keys);
    }

    _require(value, name) {
        if (!value) {
            throw new Error(`Parameter ${name} is missing.`);
        }
    }
}

module.exports = CoffeeExportCertificateContract;