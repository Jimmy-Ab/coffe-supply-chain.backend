#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

# imports
. scripts/utils.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/adey-meselesh.de/tlsca/tlsca.adey-meselesh.de-cert.pem
export PEER0_ORG1_CA=${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/tlsca/tlsca.orgexporter.adey-meselesh.de-cert.pem
export PEER0_ORG2_CA=${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/tlsca/tlsca.orgyccu.adey-meselesh.de-cert.pem
export PEER0_ORG3_CA=${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/tlsca/tlsca.orgethiocta.adey-meselesh.de-cert.pem
export PEER0_ORG4_CA=${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/tlsca/tlsca.orgsupplier.adey-meselesh.de-cert.pem
export ORDERER_ADMIN_TLS_SIGN_CERT=${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/server.crt
export ORDERER_ADMIN_TLS_PRIVATE_KEY=${PWD}/organizations/ordererOrganizations/adey-meselesh.de/orderers/orderer.adey-meselesh.de/tls/server.key

# Set environment variables for the peer org
setGlobals() {
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  infoln "Using organization ${USING_ORG}"
  if [ $USING_ORG -eq 1 ]; then
    export CORE_PEER_LOCALMSPID="OrgexporterMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgexporter.adey-meselesh.de/users/Admin@orgexporter.adey-meselesh.de/msp
    export CORE_PEER_ADDRESS=localhost:4003
  elif [ $USING_ORG -eq 2 ]; then
    export CORE_PEER_LOCALMSPID="OrgyccuMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgyccu.adey-meselesh.de/users/Admin@orgyccu.adey-meselesh.de/msp
    export CORE_PEER_ADDRESS=localhost:4006

  elif [ $USING_ORG -eq 3 ]; then
    export CORE_PEER_LOCALMSPID="OrgethioctaMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/users/Admin@orgethiocta.adey-meselesh.de/msp
    export CORE_PEER_ADDRESS=localhost:4009
  elif [ $USING_ORG -eq 4 ]; then
    export CORE_PEER_LOCALMSPID="OrgsupplierMSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG4_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/users/Admin@orgsupplier.adey-meselesh.de/msp
    export CORE_PEER_ADDRESS=localhost:4012
  else
    errorln "ORG Unknown"
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

# Set environment variables for use in the CLI container
setGlobalsCLI() {
  setGlobals $1

  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  if [ $USING_ORG -eq 1 ]; then
    export CORE_PEER_ADDRESS=peer0.orgexporter.adey-meselesh.de:4003
  elif [ $USING_ORG -eq 2 ]; then
    export CORE_PEER_ADDRESS=peer0.orgyccu.adey-meselesh.de:4006
  elif [ $USING_ORG -eq 3 ]; then
    export CORE_PEER_ADDRESS=peer0.orgethiocta.adey-meselesh.de:4009
  elif [ $USING_ORG -eq 4 ]; then
    export CORE_PEER_ADDRESS=peer0.orgsupplier.adey-meselesh.de:4012
  else
    errorln "ORG Unknown"
  fi
}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {
  PEER_CONN_PARMS=()
  PEERS=""
  while [ "$#" -gt 0 ]; do
    setGlobals $1
    PEER="peer0.org$1"
    ## Set peer addresses
    if [ -z "$PEERS" ]
    then
	PEERS="$PEER"
    else
	PEERS="$PEERS $PEER"
    fi
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" --peerAddresses $CORE_PEER_ADDRESS)
    ## Set path to TLS certificate
    CA=PEER0_ORG$1_CA
    TLSINFO=(--tlsRootCertFiles "${!CA}")
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" "${TLSINFO[@]}")
    # shift by one to get to the next organization
    shift
  done
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}
