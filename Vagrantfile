# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  # Use a special shared directory
  config.vm.synced_folder "./", "/var/www"

  # Port forwarding
  config.vm.network "forwarded_port", guest: 4000, host: 4000
  config.vm.network "forwarded_port", guest: 4100, host: 4100
  config.vm.network "forwarded_port", guest: 4200, host: 4200

  # Provision
  config.vm.provision "shell", path: "scripts/vagrant.sh" do |s|
    s.args = ["dev"]
  end

  # Make symlinks work on Windows
  config.vm.provider "virtualbox" do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

end
