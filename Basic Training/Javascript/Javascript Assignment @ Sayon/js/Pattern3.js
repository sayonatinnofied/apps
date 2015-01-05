console.log("Pattern3...........method:pattern3()");
function pattern3(d){
var depth = d
    output = [],
    print;

function pascal(resultset, rowIndex) {
  str="";
  
  for(var i=depth;i>rowIndex;i--)
  {
    str=str+"\t";
  }

    var previousRow = resultset[rowIndex - 1],
        row = [],
        i, left, right, length;

  if (!previousRow) {
    print=str+"1";
    console.log(print);
    return [1];
  }

    length = previousRow.length;

    for (i = 0; i <= length; i++) {

        left = previousRow[i - 1];
        right = previousRow[i];

        if (!left) {
            row.push(right);
            continue;
        }
        if (!right) {
            row.push(left);
            continue;
        }

        row.push(left + right)
    }
    print=str+row.toString();
    print=print.split(",").join("\t\t");
    console.log(print);
    return row;
    
}

for (var i = 0; i < depth; i++) {

    output.push(pascal(output, i));
  
}
}
pattern3(5);