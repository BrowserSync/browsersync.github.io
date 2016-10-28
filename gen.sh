openssl genrsa -des3 -out certs/server.key 1024
openssl req -new -key certs/server.key -out certs/server.csr
openssl x509 -req -days 3650 -in certs/server.csr -signkey certs/server.key -out certs/server.crt
cp certs/server.key certs/server.key.copy
openssl rsa -in certs/server.key.copy -out certs/server.key
rm certs/server.key.copy
