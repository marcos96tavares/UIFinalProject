import React, { useEffect, useState } from "react";
import { FaSearch, FaPlayCircle, FaFilter, FaChevronDown } from "react-icons/fa";
import SideNavBar from "../components/SideNavBarComp";
import VideoCard from "../components/VideoCard";
import { getVideos } from "../api/Videos";
import "../styles/VideoPage.css";

const Video = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        beginner: true,
        intermediate: true,
        advanced: true
    });
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoData = await getVideos();
                setVideos(videoData);
                console.log(localStorage.getItem("userid"));
            } catch (err) {
                setError("Failed to load videos.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Filter videos based on search term, difficulty level, and category
    const filteredVideos = videos.filter(video => {
        // Search filter
        const matchesSearch = video.videoTitle.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Difficulty filter (assuming videos have a difficulty property - adjust as needed)
        const difficulty = video.difficulty || "beginner";
        const matchesDifficulty = filterOptions[difficulty];
        
        // Category filter
        const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
        
        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Get unique categories from videos
    const categories = ["All", ...new Set(videos.map(video => video.category).filter(Boolean))];

    const toggleFilter = (filter) => {
        setFilterOptions(prev => ({
            ...prev,
            [filter]: !prev[filter]
        }));
    };

    return (
        <div className="video-page">
            <div className="video-layout">
                {/* Sidebar */}
                <div className="sidebar-container">
                    <SideNavBar />
                </div>

                {/* Main Content */}
                <div className="video-content">
                    <div className="video-header">
                        <div className="header-content">
                            <h1>Training Videos</h1>
                            <p>Improve your Muay Thai skills with our training videos</p>
                        </div>
                        <div className="video-badge">
                            <FaPlayCircle />
                            <span>{videos.length} Videos</span>
                        </div>
                    </div>

                    <div className="video-body">
                        {/* Filters and Search */}
                        <div className="video-controls">
                            <div className="search-box">
                                <FaSearch className="search-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Search videos..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            
                            <div className="category-tabs">
                                {categories.map(category => (
                                    <button 
                                        key={category}
                                        className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="filter-controls">
                                <button 
                                    className="filter-toggle" 
                                    onClick={() => setFilterOpen(!filterOpen)}
                                >
                                    <FaFilter />
                                    <span>Difficulty</span>
                                    <FaChevronDown className={filterOpen ? "rotated" : ""} />
                                </button>
                                
                                {filterOpen && (
                                    <div className="filter-dropdown">
                                        <div className="filter-options">
                                            <label className={filterOptions.beginner ? "active" : ""}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={filterOptions.beginner}
                                                    onChange={() => toggleFilter("beginner")}
                                                />
                                                <span>Beginner</span>
                                            </label>
                                            <label className={filterOptions.intermediate ? "active" : ""}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={filterOptions.intermediate}
                                                    onChange={() => toggleFilter("intermediate")}
                                                />
                                                <span>Intermediate</span>
                                            </label>
                                            <label className={filterOptions.advanced ? "active" : ""}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={filterOptions.advanced}
                                                    onChange={() => toggleFilter("advanced")}
                                                />
                                                <span>Advanced</span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Video Grid */}
                        <div className="videos-container">
                            {loading ? (
                                <div className="loading-state">
                                    <div className="spinner"></div>
                                    <p>Loading videos...</p>
                                </div>
                            ) : error ? (
                                <div className="error-state">
                                    <p>{error}</p>
                                    <button onClick={() => window.location.reload()}>
                                        Try Again
                                    </button>
                                </div>
                            ) : filteredVideos.length > 0 ? (
                                <div className="videos-grid">
                                    {filteredVideos.map((video) => (
                                        <VideoCard key={video.videoId} video={video} />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <FaPlayCircle className="empty-icon" />
                                    <p>No videos match your search criteria.</p>
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm("")}>
                                            Clear Search
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;