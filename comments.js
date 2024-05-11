var userIsTyping = false;
var sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
sessionStorage.setItem('sessionId', sessionId);
console.log("sessionId", sessionId);

function getComments() {
  if (userIsTyping) { // Don't refresh comments if user is typing
    console.log("User is typing, not refreshing comments");
    return;
  }
  const req = new XMLHttpRequest();
  req.open("GET", "getComments.php", true);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      // handle errors
      if (req.status == 500) {
        console.log("Error getting comments");
        return;
      }
      // handle no comments
      if (req.status == 404) {
        document.getElementById("comments_list").innerHTML = "No comments yet";
        return;
      }

      // parse comments from JSON
      const comments = JSON.parse(req.responseText);

      // get comments list element
      const root_comment_list = document.getElementById("comments_list");

      // get font size from session storage
      const fontSize = sessionStorage.getItem('fontSize');
      root_comment_list.style.fontSize = (isNaN(parseInt(fontSize)) ? 16 : fontSize) + 'px';

      // clear list before adding comments
      root_comment_list.innerHTML = "";

      // add comments to list through forEach loop
      Object.values(comments).forEach(comment => {
        // create list item for each comment
        const li = document.createElement("li");
        // give list item an id
        li.id = `comment_${comment.id}`;
        // add comment content to list item
        // create nodes for comment content
        const name = document.createElement("strong");
        name.innerHTML = comment.user;
        const date = document.createElement("em");
        date.textContent = comment.comment_time;

        const commentText = document.createElement("p");
        // have to use innerHTML to render special characters like ' and " and stuff
        commentText.innerHTML = comment.comment;
        // append nodes to list item
        li.appendChild(name);
        li.appendChild(document.createElement("br"));
        li.appendChild(date);
        li.appendChild(document.createElement("br"));
        li.appendChild(commentText);
        // div to hold like, edit, and reply buttons
        const buttonDiv = document.createElement("div");
        buttonDiv.style.margin = "10px 10px";
        const likeButton = document.createElement("button");
        likeButton.textContent = "Like";
        likeButton.onclick = () => likeComment(comment.id);
        if (comment.likes > 0) {
          likeButton.textContent += ` (${comment.likes})`;
        }
        const replyButton = document.createElement("button");
        replyButton.textContent = "Reply";
        replyButton.onclick = () => replyToComment(comment.id);
        buttonDiv.appendChild(likeButton);
        buttonDiv.appendChild(replyButton);
        // only show edit button if current session id matches comment session id
        if (sessionId == comment.session_id) {
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editComment(comment.id);
          buttonDiv.appendChild(editButton);
        }
        li.appendChild(buttonDiv);
        // add horizontal rule after comment
        li.appendChild(document.createElement("hr"));
        // create reply form for each comment
        const replyForm = document.createElement("div");
        replyForm.id = `replyForm_${comment.id}`;
        li.appendChild(replyForm);
        // create reply list for each comment
        const replyList = document.createElement("ul");
        replyList.id = `replies_${comment.id}`;
        li.appendChild(replyList);
        // if comment is a reply, indent it
        if (comment.parent_id != null) {
          li.style.marginLeft = "40px";
          // get parent comment reply list
          const parentReplies = document.getElementById(`replies_${comment.parent_id}`);
          // add reply to parent comment's reply list
          parentReplies.appendChild(li);
          return;
        }
        root_comment_list.appendChild(li);
      });
    }
  }
  req.send();
}
getComments() // get comments on page load
setInterval(getComments, 5000); // refresh comments every 5 seconds

function replyToComment(id) {
  userIsTyping = true; // User is typing so don't refresh comments
  const req = new XMLHttpRequest();
  req.open("GET", `getCommentById.php?id=${id}`, true);
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      const comment = JSON.parse(req.responseText);
      console.log(comment);
      // close other reply forms
      const replyForms = document.querySelectorAll('[id^="replyForm_"]');
      replyForms.forEach(form => form.innerHTML = "");
      // open reply form for this comment
      const replyForm = document.getElementById(`replyForm_${id}`);
      replyForm.innerHTML = `
        <h3>Reply to ${comment.user}</h3>
        <form onsubmit="submitReply(event, ${comment.id})">
          <input type="text" id="reply_name" placeholder="Your Name" style="font-size: inherit; margin: 10px 0;">
          <input type="text" id="reply_comment" placeholder="Your Comment" style="font-size: inherit; margin: 10px 0;">
          <input type="submit" value="Submit" style="padding: 10px; font-size: inherit;">
        </form>
        <hr>`;
      replyForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  req.send();
}

function submitReply(event, parentId) { // called by form so prevent default
  event.preventDefault();
  const name = document.getElementById("reply_name").value;
  const comment = document.getElementById("reply_comment").value;
  const req = new XMLHttpRequest();
  console.log("submitReply", parentId);
  req.open("POST", "uploadComment.php", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = async function () {
    if (req.readyState == 4) {
      userIsTyping = false;
      getComments(); // Refresh comments immediately
      await new Promise(r => setTimeout(r, 1000)); // wait 1 second for comment to be added
      // get comment id from response
      const commentId = req.responseText;
      // get comment element
      const commentElement = document.getElementById(`comment_${commentId}`);
      // scroll to comment
      commentElement.scrollIntoView();
    }
  }
  req.send(`name=${name}&comment=${comment}&parent_id=${parentId}&session_id=${sessionId}`);
}

function getCommentById(id) {
  const req = new XMLHttpRequest();
  req.open("GET", `getCommentById.php?id=${id}`, true);
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      const comment = JSON.parse(req.responseText);
      console.log(comment);
    }
  }
  req.send();
}

function submitComment(event) {
  // prevent form from submitting and refreshing page
  event.preventDefault();

  // get name and comment from form
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  // clear form
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";

  // create new XMLHttpRequest
  const req = new XMLHttpRequest();
  req.open("POST", "uploadComment.php", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = async function () {
    if (req.readyState == 4 && req.status == 200) {
      userIsTyping = false;
      getComments(); // Refresh comments immediately
    }
  }
  req.send(`name=${name}&comment=${comment}&session_id=${sessionId}`);
}


function likeComment(id) {
  const req = new XMLHttpRequest();
  req.open("POST", "likeComment.php", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      getComments(); // Refresh comments immediately
    }
  }
  req.send(`id=${id}`);
}

function editComment(id) {
  userIsTyping = true; // User is typing so don't refresh comments
  const req = new XMLHttpRequest();
  req.open("GET", `getCommentById.php?id=${id}`, true);
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      const comment = JSON.parse(req.responseText);
      console.log(comment);
      // close other reply forms
      const replyForms = document.querySelectorAll('[id^="replyForm_"]');
      replyForms.forEach(form => form.innerHTML = "");
      // open reply form for this comment
      const replyForm = document.getElementById(`replyForm_${id}`);
      replyForm.innerHTML = `
        <h3>Edit Comment</h3>
        <form onsubmit="submitEdit(event, ${comment.id})">
          <input type="text" id="edited_comment" value="${comment.comment}" style="font-size: inherit; margin: 10px 0;">
          <input type="submit" value="Submit" style="padding: 10px; font-size: inherit;">
        </form>`;
      replyForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  req.send();
}

function submitEdit(event, id) {
  event.preventDefault();
  const comment = document.getElementById("edited_comment").value;
  const req = new XMLHttpRequest();
  req.open("POST", "editComment.php", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      userIsTyping = false;
      getComments(); // Refresh comments immediately
    }
  }
  req.send(`id=${id}&comment=${comment}`);
}