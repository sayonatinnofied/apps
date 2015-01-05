var doc = document;
var toggle = "";
var errorStr = "";
var operatorBuffer = "",
    operand1 = "",
    operand2 = "",
    oprFlag = 0,
    operandFlag = 0,
    equalFlag = 0;
var coll = [];
var disp = doc.getElementById("calc_result");
disp.value = "";
var inputs = doc.getElementsByClassName("calc_btn");
for (var i = 0, len = inputs.length; i < len; i = i + 1) {
    coll.push(inputs[i].value);
}
console.log(coll);
var operate = function(operand1, operand2, operatorBuffer) {
    var op1 = Number(operand1);
    var op2 = Number(operand2);
    if (operatorBuffer === coll[3]) {
        return (op1 + op2);
    } else if (operatorBuffer === coll[7]) {
        return (op1 - op2);
    } else if (operatorBuffer === coll[11]) {
        return (op1 * op2);
    } else if (operatorBuffer === coll[15]) {
        return (op1 / op2);
    }
    errorStr = "Math Error"
    throw (errorStr);
}
var retrieveVal = function(val) {

    /**************************** Non displayed buttons ***********************/
    if (val === coll[0] || val === coll[1] || val === coll[2] || val === coll[3] || val === coll[7] || val === coll[11] || val === coll[15] || val === coll[19]) {

        /****************** CLear All **********************/
        if (val === coll[0]) {
            disp.value = "";
            toggle = "";
            errorStr = "";
            operatorBuffer = "",
            operand1 = "",
            operand2 = "",
            oprFlag = 0,
            operandFlag = 0;
            equalFlag = 0;
        }

        /*************** Backspace **********************/
        else if (val === coll[1]) {
            equalFlag = 0;
            var c = disp.value.length;
            disp.value = disp.value.replace(disp.value.charAt(c - 1), "");
            toggle = "";
            errorStr = "";
            operatorBuffer = "",
            operand1 = "",
            operand2 = "",
            oprFlag = 0,
            operandFlag = 0;
            equalFlag = 0;
        }

        /************ Operator Checking *****************/
        else if ((val === coll[3] || val === coll[7] || val === coll[11] || val === coll[15])) {
            equalFlag = 0;
            if (disp.value !== "") {
                if (oprFlag === 0) {
                    operand1 = disp.value;
                    operandFlag = 1;
                    oprFlag = 1;

                } else if (oprFlag === 1 && operandFlag === 0) {
                    operand2 = disp.value;
                    try {
                        disp.value = operate(operand1, operand2, operatorBuffer);
                    } catch (e) {
                        disp.value = e;
                    };
                    operand1 = disp.value;
                    operandFlag = 1;
                    oprFlag = 1;
                }
            }
            operatorBuffer = val;
        }

        /************************ % button ************************/
        else if (val === coll[2]) {
            if (disp.value !== "") {
                disp.value = Number(disp.value) * 0.01;
                toggle = "";
                errorStr = "";
                operatorBuffer = "",
                operand1 = "",
                operand2 = "",
                oprFlag = 0,
                operandFlag = 0;
                equalFlag = 0;
                return;
            }
        }

        /******************** Equals button *********************/
        else if (val == coll[19]) {
            if (operand1 !== "" && disp.value !== "") {
                if (equalFlag === 0) {
                    operand2 = disp.value;
                }
                try {
                    disp.value = operate(operand1, operand2, operatorBuffer);
                } catch (e) {
                    disp.value = e;
                }
                operand1 = disp.value;
                operandFlag = 1;
                oprFlag = 1;
                equalFlag = 1;
                return;
            } else if (operand1 !== "") {
                disp.value = operand1;

                return;
            } else {
                disp.value = disp.value;
                return;
            }
        }
        return;
    }

    /*********************************** Displayed Buttons *************************/
    else {
        equalFlag = 0;
        if (operandFlag !== 0) {
            disp.value = "";
            operandFlag = 0;
        }

        /************************ +- toggle ************************/
        if (val === coll[17]) {
            console.log("ag");
            if (toggle === "" && disp.value === "") {
                disp.value = "-";
                toggle = "1";
                return;
            } else if (toggle === "" && disp.value !== "") {
                disp.value = "-" + disp.value;
                toggle = "1";
                return;
            } else {
                disp.value = (disp.value).replace("-", "");
                toggle = "";
                return;
            }

        }

        /********************** . button ***********************/
        if (disp.value === "") {
            if (val === coll[18]) {
                disp.value = "0" + val;
                return;
            }
        }
        /*********************** 0 check ********************/
        else if (disp.value === "0") {
            if (val === coll[16]) {
                disp.value = "0";
                return;
            }
        }
        /************************ . check **********************/
        else if (val === coll[18] && ((disp.value).indexOf(val) !== -1)) {
            console.log((disp.value).indexOf(val));
            return;
        }
        /************** display **********************/
        disp.value += val;
    }

}
for (var i = 0, len = inputs.length; i < len; i = i + 1) {
    inputs[i].addEventListener("click", function() {
        retrieveVal(this.value);
    }, false);
}
