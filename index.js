window.onload = () => {
    const cardBank = document.querySelector('#bank');
    const keys = Object.keys(window.localStorage);
    console.log(keys);
    keys.forEach(key => {
        const cardData = JSON.parse(window.localStorage.getItem(key));
        const loadCard = createCard(key, cardData);
        const rows = document.querySelectorAll('.row');
        const correctRow = Array.from(rows).find((row) => {
            return row.querySelector('.label').innerText === cardData.row;
        });
        if (correctRow) {
            correctRow.appendChild(loadCard);
        }
        else {
            cardBank.appendChild(loadCard); 
        }
    })
}