const courses = document.querySelectorAll(".course");

courses.forEach((el) => {
  el.addEventListener("click", btn, false);
});
function btn() {
  courses.forEach((el) => {
    if (el == this) el.classList.toggle("on");
  });
}
//CHUYỂN MÔN HỌC NHỜ BUTTON
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
//ẨN HIỆN CÁC MỤC NEWS CỦA SIDE
const caret = document.querySelectorAll(".news");
caret.forEach((el) => {
  el.addEventListener("click", hidBtn, false);
});
function hidBtn() {
  caret.forEach((el) => {
    if (el === this) {
      const content = el.childNodes[3];
      const name = el.childNodes[1];
      content.classList.toggle("display");
      name.classList.toggle("on");
      const hid = el.childNodes[1].childNodes[1];
      hid.classList.toggle("rotate");
    }
  });
}
//THAY ĐỔI VỊ TRÍ CÁC NEWS NHỜ KÉO THẢ CHUỘT
const news = document.querySelectorAll(".news");
const side = document.querySelector(".side");

function dragStartEnd(e) {
  e.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      console.log("start");
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      console.log("end");
      draggable.classList.remove("dragging");
      window.onload = setEnrollIn();
    });
  });
}

window.onload = dragStartEnd(news);
function dragOver(container, str) {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getPosition(container, e.clientY, str);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) container.appendChild(draggable);
    else container.insertBefore(draggable, afterElement);
  });
}
window.onload = dragOver(side, ".news:not(.dragging)");
function getPosition(container, y, str) {
  const el = [...container.querySelectorAll(str)];
  return el.reduce(
    (near, child) => {
      const container = child.getBoundingClientRect();
      const set = y - container.top - container.height / 2;
      if (set > near.offset && set < 0) return { offset: set, element: child };
      else return near;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
//THIẾT LẬP KÉO THẢ CHUỘT CHO CÁC COURSE (NHƯNG CHƯA ĐỔI MÀU TRONG CÁC LIST)
courses.forEach((el) => {
  el.draggable = true;
});
window.onload = dragStartEnd(courses);
const list = document.querySelectorAll(".list");
list.forEach((el) => {
  window.onload = dragOver(el, ".list:not(.dragging)");
});
