gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(ScrollTrigger,ScrollSmoother);

gsap.from(".hero-text", {
  x: -80,
  opacity: 0,
  duration: 2,
  ease: "power3.out"
});

gsap.from(".hero-image", {
  y: 100,
  opacity: 0,
  duration: 2,
  delay: 0.4,
  ease: "power3.out"
});

gsap.from(".double-card", {
  x: 100,
  opacity: 0,
  duration: 0.9,
  stagger: 0.25,
  delay: 0.5,
  ease: "power3.out"
});

gsap.from(".search-section", {
  scrollTrigger: ".search-section",
  y: 80,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

