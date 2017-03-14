function JWMathParser() {

    this.routine = {};
    this.routine["*"] = function(item1, item2) {
        return item1 + "\\cdot " + item2
    }
    this.routine["_"] = function(item1, item2){
      return "{" + item1 + "}_{" + item2 + "}"
    }
    this.routine["/"] = function(item1, item2) {
        return "\\frac{" + item1 + "}{" + item2 + "}"
    }
    this.routine["^"] = function(item1, item2) {
        return "{" + item1 + "}^{" + item2 + "}";
    }
    this.routine["NONE"] = function(item1, item2) {}
    this.routine["sqrt"] = function(item1, item2){
      return item1 + " \\sqrt{" + item2 + "}"
    }
    this.routine["delta"] = function(item1, item2){
      return item1 + "\\Delta" + item2
    }
    this.routine["integral"] = function(item1, item2){
        return item1 + "\\int " + item2
    }
    this.routine["int"] = function(item1, item2){
      return item1 + "\\int " + item2
    }
    this.routine["pi"] = function(item1, item2){
      return  item1 + " \\pi " + item2
    }
    this.routine["epsilon"] = function(item1, item2){
      return  item1 + " \\varepsilon " + item2
    }
    this.routine["phi"] = function(item1, item2){
      return  item1 + " \\varphi " + item2
    }
    this.routine["omega"] = function(item1, item2){
      return  item1 + " \\Omega " + item2
    }
    this.routine["infty"] = function(item1, item2){
      return  item1 + " \\infty " + item2
    }
    this.routine["infinity"] = function(item1, item2){
      return  item1 + " \\infinity " + item2
    }
    this.routine["sum"] = function(item1, item2){
      return  item1 + " \\sum " + item2
    }
    this.routine["("] = function(item1, item2){
      return  item1 + " \\left( " + item2
    }
    this.routine[")"] = function(item1, item2){
      return  item1 + " \\right) " + item2
    }
    this.routine["->"] = function(item1, item2){
      return  item1 + " \\to " + item2
    }
    this.routine["to"] = function(item1, item2){
      return  item1 + " \\to " + item2
    }
    this.routine["sigma"] = function(item1, item2){
      return  item1 + " \\sigma " + item2
    }
    this.routine["pm"] = function(item1, item2){
      return  item1 + " \\pm " + item2
    }
    this.routine["plus or minus"] = function(item1, item2){
      return  item1 + " \\pm " + item2
    }
    this.routine["plusorminus"] = function(item1, item2){
      return  item1 + " \\pm " + item2
    }
    this.routine["plusminus"] = function(item1, item2){
      return  item1 + " \\pm " + item2
    }
    this.routine["partial"] = function(item1, item2){
      return  item1 + " \\partial " + item2
    }
    this.routine["↵"] = function(item1, item2){
      return  item1 + " \\newline " + item2
    }
    this.routine["=>"] = function(item1, item2){
      return  item1 + " \\Rightarrow " + item2
    }
    this.routine["implies"] = function(item1, item2){
      return  item1 + " \\Rightarrow " + item2
    }
    this.routine["sin"] = function(item1, item2){
      return  item1 + " \\sin " + item2
    }
    this.routine["cos"] = function(item1, item2){
      return  item1 + " \\cos " + item2
    }
    this.routine["tan"] = function(item1, item2){
      return  item1 + " \\tan " + item2
    }
    this.routine["lim"] = function(item1, item2){
      return  item1 + " \\lim " + item2
    }
    this.routine["lim"] = function(item1, item2){
      return  item1 + " \\lim " + item2
    }
    this.routine["hat"] = function(item1, item2){
      return  "\\hat " + item1 + " " + item2
    }
    this.routine["xi"] = function(item1, item2){
      return  item1 + " \\xi "  + item2
    }
    this.keywords = ["sqrt", "delta", "int", "integral", "infinity", "pi", "infty", "epsilon", "phi", "sum", "(", ")", "omega", "->", "sigma", "pm", "plus or minus", "plusminus", "plusorminus", "partial", "↵", "=>", "implies", "sin", "tan", "cos", "lim", "limit", "to", "hat", "xi"]

    this.isOperator = function(str) {
        return this.routine[str] !== undefined;
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
        stack = [];
        output = [];

        //Note that javascript variable assignments
        //refer back to the original object and do
        //NOT create a new object.
        //Therefore appending to the current variable
        //will append to the original variable because
        //they are the same
        stack.push(output)
        current = output;
        str = str.split("");
        for (var i = 0; i < str.length; i++) {
            current = stack[stack.length - 1];

            if (str[i] == "{") {
                current.push([]);
                stack.push(current[current.length - 1]);
                current = stack[stack.length - 1]
            } else if (str[i] == "}") {
                stack.pop();
                current = stack[stack.length - 1]
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
        var output = []
        var print = false;

        //a char like "3" or "x" counts as being a
        //tokenzied array of length 1
        if (tokenized_array === undefined || tokenized_array.length == 1) {
            return tokenized_array;
        }

        for (var i = 0; i < tokenized_array.length; i++) {
            if (tokenized_array[i].constructor == Array) {
                output.push(this.formattedToKatex(tokenized_array[i]))
            } else if (this.isOperator(tokenized_array[i])) {
                // var previous = this.formattedToKatex(tokenized_array[i - 1]) || "";
                var previous = output.pop() || "";
                var after = this.formattedToKatex(tokenized_array[i + 1]) || "";
                var result = this.routine[tokenized_array[i]](previous, after);

                output.push(result);
                i = i + 1

            } else {
                output.push(tokenized_array[i]);
            }

        }

        return output.join("");
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
            if (char_array[index + j] !== split_keyword[j]) {
                match = false;
            }
        }
        return match
    }
    this.tokenizeKeywords = function(char_array){
      var output = [];
      for(var i = 0; i < char_array.length; i++){
        if(char_array[i].constructor === Array){
          output.push(this.tokenizeKeywords(char_array[i]))
          continue;
        }
        output.push(char_array[i])
        for(var j = 0; j < this.keywords.length; j++){
          var keyword = this.keywords[j]
          var match = this.scanKeywordAtIndex(keyword, char_array, i);
          if(match){
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
