


const BgCover = document.querySelector('.bgCover');




// account form

document.getElementById('registerLink').addEventListener('click', showRegisterForm);
document.getElementById('forgotPasswordLink').addEventListener('click', showForgotPasswordForm);
document.getElementById('backToLoginFromRegister').addEventListener('click', showLoginForm);
document.getElementById('backToLoginFromForgot').addEventListener('click', showLoginForm);
document.getElementById('backToLoginFromReset').addEventListener('click', showLoginForm);
document.getElementById('backToLoginFromNewPassword').addEventListener('click', showLoginForm);
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('registerBtn').addEventListener('click', register);
document.getElementById('sendResetCodeBtn').addEventListener('click', sendResetCode);
document.getElementById('verifyResetCodeBtn').addEventListener('click', verifyResetCode);
document.getElementById('resetPasswordBtn').addEventListener('click', resetPassword);
document.getElementById('logoutLink').addEventListener('click', logout);
document.getElementById('deleteAccountLink').addEventListener('click', deleteAccount);

function showRegisterForm() {
    hideAllForms();
    document.getElementById('registerForm').style.display = 'block';
}

function showForgotPasswordForm() {
    hideAllForms();
    document.getElementById('forgotPasswordForm').style.display = 'block';
}

function showResetCodeForm() {
    hideAllForms();
    document.getElementById('resetCodeForm').style.display = 'block';
}

function showNewPasswordForm() {
    hideAllForms();
    document.getElementById('newPasswordForm').style.display = 'block';
}

function showLoginForm() {
    hideAllForms();
    document.getElementById('loginForm').style.display = 'block';
}

function hideAllForms() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'none';
    document.getElementById('resetCodeForm').style.display = 'none';
    document.getElementById('newPasswordForm').style.display = 'none';
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (username && email && password) {
        if (localStorage.getItem(username)) {
            alert('Username is already taken');
            return;
        }
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const user = JSON.parse(localStorage.getItem(key));
            if (user.email === email) {
                alert('Email is already registered');
                return;
            }
        }
        const user = { username, email, password };
        localStorage.setItem(username, JSON.stringify(user));
        alert('User registered successfully');
        document.getElementById('registerUsername').value = '';
        document.getElementById('registerEmail').value = '';
        document.getElementById('registerPassword').value = '';
        showLoginForm();
    } else {
        alert('Please fill all fields');
    }
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
            document.getElementById('usernameDisplay').innerText = `Welcome, ${user.username}`;
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerLink').style.display = 'none';
            document.getElementById('forgotPasswordLink').style.display = 'none';
            document.getElementById('logoutLink').style.display = 'block';
            document.getElementById('deleteAccountLink').style.display = 'block';
        } else {
            alert('Username or password is incorrect');
        }
    } else {
        alert('Username or password is incorrect');
    }
}

function logout() {
    document.getElementById('usernameDisplay').innerText = '';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerLink').style.display = 'block';
    document.getElementById('forgotPasswordLink').style.display = 'block';
    document.getElementById('logoutLink').style.display = 'none';
    document.getElementById('deleteAccountLink').style.display = 'none';
    hideAllForms();
    document.getElementById('loginForm').style.display = 'block';
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
        const username = document.getElementById('usernameDisplay').innerText.split(', ')[1];
        localStorage.removeItem(username);
        alert('Account deleted successfully');
        logout();
    }
}

function sendResetCode() {
    const email = document.getElementById('forgotPasswordEmail').value;
    let userFound = false;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const user = JSON.parse(localStorage.getItem(key));
        if (user.email === email) {
            userFound = true;
            const resetCode = Math.floor(1000 + Math.random() * 9000);
            localStorage.setItem('resetCode', resetCode);
            localStorage.setItem('resetUser', key);
            alert(`Your reset code is: ${resetCode}`);
            document.getElementById('forgotPasswordEmail').value = '';
            showResetCodeForm();
            break;
        }
    }

    if (!userFound) {
        alert('Email not found');
    }
}

function verifyResetCode() {
    const resetCode = document.getElementById('resetCode').value;
    const storedCode = localStorage.getItem('resetCode');

    if (resetCode === storedCode) {
        alert('Code verified');
        document.getElementById('resetCode').value = '';
        showNewPasswordForm();
    } else {
        alert('Invalid code');
    }
}

