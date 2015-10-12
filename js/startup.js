
  //sur le master on cree l'interface
  "use strict";
  var gui = require('nw.gui');
  var CustomTrayMenu = require('./js/custom-tray-menu');
  var win = gui.Window.get();
  global.main_win = win;

  //Test la presence du fichier de config
  var fs = require('fs.extra');

  fs.exists('config.js', function(exists) {
    if (!exists) {
      console.log('Config.js a été ré-initialisé');
      fs.copy('config.js_example','config.js');
    }
  });

  var config = require('./config');

  //Prevenir des informations de config
  if( typeof config.auth_user !== 'undefined' && typeof config.auth_password !== 'undefined' ){
    console.log("SAFE MODE: votre serveur est protégé par mot de passe.");
  }
  else{
    console.log("UNSAFE MODE: configurez un auth_user et auth_password dans le fichier config.js");
  }

  if( typeof config.database !== undefined){
    fs.exists(config.database, function(exists) {
      if (!exists) {
        console.log("La base plex n'existe pas. Mettez à jour le champ DATABASE du fichier config.js");
      }
      else{
        console.log("La base plex a bien été trouvée.");
      }
    });
  }
  else{
    console.log("La base plex n'est pas définie. Mettez à jour le champ DATABASE du fichier config.js");
  }

  // Extend application menu for Mac OS
  if (process.platform == "darwin") {
    var menu = new gui.Menu({type: "menubar"});
    menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
    win.menu = menu;
  }

  var $ = function (selector) {
    return document.querySelector(selector);
  }

  var customTray;

  customTray = new CustomTrayMenu('views/custom-tray-menu.html', 'public/icon.png', {
    width: 200,
    height: 180
  });

  win.hide();

  //lancement du serveur
  var child_process = require('child_process');
  global.main_server = child_process.exec('./bin/node ./js/clustering.js');

  //on tue le serveur quand on quite l'interface
  process.on('exit', function (exitCode) {
    child_process.kill();
  });
