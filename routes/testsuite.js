module.exports = function(app) {
    var path = require('path')
    , fs = require('fs')
    , express = require('express')
    , folio = require('folio')
    , jade = require('jade')
    , conf = require('mbc-common').config.Caspa;

    var specs = fs.readdirSync('test-in-browser/specs').filter( function (el) {
        return el.match(/\.js$/);
    }).map( function (el) {
            return process.cwd() + '/test-in-browser/specs/' + el;
    }).sort();
    var specsFolio = new folio.Glossary(specs, {minify: false});
    app.get('/test/specs.js', folio.serve(specsFolio));

    app.get('/test',  function(req, res) {
        res.render('testindex', { name: conf.Branding.name, description: conf.Branding.description });
    });

    app.use('/test',    express.static('test-in-browser'));
}
