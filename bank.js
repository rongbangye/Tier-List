const bank = document.querySelector('#bank');

const onDropCard = (event) => {
    event.preventDefault();
    console.log(`current id ${event.dataTransfer.getData('id')}`)
    const id = event.dataTransfer.getData('id');
    const draggedCard = document.getElementById(id);
    bank.appendChild(draggedCard);
}

bank.ondrop = onDropCard;
bank.ondragover = (event) => {event.preventDefault();}