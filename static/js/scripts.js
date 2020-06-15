/*!
 * Start Bootstrap - Creative v6.0.2 (https://startbootstrap.com/themes/creative)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-creative/blob/master/LICENSE)
 */
// Slider
// Call & init
$(document).ready(function() {
    $('.ba-slider').each(function() {
        var cur = $(this);
        // Adjust the slider
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
        // Bind dragging events
        drags(cur.find('.handle'), cur.find('.resize'), cur);
    });
});

// Update sliders on resize. 
// Because we all do this: i.imgur.com/YkbaV.gif
$(window).resize(function() {
    $('.ba-slider').each(function() {
        var cur = $(this);
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
    });
});

function drags(dragElement, resizeElement, container) {

    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {

        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        // Check if it's a mouse or touch event and pass along the correct value
        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

        // Get the initial position
        var dragWidth = dragElement.outerWidth(),
            posX = dragElement.offset().left + dragWidth - startX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth();

        // Set limits
        minLeft = containerOffset + 10;
        maxLeft = containerOffset + containerWidth - dragWidth - 10;

        // Calculate the dragging distance on mousemove.
        dragElement.parents().on("mousemove touchmove", function(e) {

            // Check if it's a mouse or touch event and pass along the correct value
            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

            leftValue = moveX + posX - dragWidth;

            // Prevent going off limits
            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            // Translate the handle's left value to masked divs width.
            widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

            // Set the new values for the slider and the handle. 
            // Bind mouseup events to stop dragging.
            $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function() {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            $('.resizable').css('width', widthValue);
        }).on('mouseup touchend touchcancel', function() {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on('mouseup touchend touchcancel', function(e) {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
}

(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 72)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 75
    });

    // Collapse Navbar
    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-scrolled");
        } else {
            $("#mainNav").removeClass("navbar-scrolled");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Magnific popup calls
    $('#portfolio').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

})(jQuery); // End of use strict

// Img Magnifier
function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    
    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /* Set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0,
            y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}


// IMAGE UPLOADER
// vars
let result = document.querySelector('.result'),
    img_result = document.querySelector('.img-result'),
    img_w = document.querySelector('.img-w'),
    img_h = document.querySelector('.img-w'),
    img_upload = document.querySelector('.img-upload'),
    vid_upload = document.querySelector('.vid-upload'),
    img_options = document.querySelector('.img-options'),
    vid_options = document.querySelector('.vid-options'),
    img_save = document.querySelector('.img-save'),
    vid_save = document.querySelector('.vid-save'),
    cropped = document.querySelector('.cropped'),
    dwn = document.querySelector('.download'),
    upload = document.querySelector('#file-input'),
    loading = document.querySelector('.loading'),
    deblur = document.querySelector('.download'),
    vid_deblur = document.querySelector('.vid-download')
comparison = document.querySelector('#deblur')
cropper = '';
// Allowing file type 
var imageExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
var videoExtensions = /(\.mp4|\.wmv)$/i;

var vid = document.getElementById("v");
var canvas = document.getElementById("c");
var context = canvas.getContext('2d');
var targetFrame = document.getElementById('t');
var cw = canvas.width = 1280;
var ch = canvas.height = 720;
var targetOffset = 0;

function pause_video() {
    video.pause();
}

function play_video() {
    video.play();
}

// on change show image with crop options
upload.addEventListener('change', (e) => {
    if (e.target.files.length) {
        // start file reader
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target.result) {
                var filepath = upload.value;
                // create new image
                if (imageExtensions.exec(filepath)) {
                    console.log(filepath);
                    let img = document.createElement('img');
                    img.id = 'image';
                    img.src = e.target.result;
                    img_upload.classList.remove('hide');
                    result.classList.remove('hide');
                    // clean result before
                    result.innerHTML = '';
                    // append new image
                    result.appendChild(img);
                    // show save btn and options
                    vid_upload.classList.add('hide');
                    img_options.classList.remove('hide');
                    // init cropper
                    cropper = new Cropper(img);
                } else {
                    // Upload video
                    console.log(filepath);
                    vid.src = e.target.result;
                    // autoplay vid
                    vid.autoplay = true;
                    vid.load();
                    img_upload.classList.add('hide');
                    vid_upload.classList.remove('hide');
                    window.addEventListener('wheel', function(e) {
                        e.preventDefault();
                        targetOffset = targetOffset + (e.deltaY / 1000);
                        targetFrame.value = targetOffset;
                        seek(); // for demo purpose, we only listen to wheel
                        return false;
                    });
                    // that's all is needed
                    vid.addEventListener('seeked', function() {
                        vid_options.classList.remove('hide');
                        context.drawImage(vid, 0, 0, cw, ch);
                    });
                    // for demo
                    // removed the rendering loop
                    // now it only changes the video's currentTime property
                    function seek() {
                        targetOffset = targetOffset * 0.9;
                        targetFrame.value = Math.round(targetOffset * 100) / 100;
                        var vct = vid.currentTime - targetOffset;
                        if (vct < 0) {
                            vct = vid.duration + vct;
                        } else if (vct > vid.duration) {
                            vct = vct - vid.duration;
                        }
                        vid.currentTime = vct;
                    }
                }
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

// save on click
img_save.addEventListener('click', (e) => {
    e.preventDefault();
    // get result to data uri
    let imgSrc = cropper.getCroppedCanvas({
        width: img_w.value // input value
    }).toDataURL();
    // remove hide class of img
    cropped.classList.remove('hide');
    img_result.classList.remove('hide');
    // show image cropped
    cropped.src = imgSrc;
    deblur.classList.remove('hide');
    //     console.log(imgSrc);
    let json_data = { 'data-uri': imgSrc }
        //     console.log(json_data);
        // this is ajax part when it send the json data of the image from the 
        // webcame to our flask back end at /predict using POST method
    deblur.addEventListener('click', (e) => {
            e.preventDefault();
            loading.classList.remove('hide');

            fetch('/predict', {
                    method: 'POST',
                    processData: false,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify(json_data)
                }).then(res => res.json())
                .then(data => {

                    // this is when we successfully receive the data back from the flask backend
                    //                     console.log(data)
                    comparison.classList.remove('hide');
                    var file_name = data.file_name;
                    var host = location.hostname;
                    console.log(host);
                    // var img_url = host + ":5000/static/uploads/results/" + file_name;
                    var crop_url = "../static/uploads/finish/" + file_name;
                    var result_url = "../static/uploads/results/" + file_name;

                    document.getElementsByClassName("original_result")[0].setAttribute("src", crop_url);
                    document.getElementsByClassName("deblur_result")[0].setAttribute("src", result_url);
                    
                    loading.classList.add('hide');
                    var elmnt = document.getElementById("deblur");
                    elmnt.scrollIntoView();
                    
                    magnify("original_img", 2);
                    magnify("deblur_img", 2);
                });
        })
        // dwn.download = 'imagename.png';
        // dwn.setAttribute('href', imgSrc);
});


vid_save.addEventListener('click', (e) => {
    e.preventDefault();
    // get result to data uri
    let img_from_vid = canvas.toDataURL();
    console.log(img_from_vid);
    let vid_json_data = { 'data-uri': img_from_vid }
    console.log(vid_json_data);
    // this is ajax part when it send the json data of the image from the 
    // webcame to our flask back end at /predict using POST method
    vid_deblur.addEventListener('click', (e) => {
            e.preventDefault();
            loading.classList.remove('hide');
            fetch('/predict', {
                    method: 'POST',
                    processData: false,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify(vid_json_data)
                }).then(res => res.json())
                .then(data => {
                    // this is when we successfully receive the data back from the flask backend
                    console.log(data)
                    comparison.classList.remove('hide');
                    var file_name = data.file_name;
                    var host = location.hostname;
                    console.log(host);
                    // var img_url = host + ":5000/static/uploads/results/" + file_name;
                    var crop_url = "../static/uploads/finish/" + file_name;
                    var result_url = "../static/uploads/results/" + file_name;

                    document.getElementsByClassName("original_result")[0].setAttribute("src", crop_url);
                    document.getElementsByClassName("deblur_result")[0].setAttribute("src", result_url);
                    
                    loading.classList.add('hide');
                    var elmnt = document.getElementById("deblur");
                    elmnt.scrollIntoView();

                    magnify("original_img", 2);
                    magnify("deblur_img", 2);
                });
        })
        // dwn.download = 'imagename.png';
        // dwn.setAttribute('href', imgSrc);
});


let btn_back = document.getElementById('btn-back');
btn_back.addEventListener('click', (e) => {
    document.getElementsByClassName("deblur_result")[0].removeAttribute("src");
    document.getElementsByClassName("original_result")[0].removeAttribute("src");
    var elmnt = document.getElementById("deblur");
    elmnt.scrollIntoView();
});