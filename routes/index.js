var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var config = require('../config');
  var db = config.init_db();

  var html = "<!doctype html><html lang='fr'><head><meta charset='UTF-8'><head>"
  +"<script type='text/javascript' src='//code.jquery.com/jquery-1.11.3.min.js'></script>"
  +"<script type='text/javascript' src='https://cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js'></script>"
  +"<script type='text/javascript' src='https://cdn.datatables.net/1.10.9/js/dataTables.bootstrap.min.js'></script>"
  +"<link rel='stylesheet' type='text/css' href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'>"
  +"<link rel='stylesheet' type='text/css' href='https://cdn.datatables.net/1.10.9/css/dataTables.bootstrap.min.css'>"


  +"</head><body><h1>liste des fichiers</h1>"
  + '<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">'
  + '      <thead>'
  + '          <tr>'
  + '              <th>Nom</th>'
  + '              <th>Durée</th>'
  + '              <th>Année</th>'
  + '          </tr>'
  + '      </thead>'
  + '      <tbody>';

  //on fais toute les opération de base a la suite
  db.serialize(function() {

    //db.run("CREATE TABLE if not exists user_info (info TEXT)");
    //var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
    //for (var i = 0; i < 10; i++) {
    //    stmt.run("Ipsum " + i);
    //}
    //stmt.finalize();

    db.each("SELECT i.id as id, i.title as title, p.file as file, i.duration as second, i.year as year"
    + " FROM metadata_items i, media_parts p "
    + " WHERE p.media_item_id=i.id ORDER BY i.title ASC", function(err, row) {
        var tab = row.file.split('/');
        var filename = tab[tab.length -1];
        html += "<tr><td><a href='/file/"+ row.id + "/"+filename+"'> " + row.title + "</a></td><td>"+row.second+"</td><td>"+row.year+"</td></tr>";
    },
    //aprés toute les opération de la base
    function() {
        // All done fetching records, render response
        html += "</tbody></table><script>$(document).ready(function() {"
    + "$('#example').DataTable();"
    + "} );</script></body></html>";
        res.end(html);
    });

  });

  db.close();
  //res.render('index', { title: 'Express' });
});

module.exports = router;
