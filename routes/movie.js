var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var config = require('../config');
  var db = config.init_db();

  var data;

  db.get("SELECT id,title,original_title,studio,rating,summary,duration,tags_genre,tags_star,year FROM metadata_items WHERE id = ?",req.params.id, function(err, row) {

    row.tags_genre = row.tags_genre.split('|');
    row.tags_star = row.tags_star.split('|');
    row.rating = Math.round(row.rating,2);
    row.file = [];

    db.each("SELECT id,file,size,hash,duration FROM media_parts where media_item_id IN (SELECT id FROM media_items WHERE metadata_item_id = ? )",req.params.id, function(error, ligne) {
      var tab = ligne.file.split('/');
      var tab2 = tab[tab.length -1].split('\\');
      var filename = tab2[tab2.length -1];
      ligne.filename = filename;

      row.file.push(ligne);
    },function(){
      res.render('movie', { title: 'Détail vidéo',movie: row });
    });

  });

  db.close();



});

module.exports = router;
