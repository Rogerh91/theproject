Template.postEdit.events({
  'submit form' : function(e) {
    e.preventDefault();

    var currentId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validatePost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postEditErrors', errors);

    Posts.update(currentId, {$set: postProperties}, function(error) {
        if (error) {
          Errors.throw(error.reason);
        }
        else {
         Router.go('postPage', {_id: currentId}); 
        }
    });
  }
});

Template.postEdit.onCreated(function () {
  Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field]; 
  },
  errorClass: function(field) {
    return !! Session.get('postEditErrors')[field] ? 'has-error' : ''; 
  }
})