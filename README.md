# 🖥️ RimaOS

**RimaOS** is a personal web-based operating system built with **HTML, CSS, and JavaScript**.

What started as a learning project evolved into a small desktop environment with its own windows, applications, dock, settings, terminal, calculator, notes app, and a custom robotics quiz.

---

## ✨ Features

### 🖥️ Desktop

* Custom desktop interface
* Desktop application icons
* Automatic icon rows
* Custom wallpapers
* Application dock
* System status bar
* Live clock
* 12-hour and 24-hour time formats

### 🪟 Window Manager

* Open applications in windows
* Drag windows around the desktop
* Minimize windows
* Maximize windows
* Close windows
* Window focus and layering
* Dynamic application loading
* Automatic dock behavior
* Automatic status-bar behavior

### ⚙️ Settings

The Settings application allows users to customize parts of RimaOS, including:

* Wallpaper
* Accent color
* Terminal text color
* Terminal theme
* Time format
* RimaOS information

### 💻 Terminal

RimaOS includes a custom terminal inspired by real command-line interfaces.

Features include:

* Command input
* Command output
* Automatic scrolling
* RimaOS startup information
* Terminal-style interface
* Commands for interacting with RimaOS applications
* Ability to open applications from the terminal

### 🧮 Calculator

A functional calculator supporting:

* Addition
* Subtraction
* Multiplication
* Division
* Decimal numbers
* Clear
* Expression evaluation

### 📝 Notes

A simple notes application integrated into the RimaOS window system.

### 🤖 Robotics Quiz

The Robotics Quiz is RimaOS's special custom application.

It includes:

* Introduction screen
* Multiple-choice questions
* Four answers per question
* Correct/wrong feedback
* Explanations
* Score tracking
* Final score
* Robotics skill levels
* Restart functionality

The quiz covers robotics concepts including:

* Sensors
* Actuators
* Ultrasonic sensors
* PWM
* MPU6050
* I2C
* Encoders
* PID control
* ROS 2
* SLAM

---

## 🛠️ Technologies

RimaOS was built using:

* **HTML5** — structure of the desktop and applications
* **CSS3** — styling, layouts, animations, and visual design
* **JavaScript** — application logic and the RimaOS system
* **DOM Manipulation** — JavaScript creates, modifies, and removes elements while RimaOS is running
* **Fetch API** — used to request application files from the server
* **Dynamic App Loading** — applications are loaded when the user opens them
* **Git & GitHub** — version control and project hosting

---

## 📁 Project Structure

```text
RimaOS/
│
├── index.html
├── style.css
├── script.js
│
├── apps/
│   │
│   ├── calculator/
│   │   ├── calculator.html
│   │   ├── calculator.css
│   │   └── calculator.js
│   │
│   ├── notes/
│   │   ├── notes.html
│   │   ├── notes.css
│   │   └── notes.js
│   │
│   ├── settings/
│   │   ├── settings.html
│   │   ├── settings.css
│   │   └── settings.js
│   │
│   ├── terminal/
│   │   ├── terminal.html
│   │   ├── terminal.css
│   │   └── terminal.js
│   │
│   └── roboticsQuiz/
│       ├── roboticsQuiz.html
│       ├── roboticsQuiz.css
│       └── roboticsQuiz.js
│
├── assets/
│   ├── wallpaper.jpg
│   └── logo.png
│
├── icons/
│   ├── calculator.png
│   └── notes.png
│
└── README.md
```

> The exact wallpaper filenames can be changed in the structure above to match the files in the repository.

---

## 🚀 Running RimaOS Locally

Because RimaOS dynamically loads application files using the Fetch API, it should be run through a local web server.

### Using Python

```bash
python -m http.server
```

Then open:

```text
http://127.0.0.1:8000
```

### Using VS Code

RimaOS can also be run using the **Live Server** extension in VS Code.

---

## 🌐 Deployment

RimaOS is designed to work as a static website and can be deployed using **GitHub Pages**.

The current version does not require a backend server.

After deployment, RimaOS can be accessed through a public URL such as:

```text
https://YOUR-USERNAME.github.io/RimaOS/
```

All application files, assets, HTML, CSS, and JavaScript are stored inside the repository.

---

## 🧠 How RimaOS Loads Applications

RimaOS uses a central application manager.

When an application is opened, JavaScript requests its HTML file:

```javascript
fetch(`apps/${appName}/${appName}.html`)
```

The application HTML is then inserted into a new RimaOS window.

RimaOS also dynamically loads the application's CSS and JavaScript.

This allows every application to have its own:

```text
HTML
CSS
JavaScript
```

while still running inside the same RimaOS desktop.

---

## 🎯 Why I Built RimaOS

RimaOS was created to explore how a website can behave more like a real operating system.

Instead of creating a traditional website with separate pages, I wanted to build an interactive desktop where applications open inside windows and work together inside the same environment.

The project helped me learn:

* JavaScript event handling
* DOM manipulation
* Dynamic HTML loading
* CSS layouts
* CSS animations
* Window management
* Application architecture
* Debugging
* File organization
* Git and GitHub
* Building interactive interfaces

---

## 🤖 The Robotics Quiz

The Robotics Quiz represents one of my biggest interests: **robotics**.

Instead of creating a generic application, I wanted RimaOS to contain something connected to what I actually enjoy learning.

The idea is simple:

> **Are you good enough at robotics?**

Users answer robotics questions, receive immediate feedback, learn from explanations, and receive a final robotics level based on their score.

---

## 📚 Learning Journey

RimaOS was developed as part of a personalOS-style learning journey.

The learning material provided the initial foundation, but the project was customized and expanded with my own ideas, applications, design choices, and features.

The goal was not only to follow instructions, but to understand how the system worked and eventually make it my own.

---

## 🔮 Future Possibilities

RimaOS v1.0 is considered complete.

Possible future versions could include:

* File manager
* Music player
* More terminal commands
* More advanced settings
* App installation system
* Persistent user data
* More robotics quiz questions
* Difficulty levels
* High-score system
* Additional custom applications

These features are intentionally left for future versions.

---

## 🏁 Version

**RimaOS v1.0**

**Status: Complete ✅**

Built with HTML, CSS, JavaScript, robotics, and a lot of debugging.

---

## 👩‍💻 Author

**Rima Belhadj**

Robotics • Programming • Technology • Engineering
