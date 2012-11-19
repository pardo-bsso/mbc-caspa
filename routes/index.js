module.exports = function(app) {
    var path = require('path')
    , folio = require('folio')
    , jade = require('jade')
    , po2json = require('po2json');

    var self = require (__dirname + '/../models/App.js')
    , appModel = new self.Model();

    /*
     * GET home page.
     */

    app.get('/',  function(req, res) {
        res.render('index', appModel.toJSON());
    });

    app.get('/po/:id', function (req, res) {
        var lang = req.params.id;

        var jsondata = '';
        try {
            jsondata = po2json.parseSync('locale/' + lang + '/LC_MESSAGES/messages.po');
            res.send (jsondata);
        } catch (e) {
            console.log (e);
        }
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
        require.resolve('jed'),
        path.join(lib_dir, 'sparkmd5/spark-md5.min.js'),
        path.join(lib_dir, 'bootstrap.min.js'),
        path.join(lib_dir, 'andika.js'),
        path.join(lib_dir, 'arvo.js'),
    ]);

    // serve using express

    app.get('/js/vendor.js', folio.serve(vendorJs));

    /**
     * Views Javascript Package
     */

    var views = ['paginator',
                 'header',
                 'home',
                 'playbar',
                 'medialist',
                 'mediadetails',
                 'mediasearch',
                 'about'];

    var viewsJs = new folio.Glossary(
        views.map (function (e) {
            return path.join(__dirname, '..', 'public/js/views/', e + '.js');
        })
    );

    app.get('/js/views.js', folio.serve(viewsJs));

    /**
     * Models Javascript Package
     */

    var models = ['App', 'Media'];

    var modelsJs = new folio.Glossary(
        models.map (function (e) {
            return path.join(__dirname, '..', 'models', e + '.js');
        })
    );

    app.get('/js/models.js', folio.serve(modelsJs));


    /**
     * Template Javascript Package
     *
     * We are going to use pre-compiled
     * jade on the client-side.
     */

    var templates = ['form',
                     'item',
                     'playbar',
                     'header',
                     'medialist',
                     'mediaview',
                     'mediasearch',
                    ];

    var templateJs = new folio.Glossary([
        require.resolve('jade/runtime.js'),
        path.join(__dirname, '..', 'views/templates/js/header.js')].concat(
            templates.map (function (e) {
                return path.join(__dirname, '..', 'views/templates/', e + '.jade');
            })
        ),
        {
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