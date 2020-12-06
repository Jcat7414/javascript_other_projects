// EXAMPLE OF ADDING/FINDING ITEMS VIA AN ARRAY (LIKE A LIST)
// var array = [
//     "Apples",
//     "Bread",
//     "Carrots",
//     "Donuts",
// ];
// console.log(array.length);
// array.push("Eggs");
// console.log(array.length);
// array.push("Fish");
// console.log(array[1]);
// console.log(array);


// for (var i = 0; i < array.length; i++) {
//     console.log(array[i]);
// }


// // EXAMPLE OF ITEMS AS AN OBJECT (LIKE A DICTIONARY)
// var obj = {name:"Apple", cost:3.27, count:2};
// console.log(obj);
// console.log(obj.name);
// console.log(obj.cost);
// console.log(obj.count);

// for (var key in obj) {
//     console.log(key+" "+obj[key]);
// }

// var array = ["Apples", "Bread", "Carrots"];

// for (var key in array) {
//     console.log(key+" "+array[key]);
// }

// EXAMPLE OF LIST OF ITEMS

// var cart = [];

// var item = {name:"Apple", cost:1.99, count:3};

// cart.push(item);

// console.log(cart);
// console.log(cart[0]);
// console.log(cart[0].name);
// console.log(cart[0].cost);
// // console.log(cart[1].name); // undefined.name as there is no item 1
// console.log(cart[0].price); // undefined as there is no price field

// // EXAMPLE OF FUNCTION WITH PARAMETERS(or ARGUMENT VARIABLES)

// function myfunction(message, count) {
//     //codeblock
//     for (var i = 0; i < count; i++) {
//         console.log(message);
//     }
// }

// myfunction("Hello World", 1);
// myfunction("Get Fit", 5);
// myfunction("Fast Today", 2);

// EXAMPLE OF FUNCTION WITH PARAMETERS(or ARGUMENT VARIABLES) PASSING A VALUE OUT

// function square(num) {
//     return num * num
//     console.log("??"); //this will not work as it comes after the return line
// }

// console.log( square(3) );

//EXAMPLE OF SCOPE (where a variable/value is visible) 
// functions are values

    // scope (global if it is outside the function, it can be called anywhere)

// var global = "First Global";

// function myFunction() {
//     var global = "Hello"; //this global is limited to this function
//     console.log("Global: "+global);
// }

// myFunction();
// console.log("Global: "+global); 

// var global = 10; //this changes the value of global from here on, except for the one within the function
// console.log("Global: "+global);
// myFunction();

// // SHOPPING CART ITEMS (an array with objects within)

// //cart is an Array
// var cart = [];

// // name price count (are Property names)
// // this. will generate an Object
// var Item = function(name, price, count) {
//     this.name = name
//     this.price = price
//     this.count = count
// };

// // brush is the Instance, it will be lowercase
// var brush = new Item("Brush", 1.99, 1);

// console.log(brush);

// cart.push( new Item("Apple", 2.13, 1) );
// cart.push( brush );

// console.log(cart);

// var message = "Hello World";
// var someText = "<h1>" + message + "</h1>";
// var anotherText = "<p>" + message + "</p>";
// console.log(someText);
// console.log(anotherText);
// displayCart();


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
//JQuery functions


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
// SHE CODES PLUS SHOPPING CART 

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


// NEXT YOUTUBE VIDEO https://www.youtube.com/watch?v=hbm7rV8Tkak&list=PLoN_ejT35AEhzNoPStBzAkpqAu3YQwPj7&index=25
