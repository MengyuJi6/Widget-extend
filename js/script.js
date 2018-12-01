$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
 
    // Initialize draggable functions
    $( "#draggable_1" ).draggable();
    $( "#draggable_2" ).draggable();
    $( "#draggable_3" ).draggable();
    $( "#draggable_4" ).draggable();
    $( "#draggable_5" ).draggable();
    $( "#draggable_6" ).draggable();
    $( "#draggable_7" ).draggable();
    $( "#draggable_8" ).draggable();
    $( "#draggable_9" ).draggable();
    $( "#draggable_10" ).draggable();
    $( "#draggable_11" ).draggable();
    $( "#draggable_12" ).draggable();

    // Draggable functions
    $( "#droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });

    var availableTags = [
      "Accordion",
      "Autocomplete",
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "Button",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Droppable",
      "Datepicker",
      "Dialog",
      "Draggable",
      "Effect",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Hide",
      "Java",
      "JavaScript",
      "Lisp",
      "Menu",
      "Perl",
      "PHP",
      "Python",
      "Progressbar",
      "Ruby",
      "Scala",
      "Scheme",
      "Show",
      "Spinner",
      "Slider",
      "Tabs",
      "Tooltip",
      "Toggle"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags,
      });

    $( "#dialog" ).dialog();

    $( "#resizable" ).resizable();

    $( "#opener" ).click(function() {
    // $( "#dialog" ).dialog( "open" );
      $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Delete all items": function() {
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
      });
    });

    function hovered() {
      console.log("Hovered");
    }
    $(".child").append("<div class='hoverZone'></div>")

    $(".hoverZone").hover(hovered);

    $( "#sortable" ).sortable({
      revert: true
    });

    $( "#sortable_2" ).sortable({
      revert: true
    });

    $( "#sortable_3" ).sortable({
      revert: true
    });

    $("#btndrag").draggable({
            cancel: false
        });

    function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    };

    function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    };
    

    // Initialize with default options

    $( "#resizable" ).resizable({
      animate: true
    });
 

  });

$.event.special.hoverintent = {
    setup: function() {
      $( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
    },
    teardown: function() {
      $( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
    },
    handler: function( event ) {
      var currentX, currentY, timeout,
        args = arguments,
        target = $( event.target ),
        previousX = event.pageX,
        previousY = event.pageY;
 
      function track( event ) {
        currentX = event.pageX;
        currentY = event.pageY;
      };
 
      function clear() {
        target
          .unbind( "mousemove", track )
          .unbind( "mouseout", clear );
        clearTimeout( timeout );
      }
 
      function handler() {
        var prop,
          orig = event;
 
        if ( ( Math.abs( previousX - currentX ) +
            Math.abs( previousY - currentY ) ) < 7 ) {
          clear();
 
          event = $.Event( "hoverintent" );
          for ( prop in orig ) {
            if ( !( prop in event ) ) {
              event[ prop ] = orig[ prop ];
            }
          }

          delete event.originalEvent;
 
          target.trigger( event );
        } else {
          previousX = currentX;
          previousY = currentY;
          timeout = setTimeout( handler, 100 );
        }
      }
 
      timeout = setTimeout( handler, 100 );
      target.bind({
        mousemove: track,
        mouseout: clear
      });
    }
  };
