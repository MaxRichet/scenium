import gsap from "gsap";

export default function footerLinkAnimation(container: HTMLElement) {
  const links = container.querySelectorAll("a");

  links.forEach((link) => {
    const underline = document.createElement("span");

    underline.style.position = "absolute";
    underline.style.left = "0";
    underline.style.bottom = "0px";
    underline.style.width = "100%";
    underline.style.height = "2px";
    underline.style.background = "var(--white)";
    underline.style.transform = "scaleX(0)";
    underline.style.transformOrigin = "right center";

    link.style.position = "relative";
    link.style.display = "inline-block";

    link.appendChild(underline);

    const enter = () => {
      gsap.to(underline, {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    link.addEventListener("mouseenter", enter);
    link.addEventListener("mouseleave", leave);
  });
}
