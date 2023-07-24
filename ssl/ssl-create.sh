# openssl ecparam -genkey -name prime256v1 -out ca.key
# # openssl ecparam -genkey -name prime256v1 -out server.key

# openssl req -x509 -new -SHA256 -nodes -key ca.key -days 3650 -out ca.crt -config san.cnf
# # openssl req -new -SHA256 -key server.key -nodes -out server.csr -config san.cnf
# chmod 400 ca.key

# # openssl x509 -inform pem -in ca.crt -outform der -out ca.pub.der

# # openssl req -new -x509 -nodes -sha1 -days 365 -keyout domain.key -out domain.crt -config san.cnf
# # chmod 400 domain.key

#one line
openssl req -new -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 -x509 -nodes -days 365 -out cert.pem.crt -keyout private-key.pem -config san.cnf 
openssl x509 -inform pem -in cert.pem -pubkey -noout -outform pem -out public-key.pem
# chmod 400 private-key.pem