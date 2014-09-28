if (Meteor.isClient) {

  Template.landing.events({
    'click button': function () {
      Router.go('question');
    }
  });

  Template.answer.events({
    'click button': function () {
      Router.go('question');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
