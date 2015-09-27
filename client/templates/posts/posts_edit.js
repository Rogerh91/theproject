Template.postEdit.events({
  'submit form' : function(e) {
    e.preventDefault();

    var currentId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    Posts.update(currentId, {$set: postProperties}, function(error) {
        if (error) {
          alert(error.reason);
        }
        else {
         Router.go('postPage', {_id: currentId}); 
        }
    });
  }
});