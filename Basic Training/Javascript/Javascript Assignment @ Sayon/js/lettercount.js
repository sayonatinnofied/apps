var lettercount = function(str) {
    var output = {},
        length = str.length,
        tmpstrng = '';
    for (var i = 0; i < length; i++) {
        var s = str.charAt(i);
        if (!output[s]) {
            tmpstrng = tmpstrng + s;
            var regex = new RegExp(s, 'g');
            var temp = str.match(regex);
            var count = temp.length;
            output[s] = count;
        }
    }
    console.log(output);
}
console.log("Alphabet Count...method:lettercount()")
lettercount("Hello");
