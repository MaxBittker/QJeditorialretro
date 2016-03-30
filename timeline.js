function classToggle() {
  this.classList.toggle('open');
  return false
}

var q = document.getElementById("story");
q.addEventListener('click', classToggle, false);
