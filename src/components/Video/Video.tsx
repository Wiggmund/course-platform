import Hls from "hls.js";
import Stack from '@mui/material/Stack'

interface VideoProps {
    link: string;
    preview: string;
}

const Video = ({
    link,
    preview
}:VideoProps) => {
    // const img = 'https://wisey.app/assets/images/web/course-covers/Win-your-emotional-battle-against-procrastination/preview/preview.webp';
    // const link = 'https://wisey.app/videos/Win-your-emotional-battle-against-procrastination/preview/AppleHLS1/preview.m3u8';
    const video = document.getElementById('xxx') as HTMLMediaElement;

    if (Hls.isSupported()) {
        if (video) {
            const hls = new Hls();
            hls.loadSource(link);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                console.log(video)
            }); 
        }
    }
    // video.play();
    return (
        <>
            <h1>Test</h1>
            <Stack>
                <video
                    id='xxx'
                    height={500}
                    width={500}
                    preload='metadata'
                    src={link}
                    poster={preview}
                ></video>
            </Stack>
        </>
    );
};

export default Video;