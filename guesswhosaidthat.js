if (Meteor.isClient) {

  Template.landing.events({
    'click button': function () {
      Router.go('question');
    }
  });

  Template.question.events({
    'click ul li': function () {
      Router.go('answer');
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
