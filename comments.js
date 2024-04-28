function getComments() {
  const req = new XMLHttpRequest();
  req.open("GET", "getComments.php", true);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      const comments = JSON.parse(req.responseText);
      console.log(comments);
      const list = document.getElementById("comments_list");
      list.innerHTML = "";
      Object.values(comments).forEach(comment => {
        const li = document.createElement("li");
        const commentData = `<b>${comment.user}</b>: ${comment.comment} (<i>${comment.comment_time}</i>)`;
        const likeButton = `<button onclick="likeComment(${comment.id})">Like</button>`;
        const likeCount = `Likes: ${comment.likes}`;
        li.innerHTML = commentData + likeButton + likeCount;
        list.appendChild(li);
      });
    }
  }
  req.send();
}

getComments()
setInterval(getComments, 5000);

function likeComment(id) {
  const req = new XMLHttpRequest();
  req.open("POST", "likeComment.php", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      getComments(); // Refresh comments
    }
  }
  req.send(`id=${id}`);
}
