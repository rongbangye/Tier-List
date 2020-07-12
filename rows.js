const rows = document.querySelectorAll(".row");
const colors = ['yellow', 'blue', 'pink', 'green', 'aquamarine', 'orange'];

const onDragOver = (event) => {
    event.preventDefault();
}

const onDrop = (event) => {
    event.preventDefault();
    // console.log(`current id ${event.dataTransfer.getData('id')}`)
    const draggedCardId = event.dataTransfer.getData('id');
    const draggedCard = document.getElementById(draggedCardId);

    /* Update Local Storage */
    const cardData = {
        imageSrc: draggedCard.querySelector('img').src,
        row: event.target.querySelector('.label').innerText,
    }
    window.localStorage.setItem(draggedCard.id, JSON.stringify(cardData));
    event.target.appendChild(draggedCard);
}

rows.forEach((row, index) => {
    const label = row.querySelector('.label');
    label.style.backgroundColor= colors[index];
    row.ondragover = onDragOver;
    row.ondrop = onDrop;
})