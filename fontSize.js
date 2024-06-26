function changeFontSize(delta) {
  var size = sessionStorage.getItem('fontSize');
  if (isNaN(parseInt(size))) {
    size = 16;
  }
  const parsedSize = parseInt(size);
  const newSize = parsedSize + delta;
  if (newSize < 10 || newSize > 22) {
    return;
  }
  sessionStorage.setItem('fontSize', newSize);
  // go through paragraphs and change font size
  var p = document.getElementsByTagName('p');
  for (var i = 0; i < p.length; i++) {
    p[i].style.fontSize = (newSize) + 'px';
  }
  // don't forget lists need to be changed too
  var li = document.getElementsByTagName('li');
  for (var i = 0; i < li.length; i++) {
    li[i].style.fontSize = (newSize) + 'px';
  }
}

function updateFontSize() {
  var size = sessionStorage.getItem('fontSize');
  // console.log(size);
  var parsedSize = parseInt(size);
  // console.log(parsedSize);
  if (parsedSize == NaN) {
    size = 16;
  }
  var p = document.getElementsByTagName('p');
  for (var i = 0; i < p.length; i++) {
    p[i].style.fontSize = parsedSize + 'px';
  }
  var li = document.getElementsByTagName('li');
  for (var i = 0; i < li.length; i++) {
    li[i].style.fontSize = parsedSize + 'px';
  }
}