if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

function ready(){


const elementToRender = document.querySelector('.product-items');

carProducts.forEach( Product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');

    productElement.innerHTML = 
        `
            <div><span class="product-id">${Product.id}</span>
            <img class="product-img" src="${Product.image}" alt=""></div>
            <p class="title">${Product.title}</p>
            <p class="price-box">&#x20b9;<span class="price">${Product.price}</span></p>
            <button class="addtocart-btn">Add To Cart</button>
        `;

    elementToRender.appendChild(productElement);
});


}