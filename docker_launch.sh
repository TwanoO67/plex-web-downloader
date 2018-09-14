#!/bin/bash
source .env
docker run  --rm --name plex-wd -p "${HTTP_PORT}:3000" -v "$PWD":/usr/src/app -v "/var/lib/plexmediaserver":"/var/lib/plexmediaserver" -w /usr/src/app -it node:6 bash -c "npm install && npm start"

