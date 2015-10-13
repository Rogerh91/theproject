Posts = new Mongo.Collection('posts'); 

//need to figure out how to attach the schema to form validation in the HTML 
 /*
 var Schemas = {};

Schemas.Post = new SimpleSchema ({
  title: {
    type: String,
    label: "Title"
  },
  url: {
    type: String,
    label: "URL"
  }
});

Posts.attachSchema(Schemas.Post);
*/

Posts.allow ({
  update: function (userId, post) { return ownsDocument (userId, post);}
});

Posts.deny ({
  update: function (userId, post, fieldNames) {
    //make it so you can only edit the title and URL fields 
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Posts.deny ({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
})

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.url) 
      throw new Meteor.Error ('invalid-post', "You must set values for your title and URL.");

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists : true,
        _id: postWithSameLink._id

      }
    }
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      commentsCount: 0
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },

  postDelete: function(documentId) {
    Posts.remove({_id: documentId});
  }
  
});

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (! post.url)
    errors.url = "Please fill in a URL";
  return errors; 
}