Posts = new Mongo.Collection('posts'); 

Posts.allow({
  insert: function(userId, doc) {
    //This will stop people who aren't logged in from submitting client-side data to our Mongo collection above.
    return !! userId; 
  }
});