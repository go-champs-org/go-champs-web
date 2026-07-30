import React from 'react';
import './VideoPlayer.scss';

interface ViewPlayerProps {
  youTubeVideoCode: string;
}

function VideoPlayer({ youTubeVideoCode }: ViewPlayerProps) {
  // @types/react@16.8 predates the `referrerPolicy` iframe attribute typing.
  const iframeProps = {
    className: 'video-player',
    src: `https://www.youtube.com/embed/${youTubeVideoCode}`,
    title: 'YouTube video player',
    frameBorder: '0',
    allow:
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    referrerPolicy: 'strict-origin-when-cross-origin',
    allowFullScreen: true
  } as React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >;

  return (
    <div className="panel">
      <iframe {...iframeProps}></iframe>
    </div>
  );
}

export default VideoPlayer;
