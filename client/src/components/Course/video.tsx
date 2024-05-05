import React, { useState,useEffect } from 'react';

const Video = () => {
  const [mainVideo, setMainVideo] = useState({
    title: 'Main Video Title',
    description: 'Main Video Description',
    videoUrl: 'https://www.youtube.com/embed/8usc4mqrgqE?si=2gRVIqOI4ezmDQyJ'
  });

  const [relatedVideos, setRelatedVideos] = useState([
    { id: 1, title: '  To Be ', videoUrl: 'https://www.youtube.com/embed/8usc4mqrgqE?si=2gRVIqOI4ezmDQyJ' },
    { id: 2, title: ' Vegetables', videoUrl: 'https://www.youtube.com/embed/ab3fiSxLy1U?si=n_xyUCONBJOplOwg' },
    { id: 3, title: 'Tense Forms', videoUrl: 'https://www.youtube.com/embed/07xiFjxV5tM?si=3Mz7xxTx4ACswNF7' },
    { id: 4, title: ' Regular', videoUrl: 'https://www.youtube.com/embed/07xiFjxV5tM?si=3Mz7xxTx4ACswNF7' },
    { id: 5, title: ' Basic daily words', videoUrl: 'https://www.youtube.com/embed/07xiFjxV5tM?si=3Mz7xxTx4ACswNF7' }
    ,
    { id: 6, title: ' Video 6', videoUrl: 'https://www.youtube.com/embed/07xiFjxV5tM?si=3Mz7xxTx4ACswNF7' }
  ]);

  const handleVideoClick = (video : any) => {
    setMainVideo(video);
  };

  const [responsive, setResponsive] = useState(window.innerWidth > 480);
  useEffect(() => {
    function handleResize() {
      setResponsive(window.innerWidth <= 480);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    function handleResize() {
      setResponsive(window.innerWidth <= 480);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={ responsive ? "container-fluid d-f  justify-content-sb" : "container-fluid d-f fd-column align-items-center"} style={{height:"90vh"}}>
      {/* Ana video */}
      <div className={responsive ? "w-60" : "w-100"}>
        <div className="video-player">
          <iframe
            width={responsive ? "931" : ""}
            height={responsive ? "515" : "315"}
            src={mainVideo.videoUrl}
            title={mainVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={responsive ? " " : "w-100"}
          ></iframe>
          <div className='d-sm-none m-2'>
            <div className= "fs-20 fw-700" ><span>#</span>About this course</div>
            <div className= "fs-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum rerum ea eaque debitis, numquam sunt?</div>
          </div>
        </div>
      </div>

      {/* İlgili videolar */}
      <div className={responsive? "w-30 m-2 d-f fd-column" : "w-90 mt-1"} style={{height:"70vh",overflow:"scroll"}}>
        <h3>Related Videos</h3>
        <ul className='list-style-none'>
          {relatedVideos.map((video) => (
            <li style={{borderBottom:"1px solid  #D9D9D9",height:"120px"}} className='d-f align-items-center  ' key={video.id} onClick={() => handleVideoClick(video)}>
              <a href="#" className='text-dec-none text-dark fs-20'>Section {video.id}. {video.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Video;
