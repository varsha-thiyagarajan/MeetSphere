# 🎯 MeetSphere – Event Management & Registration Platform

MeetSphere is a full-stack web application designed to simplify the process of discovering, creating, and registering for events across multiple domains such as Technical, Cultural, Music, Sports, and Business.

---

## 🚀 Features

* 📂 **Multi-Category Events**
  Browse events across Technical, Cultural, Music, Sports, and Business categories.

* 📝 **Easy Event Registration**
  Quick and simple registration with real-time seat updates.

* 📊 **Dynamic Event Listing**
  Events are fetched from the backend and displayed dynamically.

* 📱 **Responsive Design**
  Works seamlessly across mobile, tablet, and desktop devices.

* 🔐 **Secure Data Handling**
  Backend validation ensures safe and reliable data processing.

* ⚡ **Smooth User Experience**
  Clean UI with fast navigation and minimal steps.

---

## 🏗️ Tech Stack

### 💻 Frontend

* HTML
* CSS
* JavaScript
* Bootstrap

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB

---

## 📌 Project Structure

```
MeetSphere/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── categories/
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── controllers/
│
└── README.md
```

---

## 🔄 Workflow

### 🔹 Event Registration Flow

1. User opens MeetSphere
2. Browses event categories
3. Selects an event
4. Views event details
5. Clicks register
6. Backend validates data
7. Registration saved in MongoDB
8. Seat count updated
9. Success message displayed

### 🔹 Event Creation Flow

1. Organizer logs in
2. Opens "Host Event" page
3. Fills event details
4. Frontend validation
5. Data sent to backend
6. Backend processes request
7. Event stored in database
8. Confirmation sent
9. Event displayed on platform

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/varsha-thiyagarajan/MeetSphere.git

cd meetsphere
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Run the Server

```
npm run dev
```

---

## 🌐 API Endpoint

```
GET /api/events → Fetch all events
POST /api/events → Create new event
POST /api/register → Register for event
```

---

## 🔮 Future Enhancements

* 🔐 User Authentication (Login/Signup)
* 💳 Payment Integration
* 🤖 AI-Based Event Recommendations
* 📩 Email/SMS Notifications
* 📱 Mobile Application

---

## 🤔 Why MeetSphere?

Unlike generic platforms, MeetSphere is designed specifically for **college and community events**, providing:

* Centralized event discovery
* Simple workflows
* Real-time updates
* Scalable architecture

---

## 👩‍💻 Author

**Varsha**
B.Tech AIML Student
SRET, Chennai

---

## 📜 License

This project is for educational purposes.
