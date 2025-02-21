# 🎯 Interactive Quiz Platform

A dynamic React-based quiz application that supports multiple-choice and numerical questions with real-time feedback and progress tracking.

## ✨ Features

### Multiple Question Types
- 📝 Multiple choice questions with instant feedback
- 🔢 Numerical input questions for math and data-based answers
- 🔄 Dynamic question rendering based on type

### Real-Time Feedback
- ⚡ Instant feedback on answer submission
- ✅ Visual indicators for correct/incorrect answers
- ⏲️ Timer countdown for each question (30 seconds)

### Progress Tracking
- 📊 Question counter (current/total)
- 📈 Score tracking and final results
- 📜 Recent attempts history (last 3 attempts)
- 💾 Persistent attempt history using IndexedDB

### User Interface
- 🎨 Clean, responsive design
- 🔵 Accessible button and input controls
- 💫 Visual feedback for user interactions
- 📱 Progress indicators and timers

### Quiz Management
- 🔄 Automatic progression between questions
- 🔁 Quiz restart functionality
- 🏆 Final score calculation and display
- ⏱️ Time limit enforcement

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shivam-0803/Quiz-app.git
cd Quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🛠️ Built With
- ⚛️ React
- 🎨 Tailwind CSS
- 💾 IndexedDB for local storage

## 📦 Project Structure
```
src/
├── components/
│   └── Quiz.jsx     # Main quiz component
├── Data.jsx         # Quiz questions data
├── utils/
│   └── Db.js       # IndexedDB utilities
└── App.jsx         # Root component
```

## 🎮 Usage

1. Start the quiz by viewing the first question
2. Select an answer for multiple choice questions or enter a number for numerical questions
3. Receive instant feedback on your answer
4. Complete all questions within the time limit
5. View your final score and attempt history
6. Restart the quiz to try again

## 📝 Adding New Questions

Add new questions to `src/Data.jsx` following this format:

```javascript
{
  id: number,
  type: "multiple-choice" | "integer",
  question: string,
  options?: string[],  // Required for multiple-choice questions
  answer: string | number
}
```

## 🔗 Live Demo

Try the application here: [Quiz Platform Demo]https://quizx-app.netlify.app/

## 📱 Responsive Design

The application is fully responsive and works on:
- 💻 Desktop browsers
- 📱 Tablets
- 📱 Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Authors

- [Your Name](https://github.com/Shivam-0803)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern quiz platforms
- Built with React and modern web technologies

## 🐛 Known Issues

- ⏰ Timer continues running when browser tab is inactive
- 🌐 Safari browsers may have inconsistent IndexedDB behavior

## 🔜 Future Improvements

- 🔐 Add user authentication
- 📚 Implement different quiz categories
- 🏆 Add a leaderboard system
- 🖼️ Support for image-based questions
- 🔊 Add sound effects for feedback
- 📊 Export results functionality

For bug reports and feature requests, please [open an issue](https://github.com/Shivam-0803/Quiz-app/issues)