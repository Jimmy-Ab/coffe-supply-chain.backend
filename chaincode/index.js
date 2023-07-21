/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const CoffeeGrowerContract = require("./lib/contracts/coffee-grower-contract");
const CoffeeCherryInvestorContract = require("./lib/contracts/coffee-cherry/coffee-investor");
const CoffeeCherryGrowerContract = require("./lib/contracts/coffee-cherry/coffee-grower");
const CoffeeWarehouseContract = require("./lib/contracts/coffee-warehouse-contract");
const CoffeeDailyPriceContract = require("./lib/contracts/coffee-daily-price-contract");
const CoffeeExportCertificateContract = require("./lib/contracts/coffee-export-certificate-contact");
const CoffeeCherryRegionalOrganContract = require("./lib/contracts/coffee-cherry/regional-organ");
const SupplyCoffeeCoffeeSupplierContract = require("./lib/contracts/supply-coffee/coffee-supplier");
const SupplyCoffeeRegionalOrganContract = require("./lib/contracts/supply-coffee/regional-organ");
const CoffeeTransactionCenterContract = require("./lib/contracts/coffee-transaction-center-contract");
const CoffeeTranporationCertificateContract = require("./lib/contracts/coffee-transportation-certificate-contract");
const ExportCoffeeExporterContract = require("./lib/contracts/export-coffee/coffee-exporter");
const ExportCoffeeRegulatorContract = require("./lib/contracts/export-coffee/regulator");
const CoffeeAgreementContract = require("./lib/contracts/coffee-agreement-contract");
//const CoffeeDeliveryAgreementContract = require("./lib/contracts/coffee-delivery-agreement-contract");
const CoffeeAgreementDeliveryContract = require("./lib/contracts/coffee-agreement-delivery-contract");

const CoffeeAgreementCoffeeExporterContract = require("./lib/contracts/coffee-agreement/coffee-exporter");
const CoffeeAgreementCoffeeSupplierContract = require("./lib/contracts/coffee-agreement/coffee-supplier");
const CoffeeAgreementRegulatorContract = require("./lib/contracts/coffee-agreement/regulator");

module.exports.CoffeeGrowerContract = CoffeeGrowerContract;
module.exports.CoffeeCherryInvestorContract = CoffeeCherryInvestorContract;
module.exports.CoffeeCherryGrowerContract = CoffeeCherryGrowerContract;
module.exports.CoffeeWarehouseContract = CoffeeWarehouseContract;
module.exports.CoffeeDailyPriceContract = CoffeeDailyPriceContract;
module.exports.CoffeeExportCertificateContract =
  CoffeeExportCertificateContract;
module.exports.CoffeeCherryRegionalOrganContract =
  CoffeeCherryRegionalOrganContract;
module.exports.SupplyCoffeeCoffeeSupplierContract =
  SupplyCoffeeCoffeeSupplierContract;
module.exports.SupplyCoffeeRegionalOrganContract =
  SupplyCoffeeRegionalOrganContract;
module.exports.CoffeeTransactionCenterContract =
  CoffeeTransactionCenterContract;
module.exports.CoffeeTranporationCertificateContract =
  CoffeeTranporationCertificateContract;
module.exports.ExportCoffeeExporterContract = ExportCoffeeExporterContract;
module.exports.ExportCoffeeRegulatorContract = ExportCoffeeRegulatorContract;
module.exports.CoffeeAgreementContract = CoffeeAgreementContract;
/* module.exports.CoffeeDeliveryAgreementContract =
  CoffeeDeliveryAgreementContract; */
module.exports.CoffeeAgreementDeliveryContract =
  CoffeeAgreementDeliveryContract;

module.exports.CoffeeAgreementCoffeeExporterContract =
  CoffeeAgreementCoffeeExporterContract;
module.exports.CoffeeAgreementCoffeeSupplierContract =
  CoffeeAgreementCoffeeSupplierContract;
module.exports.CoffeeAgreementRegulatorContract =
  CoffeeAgreementRegulatorContract;

module.exports.contracts = [
  CoffeeGrowerContract,
  CoffeeCherryInvestorContract,
  CoffeeCherryGrowerContract,
  CoffeeWarehouseContract,
  CoffeeDailyPriceContract,
  CoffeeExportCertificateContract,
  CoffeeCherryRegionalOrganContract,
  SupplyCoffeeCoffeeSupplierContract,
  SupplyCoffeeRegionalOrganContract,
  CoffeeTransactionCenterContract,
  CoffeeTranporationCertificateContract,
  ExportCoffeeExporterContract,
  ExportCoffeeRegulatorContract,
  CoffeeAgreementContract,
  /*  CoffeeDeliveryAgreementContract, */
  CoffeeAgreementDeliveryContract,

  CoffeeAgreementCoffeeExporterContract,
  CoffeeAgreementCoffeeSupplierContract,
  CoffeeAgreementRegulatorContract,
];
