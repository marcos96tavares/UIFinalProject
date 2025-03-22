import React from "react";

const VideoCard = ({ video }) => {
    // ✅ Convert YouTube URL to Embed URL
    const embedUrl = video.videoUrl.includes("youtube.com/watch?v=")
        ? video.videoUrl.replace("watch?v=", "embed/")
        : video.videoUrl;

    return (
        <div className="card shadow-sm border-0 p-3 m-3">
            {/* Video Player */}
            <div className="ratio ratio-16x9">
                <iframe
                    src={embedUrl} 
                    title={video.videoTitle} 
                    allowFullScreen
                    frameBorder="0"
                ></iframe>
            </div>

            {/* Video Details */}
            <div className="card-body">
                <h5 className="card-title fw-bold">{video.videoTitle}</h5>
            </div>
        </div>
    );
};

export default VideoCard;
