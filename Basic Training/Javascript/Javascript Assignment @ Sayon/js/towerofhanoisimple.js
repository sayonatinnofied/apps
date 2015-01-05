var toh = function(num) {
    this.num = num;
    this.fromtower = 'A';
    this.auxtower = 'B';
    this.totower = 'C';

}

toh.prototype.hanoi = function(num, fromtower, totower, auxtower) {
    if (!num) {
        num = this.num
    }
    if (!fromtower) {
        fromtower = this.fromtower
    }
    if (!auxtower) {
        auxtower = this.auxtower
    }
    if (!totower) {
        totower = this.totower
    }
    if (num == 1) {
        console.log('Move Disk 1 from tower ' + fromtower + ' to tower ' + totower);
        return;
    }
    arguments.callee(num - 1, fromtower, auxtower, totower);
    console.log('Move disk ' + num + ' from tower ' + fromtower + ' to tower ' + totower);
    arguments.callee(num - 1, auxtower, totower, fromtower);
}
console.log("Tower Of Hanoi Using Object....method:towerofhanoi.hanoi()")
var towerofhanoi = new toh();
towerofhanoi.hanoi(3);
