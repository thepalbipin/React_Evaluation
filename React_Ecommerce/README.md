# E-COMMERCE WEBSITE

## Pages

- Login Page
- Home Page
- Product Detail Page

## AuthContext

- The web application makes use of context API to manage authentication state.

- {
  isAuthenticated: false,
  token: null,
  email: null
  }

## Navbar

- When the user is authenticated/logged-in:

  - Display the logged-in user's email on the left side of the navbar.
  - Display a link to the Home Page on the right side.
  - Include a `LOGOUT` button beside the Home Page link that logs out the user and redirects to the login page when clicked.

- When the user is not authenticated/logged-out:

  - Display a link to the Login Page only.

- Login Page is a public route, while all other pages are private routes.

## Home Page

- As soon as the user visits the Home Page, it should make an API call using Axios to the products endpoint API Docs to get the list of products and then display that list of products as cards in a grid layout:

  - 3 cards per row for large screens and above
  - 2 cards per row for medium screens and above
  - 1 card per row for small screens

## ProductCard

- Each product card should display the `Title`, `Category`, and `Price`, and include a `More Details` button that redirects to the Product Details page. Include three select buttons for sorting and filtering products:

  - Sort by Price with options `Ascending` and `Descending`
  - Filter by Category with options `Men`, `Women`, `Kids`, and `Home Decor`

### `Bonus`: Ensure that even when the user refreshes the page, the products remain sorted and filtered correctly.

### `Bonus`: include proper loading indicators and error message components.

## Product Details Page

- page should display all the details of a single product.
- Display a visually appealing card containing all the details of the product. As soon as the page loads, retrieve the product id from the URL and make an API call to get the details of the product with that product id API Docs.
- Include an `Add to Cart` button that opens an Alert Dialog with the text "Are you sure you want to add this item to cart" and two buttons `Cancel` and `Confirm`.
- Clicking Cancel should close the Alert Dialog. Clicking `Confirm` should show a toast message with the text "Item added to cart" and close the Alert Dialog. The toast message should be visible for 2 seconds.

## Login Page

- An input box for email (focus should be on this input box as soon as the page loads).
- An input box for password.
- A login button that makes a POST request to the login API endpoint API Docs. If the request is successful, it will redirect to the Home Page. If the request is unsuccessful, it will display an error message. The successful response returns a `token`, which can be saved in the `AuthContext`. Maintain a context to keep track of `isLoggedIn`, `token`, and `email`.
