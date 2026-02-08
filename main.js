// Living Street - main (tiny, safe)

const home = document.getElementById("home");
const street = document.getElementById("street");

const startBtn = document.getElementById("start");
const backBtn = document.getElementById("back");

function showHome() {
  home.classList.remove("hidden");
  street.classList.add("hidden");
}

function showStreet() {
  home.classList.add("hidden");
  street.classList.remove("hidden");
}

startBtn.addEventListener("click", showStreet);
backBtn.addEventListener("click", showHome);
// Map overview toggle (safe)
const scroller = document.getElementById("streetScroller");
const btnMap = document.getElementById("btnMap");

function toggleOverview() {
  if (!scroller) return;
  scroller.classList.toggle("overview");
}

btnMap?.addEventListener("click", toggleOverview);

// Gentle scroll hint once (first time you enter street)
const hint = document.getElementById("scrollHint");

function showHintOnce() {
  if (!hint) return;

  // one-time guard
  try {
    if (localStorage.getItem("scroll_hint_seen") === "1") return;
    localStorage.setItem("scroll_hint_seen", "1");
  } catch {
    // if storage blocked, still show once per page load
  }

  hint.classList.remove("hidden");

  const hide = () => {
    hint.classList.add("hidden");
    scroller?.removeEventListener("scroll", hideOnScroll);
  };

  const hideOnScroll = () => hide();

  scroller?.addEventListener("scroll", hideOnScroll, { passive: true });
  setTimeout(hide, 4000);
}

// show hint when we enter street
const startBtn = document.getElementById("start");
startBtn?.addEventListener("click", () => {
  // let layout paint first
  setTimeout(showHintOnce, 150);
});
// ===== Modal (reusable) =====
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function openModal(title, bodyHtml) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHtml;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
  // tap outside closes
  if (e.target === modal) closeModal();
});

// ===== Building tap handlers =====
function bindBuildingTaps() {
  const segments = document.querySelectorAll(".segment");
  segments.forEach(seg => {
    const segName = seg.dataset.seg || "place";
    const building = seg.querySelector(".building");
    if (!building) return;

    building.addEventListener("click", () => {
      openModal(
        segName.toUpperCase(),
        `
          <p><strong>${segName}</strong> — coming online soon.</p>
          <p>This is where upgrades, rituals, and street life will live.</p>
          <p style="opacity:.85;">(Next: Enter Home + first ritual hooks.)</p>
        `
      );
    });
  });
}

// Bind once on load
bindBuildingTaps();
