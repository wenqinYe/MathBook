X = ["log"];
Y = [""]

w1 = math.random([3, 2], -1, 1)
w2 = math.random([2, 3], -1, 1)
weights = [w1, w2]

b1 = math.random([3], -1, 1)
b2 = math.random([2], -1, 1)
biases = [b1, b2]

outputs = []

function sigmoid(vector) {
    return vector.map(function(value, index, matrix) {
        return 1 / (1 + Math.exp(-value))
    });
}

var forward = function(input) {
    var previous = input
    var output;
    for (var i = 0; i < weights.length; i++) {
        var weight = weights[i];
        var bias = biases[i];

        output = math.multiply(weight, previous);
        outout = math.add(output, bias)
        output = sigmoid(output)

        outputs.push(output)

        previous = output
    }

    return output
}

var backprop = function(output, expected) {
    //error calculation
    var dOutput = math.subtract(expected, output);

    //back prop through hidden layers
    for (var i = outputs.length - 1; i > 0; i--) {

        //finds the derivative of the output for each output
        outputs[i] = outputs[i].map(function(value, index, matrix) {
            return value * (1 - value)
        });

        //dot multiply is elementwise multiplication
        //the derivative of output w.r.t the inputs is just the
        //sigmoid derivative calculated earlier
        var dSum = math.dotMultiply(dOutput, outputs[i])
        var inputs = outputs[i-1];
        var dW = math.multiply(math.transpose([dSum]), [inputs])

        weights[i-1] = math.add(dW, weights[i-1])

        var gradients = math.transpose(dW)
        dOutput = []
        for(var j = 0; j < gradients.length; j++){
          dOutput.push(math.sum(gradients[j]))
        }
    }
}

var openFile = function(path){
  console.log("opening file")
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", path)
  rawFile.onreadystatechange = function(){
    console.log(rawFile.readystate)
    if(rawFile.readystate === 4){
      if(rawFile.status == 200 || rawFile.status == 0){
        console.log(rawFile.responseText);
      }
    }
  }
}

openFile("/app/assets/data/training_set_rel3.tsv")


// input = math.random([2])
// outputs.push(input)
// out = forward(input)
// console.log(out)
//
// for(var i =0; i < 100; i++){
//   console.log("----" +i+"------")
//   outputs = [];
//   outputs.push(input)
//   out = forward(input)
//   console.log(out)
//   backprop(out, [0.3, 1])
// }
