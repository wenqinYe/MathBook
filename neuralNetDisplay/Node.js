function Node(x, y, connections, weights, bias){
  this.x = x;
  this.y = y;
  this.connections = connections;
  this.weights = weights;
  this.bias = bias;
  this.text = "";
  this.r = Math.random() * 255;
  this.g =  Math.random() * 255;
  this.b =  Math.random() * 255;
  this.radius = 25;
  this.isSelected = false;

  this.drawNode = function(p){
    p.stroke(this.r, this.g, this.b);
    p.fill(this.r+90, this.g+90, this.b+90);

    this.radius = this.isSelected?27:25;
    p.ellipse(this.x, this.y, this.radius*2, this.radius*2);
    p.fill(0);
    p.textSize(12);
    p.text(this.text, this.x, this.y);
  }

  this.drawConnections = function(p){
    p.strokeWeight(this.isSelected?3:1);
    p.stroke(this.r, this.g, this.b);
    for(var i = 0; i < this.connections.length; i++){
      p.line(this.x, this.y, this.connections[i].x, this.connections[i].y);
    }

    //draw output ellipse animation if animating
    if(this.isAnimating){
      if(this.animationCount >=1){
        this.isAnimating = false;
      }
      for(var i = 0; i < this.connections.length; i++){ //connections are node from the PREVIOUS layer
        var node = this.connections[i];
        var x = p.lerp(node.x, this.x, this.animationCount);
        var y = p.lerp(node.y, this.y, this.animationCount);

        p.stroke(node.r, node.g, node.b);
        p.fill(node.r+90, node.g+90, node.b+90);
        p.ellipse(x, y, 10, 10);
      }
      if(this.animationCount >= 1 && this.forwardLayer != undefined){
        for(var i = 0; i < this.forwardLayer.length; i++){
          this.forwardLayer[i].startForwardAnimation();
        }
      }
      this.animationCount += 0.01;
    }
  }

  this.animationCount = 0;
  this.isAnimating = false;
  this.isAnimatingForward = true;
  this.forwardLayer = null;
  this.startForwardAnimation = function(){
    if(!this.isAnimating){
      this.isAnimating = true;
      this.isAnimatingForward = true;
      this.animationCount = 0;
    }
  }
}
