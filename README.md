# Pantry Manager

Welcome to **Pantry Manager**! This application helps you efficiently manage your pantry, reduce waste, and ensure you never run out of essentials. With features like product scanning, inventory management, and user authentication, Pantry Manager is your go-to solution for keeping track of your pantry items.

![Pantry Manager](https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif)

## Features

- **Product Scanning**: Use your webcam or upload an image to automatically identify and add products to your inventory.
- **Inventory Management**: View, add, update, and delete products in your pantry.
- **User Authentication**: Secure sign-up, sign-in, and password reset functionalities.
- **Admin Dashboard**: View user statistics and manage the application.

## Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **UI Components**: Material-UI
- **Backend**: Firebase (Firestore, Authentication)
- **APIs**: Google Cloud Vision API, Google Generative AI
- **Styling**: CSS, Material-UI
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js
- Firebase account
- Google Cloud account

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pantry-manager.git
    cd pantry-manager
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Initialize the database with sample products:
    ```bash
    npm run init-db
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Adding a Product

1. Navigate to the "Add Product" page.
2. Use the webcam or upload an image to scan the product.
3. Confirm the product details and add it to your inventory.

![Add Product](https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif)

### Viewing Inventory

1. Navigate to the "Inventory" page.
2. View the list of products, update quantities, or delete items.

![View Inventory](https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif)

### User Authentication

1. Sign up for a new account or sign in with existing credentials.
2. Reset your password if needed.

![User Authentication](https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Material-UI](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [Google Cloud Vision API](https://cloud.google.com/vision)
- [Google Generative AI](https://cloud.google.com/generative-ai)

---

Happy managing your pantry! 🥫🍎🥖
