import React from 'react';
import SideNavBar from '../components/SideNavBarComp';
import VideoCard from '../components/VideoCard';
import { videosLing } from '../api/videosTest';

const Video = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <SideNavBar />

            {/* Main Content */}
            <div className="container p-4">
                <h2 className="fw-bold">Training Videos</h2>
                <div className="row">
                    {videosLing.map((video, index) => (
                        <div key={index} className="col-md-6">
                            <VideoCard video={video} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Video;
