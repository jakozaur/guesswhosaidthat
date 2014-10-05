Router.map(function () {
  this.route('landing', {
    path: '/'
  });
  this.route('question');
  this.route('answer');
  this.route('admin');
  this.route('adminPeople', {
    path: '/admin/people'
  });
  this.route('adminQuotes', {
    path: '/admin/quotes'
  });
});


Router.onBeforeAction(function (pause) {
  var prefix = "admin";
  if (prefix !== this.route.name.substring(0, prefix.length)) {
    return;
  }

  if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
    this.setLayout('login');
    this.render('login');

    //and finally call the pause() to prevent further actions from running
    pause();
  } else {
    this.setLayout(this.lookupLayoutTemplate());
  }
});
