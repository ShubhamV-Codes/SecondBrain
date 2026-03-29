interface YoutubeEmbedProps {
  url: string;
}

function getYoutubeEmbedUrl(url: string) {
  let videoId = "";

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  }

  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

function getYoutubeThumbnail(url: string) {
  let videoId = "";

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export const YoutubeEmbed = ({ url }: YoutubeEmbedProps) => {
  const embedUrl = getYoutubeEmbedUrl(url);
  const thumbnail = getYoutubeThumbnail(url);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black group/yt">
      {/* Thumbnail shown before iframe loads */}
      <div className="relative w-full h-[200px]">
        <img
          src={thumbnail}
          alt="YouTube thumbnail"
          className="w-full h-full object-cover"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/yt:bg-black/10 transition-colors duration-300">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover/yt:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Iframe loads on top — click play to interact */}
      <iframe
        className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300"
        src={embedUrl}
        title="YouTube video"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};