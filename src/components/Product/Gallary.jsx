import { useState } from "react";
const Gallary = ({ images }) => {
  const [current, setCurrent] = useState(images[0]);

  return (
    <div
      className={images?.length > 1 ? "gallery_wrapper" : "gallery_container"}
    >
      {images?.length > 1 && (
        <div className="gallery_small_wrapper">
          {images.map((item, idx) => (
            <img
              className="gallery_small_image"
              src={item}
              alt={`image-${idx}`}
              width="200"
              height="200"
              key={idx}
              onClick={() => setCurrent(item)}
            />
          ))}
        </div>
      )}
      <div>
        <img src={current} alt="large image" width="500px" />
      </div>
    </div>
  );
};

export default Gallary;
