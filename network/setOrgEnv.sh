#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0




# default to using Orgexporter
ORG=${1:-Orgexporter}

# Exit on first error, print all commands.
set -e
set -o pipefail

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
#coffeenetwork
ORDERER_CA=${DIR}/coffeenetwork/organizations/ordererOrganizations/adey-meselesh.de/tlsca/tlsca.adey-meselesh.de-cert.pem
PEER0_ORG1_CA=${DIR}/coffeenetwork/organizations/peerOrganizations/orgexporter.adey-meselesh.de/tlsca/tlsca.orgexporter.adey-meselesh.de-cert.pem
PEER0_ORG2_CA=${DIR}/coffeenetwork/organizations/peerOrganizations/orgyccu.adey-meselesh.de/tlsca/tlsca.orgyccu.adey-meselesh.de-cert.pem
PEER0_ORG3_CA=${DIR}/coffeenetwork/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/tlsca/tlsca.orgethiocta.adey-meselesh.de-cert.pem


if [[ ${ORG,,} == "orgexporter" || ${ORG,,} == "digibank" ]]; then

   CORE_PEER_LOCALMSPID=OrgexporterMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/coffeenetwork/organizations/peerOrganizations/orgexporter.adey-meselesh.de/users/Admin@orgexporter.adey-meselesh.de/msp
   CORE_PEER_ADDRESS=localhost:4003
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/coffeenetwork/organizations/peerOrganizations/orgexporter.adey-meselesh.de/tlsca/tlsca.orgexporter.adey-meselesh.de-cert.pem

elif [[ ${ORG,,} == "orgyccu" || ${ORG,,} == "magnetocorp" ]]; then

   CORE_PEER_LOCALMSPID=OrgyccuMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/coffeenetwork/organizations/peerOrganizations/orgyccu.adey-meselesh.de/users/Admin@orgyccu.adey-meselesh.de/msp
   CORE_PEER_ADDRESS=localhost:4006
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/coffeenetwork/organizations/peerOrganizations/orgyccu.adey-meselesh.de/tlsca/tlsca.orgyccu.adey-meselesh.de-cert.pem
elif [[ ${ORG,,} == "orgethiocta" || ${ORG,,} == "magnetocorp" ]]; then

   CORE_PEER_LOCALMSPID=OrgethioctaMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/coffeenetwork/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/users/Admin@orgethiocta.adey-meselesh.de/msp
   CORE_PEER_ADDRESS=localhost:4009
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/coffeenetwork/organizations/peerOrganizations/orgethiocta.adey-meselesh.de/tlsca/tlsca.orgethiocta.adey-meselesh.de-cert.pem
elif [[ ${ORG,,} == "orgsupplier" || ${ORG,,} == "magnetocorp" ]]; then

   CORE_PEER_LOCALMSPID=OrgsupplierMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/coffeenetwork/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/users/Admin@orgsupplier.adey-meselesh.de/msp
   CORE_PEER_ADDRESS=localhost:4012
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/coffeenetwork/organizations/peerOrganizations/orgsupplier.adey-meselesh.de/tlsca/tlsca.orgsupplier.adey-meselesh.de-cert.pem


else
   echo "Unknown \"$ORG\", please choose Orgexporter/Digibank or Orgyccu/Magnetocorp"
   echo "For example to get the environment variables to set upa Orgyccu shell environment run:  ./setOrgEnv.sh Orgyccu"
   echo
   echo "This can be automated to set them as well with:"
   echo
   echo 'export $(./setOrgEnv.sh Orgyccu | xargs)'
   exit 1
fi

# output the variables that need to be set
echo "CORE_PEER_TLS_ENABLED=true"
echo "ORDERER_CA=${ORDERER_CA}"
echo "PEER0_ORG1_CA=${PEER0_ORG1_CA}"
echo "PEER0_ORG2_CA=${PEER0_ORG2_CA}"
echo "PEER0_ORG3_CA=${PEER0_ORG3_CA}"

echo "CORE_PEER_MSPCONFIGPATH=${CORE_PEER_MSPCONFIGPATH}"
echo "CORE_PEER_ADDRESS=${CORE_PEER_ADDRESS}"
echo "CORE_PEER_TLS_ROOTCERT_FILE=${CORE_PEER_TLS_ROOTCERT_FILE}"

echo "CORE_PEER_LOCALMSPID=${CORE_PEER_LOCALMSPID}"
