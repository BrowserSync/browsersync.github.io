docker run --name nginx \
    -v $(pwd)/dist:/usr/share/nginx/html \
    -v $(pwd)/browsersync/default.conf:/etc/nginx/conf.d/default.conf \
    -v /etc/letsencrypt:/etc/letsencrypt \
    -p 80:80 -p 443:443 nginx:1.10.2-alpine
