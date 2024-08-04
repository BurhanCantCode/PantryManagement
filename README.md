# Pantry Manager

Welcome to **Pantry Manager**! This application helps you efficiently manage your pantry, reduce waste, and ensure you never run out of essentials. With features like product scanning, inventory management, and user authentication, Pantry Manager is your go-to solution for keeping track of your pantry items.

![Pantry Manager](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjNwcTQ5MThxc3pvejZncHh6a3VucnFmMjA0N2J6dnlmbDcwejVxdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qBsOjMOcdeGJIU8/giphy.gif)

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



### Viewing Inventory

1. Navigate to the "Inventory" page.
2. View the list of products, update quantities, or delete items.



### User Authentication

1. Sign up for a new account or sign in with existing credentials.
2. Reset your password if needed.

![User Authentication](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHB4MmQ2NjFndHViaG5uMWNmNHdwdm9sNXo5aTF0Y3Q4cTg3ZW8yMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FnGJfc18tDDHy/giphy.gif)

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