function resetPassword() {
    const newPassword = document.getElementById('newPassword').value;
    const username = localStorage.getItem('resetUser');
    const user = JSON.parse(localStorage.getItem(username));

    if (user) {
        user.password = newPassword;
        localStorage.setItem(username, JSON.stringify(user));
        localStorage.removeItem('resetCode');
        localStorage.removeItem('resetUser');
        alert('Password reset successfully');
        document.getElementById('newPassword').value = '';
        showLoginForm();
    } else {
        alert('An error occurred');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const FormDelete = document.querySelector('.delete');
    const userInfo = document.querySelector('.user-info');
    const accForm = document.querySelector('.account-form');

    const toggleFormAndCover = () => {
        // Get the computed style of the accForm
        const accFormStyle = window.getComputedStyle(accForm);
        if (accFormStyle.display === 'none') {
            accForm.style.display = 'block';
            BgCover.classList.add("active");
        } else {
            accForm.style.display = 'none';
            BgCover.classList.remove("active");
        }
    };

    document.addEventListener('click', e => {
        if (userInfo.contains(e.target) || FormDelete.contains(e.target)) {
            toggleFormAndCover();
        } else if (BgCover.contains(e.target)) {
            accForm.style.display = 'none';
            BgCover.classList.remove("active");
        }
    });
});



// ----------------------------------------------------------------

// creating products form 
let addProBtn = document.querySelector(".Add-btn")
let addProducts = document.querySelector(".add-product");
let addProductSection = document.querySelector(".add-productSection");
let addProDelete = document.querySelector(".add-productSection .delete")

//creating products inputs
let addProId = document.getElementById('productId');
let addProName = document.getElementById('productName');
let addProPrice = document.getElementById('productPrice');
let addProDes = document.getElementById('productDescription');

// hiding and displaying the products form
document.addEventListener('click', (e) => {
    if (!addProductSection.contains(e.target) && addProductSection.classList.contains('section') || addProDelete.contains(e.target) || BgCover.contains(e.target)) {
        addProductSection.classList.remove("section")
        BgCover.classList.remove("active");
        addProId.style.borderColor = '';
        addProName.style.borderColor = '';
        addProPrice.style.borderColor = '';
        addProDes.style.borderColor = '';
        resetForm()
    } else if (addProBtn.contains(e.target)) {
        addProductSection.classList.toggle('section');
        BgCover.classList.add("active");
    }
});

// removing any requirement borders when the form is closed
function removeProductBorders() {
    addProId.oninput = () => {
        addProId.style.borderColor = '';
    }
    addProName.oninput = () => {
        addProName.style.borderColor = '';
    }
    addProPrice.oninput = () => {
        addProPrice.style.borderColor = '';
    }
    addProDes.oninput = () => {
        addProDes.style.borderColor = '';
    }
}
removeProductBorders()

// -----------------------------------------------------------------------------------------------------------------------------------------------------
// add/remove products, filtering products, pagination, and adding/removing products to/from the cart section

// this whole section was made with the help of AI and with a LOT of adjustments



const products = [];
const productsPerPage = 6;
let currentPage = 1;
let filteredProducts = [];


document.addEventListener('DOMContentLoaded', () => {
    extractExistingProducts();
    renderProducts();
    renderFilterOptions();
    renderPagination();
    highlightCurrentPage();
    updateFilteredProducts();
    initializePriceInputs();
    updatePriceRange();
    initializeCartFunctions();
});


// ---------------- Cart Section -----------------

