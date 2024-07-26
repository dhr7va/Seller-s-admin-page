function handleFormSubmit(event) {
    event.preventDefault();

    const productDetails = {
        price: event.target.price.value,
        prodName: event.target.name.value
    };

    axios
        .post("https://crudcrud.com/api/eaaff60087234a23b055698bac69424f/sellerInfo", productDetails)
        .then((response) => displayProd(response.data))
        .catch((error) => console.log(error));

    document.getElementById("price").value = "";
    document.getElementById("name").value = "";
}

function displayProd(productDetails) {
    const sellerDetails = document.createElement("li");
    sellerDetails.textContent = `${productDetails.price} - ${productDetails.prodName}`;

    const deletBtn = document.createElement("button");
    deletBtn.appendChild(document.createTextNode("Delete"));
    sellerDetails.appendChild(deletBtn);

    const prodList = document.querySelector("ul");
    prodList.appendChild(sellerDetails);

    deletBtn.addEventListener("click", function (event) {
        axios.delete(`https://crudcrud.com/api/eaaff60087234a23b055698bac69424f/sellerInfo/${productDetails._id}`)
            .then(() => {
                prodList.removeChild(event.target.parentElement);
            })
            .catch((error) => console.log(error));
    })
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

document.addEventListener('DOMContentLoaded', loadProducts);
