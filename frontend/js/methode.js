function newQuantityBasket() {//fonction pour mettre les quantité à jour avec l'input de la page panier
    let input = document.querySelectorAll('input[type=number]');
    let nouvelleQuantite = 0;
    for (let c = 0; c < input.length; c++) {
        input[c].addEventListener("change", (e) => {//écoute le changement sur l'input
            nouvelleQuantite = input[c].value;//nouvelle quantite = valeur de l'input
            if (nouvelleQuantite <= 0) {
                panier.splice(c, 1);
                localStorage.setItem("produit", JSON.stringify(panier));// si l'utilisateur met une input à 0 alors ça efface la ligne ainsi que le produit concerné dans le local storage
                input[c].parentNode.parentNode.remove();
                updateQuantityBasket();
                BasketTopRight();
                removePrixTotal()
                nouveauPrix();
                prixPanier();
            }
            else {
                panier[c].qtyProduit = nouvelleQuantite;
                localStorage.setItem("produit", JSON.stringify(panier));//sinon on envoie les novelles infos au localStorage
                updateQuantityBasket();
                BasketTopRight();
                nouveauPrix();
                prixPanier();
            }
        });
    }
}
//fonction pour mettre à jour le prix total par article
function nouveauPrix(){
    let nouveauPrix = 0;
    for (let p=0; p < panier.length; p++){
        nouveauPrix = panier[p].prixProduit * panier[p].qtyProduit;
        panier[p].prixTotal = nouveauPrix;
        localStorage.setItem("produit", JSON.stringify(panier));
        let price = document.querySelector('#item_'+p);
        price.innerText = `${panier[p].prixTotal}`;
    }
}
//fonction pour enlever un produit du panier
function deleteLigne() {
    let del = document.querySelectorAll(".btn-supprimer");
    for (let i = 0; i < del.length; i++) {
        del[i].addEventListener("click", (e) => {
            e.preventDefault();
            if (panier.length == 0) {
                nombreArticle = 0;
                localStorage.setItem("nombreArticle", nombreArticle);//si il n'y  a plus d'article dans le panier
                del[i].parentNode.parentNode.remove();
                prixPanier();
                removePrixTotal();
            }
            else {
                panier.splice(i, 1);//efface la clé i
                del[i].parentNode.parentNode.remove();
            }
            updateQuantityBasket();
            BasketTopRight();
            prixPanier();
            localStorage.setItem("produit", JSON.stringify(panier));
            location.reload();
        });
    }
}
//calcul le prix total du panier
function prixPanier() {
    let total = localStorage.getItem('total');
    total =0 ;
    let priceTotal = document.querySelector('#priceTotal');
    for (let n = 0; n < panier.length; n++) {
        total += panier[n].prixTotal;
        localStorage.setItem("total", total);
        priceTotal.innerText = `${total} €`
    }
    return total;
}
//affiche la quantite total de produits dans le panier dans le <nav>
function BasketTopRight() {
    let lienPanier = document.querySelector('#panier');
    let quantiteTotal = JSON.parse(localStorage.getItem('nombreArticle'));
    if(quantiteTotal != null){lienPanier.innerText = `Panier (${quantiteTotal})`;} else {lienPanier.innerText ="Panier (0)"}
}
//calcul la quantite total de produit du panier sur la page panier
function updateQuantityBasket() {
    let nombreArticle = 0;
    if(panier.length == 0){
        nombreArticle = 0;
        localStorage.setItem("nombreArticle", nombreArticle);
    }
    else
    {for (let a = 0; a < panier.length; a++) {
        nombreArticle += parseFloat(panier[a].qtyProduit);
        localStorage.setItem("nombreArticle", nombreArticle);
    }}
    return nombreArticle;
}
//met à jour la quantite total du panier si l'on ajoute des produits dans les pages produits
function updateQuantityBasketHomeProduct() {
    let nombreArticle = 0;
    let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
    console.log(produitEnregistre)
    if(produitEnregistre.length == 0){
        nombreArticle = 0;
        localStorage.setItem("nombreArticle", nombreArticle);
    }
    else
    {for (let a = 0; a < produitEnregistre.length; a++) {
        console.log(produitEnregistre[a].qtyProduit)
        nombreArticle += parseFloat(produitEnregistre[a].qtyProduit);
        localStorage.setItem("nombreArticle", nombreArticle);
    }}
    return nombreArticle;
}
//vérifie et valide l'input de la ville
function verifCity() {
    let city = document.querySelector('#city');
    city.addEventListener('change', function () {
        validCity(this);
    });
    const validCity = function (inputCity) {
        //création regExp
        let cityRegExp = new RegExp(
            `^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`
        );
        let testCity = cityRegExp.test(inputCity.value);
        if (!testCity) {
            small.innerText = 'Ville invalide';
            vanish();
        }
    };
}
//vérifie et valide l'input de l'adresse
function verifAddress() {
    let address = document.querySelector('#address');
    address.addEventListener('change', function () {
        validAddress(this);
    });
    const validAddress = function (inputAdress) {
        //création regExp
        let AdressRegExp = new RegExp(
            '[a-zA-Z]{1,100}'
        );
        let testAddress = AdressRegExp.test(inputAdress.value);
        if (!testAddress) {
            small.innerText = 'Adresse invalide';
            vanish();
        }
    };
}
//verifie et valide l'input du nom
function verifLastName() {
    let lastName = document.querySelector('#lastName');
    lastName.addEventListener('change', function () {
        validLastName(this);
    });
    const validLastName = function (inputLastName) {
        //création regExp
        let lastNameRegExp = new RegExp(
            `^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`
        );
        let testLastName = lastNameRegExp.test(inputLastName.value);
        if (!testLastName) {
            small.innerHTML = 'Nom invalide';
            vanish();
        }
    };
}
//verifie et valide l'input du prénom
function verifFirsName() {
    let firstName = document.querySelector('#firstName');
    firstName.addEventListener('change', function () {
        validFirstName(this);
    });
    const validFirstName = function (inputFirstName) {
        //création regExp
        let firstNameRegExp = new RegExp(
            `^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`
        );
        let testFirstName = firstNameRegExp.test(inputFirstName.value);
        if (!testFirstName) {
            small.innerHTML = 'Prénom invalide';
            vanish();
        }
    };
}
//vérifie et valise l'input email
function verifEmail() {
    let email = document.querySelector('#email');
    email.addEventListener('change', function () {
        validEmail(this);
    });
    const validEmail = function (inputEmail) {
        //création regExp
        let emailRegExp = new RegExp(
            '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
        );
        let testEmail = emailRegExp.test(inputEmail.value);
        if (!testEmail) {
            small.innerHTML = 'Adresse mail invalide';
            vanish();
        }
    };
}
//écoute le clic sur le bouton commande et effectue la fonction valid
function sendToBackend() {
    let send = document.getElementById("validCommand");
    send.addEventListener("click", (event) => {
        event.preventDefault;
        valid();
    });
}
//Fonction qui valide le formulaire et l'envoi, via la méthode POST, au serveur afin d'avoir une réponse
function valid() {
    if (document.forms['formCommand'] != "" ) {
        // les données sont ok, on peut envoyer le formulaire
        //les données du formulaire dans une consante
        const contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        };
        // Mets dans une constante les id
        const products = [panier[produits].idProduit];
        //mets dans une constante contact et product
        const command = { contact, products };
        const options = {//definition de l'objet init de la méthode fetch dans une constante options
            method: "POST",//méthode post pour envoyer le formulaire et l'id produit
            body: JSON.stringify(command),//convertit le js en chaine JSON ici (command)
            headers: {
                "Content-Type": "application/json"//on précise le type de contenu envoyé
            }
        };
        fetch('http://localhost:3000/api/teddies/order', options)//accède à l'api avec options en paramètre, ce qui permet de donner au serveur les infos er avoir la réponse attendue
            .then(res => res.json())
            .then(res => {
                if (res.orderId) {
                    localStorage.setItem("orderId", res.orderId);
                    localStorage.setItem("firstName", res.contact.firstName);//si le seveur nous redonne une réponse, on enregistre dans le localStorage l'id de la commande et le prénom
                    window.location = `confirmation.html`;//redirection vers la page confirmation
                } else {
                    small.innerText = 'Formulaire de contact mal rampli ou panier vide';
                    vanish();
                }
            });
    }
    else {
        // sinon on affiche un message
        alert("Veuilliez remplir le formulaire.");
    }
}
//fonction qui mets à jour la quantité plutot que de rajouter une ligne produit si ils ont les mêmes id
function changeQuantityofId(infoProduit, produitEnregistre) {
    let localId = "";
    let localQty = infoProduit.qtyProduit;
    if (produitEnregistre) { //executer la boucle seulement si le tableau est different de null
            for (let i = 0; i < produitEnregistre.length; i += 1) {
                    if (produitEnregistre[i].idProduit == infoProduit.idProduit) {
                            localId = produitEnregistre[i].idProduit;
                            localQty += produitEnregistre[i].qtyProduit;
                            produitEnregistre.splice(i, 1); //supprime l'élément à l'index i si l'id qu'on envoie est déjà présente dans le localstorage
                    }
            }
    }
    return { localId, localQty };
}
//fonction qui transforme la couleur de la bordure selon l'option choisie
function borderColor() {
    let select = document.querySelector("#option select");
    let color = document.querySelector("#option select").options[select.selectedIndex].value;
    select.style.borderColor = color;
    select.addEventListener("change", (c) => {
            let color = document.querySelector("#option select").options[select.selectedIndex].value;
            select.style.borderColor = color;
    });
}
//ajoute un lien sur le logo vers l'acccueil
function homeAllPage() {
    let accueil = document.querySelector('header a');
    accueil.innerHTML = `<a href="../../index.html"><h1>Oribear</h1></a>`;
}
//Mets les données dans une variables puis les envoies au localStorage
function addDataInVar(data) {
    let envoiePanier = document.querySelector(".card_product__price a");
    let ajout = document.querySelector(".success");
    let qty = 1;
    let inputQty = document.querySelector("#option input");
    inputQty.addEventListener("change", () => {
    qty = parseFloat(inputQty.value);})//écoute de l'input puis on stock la valeur dans une variable
    envoiePanier.addEventListener("click", (e) => {
            e.preventDefault();
            let infoProduit = {
                    nomProduit: data.name,
                    idProduit: data._id,
                    prixProduit: data.price / 100,
                    qtyProduit: qty,
                    prixTotal: (data.price / 100) * qty,
            };
            //message de confirmation d'ajout au panier
            ajout.innerText = "Votre article a bien été ajouté au panier";
            setTimeout(() => { ajout.innerText = ""; }, 3000);//on efface le message après 3s
            //récupération et conversion en objet JS de la clé produit du local storage
            let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
            //fonction pour ajouter les elements d'infoProduit dans le local storage
            const ajoutProduitLocalStorage = (() => {
                    produitEnregistre.push(infoProduit); //push de la variable infoProduit dans le tableau produitEnregistre
                    localStorage.setItem("produit", JSON.stringify(produitEnregistre)); //conversion de l'objet javascript en string Json pour le local storage
            });
            //boucle pour lire tous les id et quantité présentes en local storage
            let { localId, localQty } = changeQuantityofId(infoProduit, produitEnregistre);
            //s'il y a un produit dans le localStorage dont l'id est déjà présente
            if (infoProduit.idProduit == localId) {
                    infoProduit.qtyProduit = localQty;
                    ajoutProduitLocalStorage();
                    updateQuantityBasketHomeProduct()
                    BasketTopRight()
            } //s'il y a un produit dans le localStorage dont l'id n'est pas déjà présente
            else if (infoProduit.idProduit != localId && produitEnregistre) {
                    ajoutProduitLocalStorage();
                    updateQuantityBasketHomeProduct()
                    BasketTopRight()
            }
            //s'il n'y a pas de produit dans le localStorage
            else {
                    produitEnregistre = [];
                    ajoutProduitLocalStorage();
                    updateQuantityBasketHomeProduct()
                    BasketTopRight()
            }
    });
}
//fonction pour effacer la partie prix total du tableau page  panier et afficher un message lorsque le panier est vide
function removePrixTotal(){
    let prixPanierTotal = document.querySelector('#prixPanier')
    if(panier.length == 0){
        prixPanierTotal.parentNode.parentNode.parentNode.remove()
        let tableauPanier =
        `
        <tr>
            <p>Votre panier est vide, revenez une fois celui-ci rempli</p>
        </tr>
        `
        document.getElementById('tableau_panier').innerHTML = tableauPanier;
    }
}
function afficherProduit() {
    let i=0;
	for (produits in panier) {
		tableauPanier +=
			`
		    <tr>
			<td>${panier[produits].nomProduit}</td>
			<td id="productsId" style="display:none">${panier[produits].idProduit}</div></td>
			<td><input type="number" name="quantite" value="${panier[produits].qtyProduit}" min="0"></td>
			<td>${panier[produits].prixProduit}€</td>
			<td align="right" class="prixTotal" id="item_${i}">${panier[produits].prixTotal}€</td>
			<td align="right"><button id="del_${i}" class="btn-supprimer"><i class="fas fa-times"></i></button></td></tr></>
			`;
            i++;
	}
}
function totalDuPanier() {
    let totalLocal = localStorage.getItem('total')
	//affichage du panier
	tableauPanier +=
		`
	<tr>
		<td id="priceTotal" colspan="4" align="right"><strong id="prixPanier">${totalLocal} €</strong></td>
	</tr>
	`;
	document.getElementById('tableau_panier').innerHTML = tableauPanier;
}