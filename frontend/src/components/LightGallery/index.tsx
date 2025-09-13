import LightGalleryReact from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-autoplay.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgShare from "lightgallery/plugins/share";
import lgAutoplay from "lightgallery/plugins/autoplay";
const images = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200",
    subHtml: `<h4>Mountains</h4><p>Photo by Tobias Rademacher</p>`,
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    thumb: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=200",
    subHtml: `<h4>Night Sky</h4><p>Photo by John Fowler</p>`,
  },
  {
    src: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0",
    thumb: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?w=200",
    subHtml: `<h4>Forest</h4><p>Photo by Matthew Smith</p>`,
  },
  {
    src: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0a8b7",
    thumb: "https://images.unsplash.com/photo-1465101178521-c1a4c8a0a8b7?w=200",
    subHtml: `<h4>Mushroom</h4><p>Photo by David Clode</p>`,
  },
];

const LightGallery = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 w-screen h-screen">
      <LightGalleryReact
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgFullscreen, lgShare, lgAutoplay]}
        elementClassNames="w-full h-full border border-white rounded-lg"
      >
        {images.map((img, idx) => (
          <a
            key={idx}
            href={img.src}
            data-lg-size="1400-900"
            data-lg-thumbnail={img.thumb}
            data-sub-html={img.subHtml}
          >
            <img
              src={img.thumb}
              alt="gallery"
              className="rounded-lg m-2 w-[120px] h-[80px] object-cover border border-white"
            />
          </a>
        ))}
      </LightGalleryReact>
    </div>
  );
};

export default LightGallery;
