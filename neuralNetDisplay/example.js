var net = new NeuralNet();
net.initializeLayers(3, [4, 6, 2, 5]);
var display = new NeuralNetDisplay(net); //create instance of display
startDisplay(display, "divOutput"); //put the display in "divOutput"
