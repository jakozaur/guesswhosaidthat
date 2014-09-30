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


  Template.admin.people = function () {
    return People.find({});
  };

  Template.admin.editPerson = function () {
    return People.findOne(Session.get('adminEditPerson'));
  };

  AutoForm.hooks({
    updatePerson: {
      onSuccess: function() {
        Session.set('adminEditPerson', null);
      }
    }
  });

  AutoForm.addHooks(null, {
    onSubmit: function () {
      console.log("onSubmit ALL FORMS! 1");
    },
    onSuccess: function () {
      console.log("onSubmit ALL FORMS! 2");

    }
  });

  Session.setDefault('adminEditPerson', null);

  Template.adminPerson.events({
    'click .remove': function () {
      People.remove(this._id);
    },
    'click .edit': function () {
      Session.set('adminEditPerson', this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
