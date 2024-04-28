<?php
// validate user input
$user = $_POST['name'];
$comment = $_POST['comment'];

if (strlen($user) <= 3) {
  return 'Name must be longer than 3 characters';
}

if (strlen($comment) <= 5) {
  return 'Comment must be longer than 5 characters';
}

// connect to mysql
$conn = mysqli_connect("localhost", "root");
if (mysqli_connect_errno()) {
  return "MySQL Error: " . mysqli_connect_error();
}

// parse post data and insert into comments table
$time = date('Y-m-d H:i:s');

$query = "INSERT INTO website_db.comments (user, comment, comment_time, likes) VALUES ('$user', '$comment', '$time', 0)";

if (!mysqli_query($conn, $query)) {
  return "MySQL Error: " . mysqli_error($conn);
}

header("Location: ./index.html#comments_list"); // redirect to comments section instead of showing a blank page