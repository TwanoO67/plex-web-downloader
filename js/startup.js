
  //sur le master on cree l'interface
  "use strict";
  var gui = require('nw.gui');
  var CustomTrayMenu = require('./js/custom-tray-menu');
  var win = gui.Window.get();
  global.main_win = win;

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
  global.main_server = child_process.fork('./js/clustering.js');

  //on tue le serveur quand on quite l'interface
  process.on('exit', function (exitCode) {
    child_process.kill();
  });
