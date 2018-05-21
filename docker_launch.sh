#!/bin/bash
docker run  --rm --name plex-wd -v "$PWD":/usr/src/app -v "/var/lib/plexmediaserver":"/var/lib/plexmediaserver" -w /usr/src/app -it node:latest bash -c "npm install && npm start"

