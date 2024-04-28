<?php

$conn = mysqli_connect("localhost", "root");
$query = "SELECT * FROM website_db.comments";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
  $i = 0;
  echo "{"; // start of json array
  while ($row = mysqli_fetch_assoc($result)) {
    $i++;
    echo "\"" . $row["id"] . "\" : " . json_encode($row);
    if ($i < mysqli_num_rows($result)) {
      echo ", ";
    }
  }
  echo "}"; // end of json array

} else {
  echo "No comments yet!";
}