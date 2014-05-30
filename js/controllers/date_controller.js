  Calendar.DateController = Em.ObjectController.extend({
      transition: function () {
          this.transitionToRoute('date', this.get('model').year, this.get('model').month, this.get('model').day);
      },
      actions: {
          prevYear: function () {
              this.set('year', parseInt(this.get('year')) - 1);
              this.transition();
          },
          nextYear: function () {
              this.set('year', parseInt(this.get('year')) + 1);
              this.transition();
          },
          prevMonth: function () {
              if (this.get('month') <= 1) {
                  this.set('month', 12);
                  this.send('prevYear');
              } else {
                  this.set('month', parseInt(this.get('month')) - 1);
                  this.transition();
              }
          },
          nextMonth: function () {
              if (this.get('month') >= 12) {
                  this.set('month', 1);
                  this.send('nextYear');
              } else {
                  this.set('month', parseInt(this.get('month')) + 1);
                  this.transition();
              }
          },
          selectDay: function (day) {
              this.set('day', day.get('number'));
              this.transition();
          },
          today: function(){
              this.set('year', new Date().getFullYear());
              this.set('month', new Date().getMonth()+1);
              this.set('day', new Date().getDate());
              this.transition();
          }
      },
      getWeeks: function () {
          var year = parseInt(this.get('year')),
              month = parseInt(this.get('month')),
              day = parseInt(this.get('day')),
              dayInThisMonth = new Date(year, month, 0).getDate(),
              arrayOfWeeks = [],
              week = [],
              today = {
                  year: new Date().getFullYear(),
                  month: new Date().getMonth() + 1,
                  day: new Date().getDate()
              },
              firstWeekDay = new Date(year, month - 1, 1).getDay();

          firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay;
          for (var weekDay = 1; weekDay < firstWeekDay; weekDay++) {
              week.push(Ember.Object.create({
                  number: "",
                  isSelected: false,
                  isCurrent: false
              }));
          }
          weekDay = firstWeekDay;
          for (var dayCounter = 1; dayCounter <= dayInThisMonth; dayCounter++) {
              if (week.length == 7) {
                  arrayOfWeeks.push(week);
                  week = [];
              }
              week.push(Ember.Object.create({
                  number: dayCounter,
                  isSelected: dayCounter === day,
                  isCurrent: year === today.year && month === today.month && dayCounter === today.day
              }));
          }
          arrayOfWeeks.push(week);
          return arrayOfWeeks;
      }.property('month', 'year')
  });