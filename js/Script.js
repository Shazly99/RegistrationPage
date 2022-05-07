let userName=document.getElementById("usernameInput");
let userEmail=document.getElementById("userEmailInput");
let  userPassword=document.getElementById("userPasswordInput");


let DB=[];
if (localStorage.getItem("userinfo")==null) {
    DB=[];
}else{
    DB=JSON.parse(localStorage.getItem("userinfo"))
}
function singup()
{
    userInputValidation();
    isExist();
    if (userInputValidation()== true && isExist() == false) 
    {
        let user={
            name:userName.value,
            email:userEmail.value,
            password:userPassword.value
        }
    
        DB.push(user);//array of object => JSON
        localStorage.setItem("userinfo",JSON.stringify(DB))
        console.log(DB)

        const confirmMsg=document.getElementById("confirmMsg");
        confirmMsg.classList.replace("d-none", "d-block");

        const singin=document.getElementById("signin")
        singin.classList.replace("d-none", "d-block")
       
    }
    else
    {
        const tryAgainMsg = document.getElementById("tryAgainMsg");
        tryAgainMsg.classList.replace("d-none", "d-block");
    }
}

function userInputValidation()
{
    usernameValidation();
    passwordValidation();
    emailValidation();
    if((usernameValidation()==true && passwordValidation()==true  && emailValidation()==true)){
        return true
    }
    else{
        return false
    }
}
function usernameValidation(){
     var usernameAlert =document.getElementById("usernameAlert")
     var regexName=/^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
     if (regexName.test(userName.value)==true && userName.value!="") 
     {
        userName.classList.add("is-valid")
        userName.classList.remove("is-invalid")
        usernameAlert.classList.replace( "d-block","d-none")
        return true;
     }
     else
     {
        userName.classList.add("is-invalid")
        userName.classList.remove("is-valid")
        usernameAlert.classList.replace("d-none", "d-block")
        return false
     }
}
// . --->any char
// * --->any num
// ^ --->start
// $ --->end 
function passwordValidation()
{
    var userPasswordAlert=document.getElementById("userPasswordAlert");
    var regexPassword=/^.{5,15}$/
    if (regexPassword.test(userPassword.value)==true && userPassword.value!="" ) 
    {
        userPassword.classList.add("is-valid")
        userPassword.classList.remove("is-invalid")
        userPasswordAlert.classList.replace( "d-block","d-none")
        return true;
    }
    else
    {
        userPassword.classList.add("is-invalid")
        userPassword.classList.remove("is-valid")
        userPasswordAlert.classList.replace("d-none", "d-block")
        return false
    }
}

function emailValidation()
{
    var userEmailAlert=document.getElementById("userEmailAlert");
    var regexEmail=/@[a-z]{5,10}(\.com)$/;
    if (regexEmail.test(userEmail.value)==true && userEmail.value!="" ) 
    {
        userEmail.classList.add("is-valid")
        userEmail.classList.remove("is-invalid")
        userEmailAlert.classList.replace( "d-block","d-none")
        return true;
    }
    else
    {
        userEmail.classList.add("is-invalid")
        userEmail.classList.remove("is-valid")
        userEmailAlert.classList.replace("d-none", "d-block")
        return false
    }
}
//بتشوف الداتا دي موجوده عندي بل كده ولا لا
function isExist()
{
    var accountExistMsg=document.getElementById("accountExistMsg");
    for(var i=0;i<DB.length;i++)
    {
        if (DB[i].name.toLowerCase() == userName.value.toLowerCase() || DB[i].email.toLowerCase() == userEmail.value.toLowerCase() ) 
        {
            accountExistMsg.classList.replace("d-none", "d-block");
            userName.classList.remove("is-valid")
            userEmail.classList.remove("is-valid")
            userPassword.classList.remove("is-valid")
            
            return true
        }
        else
        {
            return false;
        }
    }
}



function login()
{
    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");
    let loginBtn = document.getElementById("loginBtn");
    let wrongMsg = document.getElementById("wrongMsg");
    let fillMsg = document.getElementById("fillMsg");

    if(loginEmail.value == "" || loginPassword.value == "")
    {
        fillMsg.classList.replace("d-none", "d-block");
        wrongMsg.classList.replace("d-block", "d-none");
        return false
    }

    for(var i = 0; i < DB.length; i++)
    {
        if(DB[i].email.toLowerCase() == loginEmail.value.toLowerCase() && DB[i].password.toLowerCase() == loginPassword.value.toLowerCase())
        {
            
            localStorage.setItem('sessionUsername', DB[i].name)
            loginBtn.setAttribute("href", "welcome.html");
        }
        else
        {
            wrongMsg.classList.replace("d-none", "d-block");
            fillMsg.classList.replace("d-block", "d-none");
        }
    }
}

var username = localStorage.getItem("sessionUsername");

function displayWelcomeUser()
{
    document.getElementById("username").innerHTML = "Welcome "+ username;
}
displayWelcomeUser();
function logout() {
    localStorage.removeItem('sessionUsername')
}
logout();
