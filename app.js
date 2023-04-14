import { path as ffmpeg } from '@ffmpeg-installer/ffmpeg';
import { exec } from 'child_process';
exec(`${ffmpeg} -loop 1 -i capa.jpg -i output.mp3 -c:a copy -c:v libx264 -preset fast -crf 10 -shortest youtube_video.mp4`)
