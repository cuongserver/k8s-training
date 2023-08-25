# Guide

## Linux

### Install `sudo`

```bash
#run as root

apt update
apt install sudo -y
```

## Docker

### Install `docker`

```bash
#For Debian

#configure repo
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

#install docker
sudo apt-get update
sudo apt-get --yes install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Registry

#### Self-signed SSL certificate

- Copy certificate file in PEM format to **_`/etc/ssl/certs`_**
- Restart **_`docker`_** daemon

```bash
sudo systemctl restart docker
```

## Kubernetes

### Install Snap

```bash
sudo apt update
sudo apt install snapd
```

### Install Micro k8s

```bash
sudo snap install microk8s --classic
```

### Post-installing

```bash
sudo usermod -a -G microk8s $USER
sudo chown -f -R $USER ~/.kube
sudo hostnamectl set-hostname <desired_hostname>
```

Edit **_`hosts`_** file

```bash
sudo nano /etc/hosts
```
