import "./App.css";
import logo from "./logo.png";
import React, { useState } from "react";
import Products from "./Products.json";
import { Categories } from "./Categories";

const cartArray = [];
let is_logged_in = false;
let login_info;

function get_search_bar() {
  let x = document.getElementById("SearchBar");
  if (x == null) {
    console.log("Test");
    return "";
  }
  console.log(x.value);
  return x.value;
}

function update_cart(Cart, setCart, PageId, product, setPageId) {
  console.log("Adding " + product.id + " to cart");
  let x = Cart;
  let y = PageId;
  x.push(product);
  setCart(x);
  if (y == 2) {
    setPageId(3);
  }
  else if(y == 3) {
    setPageId(2);
  }
}

function removeFromCart(Cart, setCart, index, PageId, setPageId) {
  console.log("Removing idx " + index + " from cart");
  let x = Cart;
  let y = PageId;
  x.splice(index, 1);
  setCart(x);
  if (y == 2) {
    setPageId(3);
  }
  else {
    setPageId(2);
  }
}

function render_products(ProductsCategory, searchBar, setSearchBar, Cart, setCart, PageId, setPageId) {
  return (
    <div className="category-section fixed">
      <div className="topnav">
        <input onChange={() => setSearchBar(get_search_bar())}
          type="text" placeholder="Search.." id="SearchBar" style={{ border: "solid", color: "black", width: "75%" }}></input>
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Products ({ProductsCategory.length})
      </h2>
      <div
        className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
        style={{ maxHeight: "800px", overflowY: "scroll" }}
      >
        {/* Loop Products */}
        {ProductsCategory
          .filter(product => product.title.toLowerCase().includes(searchBar.toLowerCase()))
          .map((product, index) => (
            <div key={index} className="group relative shadow-lg" onClick={() => update_cart(Cart, setCart, PageId, product, setPageId)}>
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                <img
                  alt="Product Image"
                  src={product.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.title}
                      </span>
                    </a>
                    <p>Tag - {product.category}</p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Rating: {product.rating.rate}
                  </p>
                  <button className="inline-block bg-amber-600 rounded-full px-3 py-1">Add To Cart</button>
                </div>
                <p className="text-sm font-medium text-green-600">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
function login_user(setState) {
  login_info = {
    Name: document.getElementById("Name").value,
    Address: document.getElementById("Address").value,
    State: document.getElementById("State").value,
    City: document.getElementById("City").value,
    Zip: document.getElementById("Zip").value,
    CreditCard: document.getElementById("ccn").value.replace(/\D/g,''),
    ExperationDate: document.getElementById("ExperationDate").value,
    CCV: document.getElementById("CCV").value,
    NameOnCard: document.getElementById("NameOnCard").value,
  }
  is_logged_in = true;
  setState(1);
}
function logout_user(setPageId) {
  login_info = null;
  is_logged_in = false;
  setPageId(1);
}

const sum_prices = (Cart) =>
{
  var sum = 0;
  Cart.forEach(product => {
    sum += product.price;
  })

  return sum;
}

function count_number_of_products(cart){
  let cart_return = [];
  for(let i = 0; i < cart.length; i++){
    let found = false;
    for(let j = 0; j < cart_return.length; j++){
      if(cart[i].title == cart_return[j].title){
        cart_return[j].number_of_products++;
        found = true;
        break;
      }
    }
    if(!found){
      cart[i].number_of_products = 1;
      cart_return.push(cart[i]);
    }
  }
  return cart_return;
}

function render_user_login(setState) {
  return (
    <section style={{ position: "fixed", marginLeft: "10%", width: "50%" }}>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full Name</label>
                <input type="email" name="Name" id="Name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required=""></input>
              </div>
              <div>
                <label for="Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input type="email" name="Address" id="Address" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="515 Morrill Rd" required=""></input>
              </div>
              <div className="columns-3">
                <div>
                  <label for="State" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                  <input type="State" name="State" id="State" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Iowa" required=""></input>
                </div>
                <div>
                  <label for="City" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                  <input type="City" name="City" id="City" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ames" required=""></input>
                </div>
                <div>
                  <label for="Zip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip Code</label>
                  <input type="Zip" name="Zip" id="Zip" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="50011" required=""></input>
                </div>
              </div>
              <div>
                <label for="ccn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credit Card</label>
                <input id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xxxx xxxx xxxx xxxx"></input>
              </div>
              <div className="columns-3">
                <div>
                  <label for="ExperationDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experation Date</label>
                  <input type="email" name="ExperationDate" id="ExperationDate" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="MM/YY" required=""></input>
                </div>
                <div>
                  <label for="CCV" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CCV</label>
                  <input maxlength="3" type="email" name="CCV" id="CCV" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***" required=""></input>
                </div>
                <div>
                  <label for="NameOnCard" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name on Card</label>
                  <input type="email" name="NameOnCard" id="NameOnCard" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required=""></input>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                </div>
              </div>
              <button type="submit" onClick={() => login_user(setState)} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
function get_last_four(card_num) {
  return card_num.substring(card_num.length - 4);
}
function render_user_information(bought_items,set_bought_items,PageId,setPageId) {
  return (
      <div style={{position: "fixed", marginLeft: "10%", width: "50%"}}>
        <div className="grid grid-cols-8 gap-2">
          <p style={{textAlign: "right"}} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            Name:
          </p>
          <p className="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {login_info.Name}
          </p>
        </div>
        <div className="grid grid-cols-8 gap-2">
          <p style={{textAlign: "right"}} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          Address:
          </p>
          <p className="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {login_info.Address}, {login_info.State} {login_info.City}, {login_info.Zip}
          </p>
        </div>
        <div className="grid grid-cols-8 gap-2">
          <p style={{textAlign: "right"}} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          Credit Card:
          </p>
          <p className="col-span-6 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {login_info.NameOnCard}: Card Ending in {get_last_four(login_info.CreditCard)}
          </p>
        </div>
        {render_bought_items(bought_items,set_bought_items,PageId,setPageId)}
      </div>
  )
}

const render_bought_items = (bought_items,set_bought_items,PageId,setPageId) => {
  let products = count_number_of_products(bought_items);
  return (
    <div className="category-section fixed">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Previously Bought Items: ({bought_items.length} Items)
      </h2>
      {products.map((item, index) => (
        <div key={index+1} id={"div_" + index}>
          <p>{item.number_of_products}x - {item.title}</p>
        </div>
      ))}
    </div>
  )
}

function item_to_cart_index(cart, item){
  for(let i = 0; i < cart.length; i++){
    if(cart[i].title == item.title)
    {
      return i;
    }
  }
  return -1;
}

const render_cart = (Cart, setCart, PageId, setPageId,bought_items,set_bought_items) => {
  let products = count_number_of_products(Cart);
  return (
    <div className="category-section fixed">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Your Cart ({Cart.length} Items)
      </h2>
      {products.map((item, index) => (
        <div key={index+1} id={"div2_" + index}>
          <p>{item.number_of_products}x (${item.price} each) - {item.title}</p>
          <button onClick={() => removeFromCart(Cart, setCart, item_to_cart_index(Cart, item), PageId, setPageId)} className="inline-block bg-amber-600 rounded-full px-3 py-1">-</button>   
          <button onClick={() => update_cart(Cart, setCart, PageId, item, setPageId)} className="inline-block bg-amber-600 rounded-full px-3 py-1">+</button><br></br><br></br>
        </div>
      ))}

      <p>Total Price: ${sum_prices(Cart)}</p>

      {/* Feel Free to Style this however you want, I just have it here so I can have functionality for the "User Information" page */}
      <button onClick={() => buy_items(Cart,setCart,bought_items,set_bought_items)} type="submit" className="inline-block bg-amber-600 rounded-full px-3 py-1">Buy</button>

    </div>
  )
};

const render = (ProductsCategory, PageId, SearchBar, setSearchBar, Cart, setCart, setPageId,bought_items,set_bought_items) => {
  if (PageId == 1) {
    return render_products(ProductsCategory, SearchBar, setSearchBar, Cart, setCart, PageId, setPageId);
  } else if (PageId == 2 || PageId == 3) {
    return render_cart(Cart, setCart, PageId, setPageId,bought_items,set_bought_items);
  }
  else if (PageId == 4) {
    return render_user_login(setPageId);
  }
  else if (PageId == 5) {
    return render_user_information(bought_items,set_bought_items,PageId,setPageId);
  }
};

function buy_items(Cart,setCart,bought_items,set_bought_items){
  if(!is_logged_in){
    alert("You must log in before Buying items");
    return;
  }
  alert(`You have successfuly bought ${Cart.length} items with your card ending in ${get_last_four(login_info.CreditCard)}`);
  for(let i = 0; i < Cart.length; i++){
    bought_items.push(Cart[i]);
  }
  setCart([]);
}

//For Testing Purposes, remove before turning in
function testLogin(setPageId) {
  login_info = {
    Name: "John Doe",
    Address: "515 Morrill Rd",
    State: "Iowa",
    City: "Ames",
    Zip: "50011",
    CreditCard: "0000-0000-0000",
    ExperationDate: "10/31",
    CCV: "111",
    NameOnCard: "John Doe",
  }
  is_logged_in = true;
  setPageId(5);
}

const App = () => {
  const [PageId, setPageId] = useState(1);
  const [SearchBar, setSearchBar] = useState("");
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [Cart, setCart] = useState([]);
  const [bought_items,set_bought_items] = useState([]);

  let login_buttons;
  if (is_logged_in) {
    login_buttons = (
      <div style={{ marginTop: "-20px" }}>
        <br></br>
        <br></br>
        <button
          onClick={() => logout_user(setPageId)}
          className="inline-block bg-amber-600 rounded-full px-3 py-1"
        >Log Out</button>
        <br></br>
        <br></br>
        <button
          onClick={() => setPageId(5)}
          className="inline-block bg-amber-600 rounded-full px-3 py-1"
        >User Information</button>
      </div>
    )
  }
  else {
    login_buttons = (
      <div style={{ marginTop: "-20px" }}>
        <br></br>
        <br></br>
        <button
          onClick={() => setPageId(4)}
          className="inline-block bg-amber-600 rounded-full px-3 py-1"
        >Log In</button>
        <div style={{ marginTop: "-20px" }}>
          {/* <br></br>
          <br></br>
          <button
            onClick={() => testLogin(setPageId)}
            className="inline-block bg-amber-600 rounded-full px-3 py-1"
          >Test Login</button> */}
        </div>
      </div>
    )
  }
  return (
    <div className="flex fixed flex-row" id="all_page">
      <div
        className="h-screen bg-slate-800 p-3 xl:basis-1/5"
        style={{ minWidth: "65%" }}
      >
        <img className="w-full" src={logo} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white">
            {" "}
            Storefront (Assignment02){" "}
          </h1>
          <p className="text-gray-700 text-white">
            By - <b style={{ color: "orange" }}>Austin Dart & Kenny Epstein</b>
          </p>
        </div>
        <div className="py-10 text-white">
          <button
            onClick={() => setPageId(2)}
            className="inline-block bg-amber-600 rounded-full px-3 py-1"
          >
            View Cart
          </button>
          <br></br>
          <br></br>
          <button
            onClick={() => setPageId(1)}
            className="inline-block bg-amber-600 rounded-full px-3 py-1"
          >
            View Catalogue
          </button>
          {login_buttons}
        </div>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log(
          "Before render :",
          Products.length,
          ProductsCategory.length
        )}
        {render(ProductsCategory, PageId, SearchBar, setSearchBar, Cart, setCart, setPageId,bought_items,set_bought_items)}
      </div>
    </div>
  );
};

export default App;
