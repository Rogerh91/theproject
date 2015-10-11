Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validatePost(post);
      if (errors.title || errors.url)
        return Session.set('postSubmitErrors', errors);
      

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        Errors.throw(error.reason);

      if (result.postExists) //calls on the postExists attribute of posts.js line 14 
        Errors.throw("This link has already been uploaded to the server.");

      Router.go('postPage', {_id: result._id});  
    });
  }
});

//Line 1 is the standard helper for Meteor. It calls on postSubmit.html
//Line 2 calls the function after the event happens. It defines a function and a variable--the variable the doesn't actually matter. We started it function(a)
//Line 3 prevents the default behavior of a form submission and breaks it to the new logic
//Line 5 defines a local variable post
//Line 6 defines a new url variable through finding the value assigned to the label name "url"
//Line 7 does the same with the label name "title"
//Line 10 places the new value into the posts database and take out the id of post
//Line 11 goes to the defined page. 