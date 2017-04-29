

function NeuralNetDisplay (neuralNet){
this.neuralNet = neuralNet;

 // NOT SURE WHY IT DOESNT WORK; error: this.pSetup is not a function
startDisplay = function(display){
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
}

this.setupNodes = function (p){

  var inputNodes = []; //add input nodes
  var r = p.random(170); //random color
  var g = p.random(170);
  var b = p.random(170);
  for(var i = 0; i < this.neuralNet.nInputs; i++){
    var border = 100;
    var ySpacing = p.min((p.height-border*2)/(this.neuralNet.nInputs-1), 200);
    var yOffset = (p.height - ySpacing * (this.neuralNet.nInputs-1))/2;
    var n = new Node(150, yOffset + ySpacing*i, [], [], []);
    n.r = r;
    n.g = g;
    n.b = b;
    n.text = "Input " + (i+1);
    inputNodes.push(n);
  }
  this.nodes.push(inputNodes);


  var previousLayer = inputNodes;
  var currentLayer = [];
  for(var i = 0; i <this.neuralNet.weights.length; i++){ //create nodes for the layers
    var border = 100;
    var ySpacing = p.min((p.height-border*2)/(this.neuralNet.weights[i].length-1), 200); //spacing between nodes
    var yOffset = (p.height - ySpacing * (this.neuralNet.weights[i].length-1))/2;
    var r = p.random(170); //random color per layer
    var g = p.random(170);
    var b = p.random(170);

    for(var j = 0; j < this.neuralNet.weights[i].length; j++){
      node = new Node(300 + i*150, yOffset + ySpacing*j, previousLayer, this.neuralNet.weights[i][j], this.neuralNet.biases[i][j]);
      node.r = r;
      node.g = g;
      node.b = b;
      node.text = "N" + (j+1);
      currentLayer.push(node);
    }
    this.nodes.push(currentLayer);
    previousLayer = currentLayer;
    currentLayer = [];
  }
  for(var i = 0; i < this.nodes.length-1; i++){
    for(var j = 0; j < this.nodes[i].length; j++){
      this.nodes[i][j].forwardLayer = this.nodes[i+1];
    }
  }
}

this.nodes = []; //3d array; nodes[2][3] retrieves the 4th node in layer 3
this.pSelectedNode;
this.pSetup = function(p){
  p.createCanvas(1100, 600);
  this.pSelectedNode = p.createP("Click on a node to see its weights and bias");
  this.pSelectedNode.style("float", "left");
  this.pSelectedNode.style("margin-right", "1cm");
  this.pSelectedNode.style("width", "5cm");
  this.pSelectedNode.style("text-align", "center");
  //var net = new NeuralNet();
  //net.initializeLayers(3, [4, 6, 2, 5]);
  //this.setupNodes(p); //setup nodes
  this.setupNodes(p);
  console.log(this.nodes[0]);
}


 this.pDraw = function(p){
  p.background(248);
  p.ellipseMode(p.CENTER);
  p.rectMode(p.CENTER);
  p.textAlign(p.CENTER);
  for(var i = 0; i < this.nodes.length; i++){
    for(var j = 0; j < this.nodes[i].length; j++){
      this.nodes[i][j].drawConnections(p);
    }
  }
  for(var i = 0; i < this.nodes.length; i++){
    p.fill(0);
    var txt = i==0? "Input layer" : "Layer " + i;
    p.noStroke();
    p.textSize(16);
    p.text(txt, 150 + i * 150, 40);
    for(var j = 0; j < this.nodes[i].length; j++){
      this.nodes[i][j].drawNode(p);
    }
  }
}

this.selectedNode = null;
this.pMousePressed =  function (p){
  for(var i = 0; i < this.nodes.length; i++){
    for(var j = 0; j < this.nodes[i].length; j++){
      var node = this.nodes[i][j];
      var dist = p.sqrt(p.pow(p.mouseX - node.x, 2) + p.pow(p.mouseY - node.y, 2));
      var dColor = 70;

      if(dist <= node.radius){
        if(this.selectedNode != null){
          this.selectedNode.isSelected = false;
          this.selectedNode.r -= dColor;
          this.selectedNode.g -= dColor;
          this.selectedNode.b -= dColor;
        }
        node.isSelected = true;
        node.r += dColor;
        node.g += dColor;
        node.b += dColor;
        this.selectedNode = node;

        this.selectedNode.startForwardAnimation(); //temp test

        var s = "";
        if(node.weights.length > 0){
        for(var k =  0; k < node.weights.length; k++){
          s += "w" + (k+1) + " = " + math.round(node.weights[k]*10000)/10000 + "<br/>"; //round to the nearest ten thousandth
        }
        s += "bias" + " = " + math.round(node.bias*10000)/10000;
      }
      else{
        s = "Input node"
      }
        this.pSelectedNode.html(s);
      }

    }
  }
}
}
