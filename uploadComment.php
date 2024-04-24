<?php

// write to comments.json
$file = file('./comments.json', FILE_IGNORE_NEW_LINES);
$lineCount = count($file);
$commentNumber = $lineCount - 2;

$jsonFormat = '  "%s": {"name": "%s", "comment": "%s", "date": "%s"}'; // json format for comments
$comment = sprintf($jsonFormat, $commentNumber, $_POST['name'], $_POST['comment'], date('Y-m-d H:i:s'));

$file[$lineCount - 2] .= ','; // add comma to last comment
$file[$lineCount - 1] = $comment; // add new comment
array_push($file, "}"); // close json

file_put_contents("./comments.json", ''); // clear file
for ($i = 0; $i < count($file); $i++) {
  echo $file[$i];
  echo '<br>';
  file_put_contents('./comments.json', $file[$i] . PHP_EOL, FILE_APPEND);
}

header('Location: ./index.html', true);