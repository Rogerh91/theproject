Template.postItem.helpers({

  ownPost: function() {
    return this.userId === Meteor.userId();
  }, 

  domain: function () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },

  upvotedClass: function(){
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
       } else {
      return 'disabled';
    }
  }
});

Template.postItem.events({
  'click .post .delete': function(e){
    e.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Are you sure you want to delete this discussion?");
    if (confirm){
      Meteor.call('postDelete', documentId); 
      Router.go('home');  
      alert("You have deleted the previous post.");
    }
  }
}); 

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});