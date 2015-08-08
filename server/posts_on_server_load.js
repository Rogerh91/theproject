if (Posts.find().count() === 0) {

  Posts.insert({
    title: "Facebook",
    url: "http://www.facebook.com"
  });

  Posts.insert({
    title: "Meteor",
    url: "http://www.meteor.com"
  });

  Posts.insert({
    title: "Twitter",
    url: "http://www.twitter.com"
  });

  Posts.insert({
    title: "Shopify",
    url: "http://www.shopify.com"
  });

}