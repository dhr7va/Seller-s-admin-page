document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
});

function handleFormSubmit(event) {
    event.preventDefault();

    const price = event.target.price.value;
    const prodName = event.target.name.value;

    if (!price || !prodName) {
        alert('Both fields are required');
        return;
    }

    const productDetails = {
        price: price,
        prodName: prodName
    };

    axios
        .post("https://crudcrud.com/api/eaaff60087234a23b055698bac69424f/sellerInfo", productDetails)
        .then((response) => displayProd(response.data)) // Display the product after successful post
        .catch((error) => console.log(error)); // Log any errors

    document.getElementById("price").value = "";
    document.getElementById("name").value = "";
}

function displayProd(productDetails) {
    const sellerDetails = document.createElement("li");
    sellerDetails.textContent = `${productDetails.price} - ${productDetails.prodName}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.textContent = "Delete";
    sellerDetails.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-warning");
    editBtn.textContent = "Edit";
    sellerDetails.appendChild(editBtn);

    const prodList = document.querySelector("ul");
    prodList.appendChild(sellerDetails);

    deleteBtn.addEventListener("click", function () {
        axios.delete(`https://crudcrud.com/api/eaaff60087234a23b055698bac69424f/sellerInfo/${productDetails._id}`)
            .then(() => {
                prodList.removeChild(sellerDetails);
            })
            .catch((error) => console.log(error));
    });

    editBtn.addEventListener("click", function (event) {
        prodList.removeChild(event.target.parentElement);
        document.getElementById("price").value = productDetails.price;
        document.getElementById("name").value = productDetails.prodName;
    });
}

function loadProducts() {
    axios
        .get("https://crudcrud.com/api/eaaff60087234a23b055698bac69424f/sellerInfo")
        .then((response) => {
            response.data.forEach((product) => {
                displayProd(product);
            });
        })
        .catch((error) => console.log(error));
}

document.querySelector('form').addEventListener('submit', handleFormSubmit);
