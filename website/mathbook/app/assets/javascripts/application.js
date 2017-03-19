// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).on('input',
    function(event) {
        var j = new JWMathParser
        var sIn = String($("#txtIn").val());

        var formattedKatex = j.convertText(sIn)

        katex.render(formattedKatex, $("#divOut").get(0), {
            displayMode: true
        })

        $("#mathjax-output").html("$$" + formattedKatex + "$$")
        $("#mathjax-code-display #latex-code").html(formattedKatex)

        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "mathjax-output"],
          function() {
            var svg = $(".MathJax_SVG svg")[0];

            if(svg){
              var svgData = new XMLSerializer().serializeToString( svg );
              //get svg data into a temporary image
              var imgSrc = "data:image/svg+xml;base64," + btoa( svgData);

              var canvas = document.createElement('canvas');
              context = canvas.getContext("2d");

              var image = new Image;
              image.src = imgSrc;

              context.canvas.width = image.width;
              context.canvas.height = image.height;
              image.onload = function(){
                context.drawImage(image, 0, 0);//draw the svg image on a canvas
                var canvasdata = canvas.toDataURL("image/png");//get the canvas as png
                $("#svg-img-out").attr("src", canvasdata); //set the png data in an img tag to display as png
                canvas = null;
              };

            }
          });

        });
