Em.Handlebars.helper('month-to-string', function (month) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.get('month')-1];
});