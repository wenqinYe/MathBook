X = ["log"];
Y = [""]

w1 = math.random([3, 2], -1, 1)
w2 = math.random([1, 3], -1, 1)
weights = [w1, w2]

b1 = math.random([3], -1, 1)
b2 = math.random([1], -1, 1)
biases = [b1, b2]

outputs = []

function sigmoid(vector) {
    return vector.map(function(value, index, matrix) {
        return 1 / (1 + Math.exp(-value))
    });
}

var forward = function(input) {
    sigmoids = [];

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
    var back = math.subtract(output, expected);
    back = math.multiply(-1, back)

    //back prop through hidden layers
    for (var i = outputs.length - 1; i >= 0; i--) {
        console.log(i)
        //derivative of a sigmoid function
        outputs[i] = outputs[i].map(function(value, index, matrix) {
            return value * (1 - value)
        });

        //dot multiply is elementwise multiplication
        back = math.dotMultiply(back, outputs[i])
        console.log("back: ")
        console.log(back)

        previous = math.transpose(previous)
        console.log("previous: " )
        console.log(previous)
        back = math.multiply(previous, back)

        weights[i] = math.add(math.transpose(back), weights[i])
        console.log(layers[i])
    }

}



out = forward(math.random([2]))
console.log(out)
backprop(out, math.zeros([1]))
