console.log("Pattern4...........method:pattern4()");
var pattern4 = function(n) {
    var rowNum, colNum = 0;
    for (rowNum = 0; rowNum <= n; rowNum++) {
        var frnt = "";
        var str = "\t";
        var strRow = "";
        var strCol = "";
        for (var i = n; i > rowNum; i--) {
            frnt = frnt + str;
        }
        for (var colNum = 0; colNum <= rowNum; colNum++) {
            strRow = strRow + rowNum + str + str;
            strCol = strCol + colNum + str + str;
        }
        strRow = frnt + strRow;
        strCol = frnt + strCol;
        console.log(strRow);
        console.log(strCol);
    }
}
pattern4(5);
