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

  return `https://www.youtube.com/embed/${videoId}`;
}

export const YoutubeEmbed = ({ url }: YoutubeEmbedProps) => {
  return (
    <iframe
      className="w-full mt-3 rounded"
      height="200"
      src={getYoutubeEmbedUrl(url)}
      title="YouTube video"
      allowFullScreen
    />
  );
};