const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.post('/render', upload.fields([
  { name: 'images', maxCount: 20 },
  { name: 'audio', maxCount: 1 },
  { name: 'music', maxCount: 1 }
]), async (req, res) => {
  try {
    const imagePaths = req.files['images'].map(file => file.path);
    const audioPath = req.files['audio'][0].path;
    const musicPath = req.files['music'] ? req.files['music'][0].path : null;
    const output = `output/${Date.now()}.mp4`;

    const ffmpegInputs = imagePaths.map(i => `-loop 1 -t 5 -i ${i}`).join(' ');
    const filters = imagePaths.map((_, i) => `[${i}:v]scale=720:1280[v${i}]`).join(';');
    const concat = imagePaths.map((_, i) => `[v${i}]`).join('') + `concat=n=${imagePaths.length}:v=1:a=0[v]`;

    const cmd = `ffmpeg ${ffmpegInputs} -i ${audioPath} ${musicPath ? `-i ${musicPath}` : ''} -filter_complex "${filters};${concat}" -map "[v]" -shortest -y ${output}`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) return res.status(500).send(stderr);
      res.json({ url: `${req.protocol}://${req.get('host')}/${output}` });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/output', express.static(path.join(__dirname, 'output')));
app.listen(port, () => console.log(`Server running on port ${port}`));
