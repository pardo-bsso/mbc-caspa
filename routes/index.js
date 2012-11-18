module.exports = function(app) {
    var path = require('path')
    , folio = require('folio')
    , jade = require('jade');

    var self = require (__dirname + '/../models/App.js')
    , appModel = new self.Model();

    /*
     * GET home page.
     */

    app.get('/',  function(req, res) {
        res.render('index', appModel.toJSON());
    });


    /**
     * Vendor Javascript Package
     *
     * jquery
     * underscore
     * backbone
     * backbone.iosync
     * backbone.iobind
     */

    var lib_dir = path.join(__dirname, '..', 'vendor')

    var vendorJs = new folio.Glossary([
        require.resolve('jquery-browser/lib/jquery.js'),
        require.resolve('jqueryui-browser/ui/jquery-ui.js'),
        require.resolve('underscore/underscore.js'),
        require.resolve('backbone/backbone.js'),
        require.resolve('backboneio/backboneio.js'),
        path.join(lib_dir, 'sparkmd5/spark-md5.min.js'),
        path.join(lib_dir, 'bootstrap.min.js'),
        path.join(lib_dir, 'andika.js'),
        path.join(lib_dir, 'arvo.js'),
    ]);

    // serve using express

    app.get('/js/vendor.js', folio.serve(vendorJs));

    /**
     * Template Javascript Package
     *
     * We are going to use pre-compiled
     * jade on the client-side.
     */

    var templateJs = new folio.Glossary([
        require.resolve('jade/runtime.js'),
        path.join(__dirname, '..', 'views/templates/js/header.js'),
        path.join(__dirname, '..', 'views/templates/form.jade'),
        path.join(__dirname, '..', 'views/templates/item.jade'),
        path.join(__dirname, '..', 'views/templates/header.jade'),
        path.join(__dirname, '..', 'views/templates/medialist.jade'),
        path.join(__dirname, '..', 'views/templates/mediaview.jade'),
        path.join(__dirname, '..', 'views/templates/mediasearch.jade')
    ], {
        compilers: {
            jade: function (name, source) {
                return 'template[\'' + name + '\'] = ' +
                    jade.compile(source, {
                        client: true,
                        compileDebug: false
                    }) + ';';
    }
        }
    });

    // serve using express
    app.get('/js/templates.js', folio.serve(templateJs));
}
