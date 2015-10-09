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

customTray = new CustomTrayMenu('./views/custom-tray-menu.html', 'public/icon.png', {
  width: 200,
  height: 150
});

// for nw-notify frameless windows
win.on('close', function() {
  gui.App.quit();
});

win.on('click',function(t){
  console.log(t);
});

// bring window to front when open via terminal
//win.focus();
win.hide();

var writeLog = function (msg, type) {
  console.log(msg);
};

process.on('log', function (message) {
  writeLog(message);
});

//on lance l'application en commencant par la creation des cluster
//require('./clustering');
var child_process = require('child_process');

// exec: spawns a shell.
child_process.exec('node js/clustering.js', function(error, stdout, stderr){
	console.log(stdout);
});
