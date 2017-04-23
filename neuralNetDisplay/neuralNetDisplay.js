
function Node(x, y, connections, weights, bias){
  this.x = x;
  this.y = y;
  this.connections = connections;
  this.weights = weights;
  this.bias = bias;
  this.text = "";
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
  this.radius = 25;
  this.isSelected = false;

  this.drawNode = function(){
    stroke(this.r, this.g, this.b);
    fill(this.r+90, this.g+90, this.b+90);

    this.radius = this.isSelected?27:25;
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
    fill(0);
    textSize(12);
    text(this.text, this.x, this.y);
  }

  this.drawConnections = function(){
    strokeWeight(this.isSelected?3:1);
    stroke(this.r, this.g, this.b);
    for(var i = 0; i < this.connections.length; i++){
      line(this.x, this.y, this.connections[i].x, this.connections[i].y);
    }

  }
}

function setupNodes(neuralNet){

  var inputNodes = []; //add input nodes
  var r = random(170); //random color
  var g = random(170);
  var b = random(170);
  for(var i = 0; i < neuralNet.nInputs; i++){
    var border = 100;
    var ySpacing = min((height-border*2)/(neuralNet.nInputs-1), 200);
    var yOffset = (height - ySpacing * (neuralNet.nInputs-1))/2;
    var n = new Node(150, yOffset + ySpacing*i, [], [], []);
    n.r = r;
    n.g = g;
    n.b = b;
    n.text = "Input " + (i+1);
    inputNodes.push(n);
  }
  nodes.push(inputNodes);


  var previousLayer = inputNodes;
  var currentLayer = [];
  for(var i = 0; i <neuralNet.weights.length; i++){ //create nodes for the layers
    var border = 100;
    var ySpacing = min((height-border*2)/(neuralNet.weights[i].length-1), 200); //spacing between nodes
    var yOffset = (height - ySpacing * (neuralNet.weights[i].length-1))/2;
    var r = random(170); //random color per layer
    var g = random(170);
    var b = random(170);

    for(var j = 0; j < neuralNet.weights[i].length; j++){
      node = new Node(300 + i*150, yOffset + ySpacing*j, previousLayer, neuralNet.weights[i][j], neuralNet.biases[i][j]);
      node.r = r;
      node.g = g;
      node.b = b;
      node.text = "N" + (j+1);
      currentLayer.push(node);
    }
    nodes.push(currentLayer);
    previousLayer = currentLayer;
    currentLayer = [];
  }
}

var nodes = [];
var pSelectedNode;
function setup(){
  createCanvas(1100, 600);
  pSelectedNode = createP("Click on a node to see its weights and bias");
  pSelectedNode.style("float", "left");
  pSelectedNode.style("margin-right", "1cm");
  pSelectedNode.style("width", "5cm");
  pSelectedNode.style("text-align", "center");
  var net = new NeuralNet();
  net.initializeLayers(3, [4, 6, 2, 5]);
  setupNodes(net); //setup nodes
  console.log(nodes[0]);
}


function draw(){
  background(248);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER);
  for(var i = 0; i < nodes.length; i++){
    for(var j = 0; j < nodes[i].length; j++){
      nodes[i][j].drawConnections();
    }
  }
  for(var i = 0; i < nodes.length; i++){
    fill(0);
    var txt = i==0? "Input layer" : "Layer " + i;
    noStroke();
    textSize(16);
    text(txt, 150 + i * 150, 40);
    for(var j = 0; j < nodes[i].length; j++){
      nodes[i][j].drawNode();
    }
  }
}

var selectedNode = null;
function mousePressed(){
  for(var i = 0; i < nodes.length; i++){
    for(var j = 0; j < nodes[i].length; j++){
      var node = nodes[i][j];
      var dist = sqrt(pow(mouseX - node.x, 2) + pow(mouseY - node.y, 2));
      var dColor = 70;

      if(dist <= node.radius){
        if(selectedNode != null){
          selectedNode.isSelected = false;
          selectedNode.r -= dColor;
          selectedNode.g -= dColor;
          selectedNode.b -= dColor;
        }
        node.isSelected = true;
        node.r += dColor;
        node.g += dColor;
        node.b += dColor;
        selectedNode = node;


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
        pSelectedNode.html(s);
      }

    }
  }

}
