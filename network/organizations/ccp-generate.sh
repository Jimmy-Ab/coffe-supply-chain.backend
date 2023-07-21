#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

ORG=exporter
P0PORT=4003
CAPORT=4019
PEERPEM=organizations/peerOrganizations/orgexporter.adey-meselesh.de/tlsca/tlsca.orgexporter.adey-meselesh.de-cert.pem
CAPEM=organizations/peerOrganizations/orgexporter.adey-meselesh.de/ca/ca.orgexporter.adey-meselesh.de-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgexporter.adey-meselesh.de/connection-orgexporter.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgexporter.adey-meselesh.de/connection-orgexporter.yaml

ORG=yccu
P0PORT=4006
CAPORT=4021
PEERPEM=organizations/peerOrganizations/orgyccu.adey-meselesh.de/tlsca/tlsca.orgyccu.adey-meselesh.de-cert.pem
CAPEM=organizations/peerOrganizations/orgyccu.adey-meselesh.de/ca/ca.orgyccu.adey-meselesh.de-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgyccu.adey-meselesh.de/connection-orgyccu.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgyccu.adey-meselesh.de/connection-orgyccu.yaml

ORG=ethiocta
P0PORT=4009
CAPORT=4023
PEERPEM=organizations/peerOrganizations/orgethiocta.adey-meselesh.de/tlsca/tlsca.orgethiocta.adey-meselesh.de-cert.pem
CAPEM=organizations/peerOrganizations/orgethiocta.adey-meselesh.de/ca/ca.orgethiocta.adey-meselesh.de-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgethiocta.adey-meselesh.de/connection-orgethiocta.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgethiocta.adey-meselesh.de/connection-orgethiocta.yaml

ORG=supplier
P0PORT=4012
CAPORT=4025
PEERPEM=organizations/peerOrganizations/orgsupplier.adey-meselesh.de/tlsca/tlsca.orgsupplier.adey-meselesh.de-cert.pem
CAPEM=organizations/peerOrganizations/orgsupplier.adey-meselesh.de/ca/ca.orgsupplier.adey-meselesh.de-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgsupplier.adey-meselesh.de/connection-orgsupplier.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/orgsupplier.adey-meselesh.de/connection-orgsupplier.yaml
