document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems, null);
});

$(document).ready(function() {
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();
});

/

// modal assign user button
var userAssignButton = document.getElementById("assign-user");
userAssignButton.addEventListener("click", assignUser);

// modal assign user function
var userNode = document.getElementById("modal-user-list");

function assignUser(userDiv) {
  // Structure for added users
  userDiv = document.createElement("DIV");
  userDiv.innerHTML = "I am user";
  userDiv.classList.add("white");
  userNode.appendChild(userDiv);
}

// modal icons changing color on click
var modalIcon1 = document.getElementById("modal-icon-1");
var modalIcon2 = document.getElementById("modal-icon-2");
var modalIcon3 = document.getElementById("modal-icon-3");
var modalIcon4 = document.getElementById("modal-icon-4");

modalIcon1.addEventListener("click", modalSwapIcon1);
modalIcon2.addEventListener("click", modalSwapIcon2);
modalIcon3.addEventListener("click", modalSwapIcon3);
modalIcon4.addEventListener("click", modalSwapIcon4);

function modalSwapIcon1() {
  modalIcon1.classList.toggle("grey-text");
  modalIcon1.classList.toggle("red-text");
}
function modalSwapIcon2() {
  modalIcon2.classList.toggle("grey-text");
  modalIcon2.classList.toggle("yellow-text");
}
function modalSwapIcon3() {
  modalIcon3.classList.toggle("grey-text");
  modalIcon3.classList.toggle("brown-text");
}
function modalSwapIcon4() {
  modalIcon4.classList.toggle("grey-text");
  modalIcon4.classList.toggle("green-text");
}