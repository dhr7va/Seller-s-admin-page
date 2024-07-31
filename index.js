document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
});

function handleFormSubmit(event) {
    event.preventDefault();

    const price = document.getElementById("price").value.trim();
    const prodName = document.getElementById("name").value.trim();

    console.log("Form submitted with values:", { price, prodName });

    if (!price || !prodName) {
        alert('Both fields are required');
        return;
    }

    const productDetails = {
        price: price,
        prodName: prodName
    };

    axios
        .post("https://crudcrud.com/api/c92f54ecc04a41fe806404cf9995da02/sellerInfo", productDetails)
        .then((response) => displayProd(response.data))
        .catch((error) => {
            console.log(error);
            alert('Failed to add product. Please try again.');
        });

    document.getElementById("price").value = "";
    document.getElementById("name").value = "";
}

function displayProd(productDetails) {
    const sellerDetails = document.createElement("li");
    sellerDetails.textContent = `${productDetails.price} - ${productDetails.prodName}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger", "m-2");
    deleteBtn.textContent = "Delete";
    sellerDetails.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-warning", "m-2");
    editBtn.textContent = "Edit";
    sellerDetails.appendChild(editBtn);

    const prodList = document.querySelector("ul");
    prodList.appendChild(sellerDetails);

    deleteBtn.addEventListener("click", function () {
        axios.delete(`https://crudcrud.com/api/c92f54ecc04a41fe806404cf9995da02/sellerInfo/${productDetails._id}`)
            .then(() => {
                alert('Are you sure you want to delete the product?')
                prodList.removeChild(sellerDetails);
            })
            .catch((error) => {
                console.log(error);
                alert('Failed to delete product. Please try again.');
            });
    });

    editBtn.addEventListener("click", function (event) {
        prodList.removeChild(event.target.parentElement);
        document.getElementById("price").value = productDetails.price;
        document.getElementById("name").value = productDetails.prodName;
    });
}

function loadProducts() {
    axios
        .get("https://crudcrud.com/api/c92f54ecc04a41fe806404cf9995da02/sellerInfo")
        .then((response) => {
            response.data.forEach((product) => {
                displayProd(product);
            });
        })
        .catch((error) => {
            console.log(error);
            alert('Failed to load products. Please try again.');
        });
}
