import React from 'react';
import './VideoPlayer.scss';

interface ViewPlayerProps {
  youTubeVideoCode: string;
}

function VideoPlayer({ youTubeVideoCode }: ViewPlayerProps) {
  return (
    <div className="panel">
      <iframe
        className="video-player"
        src={`https://www.youtube.com/embed/${youTubeVideoCode}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoPlayer;
