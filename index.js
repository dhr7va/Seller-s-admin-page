function handleFormSubmit(event) {
    event.preventDefault();

    const productDetails = {
        price: event.target.sellingPrice.value,
        prodName: event.target.productName.value,
    };
    axios
        .post("https://crudcrud.com/api/eaaff60087234a23b055698bac69424f/sellerInfo",
            productDetails
        )
        .then((response) => displayProd(response.data))
        .catch((error) => console.log(error));

    document.getElementById("price").value = "";
    document.getElementById("name").value = "";
}

