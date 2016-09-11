var validateLogin=function(){
	// alert('Validating');
	var username=document.getElementById("username").value,
		password=document.getElementById("passwd").value,
		errorField=document.getElementById("errors_container"),
		flag=0;
		errorField.innerHTML="";
		// console.log(errorField);
	if(username==""){
		// alert('No username');
		flag++;
		errorField.innerHTML="Username cannot be empty<br/>";
	}
	if(password==""){
		// alert('no password');
		flag++;
		errorField.innerHTML=errorField.innerHTML+"Password cannot be empty<br/>";
	}

	if(flag==0){
		return true;
	}
	else {
		return false;
	}
		// return false;
}

var validateSSN=function(){
	var ssn=document.getElementById("ssn").value,
		errorField=document.getElementById("errors_container"),
		regex=/^\d{9}$/;

	if(ssn==""){
		// alert('No username')
		errorField.innerHTML="Please enter SSN";
		return false;
	}
	else if(!regex.test(ssn)){
		errorField.innerHTML="Invalid SSN format. Correct format : 123456789";
		return false;
	}
	else {
		return true;
	}

}