#!/bin/sh

apt-get update

# node
apt-get install -y curl wget build-essential g++ make git
curl --silent --location https://deb.nodesource.com/setup_4.x | bash -
apt-get install --yes nodejs
ln -s `which nodejs` /usr/bin/node
npm install -g npm@3.3.x n mocha pm2 bunyan bower
n 4.2.x

# install and build app
cd /var/www/api
npm install

cd /var/www/front
npm install
bower install --allow-root

cd /var/www/staff
npm install
bower install --allow-root

# finished
echo "-------------------------------"
echo "| apollo has been provisioned |"
echo "-------------------------------"