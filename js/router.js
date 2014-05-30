Calendar.Router.map(function () {
    this.route('date', {
        path: 'year/:year/month/:month/day/:day'
    });
});

Calendar.IndexRoute = Em.Route.extend({
    model: function () {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
        };
    },
    afterModel: function (model) {
        this.transitionTo('date', model);
    }
});