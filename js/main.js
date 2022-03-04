// $("#btn").on("click", function () {
//   alert("clicked");
// });

// $("#btn").click(function () {
//   alert("clicked");
// });

// $(".default").click(function () {
//   $(".buttons").append('<button class="delete">Delete</button>');
// });

// $(".buttons").click(".delete", function () {
//   alert("Delete clicked");
// });

// ! task 8

// let div = $("div");
// div.click(function () {
//   div.each(function (index, element) {
//     $("#tag").text($(element));
//   });
// });

// !animation

// $(".block").fadeOut(5000);
// $(".block").fadeIn(5000);
// $(".block").hide(5000);
// $(".block").show(5000);

// $(".block").fadeOut(5000).delay(3000).show(2000);

// !всплывающие события
// $("div").click(function (e) {
//   //   alert("Please wait... This is div");
//   if (e.target !== this) return;
//   alert("Please wait... This is div");
// });

// $("p").click(function (e) {
//   if (e.target !== this) return;
//   alert("Please wait... This is p");
// });

// $("button").click(function (e) {
//   //   e.stopPropagation();
//   if (e.target !== this) return;
//   alert("Please wait... This is button");
//   //   console.log(e.target);
// });

// $("button").click(function (e) {
//   e.preventDefault();
//   $("h1").text("Makers");
// });

// !Class Work

// Классная работа. События jQuery

// Задание №1
// Создайте div элемент.
// По нажатию клавиш меняйте цвет заднего фона div - элемента:
// R - red;
// G - green;
// B - blue;
// w - white;
// SHIFT + B - black;
// SHIFT + G - gray;

// !answer

// let div = $("#container");
// $(document).on("keydown", function (e) {
//   if (e.code === "KeyB" && e.shiftKey) {
//     div.css("background-color", "black");
//   } else if (e.code === "KeyG" && e.shiftKey) {
//     div.css("background-color", "grey");
//   } else if (e.code === "KeyR") {
//     div.css("background-color", "red");
//   } else if (e.code === "KeyG") {
//     div.css("background-color", "green");
//   } else if (e.code === "KeyB") {
//     div.css("background-color", "blue");
//   } else if (e.code === "KeyW") {
//     div.css("background-color", "white");
//   }
// });

// Задание №2
// В html создайте кнопку.
// Создайте переменную let i=0, по нажатию на кнопку выводите в консоль переменную i и увеличивайте её в 2 раза;

// Задание №3
// 	Создайте div размером 500px * 500px, по нажатию на неё выводите в консоль позицию места куда вы нажали относительно div- а;

// Задание №4
// Создайте input type color. При изменении инпута меняйте цвет заднего фона body на значение из этого инпута

// Задание №5
// Создайте <h3> тэги, всем тэгам поставьте текст '!!!'.

// let span = $("span");
// let inp = $("input");
// $("button").on("click", function (e) {
//   if (inp.value !== " ") {
//     span.text("error");
//   }
//   e.preventDefault();
// });

// let div = $("div");
// let count = 0;
// $(document).on("keydown", function (e) {
//   if (e.code === "ArrowRight") {
//     div.offset({ left: (count += 100) });
//   }
//   if (e.code === "ArrowLeft") {
//     div.offset({ left: (count -= 100) });
//   }
// });

// let drag = $(".drag");
// let body = $("body");
// function dragging(drag) {
//   drag.mousedown(() => {
//     drag.css("position", "absolute");
//     $(document).mousemove((e) => {
//       drag.css("top", `${e.pageY - 30}px`);
//       drag.css("left", `${e.pageX - 30}px`);
//     });
//     $(document).mouseup((e) => {
//       $(document).off("mousemove");
//     });
//   });
// }
// dragging(drag);

let imageData = [];
let btn = $("#add-btn");
let inp = $("#add-form-inp");
let imageList = $("#image-list");
let editForm = $(".edit-form");
let modal = $("#btn-modal");
let inpURL = $("#edit-form-inp");
let inpId = $("#edit-id");
let saveButton = $("#save-btn");
console.log(saveButton, inpId, inpURL);

function addNewImage() {
  if (inp.val().trim() == "") {
    alert("Please enter ...");
    return;
  }
  let newImage = {
    imageURL: inp.val(),
    id: Date.now(),
  };
  imageData.push(newImage);
  render();
  // inp.val("");
  //   $("body").append(`<h1>${imageData.id}</h1>`);
}

btn.on("click", addNewImage);

function render() {
  imageList.empty();
  imageData.forEach((elem) => {
    imageList.append(
      `<div id=${elem.id} class="image-div"><img src="${elem.imageURL}"/>
      <button class="btn-delete">Delete</button>
      <button class="btn-edit">Edit</button></div>`
    );
  });
}
function deleteImage(id) {
  imageData = imageData.filter((item) => item.id != id);
  render();
}
$(document).on("click", ".btn-delete", function (e) {
  let id = e.target.parentNode.id;
  deleteImage(id);
});
getEditElement;
function getEditElement(id) {
  let editElem = imageData.find((item) => item.id == id);
  inpURL.val(editElem.imageURL);
  inpId.val(editElem.id);
}
$(document).on("click", ".btn-edit", function (e) {
  let id = e.target.parentNode.id;
  getEditElement(id);
  editForm.css("display", "flex");
});

modal.on("click", function () {
  editForm.css("display", "none");
});

saveButton.on("click", function () {
  imageData = imageData.map((item) => {
    let id = inpId.val();
    let imageURL = inpURL.val();
    let editedImage = {
      id,
      imageURL,
    };
    if (item.id == id) {
      return editedImage;
    } else {
      return item;
    }
  });
  render();
  editForm.css("display", "none");
});
