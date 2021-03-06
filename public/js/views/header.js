var uiUpdateInterval = 200;

window.SourceInfoView = Backbone.View.extend({
        el: $('.streams-to-air-block'),
        initialize: function () {
            $(this.el).html(template.sourceinfo(this.model.toJSON()));
         }
});

window.TimeInfoView = Backbone.View.extend({
        el: $('.time-info-block'),
        initialize: function () {
            $(this.el).html(template.timeinfo(this.model.toJSON()));
            var self = this;
            setInterval (function () {
                $('#time', this.$el).html(moment().format ('HH:mm:ss'));
            }, uiUpdateInterval)
        }
});

window.HeaderView = function (options) {

    var self = this;

    self.appstatus = options['appstatus'];
    self.framestatus = options['framestatus'];

    self.el = 'el' in options ? options['el'] : $('#Panel');

    $(self.el).html(template.header());

    new SourceInfoView ({model: self.appstatus, el: $('.streams-to-air-block', self.$el)});
    new TimeInfoView   ({model: self.appstatus, el: $('.time-info-block', self.$el)});

    $('.now-playing-block', self.el).html(template.nowplaying({type: 'track'}));
    $('.show-block', self.el).html(template.nowplaying({type: 'Show'}));

    var HeaderViewModel = kb.ViewModel.extend({
        constructor: function(model) {
            kb.ViewModel.prototype.constructor.apply(this, arguments);
            var self = this;
        }
    });

    var FrameViewModel = kb.ViewModel.extend({
        constructor: function(model) {
            kb.ViewModel.prototype.constructor.apply(this, arguments);
            var self = this;
            this.progress = ko.computed(function() {
                var p = 100 * this.currentFrame() / this.totalFrames();
                return p.toPrecision(3);
            }, self);
        }
    });


    self.view_model = {
        Header:new HeaderViewModel(self.appstatus),
        Frame: new FrameViewModel(self.framestatus),
    };

    ko.applyBindings(self.view_model, self.el[0]);

    self.selectMenuItem = function (menuItem) {
        $('#nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
        $('.btn-collapse').click()
    };
    
    var toggle = function(e) {
        var panel = self.el;
        var content = $('#content');
        if (panel.position().top != $(window).scrollTop()) {
            panel.animate({top: 0});
            content.animate({'padding-top': '+=105'});
        } else {
            panel.animate({top: -105})
            content.animate({'padding-top': '-=105'});
        };
    };
    $('#toggle-header').click(toggle);
}

