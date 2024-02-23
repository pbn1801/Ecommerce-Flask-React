import React, { useState, useEffect } from 'react';
import './Banner.css'; // Import file CSS để tạo hiệu ứng chuyển động

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([
    'https://salt.tikicdn.com/cache/w750/ts/tikimsp/83/45/bb/34a81ac7c3c70476660b2fd4ba95e0a1.jpeg.webp',
    'https://salt.tikicdn.com/cache/w750/ts/tikimsp/41/69/06/0dbaf481204c75cfae55c1f59a6d1267.jpg.webp',
    'https://salt.tikicdn.com/cache/w750/ts/tikimsp/1f/49/01/752e58cc3eeceb193743799e95d0f319.jpeg.webp',
    'https://salt.tikicdn.com/cache/w750/ts/tikimsp/7c/7b/d5/309b979b08f960124df4a1062f07d89f.jpeg.webp',
    'https://salt.tikicdn.com/cache/w750/ts/tikimsp/e4/18/d7/9d22e361a22430d50391a479e057e78c.png.webp',
    'https://salt.tikicdn.com/cache/w750/ts/tikimsp/4a/3f/c0/be7efbc440a6ade56cdbc34a0b22f43c.png.webp'
  ]);

  useEffect(() => {
    // Thiết lập interval để chuyển đổi ảnh sau mỗi 3 giây
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === images.length - 2 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container col-12">
      <div className="col-6">
        <img src={images[currentIndex]} alt="" className="banner-image" />
      </div>
      <div className="col-6">
        <img src={images[currentIndex+1]} alt="" className="banner-image" />
      </div>
      {/* <div
        className="banner-image"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          animation: 'slideLeft 1s forwards'
        }}
      />
      <div
        className="banner-image"
        style={{
          backgroundImage: `url(${images[currentIndex + 1]})`,
          animation: 'slideLeft 1s forwards'
        }}
      /> */}
    </div>
  );
};

export default Banner;
