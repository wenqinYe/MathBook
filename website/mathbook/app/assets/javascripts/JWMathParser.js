function JWMathParser() {

    this.routine = {};
    this.routine["->"] = function(item1, item2) {
        return [item1, " \\to ", item2]
    }
    this.routine["="] = function(item1, item2) {
        return item1 + "=" + item2
    }
    this.routine[">"] = function(item1, item2) {
        return item1 + ">" + item2
    }
    this.routine["+"] = function(item1, item2) {
        return item1 + "+" + item2
    }
    this.routine["-"] = function(item1, item2) {
        return item1 + "-" + item2
    }
    this.routine["*"] = function(item1, item2) {
        return item1 + "\\cdot " + item2
    }
    this.routine["/"] = function(item1, item2) {
        return "\\frac{" + item1 + "}{" + item2 + "}"
    }
    this.routine["NONE"] = function(item1, item2) {}
    this.routine["sqrt"] = function(item1, item2) {
        return item1 + " \\sqrt{" + item2 + "}"
    }
    this.routine["delta"] = function(item1, item2) {
        return item1 + "\\Delta" + item2
    }
    this.routine["integral"] = function(item1, item2) {
        return item1 + "\\int " + item2
    }
    this.routine["pi"] = function(item1, item2) {
        return item1 + " \\pi " + item2
    }
    this.routine["epsilon"] = function(item1, item2) {
        return item1 + " \\varepsilon " + item2
    }
    this.routine["phi"] = function(item1, item2) {
        return item1 + " \\varphi " + item2
    }
    this.routine["omega"] = function(item1, item2) {
        return item1 + " \\Omega " + item2
    }
    this.routine["infty"] = function(item1, item2) {
        return item1 + " \\infty " + item2
    }
    this.routine["infinity"] = function(item1, item2) {
        return item1 + " \\infinity " + item2
    }
    this.routine["sum"] = function(item1, item2) {
        return [item1, " \\sum", item2]
    }
    this.routine["to"] = function(item1, item2) {
        return [item1, " \\to ", item2]
    }
    this.routine["sigma"] = function(item1, item2) {
        return [item1, " \\sigma ", item2]
    }
    this.routine["pm"] = function(item1, item2) {
        return [item1, " \\pm", item2]
    }
    this.routine["plus or minus"] = function(item1, item2) {
        return [item1, " \\pm", item2]
    }
    this.routine["plusorminus"] = function(item1, item2) {
        return [item1, " \\pm", item2]
    }
    this.routine["plusminus"] = function(item1, item2) {
        return item1 + " \\pm " + item2
    }
    this.routine["partial"] = function(item1, item2) {
        return item1 + " \\partial " + item2
    }

    /* This causes some bugs with the tokenizign function */
    // this.routine["↵"] = function(item1, item2) {
    //     return item1 + " \\newline " + item2
    // }

    this.routine["=>"] = function(item1, item2) {
        return item1 + " \\Rightarrow " + item2
    }
    this.routine["implies"] = function(item1, item2) {
        return item1 + " \\Rightarrow " + item2
    }
    this.routine["sin"] = function(item1, item2) {
        return item1 + " \\sin " + item2
    }
    this.routine["cos"] = function(item1, item2) {
        return item1 + " \\cos " + item2
    }
    this.routine["tan"] = function(item1, item2) {
        return item1 + " \\tan " + item2
    }
    this.routine["lim"] = function(item1, item2) {
        return item1 + " \\lim " + item2
    }
    this.routine["lim"] = function(item1, item2) {
        return item1 + " \\lim " + item2
    }
    this.routine["hat"] = function(item1, item2) {
        return "\\hat " + item1 + " " + item2
    }
    this.routine["xi"] = function(item1, item2) {
        return item1 + " \\xi " + item2
    }
    this.keywords = ["/", "sqrt", "delta", "int", "integral", "infinity", "pi", "infty", "epsilon", "phi", "sum", "omega", "->", "sigma", "pm", "plus or minus", "plusminus", "plusorminus", "partial", "=>", "implies", "sin", "tan", "cos", "lim", "limit", "to", "hat", "xi", "beta", "alpha", "gamma"]


    /** Mathematical notation **/
    this.routine["int"] = function(item1, item2) {
        return item1 + "\\int" + item2
    }


    /** Greek Symbols **/
    this.routine["alpha"] = function(item1, item2) {
        return item1 + "\\alpha" + item2
    }
    this.routine["beta"] = function(item1, item2) {
        return item1 + "\\beta" + item2
    }
    this.routine["gamma"] = function(item1, item2) {
        return item1 + "\\gamma" + item2
    }

    /** Standard Operations **/
    this.routine["^"] = function(item1, item2) {
        return item1 + "^" + "{" + item2 + "}"
    }
    this.routine["_"] = function(item1, item2) {
        return item1 + "_" + "{" + item2 + "}"
    }

    this.isOperator = function(str) {
        return this.routine[str] !== undefined;
    }


    /** Brackets **/
    // this.routine["("] = function(item1, item2){
    //   return [item1, " ( ", item2]
    // }
    // this.routine[")"] = function(item1, item2){
    //   return [item1, " ) ", item2]
    // }

    this.isNumber = function(str) {
        return !isNaN(str);
    }

    this.isAlphabeticalCharacter = function(str) {
        return /^[a-zA-Z()]+$/.test(str);
    }

    this.popNonEmpty = function(stack) {
        var output = stack.pop();
        while (output !== undefined && output === "") {
            var output = stack.pop();
        }
        return output
    }

    function parseNumbers(str) {
        var out = [];
        var isNumber = false;
        var number = "";
        for (var i = 0; i < str.length; i++) {
            var c = str[i];
            if (!isNaN(c) || c == ".") { // if current is a number OR has a decimal place
                number += c;
            } else { //not a number/decimal, just add onto output, clear out number
                if (number != "") {
                    out.push(number);
                    number = "";
                }
                out.push(c);
            }
        }
        if (number != "") { //in case last thing is a number
            out.push(number);
        }
        return out;
    }


    /**
     * Takes a bracketed math string, and splits it into
     * a nested array representation. Example:
     * {3x+2^{3x}}/{3x} ->
     * ["3", "x", "2", "^",["3", "x"], "/", ["3", "x"]]
     *
     * @return a nested array representation of a math string
     */
    this.tokenize = function(str) {
        //keeps track of the current nested array
        //that the loop is in
        var stack = []; //keeps track of the nested array hierarchy
        var output = []; //the output

        //Note that javascript variable assignments
        //refer back to the original object and do
        //NOT create a new object.
        //Therefore appending to the current variable
        //will append to the original variable because
        //they are the same
        stack.push(output)
        var current = output; //stays on the current nested array
        var str = parseNumbers(str); //keeps digits together compared to str.split("")

        for (var i = 0; i < str.length; i++) {
            current = stack[stack.length - 1];
            if (str[i] == "{") {
                current.push([]);
                stack.push(current[current.length - 1]);
                current = stack[stack.length - 1]
            } else if (str[i] == "}") {
                stack.pop();
                current = stack[stack.length - 1]
                //adding the extra character after closing
                //is right now a quick "monkey patch" so that
                //the bracket doesn't interfere with the next character
                current.push("")
            } else {
                current.push(str[i]);
            }
        }

        output = this.tokenizeKeywords(output)
        return output
    }

    /*
     * Assumes math follows the format:
     * number(s) operator number(s).
     *
     * It will fail if there is an operator
     * with no number beside it.
     */
    this.formattedToKatex = function(tokenized_array) {
        if (tokenized_array == undefined || tokenized_array.length == 1) {
            return tokenized_array;
        }
        if (tokenized_array.constructor == String) {
            return [tokenized_array]
        }

        var output = [];
        var queue = tokenized_array;

        while (queue.length > 0) {
            var token = queue.splice(0, 1)[0];
            if (token.constructor == Array) {
                output.push(this.formattedToKatex(token))
            } else if (this.isOperator(token)) {
                var previous = this.popNonEmpty(output) || ""
                var after = this.formattedToKatex(queue.splice(0, 1)[0]) || "";
                var result = this.routine[token](previous, after);
                output = output.concat(result);
            } else {
                output.push(token);
            }
        }
        return "{" + output.join("") + "}";
    }

    /**
     * The looks for keywords in a char array at a particular starting indx
     * @param keyword - Keyword to look for
     * @param array - Character array
     * @return match - if the keyword has been found
     */
    this.scanKeywordAtIndex = function(keyword, char_array, index) {
        var match = true;
        var split_keyword = keyword.split("");
        for (var j = 0; j < split_keyword.length; j++) {
            if (char_array[index + j] !== split_keyword[j].trim()) {
                match = false;
            }
        }
        return match
    }
    this.tokenizeKeywords = function(char_array) {
        var output = [];
        for (var i = 0; i < char_array.length; i++) {
            if (char_array[i].constructor === Array) {
                output.push(this.tokenizeKeywords(char_array[i]))
                continue;
            }
            output.push(char_array[i])
            for (var j = 0; j < this.keywords.length; j++) {
                var keyword = this.keywords[j]
                var match = this.scanKeywordAtIndex(keyword, char_array, i);
                if (match) {
                    output.pop()
                    output.push(keyword);
                    i += keyword.split("").length - 1
                    break
                }
            }
        }
        return output;
    }

}

$(document).on('input',
    function(event) {
        var j = new JWMathParser
        var sIn = String($("#txtIn").val());
        console.log(sIn);
        console.log("tokenized")
        console.log(j.tokenize(sIn))

        var formattedKatex = j.formattedToKatex(j.tokenize(sIn))
        console.log(formattedKatex)
        katex.render(formattedKatex, $("#divOut").get(0), {
            displayMode: true
        })
    });

// m = new JWMathParser()
// tokenized = m.tokenize("2+sqrt{3x+2+sqrt{2+y}+1}")
// console.log(tokenized)
// console.log(m.tokenizeKeywords(tokenized))
