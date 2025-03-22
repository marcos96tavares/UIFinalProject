import React, { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBarComp";
import VideoCard from "../components/VideoCard";
import { getVideos } from "../api/Videos"; // ✅ Import async function

const Video = () => {
    const [videos, setVideos] = useState([]); // 🔹 Store videos in state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 Fetch videos when the component mounts
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoData = await getVideos(); // ✅ Wait for API response
                setVideos(videoData);
                console.log(localStorage.getItem("userid"))
            } catch (err) {
                setError("Failed to load videos.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <SideNavBar />

            {/* Main Content */}
            <div className="container p-4">
                <h2 className="fw-bold">Training Videos</h2>

                {/* Loading and Error Handling */}
                {loading && <p>Loading videos...</p>}
                {error && <p className="text-danger">{error}</p>}

                <div className="row">
                    {/* 🔹 Map only if videos are available */}
                    {!loading &&
                        videos.length > 0 &&
                        videos.map((video) => (
                            <div key={video.videoId} className="col-md-6">
                                <VideoCard video={video} />
                            </div>
                        ))}
                    
                    {/* Show message if no videos are available */}
                    {!loading && videos.length === 0 && <p>No videos available.</p>}
                </div>
            </div>
        </div>
    );
};

export default Video;
