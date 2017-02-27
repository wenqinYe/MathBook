function isNumber(str) {
  return !isNaN(str);
}

function isVariable(str) {
  return str.search("[a-z]|[A-Z]") != -1;
}

function getPrecedence(str) {
  if (str == "+" || str == "-") {
    return 1;
  } else if (str == "*" || str == "/") {
    return 2;
  } else if (str == "^") {
    return 3;
  }
  return -1;
}

function infixToPostfix(infix) {
  infix = infix.replace(/\s/g, ''); //remove all whitespace
  var q = [];
  var stack = [];
  var i = 0; //index of string currently at
  var prevIsNumber = false; //was the prev character a number/decimal
  while (i < infix.length) {
    var c = infix[i];

     if (isNumber(c) || c == "." ) {
      //test
       if(prevIsNumber){
          q[q.length-1] += c;
          }
       else{
         q.push(c);
       }
      prevIsNumber = true;
      //test
      //q.push(c);
    }
    else{
      prevIsNumber = false;
    }
      if(isVariable(c)){
       q.push(c);
       }else if (c == "(") {

      stack.push(c);
    } else if (c == ")") {
      var item = stack[stack.length - 1];
      while (item != "(") {
        q.push(item); //push operator into output q
        stack.splice(stack.length - 1, 1); //remove from stack
        item = stack[stack.length - 1];
        if (stack.length < 1) {
          console.log("Mismatch brackets");
          break;
        }
      }
      stack.splice(stack.length - 1, 1); //remove left bracket from stack
    } else {
      var p1 = getPrecedence(c);
      if (p1 != -1) { //if c is an operator
        while (c != "^" && stack.length > 0 && p1 <= getPrecedence(stack[stack.length - 1])) {
          q.push(stack[stack.length - 1]);
          stack.splice(stack.length - 1, 1); //remove at last index, remove 1 item

        }
        stack.push(c);
      }
    }
    i++;
  }
  while (stack.length > 0) {
    q.push(stack[stack.length - 1]);
    stack.splice(stack.length - 1, 1);
  }
  console.log("q size :" + q.length);
  return q;
  //return q.join("");

}

//postfix is AN ARRAY of strings, NOT just STRING
function postfixToKatex(postfix) {
  var items = [];
  for (var i = 0; i < postfix.length; i++) {
    var c = postfix[i];
    if (isVariable(c)) {
      items.push(c);
    }
    else if (isNumber(c) || c == ".") {
      items.push(c);
    }
    //items.push(c);
    else if (getPrecedence(c) != -1) { //is operator
      if (items.length >= 2) { //there should be 2 or more terms to operate on
        var item1 = items[items.length - 2];
        var item2 = items[items.length - 1];
        var nItem;
        if (c == "/") {
          //escape back slash by putting 2
          nItem = "\\frac{" + item1 + "}{" + item2 + "}";
        }
       else {
          nItem = "{" + item1 +"}"+ c + "{" + item2 + "}";
        }
        items.splice(items.length - 2, 2);
        items.push(nItem);
      } else {  //there is an operator but less than 2 items to operate on
        if(c != "^"){
        items.push(c); //just put it on in case user just hasnt finished typing
      }
        else{ //handle the fact that there is exponent but not enough to op on

        }
        console.log("Error: postfixToKatex does not have numbers to operate on");
      }
    }
  }
  console.log(items.length);
  return items.join("");
}

$(document).on('input',
  function(event) {
    var sIn = String($("#txtIn").val());
    katex.render(postfixToKatex(infixToPostfix(sIn)), $("#divOut").get(0)); //get(0) same as get docelembyid

  });
