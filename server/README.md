# StudySync Server

This is the backend for StudySync. It provides:

- Group creation API
- Socket.io namespace `/room` for whiteboard & chat
- (Stub) S3 upload support via environment variables

Run locally:

```
cd server
npm install
cp .env.example .env
# edit .env if needed
npm run dev
```

Notes on deployment: use a host that supports WebSockets and sticky sessions (or use a managed Socket.io provider). Provide MongoDB URI and S3 credentials in the environment.
