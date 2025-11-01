#!/bin/bash

SERVER_URL="http://localhost:3000"
TIMEOUT=5
MAX_RETRIES=5
RETRY_INTERVAL=2

curl --silent --head $SERVER_URL | grep "200 OK" > /dev/null
if [ $? -eq 0 ]; then
    echo "Server is already running."
    #exit 0
fi

for point in about; do
    END_URL=${SERVER_URL}/$point
    echo "Checking server availability at $END_URL ..."
    curl --silent --head $END_URL | grep "200 OK" > /dev/null
    if [ $? -eq 0 ]; then
        echo "Server for endpoint $point is already running."
        #exit 0
    fi
    sleep $TIMEOUT
done

#Check POST endpoint
END_URL=${SERVER_URL}/submit
echo "Checking server availability at $END_URL ..."
curl --silent -X POST $END_URL | grep "200 OK" > /dev/null
if [ $? -eq 0 ]; then
    echo "Server for endpoint $point is already running."
fi