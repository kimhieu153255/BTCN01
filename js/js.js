const courses = document.querySelectorAll(".course");

courses.forEach((el) => {
  el.addEventListener("click", btn, false);
});
function btn() {
  courses.forEach((el) => {
    if (el == this) el.classList.toggle("on");
  });
}

//chuyển sang phải
const right = document.querySelector(".right");
right.addEventListener("click", changeRight);
function changeRight() {
  const listCourseRegister = document.querySelector(".list-course-register");
  courses.forEach((el) => {
    if (el.classList.contains("on")) {
      listCourseRegister.appendChild(el);
      el.classList.remove("on");
      el.classList.add("enroll");
    }
  });
}

//chuyển sang trái
const left = document.querySelector(".left");
left.addEventListener("click", changeLeft);
function changeLeft() {
  const listCourse = document.querySelector(".list-course");
  courses.forEach((el) => {
    if (el.classList.contains("on")) {
      listCourse.appendChild(el);
      el.classList.remove("on");
      el.classList.remove("enroll");
    }
  });
}

//chuyển toàn bộ sang phải
const toRight = document.querySelector(".toRight");
toRight.addEventListener("click", changeToRight);
function changeToRight() {
  const listCourseRegister = document.querySelector(".list-course-register");
  courses.forEach((el) => {
    if (!el.classList.contains("enroll")) {
      listCourseRegister.appendChild(el);
      el.classList.add("enroll");
    }
  });
}
//chuyển toàn bộ sang trái
const toLeft = document.querySelector(".toLeft");
toLeft.addEventListener("click", changeToLeft);
function changeToLeft() {
  const listCourse = document.querySelector(".list-course");
  courses.forEach((el) => {
    if (el.classList.contains("enroll")) {
      listCourse.appendChild(el);
      el.classList.remove("enroll");
    }
  });
}
