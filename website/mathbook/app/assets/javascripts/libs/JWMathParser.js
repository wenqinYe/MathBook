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
        return item1 + " \\sqrt{" + item2 + "} "
    }

    /* Text is kind of broken right now */
    // this.routine["text"] = function(item1, item2) {
    //     return item1 + " \\text{" + item2 + "} "
    // }

    this.keywordKatexEquivalent = {
      /**** Routines that we don't want to convert just yet ****/
      "sqrt": "sqrt",
      "text": "text",
      "over": "/",


      /****** Vectors *****/
      "hat": " \\hat ",
      "vec": " \\vec ",

      /****** Calculus Operators*****/
      "sum": " \\sum ",
      "int": " \\int ",
      "prod": " \\prod ",
      "intint": " \\iint ",
      "int int": " \\iint ",

      /****** Greek Letters *****/
      "delta": " \\Delta ",
      "epsilon": " \\epsilon ",
      "alpha": " \\alpha ",
      "beta": " \\beta ",
      "gamma": " \\gamma ",
      "omega": " \\omega ",
      "Omega": " \\Omega ",
      "sigma": " \\sigma ",
      "Sigma": " \\sum ",

      /****** Special Functions *****/
      "lim": " \\lim ",
      "limit": " \\lim ",
      "sin": " \\sin ",
      "cos": " \\cos",
      "tan": " \\tan ",
      "max": " \\max ",
      "ln": " \\ln ",
      "log": " \\log ",
      "cot": " \\cot ",
      "sec": " \\sec ",
      "csc": " \\csc ",

      /****** Special symbols and notation *****/
      "*": " \\cdot ",
      "choose": " \\choose ",

      "times": " \\times ",
      "dividedby": " \\div ",
      "divide": " \\div ",

      "plusminus": " \\pm ",
      "plusrorminus": " \\pm ",
      "pm": " \\pm ",

      "minusplus": " \\mp ",
      "minusorplus": " \\mp ",
      "mp": " \\mp ",

      "to": " \\to ",
      "->": " \\to ",
      "=>": " \\Rightarrow ",
      "implies": " \\Rightarrow ",

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
      "lesstahn": " \\lt ",
      "greaterthan": " \\gt ",
      "lt": " \\lt ",
      "gt": " \\gt ",
      "le": " \\le ",
      "ge": " \\ge ",

      /* Trig functions and log */
      "tan": " \\tan ",
      "max": " \\max ",
      "ln": " \\ln ",
      "log": " \\log ",
      "cot": " \\cot ",
      "sec": " \\sec ",
      "csc": " \\csc ",

      /* Brackets */
      "(": " \\left( ",
      ")": " \\right) ",
      "[": " \\left[ ",
      "]": " \\right] ",

      "INVISIBLE_CLOSING_BRACKET": " \\right. "

    }

    /*
    Sorting the keywrods is important because it ensures that
    longer keywords are evaluated before shorter ones. If this
    does not happen things like:  "logarithm" will be evaluated as
    ["log", "a", "r", "i", "t", "h", "m"] instead of ["logarithm"]
    because the code just sees "log" and stops.
    */
    this.keywords = [];
    for(var keyword in this.keywordKatexEquivalent){
      this.keywords.push(keyword);
    }
    //sort by character length in descending order
    this.keywords.sort(function(a, b){
      return b.length - a.length
    });



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

    this.isOperator = function(str) {
        return this.routine[str] !== undefined;
    }

    this.isKeyword = function(str) {
      return this.keywordKatexEquivalent[str] !== undefined;
    }

    this.popNonEmpty = function(stack) {
        var output = stack.pop();
        while (output !== undefined && output === "") {
            var output = stack.pop();
        }
        return output
    }

    /** Do some stuff with the user's text before anything else happens.
    This function currently places curly brackets around round brackets
    **/
    this.preProcess = function(str) {
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
        var str = parseNumbers(str); //same as str.split("") but keeps digits of the same number together

        for (var i = 0; i < str.length; i++) {
            current = stack[stack.length - 1];
            if (str[i] == "{") {
                current.push([]);
                stack.push(current[current.length - 1]);
                current = stack[stack.length - 1];
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
    This function converts keywords found in a tokenized array into its
    katex representation.
    Examples: ["int", "3", "x"] turns into:
              ["\int", "3", "x"]
    */
    this.keywordsToKatex = function(tokenized_array){
      /*
      Keep track of possible missing brackets that the user
      forgot to type so that they can
      be closed with an invisible bracket
      */
      var bracketsTracker = [];

      //convert keywords to their katex representation
      for(var i = 0; i < tokenized_array.length; i++){
        token = tokenized_array[i]
        if(this.isKeyword(token)){
          if(token === "(" || token == "{" || token == "["){
            bracketsTracker.push(token)
          }
          if (token == ")" || token == "}" || token == "]"){
            bracketsTracker.pop()
          }
          tokenized_array[i] = this.keywordKatexEquivalent[token]
        }
      }


      //close un paired brackets with an invisible brackets
      for(var i = 0; i < bracketsTracker.length; i++){
        tokenized_array.push(this.keywordKatexEquivalent["INVISIBLE_CLOSING_BRACKET"])
      }

      return tokenized_array;
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

        tokenized_array = this.keywordsToKatex(tokenized_array);

        var output = [];
        var queue = tokenized_array;

        var missingClosingBrackets = []; //keeps track of missing closing brackets

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

    this.convertText = function(mathString){
      var preprocessedText = this.preProcess(mathString)
      var tokenizedText = this.tokenize(preprocessedText)
      return this.formattedToKatex(tokenizedText);
    }

}
