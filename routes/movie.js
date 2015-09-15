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
    data = row;

    res.render('movie', { title: 'Détail vidéo',movie: data });

  });

  db.close();



});

module.exports = router;
