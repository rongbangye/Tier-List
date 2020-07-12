const cards = document.querySelectorAll(".card");
const addCard = document.querySelector("#addCard");

/* Add Card Logic */
const addCardToBoard = event => {
  const card = createCard();
  const bank = document.querySelector("#bank");
  bank.appendChild(card);
};

addCard.onclick = addCardToBoard;

/* Card Logic */
const createCard = (id, cardData) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("draggable", "true");
  card.id = id || Date.now();
  card.ondragstart = dragStart;
  card.ondragend = dragEnd;
  card.onclick = deleteCard;
  if (cardData && cardData.imageSrc) {
    const image = new Image(100, 85);
    image.src = cardData.imageSrc;
    image.style.pointerEvents = "none";
    card.appendChild(image);
  } else {
    appendImage(card);
  }
  return card;
};

const appendImage = card => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.style.visibility = "hidden";
  input.onchange = () => {
    const image = new Image(100, 85);
    const file = input.files[0];
    console.log(file);

    const reader = new FileReader();
    reader.onload = event => {
      image.src = event.target.result;
      image.style.pointerEvents = "none";
      card.appendChild(image);

      /* Save Data in Local Storage */
      const cardData = {
        imageSrc: image.src,
        row: card.parentNode.querySelector(".label")?.innerText
      };
      window.localStorage.setItem(card.id, JSON.stringify(cardData));
    };
    reader.readAsDataURL(file);
  };
  input.click();
};

const deleteCard = event => {
  let willDeleteCard = window.confirm("Do you want to delete this card?");
  if (willDeleteCard) {
    event.target.remove();
    window.localStorage.removeItem(event.target.id);
  }
};

const dragStart = event => {
  console.log("dragging the element");
  event.dataTransfer.setData("id", event.target.id);
  setTimeout(() => {
    event.target.style.visibility = "hidden";
  }, 0);
};

const dragEnd = event => {
  event.target.style.visibility = "visible";
  console.log("end of the drag");
};

cards.forEach(card => {
  card.ondragstart = dragStart;
  card.ondragend = dragEnd;
});
