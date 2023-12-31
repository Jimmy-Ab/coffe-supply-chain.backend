#!/bin/bash

function createOrgexporter() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/orgexporter.adey-meselesh.de/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:4019 --caname ca-orgexporter --tls.certfiles "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-4019-ca-orgexporter.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-4019-ca-orgexporter.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-4019-ca-orgexporter.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-4019-ca-orgexporter.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orgexporter's CA cert to orgexporter's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/msp/tlscacerts/ca.crt"

  # Copy orgexporter's CA cert to orgexporter's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/tlsca"
  cp "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/tlsca/tlsca.orgexporter.adey-meselesh.de-cert.pem"

  # Copy orgexporter's CA cert to orgexporter's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/ca"
  cp "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/ca/ca.orgexporter.adey-meselesh.de-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-orgexporter --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-orgexporter --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-orgexporter --id.name orgexporteradmin --id.secret orgexporteradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4019 --caname ca-orgexporter -M "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/msp" --csr.hosts peer0.orgexporter.adey-meselesh.de --tls.certfiles "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4019 --caname ca-orgexporter -M "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/tls" --enrollment.profile tls --csr.hosts peer0.orgexporter.adey-meselesh.de --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/tls/keystore/"* "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/peers/peer0.orgexporter.adey-meselesh.de/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:4019 --caname ca-orgexporter -M "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/users/User1@orgexporter.adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/users/User1@orgexporter.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://orgexporteradmin:orgexporteradminpw@localhost:4019 --caname ca-orgexporter -M "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/users/Admin@orgexporter.adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/orgexporter/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/users/Admin@orgexporter.adey-meselesh.de/msp/config.yaml"
}

