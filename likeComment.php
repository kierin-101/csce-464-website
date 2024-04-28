<?php

//get comment id from post body
$comment_id = $_POST['id'];

//connect to mysql
$conn = mysqli_connect("localhost", "root");
if (mysqli_connect_errno()) {
  return "MySQL Error: " . mysqli_connect_error();
}

//connect to database
$db = mysqli_select_db($conn, "website_db");

// increment likes for comment
$query = "UPDATE website_db.comments SET likes = likes + 1 WHERE id = $comment_id";

if (!mysqli_query($conn, $query)) {
  return "MySQL Error: " . mysqli_error($conn);
}