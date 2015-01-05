var towerOfHanoi = function (a, src, des, aux) {
  var num = a,
  fromtower = src,
  totower = des,
  auxtower = aux;
  return function () {
    function towers(num, fromtower, totower, auxtower) {
      if (num == 1) {
        console.log('Move Disk 1 from tower ' + fromtower + ' to tower ' + totower);
        return ;
      }
      arguments.callee(num - 1, fromtower, auxtower, totower);
      console.log('Move disk ' + num + ' from tower ' + fromtower + ' to tower ' + totower);
      arguments.callee(num - 1, auxtower, totower, fromtower);
    }
    towers(num, fromtower, totower, auxtower);
  }
}
console.log("Tower of Hanoi using Closure:.....method:temp()")
temp = towerOfHanoi(3, 'a', 'c', 'b');
temp();