function initializeCartFunctions() {
    const cart = document.querySelector('.cart');
    const cartHead = document.querySelector('.cart-head');
    const cartBody = document.querySelector('.cart-body');
    const cartFooter = document.querySelector('.cart-footer');
    const emptyCart = document.querySelector('.empty');
    const cartIcon = document.querySelector('.cart-icon');
    const cartDelete = document.querySelector('.cart .delete');
    const payment = document.querySelector('.pay-btn');

    payment.onclick = () => {
        console.log("payment clicked");
    }

    if (!cart || !cartHead || !cartBody || !cartFooter || !emptyCart || !BgCover || !cartIcon || !cartDelete) {
        return;
    }

    // open/close the cart
    document.addEventListener("click", e => {
        if (e.target === BgCover || cartDelete.contains(e.target)) {
            BgCover.classList.remove("active");
            cart.classList.remove("animation");
        } else if (cartIcon.contains(e.target)) {
            BgCover.classList.add("active");
            cart.classList.add("animation");
        }
    });
    

    document.addEventListener('click', (event) => {
        const removeBtn = event.target.closest('.remove');
        if (removeBtn) {
            handleRemoveButtonClick(removeBtn);
        }

        const addToCartBtn = event.target.closest('.addToCartBtn');
        if (addToCartBtn) {
            handleAddToCartClick(addToCartBtn);
        }
    });

    function handleRemoveButtonClick(removeBtn) {
        removeProduct(removeBtn);
    }

    function handleAddToCartClick(addToCartBtn) {
        if (cart.contains(emptyCart)) {
            cart.removeChild(emptyCart);
        }
    
        const product = addToCartBtn.closest('.product');
        const productId = product.id; // Retrieve the product ID
        const productImg = product.querySelector('.product-img img').src;
        const productName = product.querySelector('.product-head').innerText;
        const productDes = product.querySelector('.product-des').innerText;
        const productPrice = parseFloat(product.querySelector('.product-price').innerText);
    
        let existingProduct = Array.from(cartBody.children).find(item => 
            item.querySelector('.card-name').innerText === productName);
    
        if (existingProduct) {
            const quantityInput = existingProduct.querySelector('.quantity-input');
            const currentQuantity = parseInt(quantityInput.value);
            quantityInput.value = currentQuantity + 1;
            const newTotalPrice = productPrice * (currentQuantity + 1);
            existingProduct.querySelector('.card-price').innerText = newTotalPrice.toFixed(2);
        } else {
            // Pass the product ID and data-number to the createCartProduct function
            const cartProduct = createCartProduct(productImg, productName, productDes, productPrice, productId);
            cartBody.appendChild(cartProduct);
        }
    
        appendCartContent();
        cart.style.backgroundColor = 'white';
        updateTotalPrice();
        cartChecker();
    }

    function removeProduct(removeBtn) {
        const productCard = removeBtn.closest('.product-card');
        if (productCard) {
            productCard.remove();
            updateTotalPrice();
            cartChecker();
        }
    }

    function createCartProduct(imgSrc, name, description, price, id) {
        const cartProduct = document.createElement('div');
        cartProduct.classList.add('product-card');
        cartProduct.dataset.id = id; // Use dataset.id for the ID attribute
    
        let quantity = 1;
        let totalPrice = price;
    
        cartProduct.innerHTML = `
            <div class="card-img">
                <img src="${imgSrc}" alt="">
            </div>
            <div class="card-info">
                <h4 class="card-name">${name}</h4>
                <p class="card-des">${description}</p>
                <div class="card-pay">
                    <div class="product-quantity">
                        <input type="number" value="${quantity}" min="1" class="quantity-input">
                    </div>
                    <span class="card-price">${price}</span>
                    <span class="remove">Delete</span>
                </div>
            </div>`;
    
        const quantityInput = cartProduct.querySelector('.quantity-input');
        quantityInput.addEventListener('change', () => {
            quantity = parseInt(quantityInput.value);
            totalPrice = price * quantity;
            cartProduct.querySelector('.card-price').innerText = totalPrice.toFixed(2);
            updateTotalPrice();
        });
    
        return cartProduct;
    }
    
    function appendCartContent() {
        if (!cart.contains(cartHead)) cart.appendChild(cartHead);
        if (!cart.contains(cartBody)) cart.appendChild(cartBody);
        if (!cart.contains(cartFooter)) cart.appendChild(cartFooter);
    }

    function cartChecker() {
        if (cartBody.children.length === 0) {
            if (cart.contains(cartHead)) cart.removeChild(cartHead);
            if (cart.contains(cartBody)) cart.removeChild(cartBody);
            if (cart.contains(cartFooter)) cart.removeChild(cartFooter);
            if (!cart.contains(emptyCart)) cart.appendChild(emptyCart);
            cart.style.backgroundColor = '';
        } else {
            appendCartContent();
            if (cart.contains(emptyCart)) cart.removeChild(emptyCart);
        }
    }

    function updateTotalPrice() {
        const productCards = cartBody.querySelectorAll('.product-card');
        let totalPrice = 0;

        productCards.forEach(productCard => {
            const price = parseFloat(productCard.querySelector('.card-price').innerText);
            totalPrice += price;
        });

        const totalPriceElement = document.querySelector('#total-price');
        if (totalPriceElement) {
            totalPriceElement.innerText = totalPrice.toFixed(2) + ' $';
        }
    }

    // Initial check to hide empty cart message if necessary
    cartChecker();
}



// ------ Product Section-----------

