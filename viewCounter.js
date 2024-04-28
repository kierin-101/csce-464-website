function updateViewCount(pageId) {
  const req = new XMLHttpRequest();
  req.open("POST", "viewCounter.php", true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.send(`id=${pageId}`);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      const count = req.responseText;
      document.getElementById("view_count").innerText = count;
    }
  }
}