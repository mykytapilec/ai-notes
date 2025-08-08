# 🧠 AI Notes

An AI-powered cross-platform note-taking app using **NestJS**, **React Native (Expo)**, **PostgreSQL**, and **OpenAI API**.

## 📦 Technologies Used

### Backend (NestJS):
- NestJS (TypeScript)
- PostgreSQL (via TypeORM)
- OpenAI API (text generation)
- CORS enabled

### Frontend (Expo React Native):
- Expo (for mobile and web)
- React Native Paper (UI library)
- Axios (for API requests)

---

## 🚀 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/mykytapilec/ai-notes.git
cd ai-notes
```

---

## 🖥 Backend Setup (NestJS)

### 1. Navigate to the server
```bash
cd server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
Create a `.env` file in the `server` folder with the following variables:

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o  # or gpt-3.5-turbo, etc.

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_TYPE=postgres
DB_NAME=ai_notes

# Server
PORT=3000
```

### 4. Run database migrations (if any) or synchronize schema
Make sure PostgreSQL is running and the database exists. If not, create it manually using `psql` or a DB tool.

### 5. Start the server
```bash
npm run start:dev
```

The backend should now be running at:  
**http://localhost:3000**

---

## 📱 Frontend Setup (React Native + Expo)

### 1. Navigate to the client
```bash
cd client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Update `api.ts` for correct baseURL

Edit `client/api.ts` and set baseURL depending on the platform:
```ts
import axios from 'axios';
import { Platform } from 'react-native';

const LOCAL_IP = 'YOUR_LOCAL_IP'; // e.g., 192.168.0.150

const api = axios.create({
  baseURL:
    Platform.OS === 'web'
      ? 'http://localhost:3000'
      : `http://${LOCAL_IP}:3000`,
});

export default api;
```

> 💡 Replace `YOUR_LOCAL_IP` with your local network IP address from `ifconfig` or `ipconfig`.

### 4. Start the Expo app
```bash
npx expo start
```

- Scan the QR code using Expo Go on your phone.
- Or run it in the browser or simulator.

---

## 🧪 Test the App

1. Add a note via UI.
2. Use the AI assistant to generate text.
3. Filter, sort, or search notes.
4. Notes should persist via PostgreSQL and the NestJS backend.

---

## 🛠 Environment Reference

### `.env` (server):
```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_TYPE=postgres
DB_NAME=
PORT=3000
```

---

## 🧰 Useful Scripts

| Command | Description |
|--------|-------------|
| `npm run start:dev` | Start NestJS server in dev mode |
| `npx expo start`    | Start Expo (mobile app)        |
| `npm run build`     | Compile NestJS app             |

---

## 🤖 Powered By

- [NestJS](https://nestjs.com)
- [React Native](https://reactnative.dev)
- [Expo](https://expo.dev)
- [OpenAI API](https://platform.openai.com)
- [TypeORM](https://typeorm.io)
- [PostgreSQL](https://www.postgresql.org/)

---

## 📝 License

MIT