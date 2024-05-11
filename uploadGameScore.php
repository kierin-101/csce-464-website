<?php

// connect to mysql
$connect = mysqli_connect("localhost", "root");
// handle connection error
if (!$connect) {
  die("Failed to connect: " . mysqli_connect_error());
}

// select the website database
$result = mysqli_select_db($connect, "website_db");
// handle query error
if (!$result) {
  die("Failed to query: " . mysqli_error($connect));
}

// get the player name, abbreviation, and score from the POST request
$player_name = $_POST['player_name'];
$abbreviation = $_POST['abbreviation'];
$score = $_POST['score'];

// insert the player name, abbreviation, and score into the trivia_game table
$query = "INSERT INTO trivia_game (player_name, player_abbr, score) VALUES ('$player_name', '$abbreviation', $score)";
$result = mysqli_query($connect, $query);
// handle query error
if (!$result) {
  die("Failed to query: " . mysqli_error($connect));
}

// close the connection
mysqli_close($connect);

// return success header
header("HTTP/1.1 200 OK");
