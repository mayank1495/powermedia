(() => {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky nav condense ---------- */
  const navShell = document.getElementById("nav-shell");
  const stuckClasses = [
    "border-night/10",
    "bg-white/80",
    "shadow-lift",
    "backdrop-blur-md",
  ];
  let ticking = false;
  const render = () => {
    ticking = false;
    if (!navShell) return;
    const stuck = window.scrollY > 12;
    navShell.classList.toggle("py-2", stuck);
    stuckClasses.forEach((c) => navShell.classList.toggle(c, stuck));
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(render);
  };
  render();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("hidden", !open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () =>
      setOpen(menu.classList.contains("hidden"))
    );
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Scroll reveals ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!prefersReduced && "IntersectionObserver" in window && revealEls.length) {
    // Opt into the hidden start state only when JS + motion are available.
    document.body.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Hero route animation ---------- */
  const line = document.getElementById("route-line");
  const truck = document.getElementById("route-truck");
  if (line && truck && !prefersReduced) {
    const len = line.getTotalLength();
    line.style.strokeDasharray = String(len);
    line.style.strokeDashoffset = String(len);

    const DURATION = 3200;
    let start = null;
    let raf = null;

    const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out-cubic

    const step = (ts) => {
      if (start === null) start = ts;
      const raw = Math.min((ts - start) / DURATION, 1);
      const t = ease(raw);
      line.style.strokeDashoffset = String(len * (1 - t));
      const pt = line.getPointAtLength(len * t);
      truck.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
      if (raw < 1) {
        raf = requestAnimationFrame(step);
      } else {
        // gentle loop pause then restart
        setTimeout(() => {
          start = null;
          raf = requestAnimationFrame(step);
        }, 1400);
      }
    };

    // place truck at origin before animating
    const p0 = line.getPointAtLength(0);
    truck.setAttribute("transform", `translate(${p0.x}, ${p0.y})`);

    const routeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && raf === null) {
            raf = requestAnimationFrame(step);
          } else if (!entry.isIntersecting && raf !== null) {
            cancelAnimationFrame(raf);
            raf = null;
            start = null;
          }
        });
      },
      { threshold: 0.3 }
    );
    routeObserver.observe(line);
  } else if (line && truck) {
    // Reduced motion: show the completed route, truck at destination.
    const len = line.getTotalLength();
    const end = line.getPointAtLength(len);
    truck.setAttribute("transform", `translate(${end.x}, ${end.y})`);
  }
})();
