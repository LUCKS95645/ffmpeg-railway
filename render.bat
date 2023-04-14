ffmpeg -loop 1 -i capa.jpg -i output.mp3 -c:a copy -c:v libx264 -preset fast -crf 10 -shortest youtube_video.mp4
