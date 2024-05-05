<?php
// connect to mysql
$conn = mysqli_connect("localhost", "root");
if (mysqli_connect_errno()) {
  return "MySQL Error: " . mysqli_connect_error();
}

// validate user input
$newComment = $_POST['comment'];
$comment_id = $_POST['id'];

if (strlen($newComment) < 1) {
  return 'Comment must be at least 1 character';
}

// sanitize user input
$newComment = htmlspecialchars($newComment);

// parse post data and update comments table
$query = "UPDATE website_db.comments SET comment = '$newComment' WHERE id = $comment_id";

if (!mysqli_query($conn, $query)) {
  return "MySQL Error: " . mysqli_error($conn);
}

// close mysql connection
mysqli_close($conn);

// return success message
header("HTTP/1.1 200 OK");