function updatePaginationAfterAddingProduct() {
    renderProducts();
    renderPagination();
    highlightCurrentPage();
}

function removeProduct(removeBtn) {
        const productCard = removeBtn.closest('.product-card');
        productCard.remove();
        cartChecker();
}

// Function to extract existing products from the DOM and store them in the products array
function extractExistingProducts() {
    const existingProductElements = document.querySelectorAll('.product');
    existingProductElements.forEach(productElement => {
        const productId = productElement.id;
        const productName = productElement.querySelector('.product-head').textContent;
        const productDescription = productElement.querySelector('.product-des').textContent;
        const productPrice = parseFloat(productElement.querySelector('.product-price').textContent);
        const productImage = productElement.querySelector('.product-img img').src;

        const existingProduct = { 
            id: productId, 
            name: productName, 
            description: productDescription, 
            price: productPrice, 
            image: productImage,
        };
        products.push(existingProduct); // Adding existing products to the products array
    });
}

function renderProducts() {
    const productSection = document.getElementById('productSection');
    productSection.innerHTML = '';

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    for (let i = startIndex; i < endIndex && i < filteredProducts.length; i++) {
        const product = filteredProducts[i];
        const productElement = createProductElement(product);
        productSection.appendChild(productElement);
    }
}


document.getElementById('productSection').addEventListener('click', function (event) {
    // Check if the clicked element has the class "delete-product"
    if (event.target.classList.contains('delete-product')) {
        // Get the parent product element
        const productElement = event.target.closest('.product');
        
        // Get the product id
        const productId = productElement.id;

        // Remove the product from the HTML
        productElement.remove();

        // Remove the product from the array
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
        }

        // Update the filtered products, products, and pagination
        updateFilteredProducts();
        renderFilterOptions();
        renderPagination();
    }
});



// ------- Creating New Products ----------------

let img = "";
function updateImage(selectedOption) {
// Use a switch statement to determine the image source based on the selected option
switch (selectedOption) {
    case "CPU":
        img = "../Images/CPU_I7.jpg";
        break;
    case "GPU":
        img = "../Images/GPU.jpg";
        break;
    case "Rams":
        img = "../Images/RAMs.jpg";
        break;
    case "MotherBoard":
        img = "../Images/MotherBoard.jpg";
        break;
    case "PowerSupply":
        img = "../Images/PowerSupply.jpg";
        break;
    default:
        img = ""; // Set a default image or an empty string if no match
}
}

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.id = product.id;

    productElement.innerHTML = `
        <div class="product-img">
            <img src="${product.image}">
        </div>
        <div class="product-info">
            <h3 class="product-head">${product.name}</h3>
            <p class="product-des">${product.description}</p>
            <span class="product-price">${product.price}$</span>
            <button class="btn addToCartBtn">Add to the cart</button>
        </div>
        <span class="btn delete-product">DELETE</span>`;
    return productElement;
}

function addProduct() {
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productDescriptionInput = document.getElementById('productDescription');
    const productPriceInput = document.getElementById('productPrice');

    const productId = productIdInput.value;
    const productName = productNameInput.value;
    const productDescription = productDescriptionInput.value;
    const productPrice = parseFloat(productPriceInput.value);

    const requiredFields = [productIdInput, productNameInput, productPriceInput, productDescriptionInput];

    // Validate that the price is a multiple of 10
    const isValidPrice = !isNaN(productPrice) && productPrice % 10 === 0 && productPrice >= 0;

    if (productId !== "none" && productId.trim() !== "" && productName && productDescription && isValidPrice) {
        // Update the image based on the product ID
        updateImage(productId);

        // Update the maximum price if needed
        updateMaxPrice(productPrice);

        // Create the new product
        const newProduct = { id: productId, name: productName, description: productDescription, price: productPrice, image: img };
        products.push(newProduct);

        // Update filtered products, render, and reset form
        renderProducts();
        updateFilteredProducts();
        renderFilterOptions();
        renderPagination();
        resetForm();
        highlightCurrentPage();
        addProductSection.classList.remove("active");
    } else {
        outLine(requiredFields);
        // Add an error message for invalid price format
        if (!isValidPrice) {
            alert("Please enter a valid price, which is a multiple of 10.");
        }
    }
}

