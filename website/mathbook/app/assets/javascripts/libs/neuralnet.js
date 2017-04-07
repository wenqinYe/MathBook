X = ["log"];
Y = [""]

l1 = math.random([200, 20], -1, 1)
l2 = math.random([4, 200], -1, 1)
layers = [l1, l2]

b1 = math.random([200], -1, 1)
b2 = math.random([4], -1, 1)
biases = [b1, b2]
sigmoids = []

function sigmoid(vector) {
    return vector.map(function(value, index, matrix) {
        return 1 / (1 + Math.exp(-value))
    });
}

var forward = function(input) {
    sigmoids = [];

    var previous = input
    var output;
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var bias = biases[i];

        output = math.multiply(layer, previous);
        outout = math.add(output, bias)
        output = sigmoid(output)

        sigmoids.push(output)

        previous = output
    }

    return output
}

var backprop = function(output, expected) {
    //error calculation
    var back = math.subtract(output, expected);
    back = math.multiply(-1, back)

    //back prop through hidden layers
    for (var i = sigmoids.length - 1; i >= 0; i--) {
        //derivative of a sigmoid function
        sigmoids[i] = sigmoids[i].map(function(value, index, matrix) {
            return value * (1 - value)
        });

        //dot multiply is elementwise multiplication
        back = math.dotMultiply(back, sigmoids[i])


        var previous = [];
        for(var j = 0; j < back.length; j++){
          previous.push(sigmoids[i-1])
        }
        previous = math.transpose(previous)
        back = math.multiply(previous, back)

        console.log(back)
        console.log(layers[i])
        layers[i] = math.add(math.transpose(back), layers[i])
        console.log(layers[i])
    }

}

out = forward(math.random([20]))
console.log(out)
backprop(out, math.zeros([4]))
