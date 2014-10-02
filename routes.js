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


