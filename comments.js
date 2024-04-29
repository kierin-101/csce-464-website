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

function submitComment(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const req = new XMLHttpRequest();
  req.open("POST", "uploadComment.php", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      getComments(); // Refresh comments immediately
    }
  }
  req.send(`name=${name}&comment=${comment}`);
}


function likeComment(id) {
  const req = new XMLHttpRequest();
  req.open("POST", "likeComment.php", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      getComments(); // Refresh comments immediately
    }
  }
  req.send(`id=${id}`);
}

getComments() // get comments on page load
setInterval(getComments, 5000); // refresh comments every 5 seconds