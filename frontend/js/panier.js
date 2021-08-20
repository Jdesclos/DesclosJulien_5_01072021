let accueil = document.querySelector('header a');
accueil.innerHTML = `<a href="../../index.html"><h1>Oribear</h1></a>`;
let resume = document.querySelector('#resume');
let panier = JSON.parse(localStorage.getItem('produit'));
if (panier ==='{}' || panier === null){
    let tableauPanier = 
    `
    <tr>
        <p>Votre panier est vide !</p>
    </tr>
    `
}