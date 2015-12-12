rsync -pazv ./ root@178.62.0.17:/usr/share/nginx/browsersync --delete \
	--exclude .git \
	--exclude node_modules \
	--exclude .idea \
	--exclude _src \
	--exclude _doc \
	--exclude tasks