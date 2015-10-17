#!/bin/sh

apt-get update
apt-get install -y git

# mongodb
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org=2.6.10 mongodb-org-server=2.6.10 mongodb-org-shell=2.6.10 mongodb-org-mongos=2.6.10 mongodb-org-tools=2.6.10
service mongod start

# finished
echo "-------------------------------"
echo "| daphne has been provisioned |"
echo "-------------------------------"