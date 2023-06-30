openssl req -new -x509 -nodes -sha1 -days 365 -key domain.key -out domain.crt -config san.cnf
chmod 400 domain.key