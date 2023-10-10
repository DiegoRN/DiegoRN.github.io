(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);


// Function to open the project popup
function openProjectPopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = "block";
    var popupBodies = document.getElementsByClassName("popup-body");
    for (var i = 0; i < popupBodies.length; i++) {
        popupBodies[i].scrollTop = 0;
    }

    var videoIframes = popup.querySelectorAll('iframe');

    // Reload all video iframes
    videoIframes.forEach(function (iframe) {
        iframe.src = iframe.src;
    });

    document.body.style.overflow = "hidden"; // Prevent scrolling on the background content

    var overlayId = "overlay" + popupId.slice(-1);
    var overlay = document.getElementById(overlayId);
    overlay.style.display = "block";
    overlay.addEventListener("click", function (event) {
        overlayClickHandler(event, popupId);
    });
}

// Function to close the project popup
function closeProjectPopup(popupId) {
    var popup = document.getElementById(popupId);

    popup.querySelectorAll('iframe').forEach(v => { v.src = v.src });
    popup.style.display = "none";

    var overlayId = "overlay" + popupId.slice(-1);
    var overlay = document.getElementById(overlayId);
    overlay.style.display = "none";
    overlay.removeEventListener("click", overlayClickHandler);
    document.body.style.overflow = "auto"; // Restore scrolling on the background content
}

function overlayClickHandler(event, popupId) {
    closeProjectPopup(popupId);
}

// Add event listeners to your project buttons to open the popup
document.querySelectorAll(".open-popup-btn .btn").forEach(function(button) {
    button.addEventListener("click", function() {
        var popupId = button.getAttribute("data-popup-id");
        openProjectPopup(popupId);
    });
});

document.querySelectorAll(".portfolio-img").forEach(function(button) {
    button.addEventListener("click", function() {
        var popupId = button.getAttribute("project-id");
        openProjectPopup(popupId);
    });
});

$(document).ready(function () {
    // ...
    
    // Add an event listener to project buttons
    $('.project-button').on('click', function () {
        var projectId = $(this).data('project-id');
        $('#' + projectId).fadeIn();
        return false; // Prevent the default anchor link behavior
    });
    
    // Add a close button event handler to hide the project popups
    $('.project-popup .close-button').on('click', function () {
        $(this).closest('.project-popup').fadeOut();
    });
});

function initializeCarousel(popupId) {
    var currentSlide = 0;
    var slides = document.querySelectorAll(`#${popupId} .carousel-slide`);
    var dotsContainer = document.querySelector(`#${popupId} .carousel-dots`);

    // Create dots based on the number of slides
    slides.forEach(function (_, index) {
        var dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    });

    // Function to show the current slide and update dots
    function showSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        slides.forEach(function (slide, slideIndex) {
            if (slideIndex === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });

        var dots = document.querySelectorAll(`#${popupId} .carousel-dot`);
        dots.forEach(function (dot, dotIndex) {
            if (dotIndex === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentSlide = index;
    }

    // Add event listeners for navigation (e.g., next and previous buttons)
    var prevId = "prevButton" + popupId.slice(-1);
    document.getElementById(prevId).addEventListener("click", function () {
        showSlide(currentSlide - 1);
    });

    var nextId = "nextButton" + popupId.slice(-1);
    document.getElementById(nextId).addEventListener("click", function () {
        showSlide(currentSlide + 1);
    });

    // Add event listeners for dot navigation
    var dotButtons = document.querySelectorAll(`#${popupId} .carousel-dot`);
    dotButtons.forEach(function (dot, dotIndex) {
        dot.addEventListener('click', function () {
            showSlide(dotIndex);
        });
    });

    // Show the initial slide
    showSlide(currentSlide);
}

// Call initializeCarousel for each popup with its unique ID
initializeCarousel("popup1");
initializeCarousel("popup2");
initializeCarousel("popup3");
initializeCarousel("popup4");
initializeCarousel("popup5");
initializeCarousel("popup6");
initializeCarousel("popup7");


function resetSlide(carouselId) {
    var slides = document.querySelectorAll(`#${carouselId} .carousel-slide`);

    // Hide all slides except the first one
    slides.forEach(function (slide, slideIndex) {
        if (slideIndex === 0) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });

    // Update the active dot
    var dots = document.querySelectorAll(`#${carouselId} .carousel-dot`);
    dots.forEach(function (dot, dotIndex) {
        if (dotIndex === 0) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}