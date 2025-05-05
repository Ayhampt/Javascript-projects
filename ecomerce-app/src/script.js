document.addEventListener("DOMContentLoaded", () => {
  let products = [
    {
      id: 1,
      name: "Bag",
      price: 250,
      image:
        "https://i.pinimg.com/474x/ef/2c/92/ef2c9211238a86a704eaf1d4d82169e7.jpg",
      description:
        "This elegant, leather handbag features a classic silhouette with a subtle, textured finish and a secure zipper closure",
    },
    {
      id: 2,
      name: "Shoe",
      price: 469,
      image:
        "https://i.pinimg.com/474x/f3/e7/2c/f3e72c1ef99c1723f1e53f03826007b3.jpg",
      description:
        "These stylish leather loafers feature a sleek, minimalist design with a subtle embossed pattern.",
    },
    {
      id: 3,
      name: "Perfume",
      price: 34,
      image:
        "https://i.pinimg.com/474x/6f/f8/24/6ff824eb6f6bd37cd0ff4b831b8d141a.jpg",
      description:
        "A captivating, floral-aldehydic fragrance that opens with a burst of fresh bergamot and green mandarin, followed by a heart of creamy jasmine ",
    },
    {
      id: 4,
      name: "bike",
      price: 789993,
      description: "this bike is very nice",
      image:
        "https://i.pinimg.com/736x/32/83/3c/32833c8ccfbec6d3cec40c7a7a7b8a17.jpg",
    },
  ];
  let cart = JSON.parse(localStorage.getItem("carts")) || [];
  

  const Productlist = document.getElementById("Product-list");
  const productcart = document.getElementById("product-cart");
  const emptycart = document.getElementById("empty-cart");
  const Totalcheckout = document.getElementById("Totalcheckoutvalue");
  const Checkout = document.getElementById("Checkout");
  const Totalprice = document.getElementById("price");

  // Display products

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${
        product.image
      }" style="width: 250px; height: 200px; object-fit: cover; border-radius: 8px;margin: 30px 0 ">
      <span style="display: block; font-size: 30px; margin: 10px 0; font-weight:bold;">
        ${product.name} 
      </span>
      <span style="display: block; font-size: 1.2em; margin: 10px 0; font-weight: bold;">
         $${product.price.toFixed(2)}
      </span>
      <p style="color: #666; margin: 8px 0;">${product.description}</p>
      <button data-id="${product.id}" 
        style="background-color: #4CAF50; 
        color: white; 
        padding: 10px 20px; 
        border: none; 
        border-radius: 4px; 
        cursor: pointer;
        
        transition: background-color 0.3s;">
        Add to cart
      </button>
    `;

    // Add hover effect for button
    productDiv
      .querySelector("button")
      .addEventListener("mouseover", function () {
        this.style.backgroundColor = "#45a049";
      });
    productDiv
      .querySelector("button")
      .addEventListener("mouseout", function () {
        this.style.backgroundColor = "#4CAF50";
      });

    Productlist.appendChild(productDiv);
  });

  Productlist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      
      addToCart(product);
    }
  });
  function addToCart(product) {
    cart.push(product);
    saveproducts();
    rendercart();
  }
  emptycart.classList.remove("hidden");
  function rendercart() {
    productcart.innerText = "";
    let totalprice = 0;
    if (cart.length > 0) {
      emptycart.classList.add("hidden");
      Totalcheckout.classList.remove("hidden");
      cart.forEach((item) => {
        totalprice += item.price;
        const cartitem = document.createElement("div");
        cartitem.style.marginRight = "10px";
        cartitem.style.display = "flex";
        cartitem.style.justifyContent = "space-between";
        cartitem.style.alignItems = "center";
        cartitem.innerHTML = `
        <div style="display: flex; align-items: center;">
          <span style="font-size: 20px; margin-right: 20px;">
            ${item.name}
          </span>
          <span style="font-size: 20px;">
            $${item.price.toFixed(2)}
          </span>
        </div>
        <button rem-id="${item.id} " 
          style="background-color: #ff0000; 
          color: white; 
          padding: 5px 10px; 
          border: none; 
          border-radius: 4px; 
          cursor: pointer;
          transition: background-color 0.3s;
          display:flex;">
          Remove item
        </button>
      `;

        productcart.appendChild(cartitem);
        Totalprice.textContent = `$${totalprice.toFixed(2)}`;
      });
    } else {
      Totalprice.textContent = "$0.00";
      console.error("Your cart is Empty");
    }
  }

  productcart.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const toremoveroductid = parseInt(e.target.getAttribute("rem-id"));
      const product = products.find((p) => p.id === toremoveroductid);
      remove(product);
      saveproducts();
    }
  });

  Checkout.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout sucessfull");
    rendercart();
  });
  function remove(product) {
    const index = cart.findIndex((p) => p.id === product.id);
    if (index > -1) {
      cart.splice(index, 1);
      rendercart();
      console.log(cart);
    }
  }

  function saveproducts() {
    localStorage.setItem("carts", JSON.stringify(cart));
  }
});
