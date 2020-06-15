// Call & init
$(document).ready(function() {
    $('.ba-slider-comp').each(function() {
        var cur = $(this);
        // Adjust the slider
        var width = cur.width() + 'px';
        cur.find('.resize-comp img').css('width', width);
        // Bind dragging events
        drags(cur.find('.handle-comp'), cur.find('.resize-comp'), cur);
    });
});

// Update sliders on resize-comp. 
// Because we all do this: i.imgur.com/YkbaV.gif
$(window).resize - comp(function() {
    $('.ba-slider-comp').each(function() {
        var cur = $(this);
        var width = cur.width() + 'px';
        cur.find('.resize-comp img').css('width', width);
    });
});

function drags(dragElement, resize - compElement, container) {

    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {

        dragElement.addClass('draggable');
        resize - compElement.addClass('resizable');

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

            // Translate the handle-comp's left value to masked divs width.
            widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

            // Set the new values for the slider and the handle-comp. 
            // Bind mouseup events to stop dragging.
            $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function() {
                $(this).removeClass('draggable');
                resize - compElement.removeClass('resizable');
            });
            $('.resizable').css('width', widthValue);
        }).on('mouseup touchend touchcancel', function() {
            dragElement.removeClass('draggable');
            resize - compElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on('mouseup touchend touchcancel', function(e) {
        dragElement.removeClass('draggable');
        resize - compElement.removeClass('resizable');
    });
}