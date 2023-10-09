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
function openProjectPopup() {
    var popup = document.getElementById("project-popup");
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

    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    overlay.addEventListener("click", function (event) {
        console.log("Overlay clicked"); // Debugging line
        if (event.target == overlay) {
            closeProjectPopup();
        }
    });
}

// Function to close the project popup
function closeProjectPopup() {
    var popup = document.getElementById("project-popup");

    popup.querySelectorAll('iframe').forEach(v => { v.src = v.src });
    popup.style.display = "none";
    resetSlide();

    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling on the background content
}

// Add event listeners to your project buttons to open the popup
document.querySelectorAll(".portfolio-item .btn").forEach(function(button) {
    button.addEventListener("click", openProjectPopup);
});

document.querySelectorAll(".portfolio-img").forEach(function(button) {
    button.addEventListener("click", openProjectPopup);
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

var currentSlide = 0;
var slides = document.querySelectorAll('.carousel-slide');
var dotsContainer = document.querySelector('.carousel-dots');

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

    var dots = document.querySelectorAll('.carousel-dot');
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
document.getElementById("nextButton").addEventListener("click", function () {
    showSlide(currentSlide + 1);
});

document.getElementById("prevButton").addEventListener("click", function () {
    showSlide(currentSlide - 1);
});

// Add event listeners for dot navigation
var dotButtons = document.querySelectorAll('.carousel-dot');
dotButtons.forEach(function (dot, dotIndex) {
    dot.addEventListener('click', function () {
        showSlide(dotIndex);
    });
});


function resetSlide() {
    currentSlide = 0;
    showSlide(0);
}

// Add event listeners for navigation (e.g., next and previous buttons)
document.getElementById("nextButton").addEventListener("click", nextSlide);
document.getElementById("prevButton").addEventListener("click", prevSlide);

// Show the initial slide
showSlide(currentSlide);

var overlay = document.getElementById("overlay");

overlay.addEventListener("click", function (event) {
    console.log("Overlay clicked"); // Debugging line
    if (event.target == overlay) {
        closeProjectPopup();
    }
});