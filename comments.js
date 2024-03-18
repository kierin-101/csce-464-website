validateName = function (commentName) {
  if (commentName.length < 3) {
    alert('Name must be at least 3 characters');
    return false;
  }
  return true;
}

validateComment = function (commentText) {
  if (commentText.length < 10) {
    alert('Comment must be at least 10 characters');
    return false;
  }
  return true;
}

submitComment = function (event) {
  event.preventDefault(); // stop the form from submitting
  const commentName = document.getElementById('name').value;
  const goodCommentName = validateName(commentName);
  if (!goodCommentName) {
    return;
  }
  const commentText = document.getElementById('comment').value;
  const goodCommentText = validateComment(commentText);
  if (!goodCommentText) {
    return;
  }
  const comment = { name: commentName, text: commentText };
  const commentList = document.getElementById('comments_list');
  const newComment = document.createElement('li');
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() - (currentTime.getTimezoneOffset() / 60));
  const timeString = currentTime.toISOString().slice(0, 19).replace('T', ' ');
  newComment.innerHTML = '<p><b>' + comment.name + '</b>: ' + comment.text + ' <i>(' + timeString + ')</i></p>';
  commentList.appendChild(newComment);
  console.log(comment);
}