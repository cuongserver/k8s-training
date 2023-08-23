# Guide

## Docker

### Registry

#### Self-signed SSL certificate

- Copy certificate file in PEM format to **_`/etc/ssl/certs`_**
- Restart **_`docker`_** daemon

```bash
sudo systemctl restart docker
```
