let params = (new URL(document.location)).searchParams;
let id = params.get("id");
let title = document.querySelector(`title`);
let contain_product = document.querySelector(".contain_product");
fetch(`http://localhost:3000/api/teddies/${id}`) //méthode fetch pour récupérer l'api mais de l'item qui nous interresse par l'id
.then(response => response.json()//conversion de la réponse en json
.then (data =>{
        let colors = ""
        data.colors.forEach(element => {//Pour  chaque élément de data.colors on ajoute :
        colors += `<option value="${element}">${element}</option>`
        });
contain_product.innerHTML +=
    `
    <div class="card_product">
            <div class="card_product__img"><img src=${data.imageUrl} width="400px" height="266px"></div>
            <div class="card_product__caption">
                <h2>${data.name}</h2>
                <p> ${data.description}</p>
                <div id="option">
                        <select id="colors" name="couleur" form="colorform">
                                ${colors}
                        </select>
                        <input type="number" name="qty" value="1" min="1">
                </div>
            </div>
                <div class="card_product__price">
                        <a href="#">
                                <i class="fas fa-shopping-cart"></i>
                                <p class="vide"></p>
                                <p>${data.price /100} €</p>
                                <p class="add_txt"> Ajouter au panier </p>
                        </a>
                </div>
    </div>
    <div class="success"></div>
    `;
    //titre onglet dynamique selon le produit
title.innerText = `Oribear_${data.name}`;
borderColor();
addDataInVar(data);
})
.catch(error => {
        contain_product.innerHTML += `<p class="error">Nous somme désolé, le produit ne semble pas s'afficher, veuillez actualiser</p>`;
}))
homeAllPage();
BasketTopRight();