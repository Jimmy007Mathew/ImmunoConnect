
# ImmunoConnect 🛡️  
A comprehensive immunization management platform for families and healthcare providers.  
Built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 🌟 Project Overview
**ImmunoConnect** is a full-stack web application that simplifies vaccination tracking, provides personalized vaccine schedules, and helps healthcare providers verify vaccination statuses. It also educates parents about the importance of immunizations with easy-to-understand resources.

---

## 🚀 Features
- User Registration and Secure Login (Parents, Healthcare Providers, Admins)
- Add Child Profiles and Manage Vaccination Schedules
- Real-Time Email Notifications for Upcoming Vaccinations
- Hospital Login for Vaccine Verification
- Admin Panel to Approve and Verify Healthcare Centers
- Educational Module about Vaccines and Immunization Awareness
- Responsive Design: Optimized for both mobile and desktop devices
- Authentication using **bcrypt** and **JWT**
- RESTful APIs for smooth frontend-backend communication

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (Atlas)

**APIs and Utilities:**
- Google Maps API (Healthcare center location services)
- Gemini Flash API (for educational chatbot module)
- Nodemailer (for sending vaccination reminders)

**Authentication:**
- JWT and bcrypt for secure login and password encryption

---

## 🧩 Key Modules

- **Landing Page** - Public information about ImmunoConnect
- **User Dashboard** - Manage child profiles and vaccination statuses
- **Healthcare Provider Portal** - Verify vaccination records
- **Admin Dashboard** - Approve hospitals and manage users
- **Educational Hub** - Vaccine info, FAQs, and awareness resources
- **Quiz Module** - Interactive quizzes for learning about vaccines

---

## 🗄️ Database Structure

| Collection         | Description                        |
|---------------------|------------------------------------|
| `users`             | Stores user credentials and roles |
| `children`          | Stores child vaccination records  |
| `vaccination_records` | Tracks vaccine name, date, status |
| `healthcare_providers` | Hospital/clinic details          |
| `notifications`     | Email reminders and alerts         |

---

## 🔥 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Jimmy007Mathew/immunoconnect.git
cd immunoconnect
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd backend
npm install
npm run server
```

4. **Environment Variables**

Create a `.env` file in the `/backend` folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## 🚀 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com/)
- **Backend** deployed on [Koyeb](https://koyeb.com/)
- Manual CI/CD with GitHub Actions

---

## 🛡️ Security Features
- End-to-end SSL encryption
- Passwords stored securely with bcrypt
- Role-Based Access Control (RBAC)
- GDPR-Compliant Data Handling

---

## 📈 Future Enhancements
- Offline support for low-connectivity areas
- Multilingual support
- AI-powered personalized vaccine recommendations
- Blockchain-based vaccination certificate storage
- Government collaboration for wider adoption

---

## 🤝 Contributing

We welcome contributions!  
Please create a pull request or raise an issue to discuss potential changes.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## 📚 References
- [1] WHO, *Immunization Agenda 2030*, World Health Organization, 2020, [URL](https://www.who.int/initiatives/immunization-agenda-2030)
- [2] CDC, *Vaccine Schedules*, Centers for Disease Control and Prevention, [URL](https://www.cdc.gov/vaccines/schedules/)
- [3] Google Maps API Documentation, Google, [URL](https://developers.google.com/maps/documentation)
- [4] Gemini API Documentation, Google, [URL](https://ai.google.dev/gemini-api)

---

Would you also like me to prepare a **badge section** (e.g., `build passing`, `license`, `made with love` badges) to make it even cooler? 🚀✨  
If yes, just say!
