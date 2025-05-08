# One Wave Fitness App

## Features

- 🏋️‍♀️ **Dynamic Workout Content Loading**
- 📸 **Drag-and-Drop Image Uploads**
- 📱 **Fully Responsive Design**
- 🔄 **AJAX Form Submissions**
- 🗃️ **MySQL Database Integration**

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MySQL (v8+)
- Modern web browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/one-wave-group.git
   cd one-wave-group
   ```

2. Set up the frontend (No installation required - just open `index.html` in the browser).

3. Set up the backend:

   ```bash
   cd server
   npm install
   cp .env.example .env
   ```

   - Edit the `.env` file with your database credentials.

4. Start the backend server:

   ```bash
   node server.js
   ```

### Configuration

#### Environment Variables (server/.env)

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=clientfit
RUN_DB_PROCEDURES_ON_START=TRUE
PORT=5000
```

- **RUN_DB_PROCEDURES_ON_START**:
  - **TRUE**: Automatically creates DB procedures on startup
  - **FALSE**: Requires manual procedure creation via API

### API Endpoints

| Endpoint                               | Method | Description                   |
| -------------------------------------- | ------ | ----------------------------- |
| `http://numbersapi.com/1/30/date?json` | GET    | Get interesting fitness facts |
| `/upload`                              | POST   | Upload images                 |
| `/create-user-procedure`               | POST   | Manually create DB procedures |

## Development

### Frontend Development

1. Edit files in the `app/` directory.
2. No build step required - simply refresh the browser after changes.

### Backend Development

Start the development server:

```bash
cd server
npm run dev
```

## Video Demo

https://www.loom.com/share/754b268fb193438fa8e2c25455126b24?sid=c76cbc37-ee48-47d8-bdfc-5f03dcf24e56

Happy Hacking!
