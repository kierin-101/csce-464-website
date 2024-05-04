<?php
// validate user input
$user = $_POST['name'];
$comment = $_POST['comment'];

// check if comment is a reply
if (isset($_POST['parent_id'])) {
  $parent_id = $_POST['parent_id'];
}

if (strlen($user) <= 3) {
  return 'Name must be longer than 3 characters';
}

if (strlen($comment) <= 5) {
  return 'Comment must be longer than 5 characters';
}

// sanitize user input
$user = htmlspecialchars($user);
$comment = htmlspecialchars($comment);

// connect to mysql
$conn = mysqli_connect("localhost", "root");
if (mysqli_connect_errno()) {
  return "MySQL Error: " . mysqli_connect_error();
}

// parse post data and insert into comments table
date_default_timezone_set('America/Chicago');
$time = date("Y-m-d H:i:s");

if (isset($parent_id)) {
  $query = "INSERT INTO website_db.comments (user, comment, comment_time, likes, parent_id) VALUES ('$user', '$comment', '$time', 0, $parent_id)";
} else {
  $query = "INSERT INTO website_db.comments (user, comment, comment_time, likes) VALUES ('$user', '$comment', '$time', 0)";
}

if (!mysqli_query($conn, $query)) {
  return "MySQL Error: " . mysqli_error($conn);
}

// echo id of new comment
echo mysqli_insert_id($conn);

// close mysql connection
mysqli_close($conn);

// return success
header("HTTP/1.1 200 OK");