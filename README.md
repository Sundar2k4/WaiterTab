# 🍽️ WaiterTab

WaiterTab is a modern web application built using the MERN stack (MongoDB, Express.js, React, Node.js) that simplifies the restaurant experience. Customers can view the à la carte menu, place orders, and generate a bill — all in a smooth, user-friendly interface.

---

## 🚀 Features

- View a dynamic à la carte menu
- Add and remove dishes with quantity controls
- Instantly calculate and view the bill with tax
- Admin functionality to add and delete dishes
- Responsive design for all device sizes

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Render

---

## 📂 Project Structure

```
/client         → React frontend
/server         → Express backend
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/WaiterTab.git
cd WaiterTab
```

### 2. Setup Backend

```bash
cd server
npm install
node index.js
```

> Make sure MongoDB is running locally or update the connection string in `server/index.js`.

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

> Vite will start the app on `http://localhost:5173`

---

## 🔗 API Endpoints

- `GET /dash-get` – Fetch all dishes
- `POST /disher` – Add a new dish
- `DELETE /dish-delete/:id` – Delete a dish

---

## 🌐 Deployment

- **Frontend** deployed on: [Render](https://render.com/)
- **Backend** deployed on: [https://waitertab-server.onrender.com](https://waitertab-server.onrender.com)

> Ensure CORS and proxy configs are set properly for production.

---

## 📸 Screenshots

Coming soon...

---

## 👨‍🍳 Author

Made with ❤️ by [Sundar]

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
