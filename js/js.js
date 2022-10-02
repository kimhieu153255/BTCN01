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
      const content = el.childNodes;
      const array = [];
      for (let i = 0; i < content.length; i++) {
        if (content[i].nodeName !== "#text") {
          array.push(content[i]);
        }
      }
      const hid = array[0].childNodes[1];
      const rang = array[0].childNodes[3];
      array[0].classList.toggle("on");
      hid.classList.toggle("rotate");
      rang.classList.toggle("white");
      array[1].classList.toggle("display");
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
      const contain = child.getBoundingClientRect();
      const set = y - contain.top - contain.height / 2;
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

//HÀM ĐẶT LẠI BACKGROUND-COLOR CHO CÁC COURSE SAU KHI DI CHUYỂN
function setEnrollIn() {
  const listCourse = document.querySelector(".list-course").childNodes;
  const list = [];
  for (let i = 0; i < listCourse.length; i++) {
    if (listCourse[i].nodeName !== "#text") {
      list.push(listCourse[i]);
    }
  }
  list.forEach((el) => {
    el.classList.value = "course";
  });
  const listCourseRegister = document.querySelector(
    ".list-course-register"
  ).childNodes;
  const listRegister = [];
  for (let i = 0; i < listCourseRegister.length; i++) {
    if (listCourseRegister[i].nodeName !== "#text") {
      listRegister.push(listCourseRegister[i]);
    }
  }
  listRegister.forEach((el) => {
    el.classList.value = "course enroll";
  });
}

//XỬ LÍ VALIDATION CHO PHẦN NHẬP LIỆU.
//kiểm tra ID:
function isID() {
  const id = document.querySelector("#id").value;
  let num = id.substring(0, 2);
  const array = ["17", "18", "19", "20", "21", "22"];
  if (id.length == 8 && array.includes(num)) return true;
  return false;
}
//Kiểm tra full-name
function isFullName() {
  const fullName = document.querySelector("#full-name").value;
  let array = fullName.split(" ");
  const regex = /^[A-Za-z].*$/;
  if (array.length >= 2) {
    for (const el of array) {
      if (!regex.test(el)) return false;
    }
    return true;
  }
  return false;
}
//Kiểm tra address
function isAddress() {
  const address = document.querySelector("#address").value;
  let array = address.split(" ");
  console.log(array);
  if (array.length >= 2) {
    return true;
  }
  return false;
}
//Kiểm tra phone
function isPhone() {
  const phone = document.querySelector("#phone").value;
  if (phone.length == 10 && phone[0] == "0") return true;
  return false;
}
//Kiểm tra email
function isEmail() {
  const email = document.querySelector("#email").value;
  console.log(email);
  let regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regex.test(email)) return true;
  return false;
}
//THÊM ĐĂNG KÍ VÀ CLEAR DỮ LIỆU TRONG VÙNG NHẬP
function inform() {
  const enroll = document.querySelector(".enrollIn");
  enroll.addEventListener("click", () => {
    let is = true;
    if (!isID()) {
      is = false;
      window.onload = borderRed("#id");
    } else borderReset("#id");
    if (!isFullName()) {
      is = false;
      window.onload = borderRed("#full-name");
    } else borderReset("#full-name");
    if (!isAddress()) {
      is = false;
      window.onload = borderRed("#address");
    } else borderReset("#address");
    if (!isPhone()) {
      is = false;
      window.onload = borderRed("#phone");
    } else borderReset("#phone");
    if (!isEmail()) {
      is = false;
      window.onload = borderRed("#email");
    } else borderReset("#email");
    if (is) enrollSuccess();
  });
}
window.onload = inform();

//Hàm hiển thị lỗi trong nhập
function borderRed(tr) {
  const temp = document.querySelector(tr);
  temp.style.borderColor = "red";
  temp.style.backgroundColor = "#FF7E7E";
}
//trả về border khi không bị lỗi
function borderReset(tr) {
  const temp = document.querySelector(tr);
  temp.style.borderColor = "#767676";
  temp.style.backgroundColor = "white";
}

//hàm đăng kí và xuất Alert
function enrollSuccess() {
  const listCourseRegister = document.querySelectorAll(".enroll");
  let message = "";
  listCourseRegister.forEach((el) => {
    message += el.innerText;
    message += "\n";
  });
  const id = readData("#id");
  const name = readData("#full-name");
  let genders = document.querySelectorAll(".gender");
  let gender = "";
  if (genders[0].checked) gender += "Nam";
  else gender += "Nữ";
  const dates = readData("#date-time");
  let date = dates.split("-");
  const node = document.createElement("tr");
  node.innerHTML = `<th>${id}</th>
  <th>${name}</th>
  <th>${gender}</th>
  <th>${date[2]}/${date[1]}/${date[0]}</th>`;
  document.querySelector("table").appendChild(node);
  alert("Các môn học đã đăng kí:\n" + message, false);
}

//reset về dữ liệu trống
function resetProfile() {
  const id = document.querySelector("#id");
  id.value = "";
  const name = document.querySelector("#full-name");
  name.value = "";
  const address = document.querySelector("#address");
  address.value = "";
  const phone = document.querySelector("#phone");
  phone.value = "";
  const date = document.querySelector("#date-time");
  date.value = "";
  const email = document.querySelector("#email");
  email.value = "";
}

//hàm đọc dữ liệu
function readData(tr) {
  const temp = document.querySelector(tr);
  return temp.value;
}

//hàm xóa clear
function clear() {
  const btn = document.querySelector(".eraese");
  btn.addEventListener("click", () => {
    resetProfile();
  });
}
window.onload = clear();
