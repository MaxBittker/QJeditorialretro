function classToggle(e) {
  this.classList.toggle('open');
  e.preventDefault()
  return false
}

// var q = document.getElementById("story");
// q.addEventListener('click', classToggle, false);
// q.addEventListener('mousedown', function(e){ e.preventDefault(); }, false);

var classname = document.getElementsByClassName("story");

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', classToggle, false);
    classname[i].addEventListener('mousedown', function(e){ e.preventDefault(); }, false);
}
