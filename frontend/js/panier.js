homeAllPage();
let resume = document.querySelector('#resume');
//récupération et conversion en objet JS de la clé produit du local storage
let panier = JSON.parse(localStorage.getItem('produit'));
let prixArticle = 0;
//si panier est vide
if (panier === null || panier.length == 0){
	let tableauPanier =
	`
	<tr>
		<p>Votre panier est vide, revenez une fois celui-ci rempli</p>
	</tr>
	`
	document.getElementById('tableau_panier').innerHTML = tableauPanier;
}
// si il y a des produits dans le panier
else{
	tableauPanier =
	`
	<tr>
		<td><strong>NAME</strong></td>
		<td style="display:none"><strong>ID</strong></td>
		<td><strong>QUANTITE</strong></td>
		<td><strong>PRIX</strong></td>
		<td align="right"><strong>Total</strong></td>
	</tr>
	`
	//boucle pour créer autant d'éléments qu'il y a de lignes dans le local storage
	afficherProduit();
	//calcul du total prix du panier
	totalDuPanier();
}
let small = document.querySelector('fieldset small');




function vanish () {
	setTimeout(()=>{small.innerText = ""},3000);
}
//vérification du champ email
verifEmail();
//vérification du champ prénom
verifFirsName();
//vérification du champ nom
verifLastName();
//vérification du champ addresse
verifAddress();
//vérification du champ ville
verifCity();
sendToBackend();
	//méthode filter qui supprime l'élément lors du clic sur la croix
	deleteLigne();
		//changer la quantité sur la page panier
		newQuantityBasket();
		removePrixTotal();
		let nombreArticle = updateQuantityBasket();
		BasketTopRight();
