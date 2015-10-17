#!/bin/sh

# mongodb
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org=2.6.10 mongodb-org-server=2.6.10 mongodb-org-shell=2.6.10 mongodb-org-mongos=2.6.10 mongodb-org-tools=2.6.10
service mongod start

apt-get install -y git

# redis
apt-get install -y redis-server
service redis-server start

# node
apt-get install -y curl wget build-essential g++ make
curl --silent --location https://deb.nodesource.com/setup_4.x | bash -
apt-get install --yes nodejs
ln -s `which nodejs` /usr/bin/node
npm install -g npm@3.3.x n mocha pm2 bunyan bower
n 4.2

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
echo "-------------------"
echo "| Setup complete! |"
echo "-------------------"