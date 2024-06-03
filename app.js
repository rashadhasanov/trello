const addListBtn = document.getElementById("add-list");
const inputContainer = document.querySelector(".input-container");
const cancelBtn = document.getElementById("cancel-btn");
const saveBtn = document.getElementById("save-btn");
const input = document.getElementById("todo-input");
const container = document.querySelector(".container");
const addListContainer = document.querySelector(".add-btn-container");
let draggedElement = null;

// Events

addListBtn.addEventListener("click", openInput);
cancelBtn.addEventListener("click", closeInput);
saveBtn.addEventListener("click", createColumn);

//Functions

function openInput() {
  addListBtn.style.display = "none";
  inputContainer.style.display = "block";
}

function closeInput() {
  addListBtn.style.display = "block";
  inputContainer.style.display = "none";
  input.value = "";
}

function createColumn() {
  const trimInput = input.value.trim();
  if (trimInput) {
    const card = document.createElement("div");
    card.className = "card";

    const cardText = document.createElement("div");
    cardText.className = "text";
    cardText.textContent = input.value;
    cardText.style.marginBottom = "10px";

    const btnContainer = document.createElement("div");
    btnContainer.className = "card-btn-container";

    const addCardBtn = document.createElement("button");
    addCardBtn.id = "add-card";
    addCardBtn.textContent = "Add a card";

    const removeColumnBtn = document.createElement("button");
    removeColumnBtn.id = "remove-column";
    removeColumnBtn.textContent = "Remove this column";

    btnContainer.prepend(removeColumnBtn);
    btnContainer.prepend(addCardBtn);

    card.prepend(btnContainer);
    card.prepend(cardText);

    container.insertBefore(card, addListContainer);

    function onDragOver(event) {
      event.preventDefault();
    }

    function onDrop(event) {
      event.currentTarget.insertBefore(draggedElement, card.lastElementChild);
      console.log(event.currentTarget);
    }

    card.addEventListener("drop", onDrop);
    card.addEventListener("dragover", onDragOver);

    closeInput();

    addCardBtn.addEventListener("click", () => {
      const inputContainer2 = document.createElement("div");
      inputContainer2.className = "input-container";

      const input2 = document.createElement("input");
      input2.className = "input";
      input2.placeholder = "add project";

      const btnContainer2 = document.createElement("div");
      btnContainer2.className = "btn-container";

      const btnSave2 = document.createElement("button");
      btnSave2.className = "btn-green";
      btnSave2.textContent = "Save";

      const btnCancel2 = document.createElement("button");
      btnCancel2.className = "btn-green";
      btnCancel2.textContent = "Cancel";

      btnContainer2.prepend(btnCancel2);
      btnContainer2.prepend(btnSave2);

      inputContainer2.append(input2);
      inputContainer2.append(btnContainer2);

      card.insertBefore(inputContainer2, card.lastElementChild);

      addCardBtn.classList.add("hidden");

      btnCancel2.addEventListener("click", () => {
        addCardBtn.classList.remove("hidden");
        inputContainer2.classList.add("hidden");
      });

      btnSave2.addEventListener("click", () => {
        if (input2.value) {
          const dragElementDiv = document.createElement("div");
          dragElementDiv.className = "drag-container";
          dragElementDiv.draggable = "true";

          const dragElementText = document.createElement("p");
          dragElementText.textContent = input2.value;

          function saatGoster() {
            let indi = new Date();
            let saat = indi.getHours();
            let dakika = indi.getMinutes().toString();
            let saniye = indi.getSeconds().toString();
            return `${saat}:${dakika.padStart(2, 0)}:${saniye.padStart(2, 0)}`;
          }

          const time = document.createElement("span");
          time.textContent = saatGoster();

          const removeBtn = document.createElement("button");
          removeBtn.textContent = "Remove";
          removeBtn.className = "remove";

          dragElementDiv.prepend(dragElementText);
          dragElementDiv.append(time);
          dragElementDiv.append(removeBtn);
          card.insertBefore(dragElementDiv, card.lastElementChild);

          addCardBtn.classList.remove("hidden");
          inputContainer2.classList.add("hidden");

          dragElementDiv.addEventListener("dragstart", onDragStart);
          dragElementDiv.addEventListener("dragend", onDragEnd);

          function onDragStart(event) {
            draggedElement = event.target;
          }

          function onDragEnd() {
            draggedElement = null;
          }

          removeColumnBtn.addEventListener("click", function (event) {
            const column = event.target.closest(".card");
            const dragContainers = column.querySelectorAll(".drag-container");
            dragContainers.forEach((dragContainer) => {
              dragContainer.remove();
            });
          });

          removeBtn.addEventListener("click", () => {
            removeBtn.parentElement.remove();
          });
        }
      });
    });

    input.value = "";
  }
}
