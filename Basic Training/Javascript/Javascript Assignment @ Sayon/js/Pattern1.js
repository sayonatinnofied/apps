console.log("Pattern1....method:pattern1()");
(function(){

    var even = function(paramOne) {
        if (paramOne % 2 == 0 && paramOne > 0)
            return true;
    };

function pattern1(n) {
    for (var i = 1; i <= n; i++) {
        str = "";
        if (even(i) == true) {
            str = str + " ";

        }
        for (var j = 1; j < n; j++) {
            str = str + "# ";

        }
        console.log (str);
    }
}

pattern1(5);
})();
