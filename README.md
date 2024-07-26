## Auction Kata - React Component

This project implements a simple auction component in React. It allows users to:

- Add bidders with names.
- Specify bids for each bidder (with validation to ensure at least one bid and a minimum amount of 1).
- Set a reserve price.
- Run the auction to determine the winning bidder and price.

### Premise

Consider a scenario involving a sealed-bid second-price auction, with the following conditions:

- An item is up for auction, with a set reserve price.
- There are multiple potential bidders, each capable of placing one or more bids.
- The winning bidder is determined as the one whose bid, equal to or higher than the reserve price, is the highest.
- Only one bidder can win the auction.
- The winning price is the highest bid placed by any non-winning bidder that is above the reserve price. If there's no such bid, the reserve price itself is the winning price.

### Example

Let's consider 5 potential buyers (A, B, C, D, E) who compete to acquire an object with a reserve price set at 100 euros, bidding as follows:

- A: 2 bids of 110 and 130 euros
- B: 0 bid
- C: 1 bid of 125 euros
- D: 3 bids of 105, 115 and 90 euros
- E: 3 bids of 132, 135 and 140 euros

The buyer E wins the auction at the price of 130 euros.

---

### Requirements

- Node.js
- npm
- npx

### Installation

1. Clone this repository.
2. Install dependencies:

---

```bash
npm install
```

3. Run the application:

---

```bash
npm start
```

4. CSS Processor

---

```bash
npx tailwindcss -i ./src/App.css -o ./src/output.css --watch
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Technologies Used

- React (TypeScript)
- Formik (for form handling)
- Yup (for form validation)
- Tailwind CSS (optional, for styling)

### GitHub Pages

[Demo](https://maarconte.github.io/auction-kata/)
[Github code](https://github.com/maarconte/auction-kata)
