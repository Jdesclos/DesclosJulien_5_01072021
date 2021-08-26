//recupération des éléments depuis le localStorage
let confirmation = 
    `
        <p>Merci pour votre commande <strong>${localStorage.firstName}</strong> &#x2705;</p>
        <p>Commande n° <br><strong>${localStorage.orderId}</strong></p>
        <p>Prix total : <strong>${localStorage.total}</strong> €</p>
    `
document.getElementById('confirmation').innerHTML = confirmation
localStorage.clear()

let accueil = document.querySelector('header a');
accueil.innerHTML = `<a href="../../index.html"><h1>Oribear</h1></a>`;