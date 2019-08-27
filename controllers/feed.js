exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: 1,
      title: 'First Post',
      content: 'This is the first post!',
      imageUrl: "images/2019-08-13T10_40_57.226Z-Satellites.jpg",
      creator: {
        name: "Dmitry Marokhonov"
      },
      createdAt: new Date()

    }]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  console.log(title, content);
  // Create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: { name: "Dmitry Marokhonov" },
      createdAt: new Date()
    }
  });
};
