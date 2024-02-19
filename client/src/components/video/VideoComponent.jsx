import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVideos } from '../../redux/videoSlice';

const VideoComponent = () => {
    const videos = useSelector((state) => state.video.videos);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchAllVideos());
    }, [dispatch]);


  return (
      <div>
          {videos.map((video) => {
              return (
                <video key={video._id} controls>
                  <source src={video.videoUrl} />
                </video>
              );
          })}
    </div>
  )
}

export default VideoComponent