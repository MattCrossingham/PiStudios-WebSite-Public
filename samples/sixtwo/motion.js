const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 500);
});
document.getElementById("dismiss").addEventListener("click", () => {
  document.getElementById("banner").hidden = true;
  document.querySelector(".bar").style.top = "0";
});

if (!reduce && window.gsap && window.ScrollTrigger && window.Lenis) {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ lerp: 0.08 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  const count = document.getElementById("count");
  document.querySelectorAll(".scene").forEach((scene) => {
    const plate = scene.querySelector(".plate");
    const copy = scene.querySelector(".copy");
    gsap.set(copy, { y: 36, opacity: 0 });
    gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.6,
        onToggle: (self) => { if (self.isActive) count.textContent = scene.dataset.n; }
      }
    })
      .to(plate, { scale: 1.12, yPercent: -6, ease: "none" }, 0)
      .to(copy, { y: 0, opacity: 1, ease: "none", duration: 0.35 }, 0);
  });
}
