
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

function ready(){

    updateShoppingCartCount()

    var removeCartItembutton = document.getElementsByClassName('btndeletecart-item')
    for(var i = 0; i < removeCartItembutton.length;i++){
        var button = removeCartItembutton[i]
        button.addEventListener('click',removeCartitem)
    }

    var quantityInputs = document.getElementsByClassName('cart-item-quantity')
    for(var i = 0;i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

    var addToCartbuttons = document.getElementsByClassName('addtocart-btn')
    for(var i = 0;i < addToCartbuttons.length; i++){
        var button = addToCartbuttons[i]
        button.addEventListener('click', addToCartWhenClicked)
    }

    document.getElementsByClassName('cart-place-order')[0].addEventListener('click', placeOrder)

}

var purchasedOrderDetails = []

function placeOrder(){
    const cartCheck = document.getElementsByClassName('cart-items')[0];
    if(cartCheck.innerHTML == ''){
        alert('Please add product(s) to your Cart!')
    }
    else{
        let text;
        if (confirm("Do you confrim this order?") == true) {
            paymentOrderGateway()
        }
        else {
          text = "You canceled!";
        }
    }
}


function paymentOrderGateway(){
    const cart = document.querySelector('.nv-cart');
    cart.classList.remove('nv-cart-active');
    const openPurchaseForm = document.querySelector('.purchaseformdiv');
    openPurchaseForm.classList.add('purchaseformdiv-active');

    
    const closePurchaseFormbtn = document.querySelector('.form-close-btn');
    const closePurchaseForm = document.querySelector('.purchaseformdiv');
    closePurchaseFormbtn.addEventListener('click',()=>{
        closePurchaseForm.classList.remove('purchaseformdiv-active');
    })




    var submitOrderForm = document.getElementById('orderformsubmit')
    submitOrderForm.addEventListener('click',submitOrderedProduct)

    function submitOrderedProduct(){
        document.querySelector('.purchaseformdiv').classList.remove('purchaseformdiv-active')
        console.log(purchasedOrderDetails)
        var getDetails = document.getElementsByClassName('cart-items')[0]
        for(var i = 0;i < getDetails.childElementCount ; i++){
            var getDetail = document.getElementsByClassName('cart-item')[0];
            for(var j = 0 ; j < 1; j++){
                console.log('id:'+ getDetails.childNodes[i].children[0].innerText)
                console.log('title:'+ getDetails.childNodes[i].children[2].innerText)
                console.log('count:'+ getDetails.childNodes[i].children[4].value)
                console.log('price:'+ getDetails.childNodes[i].children[5].innerText)
                var productOrderobj = {
                    id: getDetails.childNodes[i].children[0].innerText,
                    title: getDetails.childNodes[i].children[2].innerText,
                    count: getDetails.childNodes[i].children[4].value,
                    price: getDetails.childNodes[i].children[5].innerText,
                }
                purchasedOrderDetails.push(productOrderobj)
            }
        }
        
        var name = document.getElementById('name')
        var email = document.getElementById('email')
        console.log(name.value ,email.value)

        alert('Your order is placed. We will make a Confrimation call within a hour, Thankyou for your purchase with us!')
        
        var cartItems = document.getElementsByClassName('cart-items')[0]
        while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild)
        }
        updateShoppingCartCount()
        updateCartTotal()
        location.href = "index.html";
    }

}


function addToCartWhenClicked(event){
    var button = event.target;
    var productItem = button.parentElement;
    var id = productItem.getElementsByClassName('product-id')[0].innerText;
    var title = productItem.getElementsByClassName('title')[0].innerText;
    var price = productItem.getElementsByClassName('price')[0].innerText;
    var img = productItem.getElementsByClassName('product-img')[0].src;

    addProducttoCart(id,title,price,img)
    updateCartTotal();
}

function addProducttoCart(id,title,price,img){
    var cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemTitle = cartItems.getElementsByClassName('cart-title')
    for(var i = 0; i < cartItemTitle.length; i++){
        if(cartItemTitle[i].innerText == title){
            alert('This Product is already added to your cart..')
            return
        }
    }
    var insertCartItem = `
        <span class="cart-product-id">${id}</span>
        <img class="cart-img" src="${img}" alt="">
        <p class="cart-title">${title}</p>
        <i class="fa fa-trash-o btndeletecart-item"></i>
        <input type="number" name="" value="1" class="cart-item-quantity">
        <p class="cart-price">&#x20b9;${price}</p>`
    
    cartItem.innerHTML = insertCartItem         
    cartItems.append(cartItem)

    //this to execute to removebutton to remove cart-item  because the global scprit is loaded fisrt this is not so we adding it
    cartItem.getElementsByClassName('btndeletecart-item')[0].addEventListener('click',removeCartitem)
    //this to change value affter adding it because the global scprit is loaded fisrt this is not so we adding it
    cartItem.getElementsByClassName('cart-item-quantity')[0].addEventListener('change',quantityChanged)
    updateShoppingCartCount();
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function removeCartitem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateShoppingCartCount()
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartItems = cartItemContainer.getElementsByClassName('cart-item')
    var total = 0
    for(var i=0; i < cartItems.length; i++){
        var cartItem = cartItems[i]
        var priceElement = cartItem.getElementsByClassName('cart-price')[0]
        var quantityItems = cartItem.getElementsByClassName('cart-item-quantity')[0]
        var price = parseFloat(priceElement.innerHTML.replace('₹',''))
        var quantity = quantityItems.value
        total = total +(price*quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-cart-price')[0].innerHTML = '₹' + total.toFixed(2)
}

function updateShoppingCartCount(){
    const cartCheck = document.getElementsByClassName('cart-items')[0];
    document.getElementsByClassName('cart-count')[0].innerHTML = cartCheck.childElementCount
    var cartItemsContent = document.getElementsByClassName('cart-items-content')[0]
    if(cartCheck.childElementCount == 0){
        cartItemsContent.innerHTML = "Your Cart is Empty.."
    }
    if(cartCheck.childElementCount > 0){
        cartItemsContent.innerHTML = ""
    }
}
