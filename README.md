# URL Shortener

## Project Description
A simple URL shortener application built with Node.js, Express, MySQL, and HTML/CSS/JavaScript. This app allows users to shorten URLs with an expiration option and delete shortened links. The application includes a basic frontend interface for ease of use.

## Features
- Shorten long URLs
- Set expiration times for shortened URLs (e.g., 1 minute, 5 minutes, 30 minutes)
- Delete shortened URLs with a single click
- Basic frontend using HTML, CSS, and JavaScript

## Technology Stack
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript

## Setup Instructions

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Erblin02/URL-shortener.git
Navigate to the project directory:
cd URL-shortener
Install backend dependencies:
npm install

Set up the MySQL database:

Open MySQL Workbench or another MySQL client and connect to your server.
Create a new database called url_shortener.
Run the following SQL command to create the necessary table:
CREATE TABLE urls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_url VARCHAR(2048) NOT NULL,
  short_code VARCHAR(10) NOT NULL,
  expiration_time DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Update database credentials if necessary in db.js and server.js files.

Start the server:

bash
Copy code
node server.js
The backend server will be running at http://localhost:3001.

Frontend Setup
Open index.html in your browser.
Alternatively, you can use a local server like Live Server in VS Code to run index.html.

Usage
Visit the app interface at http://localhost:3000.
Enter a URL to shorten it and choose an expiration time from the dropdown menu.
Click "Shorten URL" to generate a shortened URL, which will appear on the sidebar.
Use the "Delete" button next to each URL to remove it from the list.