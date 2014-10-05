Meteor.startup(function () {
  var users = [
    {
      name:"Jacek",
      email:"jacek@migdal.pl",
      roles:["admin"]
    },
    {
      name:"Gosia",
      email:"gosia@migdal.pl",
      roles:["admin"]
    },
    {
      name:"Dmitry",
      email:"foreverkia@gmail.com",
      roles:["admin"]
    }
  ];

  _.each(users, function (user) {
    try {
      var id = Accounts.createUser({
        email: user.email,
        password: "GuessWhoSaidThat",
        profile: { name: user.name }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles);
      }
    } catch (err) {
      // No-op: user already exist.
    }
  });
});
