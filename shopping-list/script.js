
// *********************************************************
// SHOPPING CART SCHEMA

// displayCart : Function

// cart : Array
// Item : Object/Class

// addItemToCart : Function
// removeItemFromCart : Function
// removeItemFromCartAll : Function
// clearCart : Function
// countCart : Function
// totalCart : Function
// listCart : Function
// saveCart : Function
// loadCart : Function


// **********************************************************
// SHE CODES PLUS SHOPPING CART 


$(".add-to-cart").click(function(event){
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));

    SCP_shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

$("#clear-cart").click(function(event){
    SCP_shoppingCart.clearCart();
    displayCart();
});

function displayCart() {
    console.log("*** Display Cart ***");
    var cartArray = SCP_shoppingCart.listCart();

    console.log("*** Count Cart: "+cartArray.length);
    var output = "";

    for (var i in cartArray) {
        output += "<li>"
        +cartArray[i].name
        +" "+cartArray[i].count
        +" x "+cartArray[i].price
        +" = "+cartArray[i].total
        //need to use ' rather than " inside ""
        +" <button class='plus-item' data-name='"+cartArray[i].name+"'>+</button>"
        +" <button class='subtract-item' data-name='"+cartArray[i].name+"'>-</button>"
        +" <button class='delete-item' data-name='"+cartArray[i].name+"'>x</button>"
        +"</li>"
    }

    $("#show-cart").html(output);
    $("#total-cart").html( SCP_shoppingCart.totalCart() );
};

$("#show-cart").on("click", ".plus-item", function(event) {
    var name = $(this).attr("data-name");
    SCP_shoppingCart.addItemToCart(name, 0, 1);
    displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(event) {
    var name = $(this).attr("data-name");
    SCP_shoppingCart.removeItemFromCart(name);
    displayCart();
});

$("#show-cart").on("click", ".delete-item", function(event) {
    var name = $(this).attr("data-name");
    SCP_shoppingCart.removeItemFromCartAll(name);
    displayCart();
});


// **********************************************************

var SCP_shoppingCart = {};
SCP_shoppingCart.cart = [];

SCP_shoppingCart.Item = function(name, price, count) {
    this.name = name
    this.price = price
    this.count = count
};

SCP_shoppingCart.addItemToCart = function(name, price, count) {
    // to avoid duplicating the item in the cart, and increase the count instead
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count += count;
            this.saveCart();
            return;
        }
    }
    var item = new this.Item(name, price, count);
    cart.push(item);
    this.saveCart();
};

SCP_shoppingCart.removeItemFromCart = (name) => {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {
                cart.splice(i, 1); //use splice to remove an item from an array
            }
            break;
        }
    }
    SCP_shoppingCart.saveCart();
};

SCP_shoppingCart.removeItemFromCartAll = (name) => { // Removes all of item name
    for (var i in cart) {
        if (cart[i].name === name){
            cart.splice(i, 1);
            break;
        }
    }
    SCP_shoppingCart.saveCart();
};

SCP_shoppingCart.clearCart = () => {
    cart = [];
    SCP_shoppingCart.saveCart();
}

SCP_shoppingCart.countCart = () => { //-> return total count
    var totalCount = 0;

    for (var i in cart) {
        totalCount += cart[i].count;
    }
    return totalCount;
}

SCP_shoppingCart.totalCart = () => { //-> return total cost of cart
    var totalCost = 0;

    for (var i in cart) {
        totalCost += cart[i].price * cart[i].count;
    }
    // toFixed rounds off the number, the 2 refers to 2 decimal places...this is returned as a string
    return totalCost.toFixed(2);
}

// item/object is modified by another item/object, make a copy to avoid this going forward
SCP_shoppingCart.listCart = () => {
    var cartCopy =[];
    for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        // loop through p for property (name, price & count) in each item
        for (var p in item) {
            itemCopy[p] = item[p]
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}  

SCP_shoppingCart.saveCart = () => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    //stringify will convert the array, objects and items of the cart in a JSON format/file
}

SCP_shoppingCart.loadCart = () => {
    cart = JSON.parse( localStorage.getItem("shoppingCart"));
}

SCP_shoppingCart.loadCart();
displayCart();


