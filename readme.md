#Name- Swati Shrimant Kamble
 #Matriculation-number- 2258214
 
📊 Data Analysis & Visualization React Component
Interactive web-based component for analyzing and visualizing datasets.

🚀 Overview
This project is a reusable React.js component for interactive data analysis and visualization in a web browser. It enables users to load, analyze, and visualize datasets using Naive Bayes classification.

🛠 Features
✅ Load, validate, and analyze datasets asynchronously
✅ Perform Naive Bayes classification (splitting data 70/30 for training & testing)
✅ Generate radar and parallel coordinates plots for up to 20 independent variables
✅ Display a progress spinner while loading data
✅ Handle errors gracefully
✅ Fully documented with JSDoc
✅ Works on GNU/Linux with provided Bash commands
✅ Uses Vite for fast development

🏗 Installation
1️⃣ Clone the Repository
git clone git@github.com:Swati-Kamble28/Data_Mining.git
cd data-analysis-component

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev

📊 Usage
✅ Import the Component
import NaiveBayesScatterPlot from "./components/NaiveBayesScatterPlot";

✅ Use in Your App
<NaiveBayesScatterPlot data={yourDataset} />

📦 Build for Production
npm run build

🔍 Project Structure
data-analysis-component/
│── dist/                     # Production build files
│── public/                   # Static assets
│── src/
│   ├── components/           # Reusable UI components
│   │   ├── NaiveBayesScatterPlot.jsx
│   ├── utils/                # Utility functions
│   │   ├── visualization.js
│   ├── App.jsx               # Main React component
│   ├── main.jsx              # Entry point
│── package.json              # Project dependencies
│── vite.config.js            # Vite configuration
│── README.md                 # Documentation 

🤝 Contributing
Contributions are welcome! If you’d like to improve the project, feel free to:
Fork the repository
Create a new branch
Make changes and test them
Submit a pull request


🛠 Technologies Used
React.js (for UI)
D3.js (for data visualization)
Vite (for fast builds)
MUI (Material-UI) (for styling)
ESLint (for code quality)
