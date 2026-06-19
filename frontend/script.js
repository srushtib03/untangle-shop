
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        category: "Electronics",
        stock: 10,
        image:
            "./images/laptop.jpeg"
    },

    {
        id: 2,
        name: "Mouse",
        price: 800,
        category: "Electronics",
        stock: 50,
        image:
            "./images/mouse.jpg"
    },

    {
        id: 3,
        name: "Notebook",
        price: 100,
        category: "Stationery",
        stock: 200,
        image:
            "./images/notebook.jpg"
    },

    {
        id: 4,
        name: "Premium Pen",
        price: 20,
        category: "Stationery",
        stock: 500,
        image:
            "./images/ppen.jpeg"
    },

    {
        id: 5,
        name: "Water Bottle",
        price: 300,
        category: "Accessories",
        stock: 75,
        image:
            "./images/bottle.jpeg"
    },

    {
        id: 6,
        name: "Shoes",
        price: 1200,
        category: "Accessories",
        stock: 40,
        image:
            "./images/shoes.jpg"
    }
];

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
                src="${product.image}"
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
const categories = [
    ...new Set(
        products.map(
            product => product.category
        )
    )
];

categories.forEach(category => {

    const option =
        document.createElement("option");

    option.value = category;
    option.textContent = category;

    categoryFilter.appendChild(option);

});
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

displayProducts(products);