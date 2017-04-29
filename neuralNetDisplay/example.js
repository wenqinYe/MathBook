var net = new NeuralNet();
net.initializeLayers(3, [4, 6, 2, 5]);
var display = new NeuralNetDisplay(net); //create instance of display
startDisplay(display);
/*
var myp5 = new p5(function(p){
  p.setup = function(){
    display.pSetup(p);
  }
  p.draw = function(){
    display.pDraw(p);
  }
  p.mousePressed = function(){
    display.pMousePressed(p);
  }
});
*/
