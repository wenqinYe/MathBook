function JWMathParser() {

    this.routine = {};
    /** Standard Operations **/
    this.routine["^"] = function(item1, item2) {
        return item1 + "^" + "{" + item2 + "}"
    }
    this.routine["_"] = function(item1, item2) {
        return item1 + "_" + "{" + item2 + "}"
    }
    this.routine["/"] = function(item1, item2) {

        return "\\frac{" + item1 + "}{" + item2 + "}"
    }
    this.routine["sqrt"] = function(item1, item2) {
        return [item1, " \\sqrt{" + item2 + "} "]
    }

    /* Text is kind of broken right now */
    this.routine["text"] = function(item1) {
        if (item1.trim() == "\\right)" || item1.trim() == "\\right." || item1.trim() == "\\right}" || item1.trim() == "\\right]") {
            return " \\text{} " + item1
        } else {
            return " \\text{" + item1 + "} "
        }
    }
    this.routine["mathrm"] = function(item1) {
        if (item1.trim() == "\\right)" || item1.trim() == "\\right." || item1.trim() == "\\right}" || item1.trim() == "\\right]") {
            return " \\text{} " + item1
        } else {
            return " \\text{" + item1 + "} "
        }
    }

    this.keywordKatexEquivalent = {
        /**** Routines that we don't want to convert just yet ****/
        "sqrt": "sqrt",
        "text": "text",
        "mathrm": "mathrm",
        "over": "/",


        /****** Vectors *****/
        "hat": " \\hat ",
        "vec": " \\vec ",
        "vector": " \\vec ",

        /****** Calculus Operators*****/
        "sum": " \\sum ",
        "int": " \\int ",
        "prod": " \\prod ",
        "product": " \\prod ",
        "integral": " \\int ",
        "intint": " \\iint ",
        "int int": " \\iint ",

        /****** Greek Letters *****/
        "Delta": " \\Delta ",
        "Gamma": " \\Gamma ",
        "Lamda": " \\Lamda",
        "Omega": " \\Omega ",
        "Phi": " \\Phi ",
        "Psi": " \\Psi",
        "Sigma": " \\Sigma ",
        "Theta": " \\Theta ",
        "Xi": " \\Xi ",


        "alpha": " \\alpha ",
        "beta": " \\beta ",
        "chi": " \\chi ",
        "delta": " \\delta ",
        "epsilon": " \\epsilon ",
        "varepsilon": " \\varepsilon ",
        "eta": " \\eta ",
        "gamma": " \\gamma ",
        "iota": " \\iota ",
        "kappa": " \\kappa ",
        "lambda": " \\lambda ",
        "lamda": " \\lambda ",
        "mu": " \\mu ",
        "nu": " \\nu ",
        "omega": " \\omega ",
        "phi": " \\phi ",
        "varphi": " \\varphi ",
        "pi": " \\pi ",
        "psi": " \\psi ",
        "rho": " \\rho ",
        "sigma": " \\sigma ",
        "tau": " \\tau ",
        "theta": " \\theta ",
        "vartheta": " \\vartheta ",
        "upsilon": " \\upsilon ",
        "xi": " \\xi ",
        "zeta": " \\zeta ",

        /****** Special Functions *****/
        "lim": " \\lim ",
        "limit": " \\lim ",
        "sin": " \\sin ",
        "cos": " \\cos ",
        "tan": " \\tan ",
        "ln": " \\ln ",
        "log": " \\log ",
        "cot": " \\cot ",
        "sec": " \\sec ",
        "csc": " \\csc ",

        "max": " \\max ",
        "arg": " \\arg ",

        /****** Special symbols and notation *****/
        "*": " \\cdot ",
        "choose": " \\choose ",

        "times": " \\times ",
        "dividedby": " \\div ",
        "divide": " \\div ",

        "plusminus": " \\pm ",
        "plusrorminus": " \\pm ",
        "pm": " \\pm ",
        "+-": " \\pm ",

        "minusplus": " \\mp ",
        "minusorplus": " \\mp ",
        "mp": " \\mp ",

        "to": " \\to ",
        "->": " \\to ",
        "=>": " \\Rightarrow ",
        "implies": " \\Rightarrow ",

        "pi": " \\pi ",

        // Not doesn't work...
        // "not": "\\not",

        // \cup \cap \setminus \subset \subseteq \subsetneq \supset \in \notin \emptyset \varnothing
        "union": " \\cup ",
        "cup": " \\cup ",
        //intersection doesn't work algorithm thinks it's "int" and "sec"
        "intersection": " \\cap",
        "cap": " \\cap ",
        "for": " \ | \ ",
        "suchthat": " \ | \ ",
        "set": " \\in ",
        "setof": " \\in ",
        "in": " \\in ",
        "emptyset": " \\emptyset ",
        "empty": " \\emptyset ",


        // \land \lor \lnot \forall \exists \top \bot \vdash \vDash
        "land": " \\land ",
        "lor": " \\lor ",
        "forall": " \\forall ",
        "not ": " \\not ",
        "bot": " \\bot",
        "perpendicular": " \\bot ",
        "forall": " \\forall ",

        // \approx \sim \simeq \cong \equiv \prec \lhd
        "land": " \\land ",
        "lor": " \\lor ",
        "forall": " \\forall ",
        "not ": " \\not ",
        "bot": " \\bot",
        "perpendicular": " \\bot ",
        "forall": " \\forall ",

        // nabla \partial
        "nabla": " \\nabla ",
        "partial": " \\partial ",
        // \Im \Re
        "imaginarynumbers": " \\Im ",
        "im": " \\Im ",
        "imaginary": " \\Im ",
        "reals": " \\Re ",
        "realnumbers": " \\Re ",
        "real": " \\Re ",

        // \infty \aleph_0
        "infty": " \\infty ",
        "infinity": " \\infty ",
        "mod": " \\pmod ",
        "equiv": " \\equiv ",
        "equivalent": " \\equiv ",



        /* Less than, greater than etc. */
        "lessthan": " \\lt ",
        "greaterthan": " \\gt ",
        "lt": " \\lt ",
        "gt": " \\gt ",
        "lte": " \\le ",
        "gte": " \\ge ",
        "le": " \\le ",
        "ge": " \\ge ",
        "<=": " \\le ",
        ">=": " \\ge ",
        "!=": " \\ne ",
        "ne": " \\ne ",

        /* Trig functions and log */
        "tan": " \\tan ",
        "ln": " \\ln ",
        "log": " \\log ",
        "cot": " \\cot ",
        "sec": " \\sec ",
        "csc": " \\csc ",
        "sinh": " \\sinh ",
        "cosh": " \\cosh ",
        "tanh": " \\tanh ",
        "csch": " \\csch ",
        "sech": " \\text{sech} ",
        "coth": " \\coth ",

        /* Brackets */
        "(": " \\left( ",
        ")": " \\right) ",
        "[": " \\left[ ",
        "]": " \\right] ",

        "INVISIBLE_CLOSING_BRACKET": " \\right. ",
        "INVISIBLE_OPENING_BRACKET": " \\left. ",

    }

    /*
    Sorting the keywrods is important because it ensures that
    longer keywords are evaluated before shorter ones. If this
    does not happen things like:  "logarithm" will be evaluated as
    ["log", "a", "r", "i", "t", "h", "m"] instead of ["logarithm"]
    because the code just sees "log" and stops.
    */
    this.keywords = [];
    for (var keyword in this.keywordKatexEquivalent) {
        this.keywords.push(keyword);
    }
    //sort by character length in descending order
    this.keywords.sort(function(a, b) {
        return b.length - a.length
    });

    this.isNumber = function(str) {
        return !isNaN(str);
    }

    this.isAlphabeticalCharacter = function(str) {
        return /^[a-zA-Z()]+$/.test(str);
    }

    this.isOperator = function(str) {
        return this.routine[str] !== undefined;
    }

    this.isKeyword = function(str) {
        return this.keywordKatexEquivalent[str] !== undefined;
    }

    this.popNonEmpty = function(stack) {
        var output = stack.pop();
        while (output.constructor !== Array && output !== undefined && output.trim() === "") {
            var output = stack.pop();
        }
        return output
    }

    this.dequeueNonEmpty = function(queue){
      var output = queue.splice(0, 1)[0] || ""
      while(output.constructor !== Array && output.trim() === ""){
        output = queue.splice(0, 1)[0]
      }
      return output
    }

    //traverses the entire array and subarrays and joins the elements
    this.recursiveJoin = function(arr) {
        var output = "";
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].constructor == String) {
                output += arr[i];
            }
            if (arr[i].constructor == Array) {
                output += this.recursiveJoin(arr[i]);
            }
        }

        return output;
    }

    /** Do some stuff with the user's text before anything else happens.
    This function currently places curly brackets around round brackets
    **/
    this.preProcess = function(str) {
        //cheap way to test if brackets are all paired
        if (str.split("(").length !== str.split(")").length) {
            return str;
        }
        if (str != undefined) {
            for (var i = 0; i < str.length; i++) {
                if (str[i] == "(") { //insert "{" to the left of "("
                    str = str.substring(0, i) + "{" + str.substring(i, str.length);
                    i++;
                }
                if (str[i] == ")") { //insert "}" to the right of ")"
                    str = str.substring(0, i + 1) + "}" + str.substring(i + 1, str.length);
                    i++;
                }
            }
        }

        return str;
    }

    /*
    Same as str.split("") but keeps numbers together and stuff like
    3x or 200x together.
    */
    this.parseNumbers = function(str) {
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

        //group things like "2x" or "3a" together
        for (var i = 0; i < out.length - 1; i++) {
            if (this.isNumber(out[i]) && this.isAlphabeticalCharacter(out[i + 1])) {
                out[i] = out[i] + out[i + 1];
                out.splice(i + 1, 1);
            }
        }
        return out;
    }

    var closeMissingBrackets = function(tokenized_array) {
        return tokenized_array
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
            if (char_array[index + j] === undefined) {
                match = false;
                continue
            }
            if (char_array[index + j].trim() !== split_keyword[j].trim()) {
                match = false;
            }
        }
        return match
    }
    /**
     * The looks for keywords in a char array and groups them
     * @param char_array - an array of characters
     * @return output - the same array of characters but with keywords
     *                  like "integral" grouped together as one element
     */
    this.tokenizeKeywords = function(char_array) {
        var output = [];
        for (var i = 0; i < char_array.length; i++) {
            if (char_array[i].constructor === Array) {
                output.push(this.tokenizeKeywords(char_array[i]))
                continue;
            }
            output.push(char_array[i])

            for (var j = 0; j < this.keywords.length; j++) {
                var keyword = this.keywords[j];
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
        var str = this.parseNumbers(str); //same as str.split("") but keeps digits of the same number together and also keeps stuff like 20x together

        var str = this.tokenizeKeywords(str)

        for (var i = 0; i < str.length; i++) {
            current = stack[stack.length - 1];
            if (str[i] == "{") {
                current.push([]);
                stack.push(current[current.length - 1]);
                current = stack[stack.length - 1];
            } else if (str[i] == "}" && stack.length > 1) {
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
        return output
    }
    /*
    This function converts keywords found in a tokenized array into its
    katex representation. It also adds in missing brackets LaTeX brackets.
    Example: ["int", "3", "x"] turns into:
              ["\int", "3", "x"]
    */
    this.keywordsToKatex = function(tokenized_array) {
        var openBracketsTracker = [];
        var closedBracketsTracker = [];

        var curlyBracketCounter = 0;
        //convert keywords to their katex representation
        for (var i = 0; i < tokenized_array.length; i++) {
            var token = tokenized_array[i]
            if (this.isKeyword(token)) {
                if (token == "(" || token == "[") {
                    openBracketsTracker.push(token)
                } else if (token == ")" || token == "]") {
                    closedBracketsTracker.push(token)
                }
                tokenized_array[i] = this.keywordKatexEquivalent[token]
            }

            if (token == "{") {
                curlyBracketCounter += 1;
            } else if (token == "}") {
                curlyBracketCounter -= 1;
            }

        }

        //close un paired brackets with an invisible brackets
        if (openBracketsTracker.length > closedBracketsTracker.length) {
            var delta = openBracketsTracker.length - closedBracketsTracker.length;
            for (var i = 0; i < delta; i++) {
                tokenized_array.push(this.keywordKatexEquivalent["INVISIBLE_CLOSING_BRACKET"])
            }
        } else if (closedBracketsTracker.length > openBracketsTracker.length) {
            var delta = closedBracketsTracker.length - openBracketsTracker.length;
            for (var i = 0; i < delta; i++) {
                tokenized_array.unshift(this.keywordKatexEquivalent["INVISIBLE_OPENING_BRACKET"])
            }
        }

        if (curlyBracketCounter < 0) {
            for (var i = 0; i < -1 * curlyBracketCounter; i++) {
                tokenized_array.unshift("{")
            }
        } else if (curlyBracketCounter > 0) {
            for (var i = 0; i < -1 * curlyBracketCounter; i++) {
                tokenized_array.push("}")
            }
        }

        return tokenized_array;
    }

    /** Takes an array and converts it into a KaTeX string recursively
     * Assumes math follows the format:
     * number(s) operator number(s).
     *
     * It will fail if there is an operator
     * with no number beside it.
     */
    this.formattedToKatex = function(tokenized_array) {
        //First transform any keywords into katex!
        //tokenized_array = this.keywordsToKatex(tokenized_array);

        if (tokenized_array.length == 1 && tokenized_array[0].constructor == Array) {
            return this.formattedToKatex(tokenized_array[0]);
        }
        if (tokenized_array == undefined || tokenized_array.length == 1) {
            return String(tokenized_array);
        }
        if (tokenized_array.constructor == String) {
            return tokenized_array
        }


        var output = [];
        var queue = tokenized_array;

        console.log(tokenized_array)
        tokenized_array = this.keywordsToKatex(tokenized_array);
        while (queue.length > 0) {
            var token = queue.splice(0, 1)[0];
            console.log(output)
            if (token.constructor == Array) {
                output.push(this.formattedToKatex(token))
            } else if (token.trim() == "text" || token.trim() == "mathrm") {
                //text is a special case because we don't want
                //what is next to be "formatted as katex"
                //we just want to keep it as is
                var after = queue.splice(0, 1)[0] || ""
                if (after.constructor == Array) {
                    after = this.recursiveJoin(after)
                }
                output.push(this.routine[token](after))

            } else if (this.isOperator(token)) {
                var previous = this.popNonEmpty(output) || ""
                console.log("previous: " + previous)
                //var after = queue.splice(0, 1)[0] || ""
                var after = this.dequeueNonEmpty(queue) || ""
                console.log("after: " + after)
                var after = this.formattedToKatex(after) || "";
                var result = this.routine[token](previous, after);
                output = output.concat(result);
                // output.push(result)
                console.log(output)
            } else {
                output.push(token);

            }
        }

        return "{" + output.join("") + "}";
    }


    this.convertText = function(mathString) {
        var preprocessedText = this.preProcess(mathString)
        var tokenizedText = this.tokenize(preprocessedText)
        return this.formattedToKatex(tokenizedText);
    }

}
