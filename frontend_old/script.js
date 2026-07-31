
let products = [];

const productImages = {
    "Laptop": "./images/laptop.jpeg",
    "Wireless Mouse": "./images/mouse.jpg",
    "Notebook": "./images/notebook.jpg",
    "Premium Pen": "./images/ppen.jpeg",
    "Water Bottle": "./images/bottle.jpeg",
    "Shoes": "./images/shoes.jpg",
    "Keyboard": "./images/keyboard.jpg"
};

const productContainer =
    document.getElementById("productContainer");

const categoryFilter =
    document.getElementById("categoryFilter");

function displayProducts(productList) {
    productContainer.innerHTML = "";
    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
            <img
                src="${productImages[product.name] || './images/default.jpg'}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-details">

                <h2 class="product-name">
                    ${product.name}
                </h2>

                <span class="category">
                    ${product.category}
                </span>

                <p class="price">
                    ₹${product.price}
                </p>

                <p class="stock">
                    Available Stock:
                    ${product.stock}
                </p>

            </div>
        `;

        productContainer.appendChild(card);
    });

}

// Filter Products
categoryFilter.addEventListener(
    "change",
    () => {

        const selectedCategory =
            categoryFilter.value;

        if (selectedCategory === "all") {

            displayProducts(products);

        } else {

            const filteredProducts =
                products.filter(product =>
                    product.category === selectedCategory
                );

            displayProducts(filteredProducts);
        }

    }
);

async function loadProducts() {
    try {

        const response = await fetch("http://localhost:3000/products");

        products = await response.json();

        displayProducts(products);

        const categories = [
            ...new Set(products.map(product => product.category))
        ];

        categoryFilter.innerHTML =
            '<option value="all">All Categories</option>';

        categories.forEach(category => {

            const option =
                document.createElement("option");

            option.value = category;
            option.textContent = category;

            categoryFilter.appendChild(option);

        });

    } catch (error) {

        console.error(error);

        productContainer.innerHTML =
            "<h2>Unable to load products.</h2>";

    }
}

loadProducts();