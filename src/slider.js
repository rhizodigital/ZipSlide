function zipSlide(options) {
    let defaultOptions = {
        sliderElement: ".slider",
        slideClass: "slide",
        nextButtonClass: "slide-next",
        prevButtonClass: "slide-prev",
        autoplay: false,
        autoplaySpeed: 3000,
    }

    options = {...defaultOptions, ...options };

    const _this = this; // make this available to inner functions

    const slider = document.querySelector(options.sliderElement)

    const slides = slider.querySelectorAll(`.${options.slideClass}`);

    let currentSlide = 0;
    let maxSlide = slides.length -1;

    this.init = function () {
        slider.classList.add('zipslide-container')
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
            
            _this.isCurrent(slide, index)
        });

        _this.insertControls();

        options.autoplay && _this.autoPlay();


    }

    this.insertControls = function () {
        const nextBtn = document.createElement('button');
        nextBtn.setAttribute("class", options.nextButtonClass);
        nextBtn.textContent = "Next";

        const prevBtn = document.createElement('button');
        prevBtn.setAttribute("class", options.prevButtonClass);
        prevBtn.textContent = "Prev";

        const controlsContainer = document.createElement('div');
        controlsContainer.setAttribute("class", "zipslide-controls");

        controlsContainer.appendChild(prevBtn);
        controlsContainer.appendChild(nextBtn);

        slider.appendChild(controlsContainer);

        nextBtn.addEventListener("click", function () {
            _this.nextSlide();
        });

        prevBtn.addEventListener("click", function() {
            _this.prevSlide();
        });
    }

    // Add current-slide class to current-slide
    this.isCurrent = function(slide, index) {
        slide.classList.remove("current-slide");
        if (currentSlide === index) {
            slide.classList.add('current-slide')
        } 
    }

    this.goToSlide = function() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            slide.style.transition = "transform .5s linear";
            _this.isCurrent(slide, index);
        });
    }
    
    this.nextSlide = function() {
        if (currentSlide === maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        _this.goToSlide()
    }

    this.prevSlide = function() {
        if (currentSlide === 0) {
            currentSlide = maxSlide;
        } else {
            currentSlide--;
        }
        _this.goToSlide()
    }
    
    this.autoPlay = function() {
        let timeout;
        let timer_on = 0;
        let slide_time = options.autoplaySpeed;
        
        function slideTimer() {        
            timeout = setTimeout(() => {
                _this.nextSlide()
                slideTimer()
            }, slide_time);
        };
        
        // Pause autoplay when hovering over slider container

        slider.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            timer_on = 0;
        });
        // Resume when moving mouse out of slider container
        slider.addEventListener('mouseleave', () => {
            if (!timer_on) {
                timer_on = 1;
                slideTimer();
            }
        });
        
        slideTimer()
    }
    
    this.init()
}
