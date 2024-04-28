<?php

// connect to mysql
$conn = mysqli_connect("localhost", "root");
if (mysqli_connect_errno()) {
  return "MySQL Error: " . mysqli_connect_error();
}

// connect to website database
$db = mysqli_select_db($conn, "website_db");

// create view counter table if it doesn't exist
$table = mysqli_query($conn, "SHOW TABLES like 'view_counter'");
if (mysqli_num_rows($table) == 0) {
  $query = mysqli_query($conn, "CREATE TABLE website_db.view_counter (
    id INT(6) UNSIGNED PRIMARY KEY,
    views INT(6) UNSIGNED
  )");
}

// get page id from post body
$page_id = $_POST['id'];

// check if page id exists in view counter table
$query = "SELECT * FROM website_db.view_counter WHERE id = $page_id";
$result = mysqli_query($conn, $query);

// if page id doesn't exist, insert it into view counter table
if (mysqli_num_rows($result) == 0) {
  // insert page id into view counter table
  $query = "INSERT INTO website_db.view_counter (id, views) VALUES ($page_id, 0)";
  if (!mysqli_query($conn, $query)) {
    return "MySQL Error: " . mysqli_error($conn);
  }
}

// get current views for page
$query = "SELECT views FROM website_db.view_counter WHERE id = $page_id";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
$views = $row['views'];

// increment view counter
$query = "UPDATE website_db.view_counter SET views = views + 1 WHERE id = $page_id";

if (!mysqli_query($conn, $query)) {
  return "MySQL Error: " . mysqli_error($conn);
}

// return updated views count
echo $views + 1;
