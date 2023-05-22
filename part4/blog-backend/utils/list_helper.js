const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null; // Return null if the array is empty
  }

  let mostLikedBlog = blogs[0];

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikedBlog.likes) {
      mostLikedBlog = blogs[i];
    }
  }

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
