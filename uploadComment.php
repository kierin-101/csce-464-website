<?php
// validate user input
$user = $_POST['name'];
$comment = $_POST['comment'];
$session_id = $_POST['session_id'];

// check if comment is a reply
if (isset($_POST['parent_id'])) {
  $parent_id = $_POST['parent_id'];
}

if (strlen($user) < 1) {
  return 'Name must be at least 1 character';
}

if (strlen($comment) < 1) {
  return 'Comment must be at least 1 character';
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
  $query = "INSERT INTO website_db.comments (user, comment, comment_time, likes, session_id, parent_id) VALUES ('$user', '$comment', '$time', 0, '$session_id', '$parent_id')";
} else {
  $query = "INSERT INTO website_db.comments (user, comment, comment_time, likes, session_id) VALUES ('$user', '$comment', '$time', 0, '$session_id')";
}

if (!mysqli_query($conn, $query)) {
  return "MySQL Error: " . mysqli_error($conn);
}

// echo id of new comment
echo mysqli_insert_id($conn);

// close mysql connection
mysqli_close($conn);
