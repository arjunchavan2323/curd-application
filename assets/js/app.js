let cl=console.log;
const stdform=document.getElementById("stdform")
const fnamecontrols=document.getElementById("fname")
const lnamecontrols=document.getElementById("lname")
const emailcontrols=document.getElementById("email")
const contactcontrols=document.getElementById("contact")
const submit=document.getElementById("submit")
const updatebtn=document.getElementById("updatebtn")


let stdArray=[];
function setsudent(){
  localStorage.setItem("stdinfo",JSON.stringify(stdArray))
}

const onClickhandler=(ele)=>{
    cl("submit",ele)
    let getid=ele.getAttribute("data-id")
   cl("edited, ele")
   localStorage.setItem("updateid",getid)
    let getobj=stdArray.find(std=>std.id===getid)
   
    //value patch
    fnamecontrols.value=getobj.fname;
    lnamecontrols.value=getobj.lname;
    emailcontrols.value=getobj.email;
    contactcontrols.value=getobj.contact;
    cl(getobj)
    submit.classList.add("d-none");
    updatebtn.classList.remove("d-none")

    
    

}





const teamplating=(arr)=>{
  let result='';
  arr.forEach((std,i)=>{
    result+=`
    <tr>
             <td>${i+1}</td>
             <td>${std.fname}</td>
             <td>${std.lname}</td>
             <td>${std.email}</td>
             <td>${std.contact}</td>
             <td>
             <button class="btn btn-info" data-id="${std.id}" onclick="onClickhandler(this)">Edit</button>
             </td>
             <td>
             <button class="btn btn-danger" data-id="${std.id}" onclick="ondeletehandler(this)">Delet</button>
             </td>
</tr> 
    `
  })
  stdcontainer.innerHTML=result;
}
if(localStorage.getItem("stdinfo")){
  stdArray=JSON.parse(localStorage.getItem("stdinfo"))
  teamplating(stdArray)
}

 

    



















const onsubmit=(eve)=>{
    eve.preventDefault();
   // cl("submited")
   let obj={
    fname:fnamecontrols.value,
    lname:lnamecontrols.value,
    email:emailcontrols.value,
    contact:contactcontrols.value,
    id:uuid()
   }
   
   stdArray.push(obj)

  cl(stdArray)
  //store localstrorage data
 localStorage.setItem("stdinfo",JSON.stringify(stdArray))
//setsudent()
 teamplating(stdArray)
}

  



function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

 const onupdatebtn=(eve)=>{
  cl("submit")
  let updateid=localStorage.getItem("updateid", stdArray)
  cl(updateid)
  stdArray.forEach(std=>{
    if(updateid===std.id){
      std.fname=fnamecontrols.value;
      std.lname=lnamecontrols.value;
      std.email=emailcontrols.value;
      std.contact=contactcontrols.value;
    }
  })
  localStorage.setItem("stdinfo",JSON.stringify(stdArray))
  //setsudent()
  teamplating(stdArray)
 }

 const ondeletehandler=(k)=>{
  cl("delet")
//get id
let deletid=k.getAttribute("data-id")
cl(deletid)
//get ojc find id
let getindexof=stdArray.findIndex(std=>std.id===deletid)
//cl(getindexof)
stdArray.splice(getindexof, 1)
 localStorage.setItem("stdinfo",JSON.stringify(stdArray))
//setsudent()
cl(k.parentElement.parentElement)
k.parentElement.parentElement.remove()
stdform.reset()

 }



  

stdform.addEventListener("submit", onsubmit)
updatebtn.addEventListener("click", onupdatebtn)


  
  
