# Shopping cart hook - Challenge

The main objective is to create a shopping cart hook. Have access to two pages, a component and a hook to implement the requested features in this challenge:

- [x] Fetch API products and format the price;
- [x] Render all Products from the API;
- [x] Add a new product to the cart;
- [x] Remove a product from the cart;
- [x] Store the cart in the localStorage;
- [x] Show the number of different products added to the cart;
- [ ] Calculate the quantity of each product in the cart;
- [ ] Change the quantity of a product in the cart;
- [ ] Calculation of sub-total and total cart prices;
- [ ] Stock validation;
- [ ] Display of error messages;

## What should I edit in the application?

The documents that must be edited are:

### src/components/Header/index.tsx
You must receive the **cart** array from the **useCart** hook and show on screen the number of different products added to the cart. This way, if the cart has 4 units of item A and 1 unit of item B, the value to be shown is **2 items**.

### src/pages/Home/index.tsx
- Render the products fetched from the mock API
- Implement the functionality of adding the chosen product to the cart by clicking on the **ADD TO CART** button.
- Implement the functions:
  - `cartItemsAmount`
  - `loadProducts`
  - `handleAddProduct`

### src/pages/Cart/index.tsx
Render a table with the image, title, unit price, quantity of units and subtotal price of each product in the cart, and render cart total price.
- Implement the functions:
  - **cartFormatted:** format the cart by adding the fields `priceFormatted` (product price) and `subTotal` (product price multiplied by quantity), both properly formatted with `utils/format`.
  - **total:** the total value of the cart duly formatted with `utils/format`.
  - **handleProductIncrement:** Increment the selected product by 1.
  - **handleProductDecrement:** Decrement the selected product by 1, where the minimum value is 1 (in this case the button must be deactivated).
  - **handleRemoveProduct:** Must remove the selected product.

### src/hooks/useCart.tsx

Responsible for:

- hook `useCart`;
- context `CartProvider`;
- manipulate `localStorage`;
- display `toasts`.
<hr />

Implement the functions:
  - **cart**: check if there is any record with the value `@RocketShoes:cart` and return this value if it exists. Otherwise, return an empty array.
  - **addProduct:** You must add a product to the cart. However, you need to check a few things:
     - The updated value of the cart must be perpetuated in **localStorage** using the `setItem` method.
     - If the product already exists in the cart, you should not add a new repeated product, just increase the quantity by 1 unit;
     - Check if the desired quantity of the product is in stock. Otherwise, use the `error` method of **react-toastify** with the following message:
```jsx
     toast.error('Quantidade solicitada fora de estoque');
```
- Capture using `trycatch` the errors that occur throughout the method and, in catch, use the `error` method of **react-toastify** with the following message:

``` jsx
toast.error('Erro na adição do produto');
```

- **removeProduct:** You must remove a product from the cart. However, you need to check a few things:
     - The updated value of the cart must be perpetuated in **localStorage** using the `setItem` method.
     - Capture using `trycatch` the errors that occur throughout the method and, in catch, use the `error` method of **react-toastify** with the following message:
    
     ``` jsx
    toast.error('Erro na remoção do produto');
     ```
    
- **updateProductAmount:** You must update the quantity of a product in the cart. However, you need to check a few things:
     - The updated value of the cart must be perpetuated in **localStorage** using the `setItem` method.
     - If the product quantity is less than or equal to zero, exit the **updateProductAmount** function instantly.
     - Check if the desired quantity of the product is in stock. Otherwise, use the `error` method of **react-toastify** with the following message:
    
     ``` jsx
    toast.error('Quantidade solicitada fora de estoque');
     ```
    
     - Capture using `trycatch` the errors that occur throughout the method and, in catch, use the `error` method of **react-toastify** with the following message:

``` jsx
     toast.error('Erro na alteração de quantidade do produto');
```