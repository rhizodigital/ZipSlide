function zipSlide(options) {
    let defaultOptions = {
        container: ".slider",
        slideClass: ".slide",
        nextButton: ".slide-next",
        prevButton: ".slide-prev",
        autoplay: false,
        autoplaySpeed: 3000,
    }

    options = {...defaultOptions, ...options };

    const _this = this; // make this available to inner functions


    const sliderContainer = document.querySelector(options.container);
    const slides = sliderContainer.querySelectorAll(options.slideClass);


    let currentSlide = 0;
    let maxSlide = slides.length -1;



    this.init = function () {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
            
            _this.isCurrent(slide, index)
        });

        _this.insertControls();

        _this.autoPlay();

    }

    this.insertControls = function () {
        const nextBtn = document.createElement('button');
        nextBtn.setAttribute("class", "next");
        nextBtn.textContent = "Next";

        const prevBtn = document.createElement('button');
        prevBtn.setAttribute("class", "prev");
        prevBtn.textContent = "Prev";

        const controlsContainer = document.createElement('div');
        controlsContainer.setAttribute("class", "zipslide-controls");

        controlsContainer.appendChild(prevBtn);
        controlsContainer.appendChild(nextBtn);

        document.querySelector(options.container).appendChild(controlsContainer);

        nextBtn.addEventListener("click", function () {
            _this.nextSlide();
        });

        prevBtn.addEventListener("click", function() {
            _this.prevSlide();
        });
    }

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
        
        sliderContainer.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            timer_on = 0;
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            if (!timer_on) {
                timer_on = 1;
                slideTimer();
            }
        });
    
        slideTimer()
    }
    
    this.init()
}
