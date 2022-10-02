const courses = document.querySelectorAll(".course");

courses.forEach((el) => {
  el.addEventListener("click", btn, false);
});
function btn() {
  courses.forEach((el) => {
    if (el == this) el.classList.toggle("on");
  });
}
