/*

Chercher votre fichier de base de données plex, grace à ces indications:

Windows Vista, Server 2008, Server 2008 R2, WHS 2011, Windows 7, Windows 8:
C:\Users\yourusername\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db

Mac OS X:
~/Library/Application Support/Plex Media Server/Plug-in Support/Databases/com.plexapp.plugins.library.db

Windows XP, Server 2003, ou Home Server:
C:\Documents and Settings\yourusername\Local Settings\Application Data\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db

*/

module.exports = {
    database: '/Users/aweber/Desktop/com.plexapp.plugins.library.db',


    init_db: function(){
      var sqlite3 = require('sqlite3').verbose();
      var db = new sqlite3.Database(this.database);
      return db;
    }
};
