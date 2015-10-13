Plex Web Downloader
===============

Ce projet permet de créer une liste de vos fichiers vidéo plex et de les partager aux travers d'une interface web.



INSTALLATION FACILE
--------------------

Télécharger notre version pré-packagé:

Pour Windows 64 bits (testé sur Seven)
  [Plex Web Download pour Windows 64bits](https://www.dropbox.com/s/oh6d34vxzw1ga3o/plex_wb_win64.zip?dl=0)

Pour MacOS 64 bits ( testé sur Yosemite )
  [Plex Web Download pour MacOS 64bits](https://www.dropbox.com/s/q1ouyv6nj0zylkp/plex_wd_osx64.zip?dl=0)

Puis éditer le fichier de configuration pour fournir le chemin vers votre bdd plex.
(Vous pouvez aussi y parametrer un theme, et un user/mot de passe)

Ensuite ouvrez votre navigateur vers http://localhost:3000/ et enjoy :)

( Vous n'avez plus qu'à rediriger les ports de votre routeur pour partager ce lien avec votre IP public)

![Aperçu](https://raw.githubusercontent.com/TwanoO67/plex-web-downloader/release/public/screenshot.png)


INSTALLATION MANUELLE
--------------------

Si vous préférez compiler vous-même la derniere version du projet, ou si votre système d'exploitation n'est pas supporter:

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

    brew install node

  ensuite

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
* Gérer les images des vignettes
* Gérer les téléchargements multi-source en proposant un lien aria2 (voir aria2.sourceforge.net)
* Intégré web ui: http://ziahamza.github.io/webui-aria2/
* Mettre en place une limite d'upload activable à la demande
