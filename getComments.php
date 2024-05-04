<?php

date_default_timezone_set('America/Chicago'); // set timezone to central time

$conn = mysqli_connect("localhost", "root");
$query = "SELECT * FROM website_db.comments";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
  $i = 0;
  echo "{"; // start of json array
  while ($row = mysqli_fetch_assoc($result)) {
    $i++;

    // convert time to more readable format
    $row["comment_time"] = date("F j, Y, g:i a e", strtotime($row["comment_time"]));

    if ($row["parent_id"] != null) {
      $parent_id = $row["parent_id"];
      $query = "SELECT * FROM website_db.comments WHERE id = $parent_id";
      $parent_result = mysqli_query($conn, $query);
      $parent_row = mysqli_fetch_assoc($parent_result);
      // update parent comment time to more readable format
      $parent_row["comment_time"] = date("F j, Y, g:i a e", strtotime($parent_row["comment_time"]));
      $row["parent"] = $parent_row;
    }
    echo "\"" . $row["id"] . "\" : " . json_encode($row);
    if ($i < mysqli_num_rows($result)) {
      echo ", ";
    }
  }
  echo "}"; // end of json array
  mysqli_close($conn);
  header("HTTP/1.1 200 OK");
} else {
  header("HTTP/1.1 404 Not Found"); // no comments found
}
