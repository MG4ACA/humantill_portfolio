/* ARCHIVED: legacy top-level script. The active JS lives inside the React app in `src/`.
   This file has been replaced with a placeholder to avoid duplicate behavior and reduce clutter. */
/* eslint-disable */
console.log('ARCHIVED: top-level script placeholder — see src/ for app logic');

  console.log("Elements found:");
  console.log("Cards:", cards.length);
  console.log("Dots:", dots.length);
  console.log("Gallery name element:", galleryItemName ? "Found" : "Not found");
  console.log("Gallery description element:", galleryItemDescription ? "Found" : "Not found");
  console.log("Left arrow:", leftArrow ? "Found" : "Not found");
  console.log("Right arrow:", rightArrow ? "Found" : "Not found");

  if (!cards.length || !dots.length || !galleryItemName || !galleryItemDescription) {
    console.error("Missing carousel elements!");
    return; // Exit if elements don't exist
  }

  let currentIndex = 0;
  let isAnimating = false;

  function updateCarousel(newIndex) {
    console.log("Updating carousel to index:", newIndex);
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
      const offset = (i - currentIndex + cards.length) % cards.length;

      card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

      if (offset === 0) {
        card.classList.add("center");
      } else if (offset === 1) {
        card.classList.add("right-1");
      } else if (offset === 2) {
        card.classList.add("right-2");
      } else if (offset === cards.length - 1) {
        card.classList.add("left-1");
      } else if (offset === cards.length - 2) {
        card.classList.add("left-2");
      } else {
        card.classList.add("hidden");
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    // Update gallery info with smooth transition
    galleryItemName.style.opacity = "0";
    galleryItemDescription.style.opacity = "0";

    setTimeout(() => {
      galleryItemName.textContent = galleryItems[currentIndex].name;
      galleryItemDescription.textContent = galleryItems[currentIndex].description;
      galleryItemName.style.opacity = "1";
      galleryItemDescription.style.opacity = "1";
    }, 300);

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  // Event listeners with debugging
  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      console.log("Left arrow clicked");
      updateCarousel(currentIndex - 1);
    });

    leftArrow.tabIndex = 0;
    leftArrow.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        console.log("Left arrow activated with keyboard");
        updateCarousel(currentIndex - 1);
      }
    });
  } else {
    console.error("Left arrow not found!");
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      console.log("Right arrow clicked");
      updateCarousel(currentIndex + 1);
    });

    rightArrow.tabIndex = 0;
    rightArrow.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        console.log("Right arrow activated with keyboard");
        updateCarousel(currentIndex + 1);
      }
    });
  } else {
    console.error("Right arrow not found!");
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      console.log("Dot", i, "clicked");
      updateCarousel(i);
    });

    dot.tabIndex = 0;
    dot.setAttribute("role", "button");
    dot.setAttribute("aria-label", `Go to image ${i + 1}`);

    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        console.log("Dot", i, "activated with keyboard");
        updateCarousel(i);
      }
    });
  });

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      console.log("Card", i, "clicked");
      updateCarousel(i);
    });
  });

  // Simple keyboard navigation that always works
  document.addEventListener("keydown", function (e) {
    // Check if we're in an input field or textarea
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    }

    console.log("Key pressed:", e.key);

    if (e.key === "ArrowLeft" || e.key === "Left") {
      e.preventDefault();
      console.log("Left arrow - moving to previous");
      updateCarousel(currentIndex - 1);
    } else if (e.key === "ArrowRight" || e.key === "Right") {
      e.preventDefault();
      console.log("Right arrow - moving to next");
      updateCarousel(currentIndex + 1);
    } else if (e.key >= "1" && e.key <= "6") {
      e.preventDefault();
      const index = parseInt(e.key) - 1;
      if (index < galleryItems.length) {
        console.log("Number key pressed:", e.key, "going to index:", index);
        updateCarousel(index);
      }
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    carouselContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        updateCarousel(currentIndex + 1);
      } else {
        updateCarousel(currentIndex - 1);
      }
    }
  }

  // Auto-rotate carousel
  let autoRotateInterval;
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 5000); // Rotate every 5 seconds
  }

  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }

  // Pause auto-rotate on hover
  const gallery = document.querySelector(".gallery");
  if (gallery) {
    gallery.addEventListener("mouseenter", stopAutoRotate);
    gallery.addEventListener("mouseleave", startAutoRotate);
  }

  // Initialize carousel
  updateCarousel(0);
  startAutoRotate();

  console.log("Gallery carousel initialized successfully!");
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded - Initializing all components...");
  initGalleryCarousel();
});
