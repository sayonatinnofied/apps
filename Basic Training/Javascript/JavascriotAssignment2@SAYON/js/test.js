"use strict";
/************************************* Test Variables ****************************/
var age, wingCount, legCount, tailCount;

/**************************************** Animal Properties **********************/

window.console.log("\nAnimals Properties\n");
var nimosa = new window.Animals();
nimosa.setDOB("12 Apvfvvgr 2050");
age = nimosa.getAge();
window.console.log("Age is :" + age);

/**************************************** Bird Properties ***********************/

window.console.log("\nBird Properties\n");
var sparrow = new window.Bird();
sparrow.setDOB("12 Mar 2003");
age = sparrow.getAge();
window.console.log("Age is :" + age);
sparrow.setWing(1);
wingCount = sparrow.getWing();
window.console.log("Number of Wings:" + wingCount);

/**************************************** Human Properties **************************/

window.console.log("\nHuman Properties\n");
var sayon = new window.Human();
sayon.setDOB("27 Sep 1992");
age = sayon.getAge();
window.console.log("Age is :" + age);
sayon.setLeg(2);
legCount = sayon.getLeg();
window.console.log("Number of Legs:" + legCount);
var sayon1 = new window.Human();
sayon1.setDOB("27 Sep 1995");
age = sayon1.getAge();
window.console.log("Age is :" + age);
sayon1.setLeg(2);
legCount = sayon1.getLeg();
window.console.log("Number of Legs:" + legCount);
var sayon2 = new window.Human();
sayon2.setDOB("27 Sep 1982");
age = sayon2.getAge();
window.console.log("Age is :" + age);
sayon2.setLeg(2);
legCount = sayon2.getLeg();
window.console.log("Number of Legs:" + legCount);

/**************************************** Reptile Properties **************************/

window.console.log("\nReptile Properties\n");
var snake = new window.Reptile();
snake.setDOB("12 Jan 1991");
age = snake.getAge();
window.console.log("Age is :" + age);
snake.setTail(1);
tailCount = snake.getTail();
window.console.log("Number of Tail:" + tailCount);
window.console.log("\nReptile Properties\n");
var snake1 = new window.Reptile();
snake1.setDOB("12 Jan 1991");
age = snake1.getAge();
window.console.log("Age is :" + age);
snake1.setTail(1);
tailCount = snake1.getTail();
window.console.log("Number of Tail:" + tailCount);
window.console.log("\nReptile Properties\n");
var snake2 = new window.Reptile();
snake2.setDOB("12 Jan 1971");
age = snake2.getAge();
window.console.log("Age is :" + age);
snake2.setTail(1);
tailCount = snake2.getTail();
window.console.log("Number of Tail:" + tailCount);

/************************************** Test.js Ends *****************************************/

/************************************** Hash Table Starts ************************************/

var table=new window.BuildList(10);
table.displayList();
