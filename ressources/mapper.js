module.exports = {
  intToBoolean,
  booleanToint,
  schoolToBody,
  bublToBody,
  roleToBody,
  userToBody,
  postToBody,
  commentToBody,
  hashtagToBody
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function schoolToBody(school) {
  const result = {
    ...school
  };

  if (school.bubls) {
    result.bubls = school.bubls.map(bubl => ({
      ...bubl
    }));
  }

  if (school.users) {
    result.users = school.users.map(user => ({
      ...user
    }));
  }

  return result;
}

function bublToBody(bubl) {
  const result = {
    ...bubl,
    is_active: intToBoolean(bubl.is_active)
  };

  if (bubl.posts) {
    result.posts = bubl.posts.map(post => ({
      ...post
    }));
  }

  if (bubl.users) {
    result.users = bubl.users.map(user => ({
      ...user
    }));
  }

  if (bubl.comments) {
    result.comments = bubl.comments.map(comment => ({
      ...comment
    }));
  }

  if (bubl.hashtags) {
    result.hashtags = bubl.hashtags.map(hashtag => ({
      ...hashtag
    }));
  }

  return result;
}

function roleToBody(role) {
  const result = {
    ...role
  };

  if (role.users) {
    result.users = role.users.map(user => ({
      ...user
    }));
  }

  return result;
}

function userToBody(user) {
  const result = {
    ...user
  };

  if (user.posts) {
    result.posts = user.posts.map(post => ({
      ...post
    }));
  }

  if (user.comments) {
    result.comments = user.comments.map(comment => ({
      ...comment
    }));
  }

  return result;
}

function postToBody(post) {
  const result = {
    ...post
  };

  if (post.comments) {
    result.comments = post.comments.map(comment => ({
      ...comment
    }));
  }

  if (post.hashtags) {
    result.hashtags = post.hashtags.map(hashtag => ({
      ...hashtag
    }));
  }

  return result;
}

function commentToBody(comment) {
  const result = {
    ...comment
  };

  if (comment.hashtags) {
    result.hashtags = comment.hashtags.map(hashtag => ({
      ...hashtag
    }));
  }

  return result;
}

function hashtagToBody(hashtag) {
  const result = {
    ...hashtag
  };

  if (hashtag.posts) {
    result.posts = hashtag.posts.map(post => ({
      ...post
    }));
  }

  if (hashtag.comments) {
    result.comments = hashtag.comments.map(comment => ({
      ...comment
    }));
  }

  return result;
}
