#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

# import utils
. scripts/envVar.sh
. scripts/configUpdate.sh


# NOTE: this must be run in a CLI container since it requires jq and configtxlator 
createAnchorPeerUpdate() {
  infoln "Fetching channel config for channel ${CHANNEL_NAME}1"
  fetchChannelConfig $ORG ${CHANNEL_NAME}1 ${CORE_PEER_LOCALMSPID}config.json
   

  if [ $ORG -eq 1 ]; then
    HOST="peer0.orgexporter.adey-meselesh.de"
    PORT=4003
  elif [ $ORG -eq 2 ]; then
    HOST="peer0.orgyccu.adey-meselesh.de"
    PORT=4006
  elif [ $ORG -eq 3 ]; then
    HOST="peer0.orgethiocta.adey-meselesh.de"
    PORT=4009
  elif [ $ORG -eq 4 ]; then
    HOST="peer0.orgsupplier.adey-meselesh.de"
    PORT=4012
  else
    errorln "Org${ORG} unknown"
  fi

  set -x
  # Modify the configuration to append the anchor peer 
  jq '.channel_group.groups.Application.groups.'${CORE_PEER_LOCALMSPID}'.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "'$HOST'","port": '$PORT'}]},"version": "0"}}' ${CORE_PEER_LOCALMSPID}config.json > ${CORE_PEER_LOCALMSPID}modified_config.json
  { set +x; } 2>/dev/null

  # Compute a config update, based on the differences between 
  # {orgmsp}config.json and {orgmsp}modified_config.json, write
  # it as a transaction to {orgmsp}anchors.tx
  createConfigUpdate ${CHANNEL_NAME}1 ${CORE_PEER_LOCALMSPID}config.json ${CORE_PEER_LOCALMSPID}modified_config.json ${CORE_PEER_LOCALMSPID}anchors.tx

 infoln "Fetching channel config for channel ${CHANNEL_NAME}2"
  fetchChannelConfig $ORG ${CHANNEL_NAME}2 ${CORE_PEER_LOCALMSPID}config.json
  infoln "Generating anchor peer update transaction for Org${ORG} on channel ${CHANNEL_NAME}2"
    if [ $ORG -eq 1 ]; then
    HOST="peer0.orgexporter.adey-meselesh.de"
    PORT=4003
  elif [ $ORG -eq 2 ]; then
    HOST="peer0.orgyccu.adey-meselesh.de"
    PORT=4006
  elif [ $ORG -eq 3 ]; then
    HOST="peer0.orgethiocta.adey-meselesh.de"
    PORT=4009
  elif [ $ORG -eq 4 ]; then
    HOST="peer0.orgsupplier.adey-meselesh.de"
    PORT=4012
  else
    errorln "Org${ORG} unknown"
  fi

  set -x
  # Modify the configuration to append the anchor peer 
  jq '.channel_group.groups.Application.groups.'${CORE_PEER_LOCALMSPID}'.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "'$HOST'","port": '$PORT'}]},"version": "0"}}' ${CORE_PEER_LOCALMSPID}config.json > ${CORE_PEER_LOCALMSPID}modified_config.json
  { set +x; } 2>/dev/null


  createConfigUpdate ${CHANNEL_NAME}2 ${CORE_PEER_LOCALMSPID}config.json ${CORE_PEER_LOCALMSPID}modified_config.json ${CORE_PEER_LOCALMSPID}anchors.tx
}

updateAnchorPeer() {
  peer channel update -o orderer.adey-meselesh.de:4000 --ordererTLSHostnameOverride orderer.adey-meselesh.de -c ${CHANNEL_NAME}1 -f ${CORE_PEER_LOCALMSPID}anchors.tx --tls --cafile "$ORDERER_CA" >&log.txt
  peer channel update -o orderer.adey-meselesh.de:4000 --ordererTLSHostnameOverride orderer.adey-meselesh.de -c ${CHANNEL_NAME}2 -f ${CORE_PEER_LOCALMSPID}anchors.tx --tls --cafile "$ORDERER_CA" >&log.txt
  res=$?
  cat log.txt
  verifyResult $res "Anchor peer update failed"
  successln "Anchor peer set for org '$CORE_PEER_LOCALMSPID' on channel '${CHANNEL_NAME}1'"
  successln "Anchor peer set for org '$CORE_PEER_LOCALMSPID' on channel '${CHANNEL_NAME}2'"
}

ORG=$1
CHANNEL_NAME=$2

setGlobalsCLI $ORG

createAnchorPeerUpdate 

updateAnchorPeer 
