
# Marina Booking Frontend

This is the React frontend for the Marina Slot Booking system. It connects to the backend API to allow users to register, login, book slots, review pricing, and confirm reservations.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### 📦 Installation

1. Navigate to the project directory:

```bash
cd marina_booking_frontend_complete
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/` by default.

## 📂 Project Structure

- `src/pages/`: Contains page components like Login, Register, Booking, etc.
- `App.jsx`: Main routing logic using React Router
- `index.html`: Entry point HTML file
- `index.css`: TailwindCSS configuration

## 🌐 Pages Overview

- `/login`: User login
- `/register`: User registration
- `/booking`: Select booking dates
- `/slots`: Choose a slot from available options
- `/pricing`: Review pricing summary
- `/confirmation`: Final confirmation screen

## 🧰 Built With

- React
- Vite
- Tailwind CSS
- React Router

## 📄 Notes

Make sure the backend is running at the appropriate port (default: `http://localhost:5000`). Update `axios` base URLs in frontend if needed for backend integration.

