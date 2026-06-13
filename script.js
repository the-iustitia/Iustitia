document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let current = 0;
    let activeAnimation = null;

    function animateCounter(element) {

        const target = Number(element.dataset.target || 0);
        const duration = 1200;

        let start = null;

        if (activeAnimation) {
            cancelAnimationFrame(activeAnimation);
        }

        function step(timestamp) {

            if (!start) start = timestamp;

            const progress = Math.min((timestamp - start) / duration, 1);

            const value = Math.floor(progress * target);

            element.textContent = value;

            if (progress < 1) {
                activeAnimation = requestAnimationFrame(step);
            }
        }

        activeAnimation = requestAnimationFrame(step);
    }

    function showSlide(index) {

        if (!slides.length || !dots.length) return;

        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        const slide = slides[index];
        const dot = dots[index];

        if (!slide || !dot) return;

        slide.classList.add("active");
        dot.classList.add("active");

        const counter = slide.querySelector(".stat-number");

        if (counter) {
            counter.textContent = "0";
            animateCounter(counter);
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            current++;
            if (current >= slides.length) current = 0;
            showSlide(current);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            current--;
            if (current < 0) current = slides.length - 1;
            showSlide(current);
        });
    }

    setInterval(() => {
        if (!slides.length) return;

        current++;
        if (current >= slides.length) current = 0;

        showSlide(current);

    }, 6000);

    showSlide(0);

});