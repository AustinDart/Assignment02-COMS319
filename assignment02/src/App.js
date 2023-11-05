import "./App.css";
import logo from "./logo.png";
import React, { useState } from "react";
import Products from "./Products.json";
import { Categories } from "./Categories";

const cartArray = [];

function get_search_bar() {
  let x = document.getElementById("SearchBar");
  if (x == null) {
    console.log("Test");
    return "";
  }
  console.log(x.value);
  return x.value;
}

function update_cart(Cart, setCart, PageId, product, setPageId)
{
  console.log("Adding " + product.id + " to cart");
  let x = Cart;
  let y = PageId;
  x.push(product);
  setCart(x);
  // This forces an update (for some reason, setCart is only sometimes re-rendering)
  setPageId(0);
  setPageId(y);
}

function removeFromCart(Cart, setCart, index, PageId, setPageId)
{
  console.log("Removing idx " + index + " from cart");
  let x = Cart;
  let y = PageId;
  x.splice(index, 1);
  setCart(x);
  if(y == 2)
  {
    setPageId(3);
  }
  else
  {
    setPageId(2);
  }
}

function render_products(ProductsCategory, searchBar, setSearchBar, Cart, setCart, PageId, setPageId) {
  return (
    <div className="category-section fixed">
      <div className="topnav">
        <input onChange={() => setSearchBar(get_search_bar())}
          type="text" placeholder="Search.." id="SearchBar" style={{ border: "solid", color: "black",  width: "75%"}}></input>
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



const render_cart = (Cart, setCart, PageId, setPageId) => {
  return (
    <div className="category-section fixed">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Your Cart ({Cart.length} Items)
      </h2>
      {Cart.map((item, index) => (
        <div key={index+1} id={"div_" + index}>
          <p>{index+1} - {item.title}</p>
          <button onClick={() => removeFromCart(Cart, setCart, index, PageId, setPageId)} className="inline-block bg-amber-600 rounded-full px-3 py-1">Remove</button><br></br><br></br>
        </div>
      ))}

    </div>
  )
};

const render = (ProductsCategory, PageId, SearchBar, setSearchBar, Cart, setCart, setPageId) => {
  if (PageId == 1) {
    return render_products(ProductsCategory, SearchBar, setSearchBar, Cart, setCart, PageId, setPageId);
  } else if (PageId == 2 || PageId == 3) {
    return render_cart(Cart, setCart, PageId, setPageId);
  }
};

const App = () => {
  const [PageId, setPageId] = useState(1);
  const [SearchBar, setSearchBar] = useState("");
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [Cart, setCart] = useState([]);

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
        </div>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log(
          "Before render :",
          Products.length,
          ProductsCategory.length
        )}
        {render(ProductsCategory, PageId, SearchBar, setSearchBar, Cart, setCart, setPageId)}
      </div>
    </div>
  );
};

export default App;
