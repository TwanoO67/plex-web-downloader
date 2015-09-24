Plex Web Downloader
===============

Ce projet permet de créer une liste de vos fichiers vidéo plex et de les partager aux travers d'une interface web.


INSTALLATION
--------------------

**Sur Windows**

  pré requis, installer git ( https://git-scm.com/download/win )

  pré requis, installer nodejs 0.12.x ( https://nodejs.org/dist/v0.12.7/ )

  ouvrir l'invite de commande 'cmb', puis se deplacer dans un repertoire où vous voulez installer

    git clone https://github.com/TwanoO67/plex-web-downloader.git

    cd plex-web-downloader

    npm install

  modifier le fichier config.js, pour y mettre le chemin de la base de données plex (attention il faut doubler les anti-slash et proteger les espaces )

  exemple: C:\\Users\\yourUsername\\AppData\\Local\\Plex\ Media\ Server\\Plug-in\ Support\\Databases\\com.plexapp.plugins.library.db

    npm start

  puis ouvrir dans votre navigateur l'adresse http://localhost:3000


**Sous MacOS**

  pré requis, nodejs

  sinon installer homebrew

    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

  et :

    brew install node

    git clone https://github.com/TwanoO67/plex-web-downloader.git

    cd plex-web-downloader

    npm install

  modifier le fichier config.js, pour y mettre le chemin de la base de données plex

  exemple: /Users/yourUsername/Library/Application Support/Plex Media Server/Plug-in Support/Databases/com.plexapp.plugins.library.db

    npm start

  puis ouvrir dans votre navigateur l'adresse http://localhost:3000


**Sous Ubuntu**

  pré requis nodejs, ou

    apt-get install nodejs

    ln -s /usr/bin/nodejs /usr/local/bin/node

  puis, se déplacer dans votre repertoire pour l'install et :

    git clone https://github.com/TwanoO67/plex-web-downloader.git

    cd plex-web-downloader

    npm install

  modifier le fichier config.js, pour y mettre le chemin de la base de données plex

  exemple: /home/yourUsername/plex-config/Plex Media Server/Plug-in Support/Databases/com.plexapp.plugins.library.db

    npm start

  puis ouvrir dans votre navigateur l'adresse http://localhost:3000



DEVELOPPEMENT
--------------------

**le projet a été créée initialement avec**

    node install express -g

    node install express-generator -g

    express nom_du_projet

    cd nom_du_projet

    npm install

**pour installer plex (depuis un dockerfile)**

    mkdir ~/plex-config

    sudo chown 797:797 -R ~/plex-config

    sudo docker run -d --restart=always -v ~/plex-config:/config -v ~/Movies:/media/plex -p 32400:32400 wernight/plex-media-server

    sudo chmod 777 ~/plex-config/Plex\ Media\ Server/Plug-in\ Support/Databases/*

    sudo chmod 777 ~/Movies

    sudo ln -s ~/Movies /media/plex

puis configurer vos chaines sur: http://localhost:32400/web/index.html


COMPILATION
--------------------

    npm install enclose -g

      enclose -o bin/mac_bin --loglevel info -c enclose_config.js -v 0.12.7 ./bin/www


TODO Liste
--------------------
* Ajouter une présentation sur l'index, configurable dans config.js
* Gérer les images des vignettes
* Faire une page spéciales pour les séries
* Gérer les téléchargements multi-source en proposant un lien aria2 (voir aria2.sourceforge.net)
* Intégré web ui: http://ziahamza.github.io/webui-aria2/
* Mettre en place une limite d'upload activable à la demande
