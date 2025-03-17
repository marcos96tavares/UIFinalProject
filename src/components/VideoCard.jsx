import React from 'react';

const VideoCard = ({ video }) => {
    return (
        <div className="card shadow-sm border-0 p-3 m-3">
            {/* Video Player */}
            <div className="ratio ratio-16x9">
                <iframe 
                    src={video.url} 
                    title={video.title} 
                    allowFullScreen
                ></iframe>
            </div>

            {/* Video Details */}
            <div className="card-body">
                <h5 className="card-title fw-bold">{video.title}</h5>
            </div>
        </div>
    );
};

export default VideoCard;
