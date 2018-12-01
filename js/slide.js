$('.thumb').each(function() {
    var thumb = $(this);
    
    var move = function(e) {
        var x = e.pageX - thumb.parent().offset().left - thumb.width() / 2;
        var minX = 2;
        var maxX = 162 - thumb.width();
        var threshold = 56;
        x = x < minX ? minX : x > maxX ? maxX : x;
        thumb.css('left', x);
        thumb.prev('.animated').css('opacity', Math.max(0, 1 - x / threshold));
    };
    
    var up = function() {
        $(document).off({
            mousemove: move,
            mouseup:   up
        });
        
        var animation = {
            duration: 100,
            easing:   'linear'
        };
        
        thumb.animate({
            left: 2
        }, animation);
        
        thumb.prev('.animated').animate({
            opacity: 1
        }, animation);
    };
    
    thumb.on({
        mousedown: function() {
            $(document).on({
                mousemove: move,
                mouseup:   up
            });
        }
    });
});