function createOrgyccu() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/orgyccu.adey-meselesh.de/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:4021 --caname ca-orgyccu --tls.certfiles "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-4021-ca-orgyccu.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-4021-ca-orgyccu.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-4021-ca-orgyccu.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-4021-ca-orgyccu.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orgyccu's CA cert to orgyccu's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/msp/tlscacerts/ca.crt"

  # Copy orgyccu's CA cert to orgyccu's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/tlsca"
  cp "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/tlsca/tlsca.orgyccu.adey-meselesh.de-cert.pem"

  # Copy orgyccu's CA cert to orgyccu's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/ca"
  cp "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/ca/ca.orgyccu.adey-meselesh.de-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-orgyccu --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-orgyccu --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-orgyccu --id.name orgyccuadmin --id.secret orgyccuadminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4021 --caname ca-orgyccu -M "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/msp" --csr.hosts peer0.orgyccu.adey-meselesh.de --tls.certfiles "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4021 --caname ca-orgyccu -M "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/tls" --enrollment.profile tls --csr.hosts peer0.orgyccu.adey-meselesh.de --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/tls/keystore/"* "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/peers/peer0.orgyccu.adey-meselesh.de/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:4021 --caname ca-orgyccu -M "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/users/User1@orgyccu.adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/users/User1@orgyccu.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://orgyccuadmin:orgyccuadminpw@localhost:4021 --caname ca-orgyccu -M "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/users/Admin@orgyccu.adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/orgyccu/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/users/Admin@orgyccu.adey-meselesh.de/msp/config.yaml"
}
function createorgethiocta() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/orgethiocta.adey-meselesh.de/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:4023 --caname ca-orgethiocta --tls.certfiles "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-4023-ca-orgethiocta.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-4023-ca-orgethiocta.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-4023-ca-orgethiocta.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-4023-ca-orgethiocta.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orgethiocta's CA cert to orgethiocta's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/msp/tlscacerts/ca.crt"

  # Copy orgethiocta's CA cert to orgethiocta's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/tlsca"
  cp "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/tlsca/tlsca.orgethiocta.adey-meselesh.de-cert.pem"

  # Copy orgethiocta's CA cert to orgethiocta's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/ca"
  cp "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/ca/ca.orgethiocta.adey-meselesh.de-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-orgethiocta --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-orgethiocta --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-orgethiocta --id.name orgethioctaadmin --id.secret orgethioctaadminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4023 --caname ca-orgethiocta -M "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/msp" --csr.hosts peer0.orgethiocta.adey-meselesh.de --tls.certfiles "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4023 --caname ca-orgethiocta -M "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/tls" --enrollment.profile tls --csr.hosts peer0.orgethiocta.adey-meselesh.de --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/tls/keystore/"* "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/peers/peer0.orgethiocta.adey-meselesh.de/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:4023 --caname ca-orgethiocta -M "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/users/User1@orgethiocta.adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/users/User1@orgethiocta.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://orgethioctaadmin:orgethioctaadminpw@localhost:4023 --caname ca-orgethiocta -M "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/users/Admin@orgethiocta.adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/orgethiocta/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/users/Admin@orgethiocta.adey-meselesh.de/msp/config.yaml"
}
function createorgsupplier() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/orgsupplier.adey-meselesh.de/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:4025 --caname ca-orgsupplier --tls.certfiles "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-4025-ca-orgsupplier.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-4025-ca-orgsupplier.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-4025-ca-orgsupplier.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-4025-ca-orgsupplier.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orgsupplier's CA cert to orgsupplier's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/msp/tlscacerts/ca.crt"

  # Copy orgsupplier's CA cert to orgsupplier's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/tlsca"
  cp "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/tlsca/tlsca.orgsupplier.adey-meselesh.de-cert.pem"

  # Copy orgsupplier's CA cert to orgsupplier's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/ca"
  cp "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem" "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/ca/ca.orgsupplier.adey-meselesh.de-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-orgsupplier --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-orgsupplier --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-orgsupplier --id.name orgsupplieradmin --id.secret orgsupplieradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4025 --caname ca-orgsupplier -M "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/msp" --csr.hosts peer0.orgsupplier.adey-meselesh.de --tls.certfiles "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:4025 --caname ca-orgsupplier -M "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/tls" --enrollment.profile tls --csr.hosts peer0.orgsupplier.adey-meselesh.de --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/tls/keystore/"* "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/peers/peer0.orgsupplier.adey-meselesh.de/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:4025 --caname ca-orgsupplier -M "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/users/User1@orgsupplier.adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/users/User1@orgsupplier.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://orgsupplieradmin:orgsupplieradminpw@localhost:4025 --caname ca-orgsupplier -M "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/users/Admin@orgsupplier.adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/orgsupplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/users/Admin@orgsupplier.adey-meselesh.de/msp/config.yaml"
}
function createOrderer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/adey-meselesh.de

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/adey-meselesh.de

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:4027 --caname ca-orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-4027-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-4027-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-4027-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-4027-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orderer org's CA cert to orderer org's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/msp/tlscacerts/tlsca.adey-meselesh.de-cert.pem"

  # Copy orderer org's CA cert to orderer org's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/tlsca"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/tlsca/tlsca.adey-meselesh.de-cert.pem"

  infoln "Registering orderer"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the orderer admin"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the orderer msp"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:4027 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/msp" --csr.hosts orderer.adey-meselesh.de --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/msp/config.yaml"

  infoln "Generating the orderer-tls certificates"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:4027 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls" --enrollment.profile tls --csr.hosts orderer.adey-meselesh.de --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the orderer's tls directory that are referenced by orderer startup config
  cp "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/ca.crt"
  cp "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/signcerts/"* "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/server.crt"
  cp "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/keystore/"* "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/server.key"

  # Copy orderer org's CA cert to orderer's /msp/tlscacerts directory (for use in the orderer MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/msp/tlscacerts/tlsca.adey-meselesh.de-cert.pem"

  infoln "Generating the admin msp"
  set -x
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:4027 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/users/Admin@adey-meselesh.de/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/adey-meselesh.de/users/Admin@adey-meselesh.de/msp/config.yaml"
}
