import React, { useState, useRef } from "react";
import { FaPlayCircle, FaCalendarAlt, FaTag, FaSignal } from "react-icons/fa";
import "../styles/VideoCard.css";

const VideoCard = ({ video }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef(null);

    // Convert YouTube URL to Embed URL with autoplay parameter
    const getEmbedUrl = (url, autoplay = false) => {
        let embedUrl = url;
        
        if (url.includes("youtube.com/watch?v=")) {
            const videoId = url.split("v=")[1].split("&")[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        
        // Add autoplay parameter if needed
        if (autoplay) {
            embedUrl += `${embedUrl.includes('?') ? '&' : '?'}autoplay=1`;
        }
        
        return embedUrl;
    };

    // Handle play button click
    const handlePlayClick = (e) => {
        e.preventDefault();
        setIsPlaying(true);
        
        // Reload the iframe with autoplay parameter
        if (iframeRef.current) {
            iframeRef.current.src = getEmbedUrl(video.videoUrl, true);
        }
    };

    // Get difficulty level (defaulting to "beginner" if not available)
    const difficulty = video.difficulty || "beginner";
    
    // Get video category (defaulting to "General" if not available)
    const category = video.category || "General";
    
    // Format date (if available)
    const formattedDate = video.uploadDate 
        ? new Date(video.uploadDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }) 
        : "No date";

    // Handle iframe load event
    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    // Get difficulty color based on level
    const getDifficultyColor = (level) => {
        switch(level.toLowerCase()) {
            case 'beginner':
                return 'var(--beginner-color)';
            case 'intermediate':
                return 'var(--intermediate-color)';
            case 'advanced':
                return 'var(--advanced-color)';
            default:
                return 'var(--beginner-color)';
        }
    };

    return (
        <div 
            className="video-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="video-thumbnail-container">
                {isLoading && (
                    <div className="thumbnail-placeholder">
                        <div className="thumbnail-spinner"></div>
                    </div>
                )}
                
                <div className={`video-player ${isLoading ? 'loading' : ''}`}>
                    <iframe
                        ref={iframeRef}
                        src={getEmbedUrl(video.videoUrl, isPlaying)}
                        title={video.videoTitle}
                        allowFullScreen
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        onLoad={handleIframeLoad}
                    ></iframe>
                </div>
                
                {isHovered && !isPlaying && (
                    <div 
                        className="play-overlay"
                        onClick={handlePlayClick}
                        role="button"
                        aria-label="Play video"
                    >
                        <FaPlayCircle />
                    </div>
                )}
                
                <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(difficulty) }}>
                    {difficulty}
                </div>
            </div>
            
            <div className="video-details">
                <h3 className="video-title">{video.videoTitle}</h3>
                
                <div className="video-meta">
                    <div className="meta-item">
                        <FaCalendarAlt />
                        <span>{formattedDate}</span>
                    </div>
                    
                    <div className="meta-item">
                        <FaTag />
                        <span>{category}</span>
                    </div>
                    
                    <div className="meta-item">
                        <FaSignal />
                        <span>{difficulty}</span>
                    </div>
                </div>
                
                {video.description && (
                    <p className="video-description">
                        {video.description.length > 100 
                            ? `${video.description.substring(0, 100)}...` 
                            : video.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default VideoCard;