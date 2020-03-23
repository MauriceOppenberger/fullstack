// maintain fetch calls in one location

// check for authentication
export const auth = () => {
  return fetch("/auth", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
//Log user in
export const login = (email, password) => {
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
export const logout = () => {
  return fetch("/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
// Sign user up
export const signup = (firstName, lastName, email, password) => {
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
export const addPost = (values, userId) => {
  return fetch("/admin/add-post", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: values.title,
      description: values.description,
      language: values.language,
      userId: userId
    })
  });
};

//partially refactored to async/await function

// Update Post
export const updatePost = async (id, values, userId) => {
  try {
    const res = await fetch(`/admin/edit-post/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        updatedTitle: values.title,
        updatedDescription: values.description,
        updatedLanguage: values.language,
        userId: userId
      })
    });
    if (res.status !== 200 && res.status !== 201) {
      const error = new Error("Could not update post");
      throw error;
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};
// Get all posts by user
export const getPostsByUser = async () => {
  try {
    const res = await fetch("/admin/posts", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.status !== 200) {
      const error = new Error("Could not fetch");
      throw error;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Get One post by id
export const getPost = async id => {
  try {
    const res = await fetch(`/posts/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const post = await res.json();
    return post;
  } catch (err) {
    console.log(err);
  }
};

// Get all public posts
export const getAllPosts = async () => {
  try {
    const res = await fetch("/posts", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (res.status !== 200) {
      const error = new Error("Could not fetch");
      throw error;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//Delete post by id
export const deletePost = async id => {
  try {
    const res = await fetch(`/admin/posts/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.status !== 200) {
      const error = new Error("Could not Delete post");
      throw error;
    }

    return res;
  } catch (err) {
    console.log(err);
  }
};

//Post Comment
export const addComment = async (values, postId) => {
  try {
    const res = await fetch(`/admin/posts/${postId}/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: values.comment,
        code: values.code
      })
    });
    if (res.status !== 200 && res.status !== 201) {
      const error = new Error("Could not Delete post");
      throw error;
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};
