"use strict";
var gui = window.require('nw.gui');
var util = require('util');



class CustomTrayMenu {
  constructor(windowPath, trayIcon, windowOptions) {
    this.shown = false;
    this.iconWidth = 12;

    //valeur par défaut
    this.trayIcon = trayIcon || 'tray2.png';
    this.menuWindowPath = windowPath || 'custom-tray-menu.html';
    this.menuWndowOptions = windowOptions || {
      width: 185,
      height: 143
    };

    this._initTray();
    this._initMenuWindow();


    this.tray.on('click', this.toggleTrayMenuAt.bind(this));
  }

  // remove tray, cose custom menu window
  remove() {
    this.tray.remove();
    this.tray = null;
    this.trayMenu.close();
  }

  _initTray() {
    this.tray = new gui.Tray({
      title: '',
      icon: this.trayIcon,
      alticon: '',
      tooltip: window.document.title,
      iconsAreTemplates: false
    });
  }

  _initMenuWindow() {
    var windowOptions = util._extend({
      width: 200,
      height: 100,
      frame: false,
      transparent: true,
      resizable: false,
      show: false,
      'show_in_taskbar': process.platform == "darwin"
    }, this.menuWndowOptions);

    this.trayMenu = gui.Window.open(this.menuWindowPath, windowOptions);

    // add class to new window's body to apply platform specific css
    this.trayMenu.on('document-end', function() {
      this.trayMenu.window.document.body.className += ' ' + process.platform;
      //console.log("Adding class " + process.platform);
    }.bind(this));

    this.trayMenu.on('blur', function () {
      this.trayMenu.hide();
      this.shown = false;
      //console.log('Hide custom menu');
    }.bind(this));

  }

  // called when user click on tray icon
  toggleTrayMenuAt(position) {
    /*if (this.shown) {
      this.trayMenu.hide(); // this will trigger listener added above
      this.shown = false;
    } else {*/
      this.translate(position);
      this.trayMenu.moveTo(position.x, position.y);
      //global.main_win.show();
      //global.main_win.focus();
      this.trayMenu.show();
      //this.trayMenu.focus();
      this.shown = true;
      //console.log('Show custom menu');
    //}
  }

  // calculdate position for window to appear
  translate(pos) {
    //console.log("Click position: " + util.inspect(pos));
    if (process.platform == 'darwin') {
      pos.x -= Math.floor(this.trayMenu.width / 2 - this.iconWidth);
    } else {
      pos.x -= Math.floor(this.trayMenu.width / 2);
      // for windows can not make exac position, because we have position of click. Just move it 5px up
      pos.y -= this._trayAreaIsTop(pos) ? 0 : this.trayMenu.height + this.iconWidth / 2 + 5;
    }
  }

  _trayAreaIsTop(pos) {
    var screen;
    if (gui.Screen.Init) gui.Screen.Init();
    function posInBounds(s) {
      return  pos.y > s.bounds.y && pos.y < (s.bounds.y + s.bounds.height) &&
              pos.x > s.bounds.x && pos.x < (s.bounds.x + s.bounds.width);
    }
    screen = gui.Screen.screens.filter(posInBounds)[0];
    return pos.y < (screen.bounds.y + screen.bounds.height) / 2;
  }
}

module.exports = CustomTrayMenu;
