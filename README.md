# Task Management App - Front-End  

This project is built using **Angular 19** and requires **Node.js v20** to run. Follow the steps below to set up and run the application.

## Prerequisites  

Make sure you have the following installed on your system:  

- **Node.js v20** (Download from [nodejs.org](https://nodejs.org/))  
- **Angular CLI** (Install globally if not already installed)  

  ```bash
  npm install -g @angular/cli
  ```

## Setup Instructions  

Follow these steps to get the project running:  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Ravindra-Developer/frontend.git
   cd frontend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the application**  
   ```bash
   ng s -o
   ```
   This will start the Angular development server and automatically open the project in the browser.

---

### 📌 Additional Notes  
- If you face any issues with dependencies, try deleting \`node_modules\` and \`package-lock.json\`, then reinstall:  
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- If \`ng\` is not recognized, check if Angular CLI is installed using:  
  ```bash
  ng version
  ```
  If not, install it globally using the command mentioned in **Prerequisites**.

Happy Coding! 🚀