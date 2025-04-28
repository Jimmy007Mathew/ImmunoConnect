

# ImmunoConnect 🛡️

A simple, user-friendly platform for tracking vaccinations, managing child immunization schedules, and helping healthcare providers verify vaccine records.

---

## 📋 Project Overview

**ImmunoConnect** is a web-based system where:
- **Parents** can register, add their children, and track vaccination status.
- **Hospitals** can log in to verify children's vaccination records.
- **Admins** can approve and verify healthcare centers.

It also sends **email notifications** for upcoming vaccinations and provides basic educational resources about vaccines.

---

## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Other:** Google Maps API, Nodemailer

---

## ⚙️ How to Setup and Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Jimmy007Mathew/immunoconnect.git
cd immunoconnect
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend
```bash
cd backend
npm install
npm run server
```

### 4. Environment Variables

Create a `.env` file inside the **backend** folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```


## 📚 Main Features
- Parent login and child vaccination tracking
- Healthcare provider login and record verification
- Admin dashboard for hospital approval
- Email notifications for upcoming vaccinations
- Educational information about vaccines
- Responsive design (Mobile + Desktop)

---

## 📜 License
This project is open-source under the **MIT License**.

