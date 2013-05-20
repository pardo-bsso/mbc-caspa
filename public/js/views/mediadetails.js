window.MediaView = function (options) {
    var model = options['model'];

    this.el = $(template.mediaview(model.toJSON()));
    console.log('MediaView 2');

    view_model = kb.viewModel(model);

    view_model.save = function (viewmodel) {
        console.log('MV save()');
        if (viewmodel) {
            console.log(viewmodel);
            viewmodel.model().save();
        }
    };

    ko.applyBindings(view_model, this.el[0]);

}

