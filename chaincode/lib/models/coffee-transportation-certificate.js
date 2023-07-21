"use strict";
class CoffeeTranporationCertificate {
  constructor() {
    this.txId = "";
    this.id = "";
    this.givenFor = "";
    this.address = "";
    this.nationality = "";
    this.tinNumber = "";
    this.loadingTransportLicence = "";
    this.loadingTrucks = []; //plateNumber, quantity, insurance, driver{name, driver license}
    this.startDate = "";
    this.endDate = "";
    this.givenBy = "";
    this.givenDate = "";
    this.status = ""; //granted, revoked
  }
  static from(bufferOrJson) {
    if (Buffer.isBuffer(bufferOrJson)) {
      if (!bufferOrJson.length) {
        return;
      }
      bufferOrJson = JSON.parse(bufferOrJson.toString("utf-8"));
    }
    const certs = new CoffeeTranporationCertificate();
    certs.txId = bufferOrJson.txId;
    certs.id = bufferOrJson.id;
    certs.givenFor = bufferOrJson.givenFor;
    certs.address = bufferOrJson.address;
    certs.nationality = bufferOrJson.nationality;
    certs.tinNumber = bufferOrJson.tinNumber;
    certs.loadingTransportLicence = bufferOrJson.loadingTransportLicence;
    certs.loadingTrucks = bufferOrJson.loadingTrucks;
    certs.status = bufferOrJson.status;
    return certs;
  }
  toJson() {
    return JSON.stringify(this);
  }
  toBuffer() {
    return Buffer.from(this.toJson());
  }
}

module.exports = CoffeeTranporationCertificate;
