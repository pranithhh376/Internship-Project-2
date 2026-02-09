# StudySync — Internship Project

This workspace contains a minimal StudySync implementation (backend + client) with Socket.io-powered whiteboard/chat and basic group API.

Structure:

- `server/` — Express + Socket.io server, Mongoose models, routes
- `client/` — Vite + React client that connects to Socket.io and provides a shared canvas
- `socket/` — separate folder with socket handler (proxy to server implementation)

Next steps to run locally:

1. Start MongoDB locally or provide `MONGO_URI`.
2. In one terminal run the server:

```powershell
cd "c:/Users/karip/OneDrive/Desktop/Internship Project 2/server"
npm install
copy .env.example .env
npm run dev
```

3. In another terminal run the client:

```powershell
cd "c:/Users/karip/OneDrive/Desktop/Internship Project 2/client"
npm install
npm run dev
```

To deploy live: use a provider supporting WebSockets (Render, Railway, Heroku with proper config, or a VPS). Provide `MONGO_URI` and S3 credentials. If you want, I can deploy it for you to a recommended provider — provide access or confirm which host to use.
