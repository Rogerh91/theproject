var postsData = [
{
  title: 'Roger',
  url: 'http://www.roger.com'
},

{
  title: 'Twitter',
  url: 'http://www.twitter.com'
},

{
  title: 'Facebook',
  url: 'http://www.facebook.com'
},

{
  title: 'Mcgill',
  url: 'http://www.mcgill.com'
}

];

Template.postsList.helpers({
  posts: postsData
});