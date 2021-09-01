//recupération des éléments depuis le localStorage
let confirmation = 
    `
        <p>Merci pour votre commande <strong>${localStorage.firstName}</strong></p>
        <p>Commande n° <br><strong>${localStorage.orderId}</strong></p>
        <p>Prix total : <strong>${localStorage.total}</strong> €</p>
    `
document.getElementById('confirmation').innerHTML = confirmation
localStorage.clear()

homeAllPage();
BasketTopRight();