function outLine(requiredFields) {
    // Remove red outline from all inputs
    requiredFields.forEach(field => {
        field.style.borderColor = '';
    });
    
    // Add red outline to required empty fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) { // trim is used to check if there's white spaces without words or letters like that "   " 
            field.style.borderColor = 'red';
        } else if (addProId.value === "none") {
            addProId.style.borderColor = "red";
        }
        });
}

function resetForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
}



// --------  Filter Section ------------------

function renderFilterOptions() {
    const filterProductSelect = document.getElementById('filterProduct');
    const addSelector = document.querySelector("#productId");

    // Clear existing options
    filterProductSelect.innerHTML = '<option value="none">Show All</option>';
    addSelector.innerHTML = '<option value="none"></option>';

    if (products.length > 0) {
        const productIds = new Set(products.map(product => product.id));

        productIds.forEach(productId => {
            const option = document.createElement('option');
            option.value = productId;
            option.textContent = productId;
            filterProductSelect.appendChild(option);
        });

        // Clone options for the addSelector
        for (let i = 1; i < filterProductSelect.options.length; i++) {
            let option = filterProductSelect.options[i].cloneNode(true);
            addSelector.appendChild(option);
        }

        // Set the initial maximum price on the scale to the maximum among existing products
        const maxPriceInput = document.getElementById('maxPrice');
        const maxPriceLabel = document.getElementById('maxPriceLabel');
        const maxPrice = Math.max(...products.map(product => product.price));
        maxPriceInput.max = maxPrice;
        maxPriceInput.value = maxPrice;
        maxPriceLabel.textContent = maxPrice;
    } else {
        // Handle the case where there are no products
        filterProductSelect.disabled = true; // Disable the filter selector
        addSelector.disabled = true; // Disable the add product selector
    }

    // Trigger change event on addSelector after appending options
    const event = new Event('change');
    addSelector.dispatchEvent(event);
}

// Initialize price inputs and labels
function initializePriceInputs() {
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const maxPriceLabel = document.getElementById('maxPriceLabel');

    // Calculate the maximum price among existing products
    const maxExistingPrice = Math.max(...products.map(product => product.price));

    // Set initial values for max price input and label
    maxPriceInput.max = maxExistingPrice;
    maxPriceInput.value = maxExistingPrice;
    maxPriceLabel.textContent = maxExistingPrice;
    maxPriceLabel.value = maxExistingPrice;

    // Set the minimum price input's min and max attributes
    minPriceInput.min = 0;
    minPriceInput.max = maxExistingPrice;

    // Add event listeners for price input changes
    minPriceInput.addEventListener('input', () => updatePriceLabel('min'));
    maxPriceInput.addEventListener('input', () => updatePriceLabel('max'));
    maxPriceInput.addEventListener('change', () => updateMaxPriceScale(parseFloat(maxPriceInput.value)));
}

// Update price labels based on input values
function updatePriceLabels() {
    const minPriceLabel = document.getElementById('minPriceLabel');
    const maxPriceLabel = document.getElementById('maxPriceLabel');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    // Update label texts with input values
    minPriceLabel.textContent = minPriceInput.value;
    minPriceLabel.value = minPriceInput.value;
    maxPriceLabel.textContent = maxPriceInput.value;
}

// Update a specific price label (min or max) based on input value
function updatePriceLabel(type) {
    const priceLabel = document.getElementById(`${type}PriceLabel`);
    const priceInput = document.getElementById(`${type}Price`);

    // Update label text with input value
    priceLabel.textContent = priceInput.value;
    priceLabel.value = priceInput.value;

    // Update filtered products based on label change
    updateFilteredProducts();
}

// Update the maximum price scale and label based on a new product price
function updateMaxPriceScale(newProductPrice) {
    const maxPriceInput = document.getElementById('maxPrice');
    const maxPriceLabel = document.getElementById('maxPriceLabel');

    // Update max price input and label with new value
    maxPriceInput.value = newProductPrice;
    maxPriceLabel.textContent = newProductPrice;

    // Trigger input event to update filtered products
    maxPriceInput.dispatchEvent(new Event('input'));
}

// Update the maximum price and label if the new product price is higher
function updateMaxPrice(productPrice) {
    const maxPriceInput = document.getElementById('maxPrice');
    const currentMaxPrice = parseFloat(maxPriceInput.max);

    // Update only if the new price is higher than the current maximum
    if (isNaN(currentMaxPrice) || productPrice > currentMaxPrice) {
        maxPriceInput.max = productPrice;
        maxPriceInput.value = productPrice; // Set current value to new max value
        document.getElementById('maxPriceLabel').textContent = productPrice;
        document.getElementById('maxPriceLabel').value = productPrice;

        // Update minimum price scale maximum value
        document.getElementById('minPrice').max = productPrice;

        // Update filtered products based on price change
        updateFilteredProducts();
    }
}

