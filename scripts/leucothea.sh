#!/bin/sh

apt-get update
apt-get install -y git

# redis
apt-get install -y redis-server
service redis-server start

# finished
echo "----------------------------------"
echo "| leucothea has been provisioned |"
echo "----------------------------------"