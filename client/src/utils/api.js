// check for authentication
exports.auth = () => {
  return fetch("/auth", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
//Log user in
exports.login = (email, password) => {
  return fetch("/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
};
// Log user out
exports.logout = () => {
  return fetch("/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
// Sign user up
exports.signup = (firstName, lastName, email, password) => {
  return fetch("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
  });
};

// Create new Post
exports.addPost = (title, description, id) => {
  return fetch("/admin/post", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      description: description,
      userId: id
    })
  });
};
// Get all posts
exports.getPosts = () => {
  return fetch("/admin/posts", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
