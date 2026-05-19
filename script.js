gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

// There are 72 frames inside the frames directory
const frameCount = 72;
const currentFrame = index => (
  `frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
);

const images = [];
const laptop = {
  frame: 0
};

// Setup Canvas and pre-load frames
let imagesLoaded = 0;
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    imagesLoaded++;
    if (i === 0) render();
    if (imagesLoaded === frameCount) render();
  };
  images.push(img);
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}

window.addEventListener("resize", resize);
resize();

function render() {
    if (!images[laptop.frame] || !images[laptop.frame].complete) return;
    
    const img = images[laptop.frame];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let renderWidth, renderHeight, x, y;
    
    if (canvasRatio > imgRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - renderHeight) / 2;
    } else {
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        x = (canvas.width - renderWidth) / 2;
        y = 0;
    }
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, x, y, renderWidth, renderHeight);
}

// 1) Canvas sequence linked to scroll
gsap.to(laptop, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    scrub: 1.2
  },
  onUpdate: render
});

// 2) Hero Texts Parallax
gsap.to('.hero-title', {
    y: -120,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to('.hero-subtitle', {
    y: -80,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to('.hero .btn-primary', {
    y: -50,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// 3) Glass Cards Entrance
gsap.utils.toArray('.glass-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.15
    });
});

// 4) Accordion Logic
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        // Close other items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current
        item.classList.toggle('active');
    });
});

// 5) CTA Panel entrance
gsap.from('.glass-panel', {
    scrollTrigger: {
        trigger: '.cta-section',
        start: "top 80%"
    },
    y: 100,
    scale: 0.95,
    opacity: 0,
    duration: 1.2,
    ease: "expo.out"
});
