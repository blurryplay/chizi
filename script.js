document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        const loadingPage = document.getElementById('loading');
        const mainContent = document.getElementById('main-content');
        const audioElement = document.getElementById('background-audio');
        const playButton = document.getElementById('play-music');

        // Hide the loading screen
        loadingPage.style.display = 'none';

        // Show the main content
        mainContent.style.display = 'block';

        // Mute all videos
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.muted = true; // Mute each video
            video.pause(); // Ensure videos are initially paused
        });

        // Try to automatically play the audio
        try {
            audioElement.play().then(() => {
                console.log('Audio is playing');
            }).catch((error) => {
                console.error('Audio failed to play:', error);
            });
        } catch (error) {
            console.error('Error in playing audio:', error);
        }

        // Add a click event to the play button
        playButton.addEventListener('click', () => {
            try {
                audioElement.play().then(() => {
                    console.log('Audio started on button click');
                }).catch((error) => {
                    console.error('Audio failed to play on button click:', error);
                });
            } catch (error) {
                console.error('Error in button click:', error);
            }
        });
    }, 5000);
});

// Carousel functionality
let currentIndex = 0;

// Function to move slides
function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex + step + slides.length) % slides.length;
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Play the video in the current slide
    const video = slides[currentIndex].querySelector('video');
    if (video) {
        video.play(); // Play the video when the slide comes into view
    }

    // Pause the video in the previous slide
    const prevSlide = slides[(currentIndex - 1 + slides.length) % slides.length];
    const prevVideo = prevSlide.querySelector('video');
    if (prevVideo) {
        prevVideo.pause(); // Pause the previous video
    }
}

// Set the carousel to automatically move every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);  // Change slides every 5000ms (5 seconds)

// Auto-play videos as they come into view
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        const slides = document.querySelectorAll('.carousel-item');
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video && slide.style.transform !== 'translateX(0%)') {
                video.pause(); // Pause any video not currently in view
            }
        });
    }
});
