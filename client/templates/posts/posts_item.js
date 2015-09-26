Template.postItem.helpers({
  domain: function () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

Template.postItem.events({
  'click .post .delete': function(e){
    e.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Are you sure you want to delete this discussion?");
    if (confirm){
      Meteor.call('postDelete', documentId); 
      Router.go('/');  
      alert("You have deleted the previous post.");
    }
  }
})