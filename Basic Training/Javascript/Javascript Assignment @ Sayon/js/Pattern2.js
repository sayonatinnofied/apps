console.log("Pattern2...........method:pattern2()");
var pattern2=function (n){
for(var i=1;i<=n;i++)
{
  str="";
	for(var j=n;j>i;j--) // to print spaces
	{
    str=str+" ";
	}
	for(var j=1;j<=i;j++) // To print hash 
	{
    str=str+"# ";
		
	}

console.log(str);
	
}
}
pattern2(5);
