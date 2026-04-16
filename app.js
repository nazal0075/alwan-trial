document.addEventListener('DOMContentLoaded', () => {
    const scene = document.getElementById('scene');
    const hero = document.getElementById('hero');
    const plate = document.getElementById('plate');

    // Magnetic Tilt Logic
    const handleMove = (e) => {
        let x, y;
        
        if (e.type === 'touchmove') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Calculate rotation based on cursor position relative to center
        // Max rotation of 15 degrees
        const moveX = (x - width / 2) / (width / 2) * 15;
        const moveY = (y - height / 2) / (height / 2) * -15;

        // Apply smooth 3D rotation
        scene.style.transform = `rotateY(${moveX}deg) rotateX(${moveY}deg)`;
        
        // Parallax effect for the plate
        if (plate) {
            plate.style.transform = `translateZ(80px) translateX(${moveX * 1.5}px) translateY(${moveY * -1.5}px)`;
        }
    };

    const resetScene = () => {
        scene.style.transform = `rotateY(0deg) rotateX(0deg)`;
        if (plate) {
            plate.style.transform = `translateZ(50px) translateX(0) translateY(0)`;
        }
    };

    // Event listeners for desktop and mobile
    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('touchmove', (e) => {
        handleMove(e);
        e.preventDefault(); // Prevent scrolling while interacting with hero
    }, { passive: false });

    hero.addEventListener('mouseleave', resetScene);
    hero.addEventListener('touchend', resetScene);

    // Subtle automatic float for spices if mouse is not moving
    // (Already handled by CSS keyframes, but we can add more depth here)
    
    console.log("Alwan Restaurant Engine Loaded Successfully");
});
