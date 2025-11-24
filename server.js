
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); 
mongoose
  .connect("mongodb://127.0.0.1:27017/MeetSphere", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  mode: String,
  startDate: String,
  endDate: String,
  location: String, 
  availableSeats: Number,
  deadline: String,
  entryType: String,
  price: Number,
  organizerName: String,
  organizerEmail: String,
  website: String,
  createdAt: { type: Date, default: Date.now },
});
const Event = mongoose.model("Event", eventSchema);


const registrationSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});
const Registration = mongoose.model("Registration", registrationSchema);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/api/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    res.status(200).json({ message: "Login successful", email: user.email, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});
app.post("/api/register", async (req, res) => {
  try {
    const { eventId, name, email } = req.body;

    if (!eventId || !name || !email)
      return res.status(400).json({ message: "All fields are required" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.availableSeats <= 0)
      return res.status(400).json({ message: "No seats available" });

    const existing = await Registration.findOne({ eventId, email });
    if (existing) return res.status(400).json({ message: "Already registered" });

    event.availableSeats -= 1;
    await event.save();

    await Registration.create({ eventId, name, email });
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Registration Confirmed: ${event.title}`,
        text: `Hi ${name},\n\nYou have successfully registered for "${event.title}".\nDate: ${event.startDate}\nLocation: ${event.location}\nRemaining Seats: ${event.availableSeats}\n\n— MeetSphere Team`,
      });
    }

    res.status(200).json({ message: "Registration successful. Confirmation email sent if configured." });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});
app.post("/createEvent", async (req, res) => {
  try {
    const eventData = req.body;
    if (!eventData.availableSeats && eventData.availableSeats !== 0) {
      eventData.availableSeats = eventData.maxParticipants || 0;
    }
    const event = new Event(eventData);
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("❌ Create event error:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
});
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
