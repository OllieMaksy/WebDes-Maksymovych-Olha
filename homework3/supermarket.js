document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".addSide input[type='text']");
    const addBtn = document.querySelector(".addButton");
    const addSide = document.querySelector(".addSide");
    const basket = document.querySelector(".basket");

    let products = [
        { name: "Помідори", quantity: 2, bought: true },
        { name: "Печиво", quantity: 2, bought: false },
        { name: "Сир", quantity: 1, bought: false }
    ];

    // функція оновлення виводу списку товарів
    function renderProducts() {
        // очищає старий список
        addSide.querySelectorAll(".product").forEach(el => el.remove());

        products.forEach((product, index) => {
            // створюємо контейнер продукту
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const nameSpan = document.createElement("span");
            nameSpan.classList.add("productName");
            if (product.bought) {
                nameSpan.innerHTML = `<s>${product.name}</s>`;
            } else {
                nameSpan.textContent = product.name;
                //можливість редагування по кліку
                nameSpan.addEventListener("click", () => {
                    const inputEdit = document.createElement("input");
                    inputEdit.type = "text";
                    inputEdit.value = product.name;
                    nameSpan.replaceWith(inputEdit);
                    inputEdit.focus();

                    inputEdit.addEventListener("blur", () => {
                        const newName = inputEdit.value.trim();
                        if (newName) {
                            product.name = newName;
                        }
                        inputEdit.replaceWith(nameSpan);
                        renderProducts();
                        renderStats();
                    });
                    inputEdit.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") inputEdit.blur();
                    });
                });
            }

            productDiv.appendChild(nameSpan);

            if (!product.bought) {
                const buttonsDiv = document.createElement("div");
                buttonsDiv.classList.add("buttons");

                const minusBtn = document.createElement("button");
                minusBtn.classList.add("minus");
                minusBtn.textContent = "−";
                minusBtn.disabled = product.quantity <= 1;
                minusBtn.title = "Зменшити кількість";
                minusBtn.addEventListener("click", () => {
                    if (product.quantity > 1) {
                        product.quantity--;
                        renderProducts();
                        renderStats();
                    }
                });


                const quantitySpan = document.createElement("span");
                quantitySpan.textContent = product.quantity;


                const plusBtn = document.createElement("button");
                plusBtn.classList.add("plus");
                plusBtn.textContent = "+";
                plusBtn.title = "Збільшити кількість";
                plusBtn.addEventListener("click", () => {
                    product.quantity++;
                    renderProducts();
                    renderStats();
                });


                const statusBtn = document.createElement("button");
                statusBtn.classList.add("status");
                statusBtn.textContent = "Куплено";
                statusBtn.title = "Позначити як куплене";
                statusBtn.addEventListener("click", () => {
                    product.bought = true;
                    renderProducts();
                    renderStats();
                });


                const removeBtn = document.createElement("button");
                removeBtn.classList.add("remove");
                removeBtn.textContent = "×";
                removeBtn.title = "Видалити товар";
                removeBtn.addEventListener("click", () => {
                    products.splice(index, 1);
                    renderProducts();
                    renderStats();
                });

                buttonsDiv.append(minusBtn, quantitySpan, plusBtn, statusBtn, removeBtn);
                productDiv.appendChild(buttonsDiv);
            } else {
                const statusBtn = document.createElement("button");
                statusBtn.classList.add("status");
                statusBtn.textContent = "Не куплено";
                statusBtn.title = "Зробити не купленим";
                statusBtn.addEventListener("click", () => {
                    product.bought = false;
                    renderProducts();
                    renderStats();
                });
                productDiv.appendChild(statusBtn);
            }

            addSide.appendChild(productDiv);
        });
    }


    function addProduct() {
        const newName = input.value.trim();
        if (!newName) return; // не додаємо пусті
        products.push({ name: newName, quantity: 1, bought: false });
        input.value = "";
        input.focus();
        renderProducts();
        renderStats();
    }

    addBtn.addEventListener("click", addProduct);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addProduct();
    });

    // оновлення статистики
    function renderStats() {
        const basketDivs = basket.querySelectorAll(".tags");
        const [toBuyDiv, boughtDiv] = basketDivs;

        // Очистка
        toBuyDiv.innerHTML = "";
        boughtDiv.innerHTML = "";

        products.forEach(prod => {
            const span = document.createElement("span");
            const text = `${prod.name} ${prod.quantity}`;
            if (prod.bought) {
                span.innerHTML = `<s>${text}</s>`;
                boughtDiv.appendChild(span);
            } else {
                span.textContent = text;
                toBuyDiv.appendChild(span);
            }
        });
    }

    renderProducts(); // "оновлює сайт" та малює список товарів
    renderStats();//оновлює праву частину
});
