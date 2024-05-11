<?php
// connect to mysql
$connect = mysqli_connect("localhost", "root");
// handle connection error
if (!$connect) {
  die("Failed to connect: " . mysqli_connect_error());
}

// select the website database
mysqli_select_db($connect, "website_db");

// select the trivia_game table order by score and limit to 10
$query = "SELECT * FROM trivia_game ORDER BY score DESC LIMIT 10";
$result = mysqli_query($connect, $query);
// handle query error
if (!$result) {
  die("Failed to query: " . mysqli_error($connect));
}

// echo the table header
echo "<table border>";
echo "<tr><th>Rank</th><th>Player Name</th><th>Abbreviation</th><th>Score</th></tr>";

// get the data from the trivia_game table
$rank = 1;
while ($row = mysqli_fetch_assoc($result)) {
  echo "<tr><td>$rank</td><td>{$row['player_name']}</td><td>{$row['player_abbr']}</td><td>{$row['score']}</td></tr>";
  $rank++;
}

// echo the table footer
echo "</table>";

// close the connection
mysqli_close($connect);

// return success header
header("HTTP/1.1 200 OK");