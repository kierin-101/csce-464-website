<?php

// connect to mysql
$conn = mysqli_connect("localhost", "root");
if (mysqli_connect_errno()) {
  return "MySQL Error: " . mysqli_connect_error();
}

// connect to website database
$db = mysqli_select_db($conn, "website_db");
if (!$db) {
  return "MySQL Error: " . mysqli_error($conn);
}

// get comment id from GET body
$comment_id = $_GET['id'];

// get comment by id from comments table
$query = "SELECT * FROM website_db.comments WHERE id = $comment_id";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) == 0) {
  header("HTTP/1.1 404 Not Found");
  return;
}

// return comment as json
$row = mysqli_fetch_assoc($result);
echo json_encode($row);

mysqli_close($conn);
header("HTTP/1.1 200 OK");