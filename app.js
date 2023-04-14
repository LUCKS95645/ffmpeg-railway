const { exec } = require('child_process');

exec('ffmpeg -loop 1 -i capa.jpg -i output.mp3 -c:a copy -c:v libx264 -preset fast -crf 10 -shortest youtube_video.mp4', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
