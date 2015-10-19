#!/bin/sh

apt-get update

# nginx
apt-get install -y nginx curl

rm /etc/nginx/sites-available/* /etc/nginx/sites-enabled/*
curl https://raw.githubusercontent.com/hacksu/khe/master/scripts/zeus.conf > /etc/nginx/sites-available/zeus.conf
ln -s /etc/nginx/sites-available/zeus.conf /etc/nginx/sites-enabled

service nginx restart

echo "=========================================================="
echo "Don't forget to configure your SSL certs in /etc/nginx/ssl"
echo "=========================================================="