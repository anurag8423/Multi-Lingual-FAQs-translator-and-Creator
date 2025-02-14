# Multi-Lingual-FAQs-translator-and-Creator

## Technology Stack

- **Backend**:  
  - **Node.js**: JavaScript runtime for building the server
  - **Express.js**: Web framework for Node.js
  - **Mongoose**: MongoDB ODM for schema management and database interaction
  - **Redis**: In-memory caching for faster API responses
  - **Google Translate API**: For automatic translation of FAQs into multiple languages
- **Database**:  
  - **MongoDB**: NoSQL database for storing FAQ data
- **Caching**:  
  - **Redis**: Caching mechanism to store frequently requested FAQs for quicker retrieval.
- **Admin panel**:
  - **AdminJS**: Admin panel for managing FAQs
---

## Installation

### Prerequisites

Before starting, ensure you have the following software installed:

- **Node.js** (v14.x or higher)
- **MongoDB** (local or cloud instance)
- **Redis** (local or cloud instance)
- **Docker** for containerization

### 1. Clone the Repository
  ```bash
  git clone https://github.com/anurag8423/Multi-Lingual-FAQs-translator-and-Creator.git
  cd Multi-Lingual-FAQs-translator-and-Creator
  npm install
  ```
### 2.  Set Up Environment Variables
```bash
MONGO_URI=mongodb://localhost:27017/faq_db
REDIS_HOST=localhost
REDIS_PORT=6379
```
### 3. Start the Application
```bash
npm start
```
### 4. API Usage
- **POST**: To create FAQ /api/faqs/create
- **GET**: To get all FAQs /api/faqs/ (degfault english)
```bash
GET /api/faqs?lang=hi
GET /api/faqs?lang=bn
```
Note: You can choose between en, hi, bn for English, Hindi, and Bengali translations, respectively.



