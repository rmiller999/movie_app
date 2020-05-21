const express = require('express');
const router = express.Router();

const rp = require('request-promise');
const $ = require('cheerio');


router.get('/scrape', function(req, res){
  const url = `https://usa.newonnetflix.info/catalog/search/${req.body.selected.original_title}#results`;

  rp(url)
  .then(function(html){
    //success!
    console.log($('article > div > a > img',html).length);
    console.log($('article > div > a > img',html));
    const onNetflix = ($('article > div > a > img',html)[0].attribs.alt)
    res.json(onNetflix)
  })
  .catch(function(err){
    //handle error
  })
})