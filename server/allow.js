var isAdmin = function (userId) {
  return Roles.userIsInRole(userId, 'admin');
};

People.allow({
  insert: isAdmin,
  update: isAdmin,
  remove: isAdmin
});

Quotes.allow({
  insert: isAdmin,
  update: isAdmin,
  remove: isAdmin
});

MvpEmails.allow({
  insert: function () {
    return true;
  }
});
