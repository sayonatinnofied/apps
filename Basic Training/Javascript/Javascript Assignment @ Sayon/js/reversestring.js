javascript: var reverse = function(input) {
    var length = input.length;
    var result = "";
    for (var i = length - 1; i >= 0; i--) {
        result = result + input[i];
    }
    console.log (result);
}
console.log("Reverse String...method:reverse()");
reverse("Hello");