// Update the filtered products based on selected ID and price range filters
function updateFilteredProducts() {
    const filterProductSelect = document.getElementById('filterProduct');
    const selectedProductId = filterProductSelect.value;
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    // Get numeric values from price inputs
    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);

    // Clear the existing filtered products
    filteredProducts = [];

    // Filter products based on ID and price range
    filteredProducts = products.filter(product => {
        const matchId = selectedProductId === 'none' || product.id === selectedProductId;
        const matchMinPrice = isNaN(minPrice) || product.price >= minPrice;
        const matchMaxPrice = isNaN(maxPrice) || product.price <= maxPrice;

        return matchId && matchMinPrice && matchMaxPrice;
    });

    // Render updated products based on filters
    currentPage = 1;
    renderProducts();
    renderPagination();
    highlightCurrentPage();
}

// update price ranges based on input's value
function updatePriceRange() {
    var maxPriceLabel = document.getElementById("maxPriceLabel")
    maxPriceLabel.addEventListener("input", () => {
        document.getElementById(`maxPrice`).value = maxPriceLabel.value; 
        maxPriceLabel.textContent = maxPriceLabel.value
        updateFilteredProducts();
    })

    var minPriceLabel = document.getElementById("minPriceLabel")
    minPriceLabel.addEventListener("input", () => {
        document.getElementById(`minPrice`).value = minPriceLabel.value; 
        minPriceLabel.textContent = minPriceLabel.value
        updateFilteredProducts();
    })
}

// display / hide filter section on small-medium screens
function FilterFunctions() {
    const filter = document.querySelector('.filter');
    const filterOpen = document.querySelector('.filter-open');
    const filterDelete = document.querySelector('#filter-delete');


    // Show/hide the filter with animation when the open button is clicked
    filterOpen.onclick = (e) => {
        e.stopPropagation(); // Prevent the event from propagating
        filter.classList.toggle('animation');
    };

    // Hide the filter and remove the animation class when the delete button is clicked
    filterDelete.onclick = (e) => {
        e.stopPropagation(); // Prevent the event from propagating
        filter.classList.remove('animation');
    };

    // Hide the filter and remove the animation class when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!filter.contains(e.target) && filter.classList.contains('animation')) {
            filter.classList.remove('animation');
        }
    });

    // Prevent the filter from closing when clicking inside it
    filter.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}
FilterFunctions()

// ---------- pagination ----------

let next = document.querySelector('.next');
let prev = document.querySelector('.previous');

function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    // Check if filteredProducts is not empty before accessing its length
    if (filteredProducts.length > 0) {
        for (let i = 1; i <= totalPages; i++) {
            const liElement = document.createElement('li');
            liElement.textContent = i;
            liElement.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
                renderPagination();
                highlightCurrentPage();
            });
            paginationElement.appendChild(liElement);
        }
    }
}

next.onclick = () => {
    if (next.classList.contains("disabled")) {
        return false
    } else {
        currentPage ++
        renderProducts()
    }
    highlightCurrentPage()
}

prev.onclick = () => {
    if (prev.classList.contains("disabled")) {
        return false
    } else {
        currentPage --
        renderProducts()
    }
    highlightCurrentPage()
}

function highlightCurrentPage() {
    let paginationElement = document.getElementById('pagination');
    
    // Check if paginationElement exists
    if (paginationElement) {
        let liElements = paginationElement.getElementsByTagName('li');
    
        // Remove the bullet class from all pagination li elements
        for (let i = 0; i < liElements.length; i++) {
            liElements[i].classList.remove('bullet');
        }
    
        // Check if pagination elements exist
        if (liElements.length > 0 && currentPage >= 1 && currentPage <= liElements.length) {
            // Add the bullet class to the current page's li element
            liElements[currentPage - 1].classList.add('bullet');
        }
    
        // Check if prev and next elements exist before using them
        if (prev && next) {
            if (currentPage === 1) {
                prev.classList.add('disabled');
            } else {
                prev.classList.remove('disabled');
            }
    
            if (currentPage === liElements.length) {
                next.classList.add('disabled');
            } else {
                next.classList.remove('disabled');
            }
        }
    }
}

// ----------------------------------------------------------------

