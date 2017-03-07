

function JWMathParser(){

  this.routine = {};
  this.routine["+"] = function(item1, item2) {
      return item1 + "+" + item2;
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
  this.routine["^"] = function(item1, item2) {
      return "{" + item1 + "}^{" + item2 + "}";
  }
  this.routine["NONE"] = function(item1, item2) {}

  this.isOperator = function(str) {
      var operators = ["*", "/", "^", "{", "}", "☺", "☹", "ø"]
      return operators.indexOf(str) > -1;
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

    str = str.split("");
    for(var i = 0; i < str.length; i++){
      if(str[i] == "{"){
        output.push([]);
        stack.push(output[output.length-1]);
      }else if (str[i] == "}"){
        stack.pop();
      }else{
       current = stack.pop();
       current.push(str[i]);
       //put arr back onto stack once
       //we've added the string
       //for use later
       stack.push(current);
      }
    }

    return output
  }
  /*
  * Assumes math follows the format:
  * number(s) operator number(s).
  *
  * It will fail if there is an operator
  * with no number beside it.
  */
  this.formattedToKatex = function(tokenized_array){
    output = []

    //a char like "3" or "x" counts as being a
    //tokenzied array of length 1
    if(tokenized_array.length == 1){
      return tokenized_array;
    }
    for(var i = 0; i < tokenized_array.length; i++){
      console.log(tokenized_array[i]);
      if(this.isOperator(tokenized_array[i])){
        previous = this.formattedToKatex(tokenized_array[i-1]);
        after = this.formattedToKatex(tokenized_array[i+1]);
        if(previous != undefined && after != undefined){
          result = this.routine[tokenized_array[i]](previous, after);
          output.push(result);
        }
      } else {
        output.push(tokenized_array[i]);
      }
    }

    return output.join("");
  }


}
//
// $(document).on('input',
//     function(event) {
//         var m = new MathFormatter()
//         //alert(isVariable("A"));
//         console.log("input");
//         var sIn = String($("#txtIn").val());
//         // sIn = m.preprocessInput(sIn);
//         sIn = m.tokenize(sIn);
//         console.log('here:');
//         console.log(sIn);
//         m.recursvieBracketsParser(sIn);
//         // console.log(m.infixToPostfix(sIn));
//         // katex.render(m.postfixToKatex(m.infixToPostfix(sIn)), $("#divOut").get(0)); //get(0) same as get docelembyid
//
//     });
var toParse = "3+{3x^{3+7x}+2}/{2x+4}"
j = new JWMathParser
console.log(j.formattedToKatex(j.tokenize(toParse)))
