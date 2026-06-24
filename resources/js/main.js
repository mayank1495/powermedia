(() => {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky nav: solid-on-scroll + hide-on-scroll-down ---------- */
  const header = document.getElementById("site-header");
  const solidClasses = [
    "bg-white/85",
    "backdrop-blur-md",
    "border-night/10",
    "shadow-[0_6px_24px_-16px_rgba(17,26,74,0.3)]",
  ];
  let lastY = window.scrollY;
  let ticking = false;
  const renderNav = () => {
    ticking = false;
    if (!header) return;
    const y = window.scrollY;
    const scrolled = y > 8;
    solidClasses.forEach((c) => header.classList.toggle(c, scrolled));
    const goingDown = y > lastY + 2 && y > 160;
    const goingUp = y < lastY - 2;
    if (goingDown) header.classList.add("-translate-y-full");
    else if (goingUp || y <= 160) header.classList.remove("-translate-y-full");
    lastY = y;
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(renderNav);
  };
  renderNav();
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

  /* ---------- Hero shipment card: varied sample on each visit ---------- */
  const shipDest = document.getElementById("ship-dest");
  if (shipDest) {
    const samples = [
      { dest: "London, UK",    eta: "2 days", mode: "Air freight", svc: "Intl Express",   kg: "2.4",  status: "In transit" },
      { dest: "Dubai, AE",     eta: "36 hrs", mode: "Air freight", svc: "Intl Express",   kg: "5.1",  status: "In transit" },
      { dest: "Singapore, SG", eta: "3 days", mode: "Air freight", svc: "Intl Priority",  kg: "1.2",  status: "Booked" },
      { dest: "New York, US",  eta: "4 days", mode: "Air freight", svc: "Intl Express",   kg: "8.6",  status: "In transit" },
      { dest: "Mumbai, IN",    eta: "today",  mode: "Air + road",  svc: "TDD Express",    kg: "3.7",  status: "Out for delivery" },
      { dest: "New Delhi, IN", eta: "today",  mode: "By air",      svc: "TDD Express",    kg: "0.8",  status: "In transit" },
      { dest: "Bengaluru, IN", eta: "1 day",  mode: "By air",      svc: "TDD Express",    kg: "12.0", status: "In transit" },
      { dest: "Chennai, IN",   eta: "1 day",  mode: "Surface",     svc: "Cargo",          kg: "24.5", status: "Picked up" },
    ];
    const s = samples[Math.floor(Math.random() * samples.length)];
    const id = "PM-" + (10000 + Math.floor(Math.random() * 89999)) + "-IN";
    const set = (k, v) => { const el = document.getElementById(k); if (el) el.textContent = v; };
    set("ship-dest", s.dest);
    set("ship-dest-note", "Destination · ETA " + s.eta);
    set("ship-status", s.status);
    set("ship-mode", s.mode);
    set("ship-track", id);
    set("ship-svc", s.svc);
    set("ship-weight", s.kg);
    set("ship-eta", s.eta);
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

  /* ---------- Hero flight-route animation ---------- */
  const line = document.getElementById("route-line");
  const plane = document.getElementById("route-plane");
  if (line && plane) {
    const len = line.getTotalLength();
    const angleAt = (d) => {
      const a = line.getPointAtLength(Math.max(0, d - 1));
      const b = line.getPointAtLength(Math.min(len, d + 1));
      return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90;
    };
    const place = (d) => {
      const p = line.getPointAtLength(d);
      plane.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angleAt(d)})`);
    };

    if (prefersReduced) {
      line.style.strokeDasharray = "none";
      place(len);
    } else {
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
      place(0);

      const DURATION = 3600;
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      let start = null;
      let raf = null;

      const step = (ts) => {
        if (start === null) start = ts;
        const raw = Math.min((ts - start) / DURATION, 1);
        const t = ease(raw);
        line.style.strokeDashoffset = String(len * (1 - t));
        place(len * t);
        if (raw < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setTimeout(() => {
            start = null;
            raf = requestAnimationFrame(step);
          }, 1800);
        }
      };

      const obs = new IntersectionObserver(
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
        { threshold: 0.1 }
      );
      obs.observe(line);
    }
  }
})();
