require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const groupRoutes = require('./routes/groups');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

// Mount socket handlers
require('./socket/whiteboard')(io);

// API
app.use('/api/groups', groupRoutes);

app.get('/', (req, res) => res.json({ ok: true, name: 'StudySync Server' }));

// Serve client build if present
const publicDir = path.join(__dirname, 'public');
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
} else if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

app.get('*', (req, res) => {
  const indexInPublic = path.join(publicDir, 'index.html');
  const indexInDist = path.join(clientDist, 'index.html');
  if (fs.existsSync(indexInPublic)) return res.sendFile(indexInPublic);
  if (fs.existsSync(indexInDist)) return res.sendFile(indexInDist);
  return res.json({ ok: true, name: 'StudySync Server' });
});

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/studysync';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo err', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening ${PORT}`));
