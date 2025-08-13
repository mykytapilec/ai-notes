# 🧠 AI Notes

An AI-powered cross-platform note-taking app using **NestJS**, **React Native (Expo)**, **PostgreSQL**, and either the **OpenAI API** or the **GitHub Models API** for AI features.

---

## 📦 Technologies Used

### Backend (NestJS):
- NestJS (TypeScript)
- PostgreSQL (via TypeORM)
- OpenAI API **or** GitHub Models API (for AI text generation)
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
Create a `.env` file in the `server` folder with one of the following setups:

#### **Option A – Using OpenAI API (paid)**
```env
# OpenAI API configuration
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

#### **Option B – Using GitHub Models API (free for testing)**
```env
# GitHub Models API configuration
GITHUB_TOKEN=your_github_personal_access_token
OPENAI_API_BASE_URL=https://models.inference.ai.azure.com
OPENAI_MODEL=gpt-4o-mini  # Available free-tier model

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

> 💡 When using GitHub Models API, your personal access token must have the **`models`** permission enabled.

---

### 4. Run database migrations (if any) or synchronize schema
Make sure PostgreSQL is running and the database exists.  
If not, create it manually using `psql` or a DB tool.

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

Edit `client/api.ts` and set the baseURL depending on the platform:
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

> 💡 Replace `YOUR_LOCAL_IP` with your local network IP address from `ifconfig` (Mac/Linux) or `ipconfig` (Windows).

### 4. Start the Expo app
```bash
npx expo start
```

- Scan the QR code using Expo Go on your phone.
- Or run it in the browser or simulator.

---

## 🧪 Test the App

1. Add a note via UI.
2. Let the AI assistant generate a title.
3. Filter, sort, or search notes.
4. Notes should persist via PostgreSQL and the NestJS backend.

---

## 🛠 Environment Reference

### `.env` (server):

#### **For OpenAI API**
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

#### **For GitHub Models API**
```env
GITHUB_TOKEN=
OPENAI_API_BASE_URL=https://models.inference.ai.azure.com
OPENAI_MODEL=gpt-4o-mini
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
- [OpenAI API](https://platform.openai.com) / [GitHub Models](https://github.blog/changelog/2024-11-13-github-models-api-now-available/)
- [TypeORM](https://typeorm.io)
- [PostgreSQL](https://www.postgresql.org/)

---

## 📝 License

MIT
