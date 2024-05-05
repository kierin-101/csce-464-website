let darkMode = false;
function switchTheme() {
  darkMode = !darkMode;
  document.body.style.backgroundColor = darkMode ? "dimgray" : "white";
  document.body.style.color = darkMode ? "white" : "black";
  let navbar_links = document.getElementsByClassName("navbar_link");
  let navbar_link_count = navbar_links.length;
  for (let i = 0; i < navbar_link_count; i++) {
    navbar_links[i].style.color = darkMode ? "white" : "black";
  }
  let rules = document.getElementsByClassName("hr");
  let rule_count = rules.length;
  for (let i = 0; i < rule_count; i++) {
    rules[i].style.border = darkMode ? "1px solid white" : "1px solid black";
  }
  document.getElementById("apology").style.display = darkMode ? "inherit" : "none";
  document.getElementById("theme_button").innerHTML =
    darkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
}