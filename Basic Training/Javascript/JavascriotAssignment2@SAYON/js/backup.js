"use strict";
var BuildList = function(depth) {
    var me = this;
    me.headNode = null;

    me.indexNode = function(newIndex) {
        this.index = newIndex;
        this.hashLink = null;
        this.nodeLink = null;
    };
    me.dataNode = function(obj) {
        this.dataValue = obj;
        this.nextData = null;
    };

    /**************************************** Insert Function *****************************/

    me.insert = function(obj) {
        if (isNaN(obj.getAge())) {
            window.console.log("Invalid Age to Insert");
            return;
        }
        var dataNode = new me.dataNode(obj);
        var index = obj.getAge() % depth;
        var previousTraverse = null;
        var newIndex;

        if (me.headNode === null) {
            index = new this.indexNode(index);
            me.headNode = index;
            index.nodeLink = dataNode;
        } else {
            var traverse = me.headNode;
            while (traverse.hashLink !== null && traverse.index !== index && traverse.index < index) {
                previousTraverse = traverse;
                traverse = traverse.hashLink;
            }
            if (traverse.index === index) {
                var dataTraverse = traverse.nodeLink;
                var nextDataTraverse = null;

                while (dataTraverse.dataValue.getAge() < dataNode.dataValue.getAge() && dataTraverse.nextData !== null) {
                    nextDataTraverse = dataTraverse;
                    dataTraverse = dataTraverse.nextData;
                }

                if (dataTraverse.dataValue.getAge() > dataNode.dataValue.getAge()) {
                    if (dataTraverse === traverse.nodeLink) {
                        traverse.nodeLink = dataNode;
                        dataNode.nextData = dataTraverse;
                    } else {
                        nextDataTraverse.nextData = dataNode;
                        dataNode.nextData = dataTraverse;
                    }

                } else if (dataTraverse.nextData === null) {
                    dataTraverse.nextData = dataNode;
                }
            } else if (traverse.index > index) {

                newIndex = new me.indexNode();
                newIndex.index = index;
                if (traverse === me.headNode) {
                    me.headNode = newIndex;
                    newIndex.hashLink = traverse;
                } else {
                    previousTraverse.hashLink = newIndex;
                    newIndex.hashLink = traverse;
                }
                newIndex.nodeLink = dataNode;

            } else {
                newIndex = new me.indexNode();
                newIndex.index = index;
                traverse.hashLink = newIndex;
                newIndex.nodeLink = dataNode;
            }
        }
    };

    /******************************************** Display Function *************************/

    me.displayList = function() {

        window.window.console.log("headNode");
        window.window.console.log("|");
        var traverse = me.headNode;
        while (traverse !== null) {
            var outputStr = traverse.index + "->";
            var dataTraverse = traverse.nodeLink;
            while (dataTraverse !== null) {
                if (dataTraverse.dataValue instanceof window.Human) {
                    outputStr = outputStr + "[Human age:" + dataTraverse.dataValue.getAge() + ", leg:" + dataTraverse.dataValue.getLeg() + " ]->";
                } else if (dataTraverse.dataValue instanceof window.Bird) {
                    outputStr = outputStr + "[Bird age:" + dataTraverse.dataValue.getAge() + ", wing:" + dataTraverse.dataValue.getWing() + " ]->";
                } else if (dataTraverse.dataValue instanceof window.Reptile) {
                    outputStr = outputStr + "[Reptile age:" + dataTraverse.dataValue.getAge() + ", tail:" + dataTraverse.dataValue.getTail() + " ]->";
                }
                dataTraverse = dataTraverse.nextData;
            }
            window.window.console.log(outputStr);
            window.window.console.log("|");
            traverse = traverse.hashLink;
        }
    };

    /*************************************** Search Method ***************************************/

    me.search = function(age) {
        if (me.headNode === null) {
            window.console.log("Nothing to Search.");
            return;
        }
        var current,
            outStr = "";
        this.index = age % depth;
        this.start = me.headNode;
        while (this.start !== null) {
            
            var searchTraverse = this.start.hashLink;
            if (this.start.index === this.index) {
                current = this.start.nodeLink;
                break;
            }

            if (searchTraverse !== null) {
                if (searchTraverse.index === this.index) {
                    current = searchTraverse.nodeLink;
                    break;
                }
            }
            this.start = this.start.hashLink;

        }
        if (current === undefined) {
            window.console.log("Age Index not found");
            return;
        }
        while (current !== null) {
            if (current.dataValue.getAge() == age) {
                if (current.dataValue instanceof window.Human) {
                    outStr = outStr + "[Human age:" + current.dataValue.getAge() + ", leg:" + current.dataValue.getLeg() + " ]->";
                } else if (current.dataValue instanceof window.Bird) {
                    outStr = outStr + "[Bird age:" + current.dataValue.getAge() + ", wing:" + current.dataValue.getWing() + " ]->";
                } else if (current.dataValue instanceof window.Reptile) {
                    outStr = outStr + "[Reptile age:" + current.dataValue.getAge() + ", tail:" + current.dataValue.getTail() + " ]->";
                }
            }
            current = current.nextData;
        }

        if (outStr === "") {
            window.console.log("Age not Found");
        } else {
            window.console.log(outStr);
        }
    };

    /**************************************** Delete Method ************************************/

    me.delete = function(age) {
        if (me.headNode === null) {
            window.console.log("Nothing to Delete");
            return;
        }
        var current,
            previousTraverse, deleteTraverse;
        this.index = age % depth;
        this.start = me.headNode;
        while (this.start !== null) {
            previousTraverse = this.start;
            deleteTraverse = this.start.hashLink;
            if (previousTraverse.index === this.index) {
                current = previousTraverse.nodeLink;
                deleteTraverse = previousTraverse;
                break;
            }
            if (deleteTraverse !== null) {
                if (deleteTraverse.index === this.index) {
                    current = deleteTraverse.nodeLink;
                    break;
                }
            }
            this.start = this.start.hashLink;
        }
        if (current === undefined) {
            window.console.log("Age Index Not Found to delete");
            return;
        }
        while (current !== null) {
            if (current.dataValue.getAge() === age && current.nextData !== null) {
                deleteTraverse.nodeLink = current.nextData;
                break;
            } else if (current.dataValue.getAge() === age && current.nextData === null) {
                if (previousTraverse == me.headNode && previousTraverse.hashLink === null) {
                    me.headNode = null;
                } else if (previousTraverse === me.headNode) {
                    me.headNode = previousTraverse;
                    me.headNode.hashLink = deleteTraverse.hashLink;
                } else if (previousTraverse !== null) {
                    previousTraverse.hashLink = deleteTraverse.hashLink;
                } else if (deleteTraverse.hashLink === null) {
                    previousTraverse.hashLink = null;
                }
                break;
            } else {
                var currentNext = current.nextData;
                if (currentNext !== null) {
                    while (currentNext !== null) {
                        if (currentNext.dataValue.getAge() === age) {
                            current.nextData = currentNext.nextData;
                        }
                        currentNext = currentNext.nextData;
                    }
                    break;
                }

            }
            current = current.nextData;
            if (current === null) {
                window.console.log("Age not Found to delete");
                break;
            }

        }

    };
};
