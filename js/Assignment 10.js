
var siteNameInput = document.getElementById("sitename")
var siteURLInput = document.getElementById("siteurl")
var siteDesInput=document.querySelector("#siteDes")
var searchType=document.getElementById("searchInput")
var regexName= /^[A-Z][a-z]{2,}$/;
var regexURL=/^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
var regexDes=/^(\w+[ ]+){3,}$/
var sites = []
var editIndex=-1

if(localStorage.getItem("sitesData")!=null){
    sites=JSON.parse(localStorage.getItem("sitesData"))
    showSite()
}

siteNameInput.addEventListener('change',function(){
    valid(regexName,siteNameInput)
})

siteURLInput.addEventListener('change',function(){
    valid(regexURL,siteURLInput)
})

siteDesInput.addEventListener('change',function(){
    valid(regexDes,siteDesInput)
})

function valid(regexEl,El){
    if(regexEl.test(El.value)==true){
        El.classList.add('is-valid')
        El.classList.remove('is-invalid')
        return true
    }
    else{
        El.classList.remove('is-valid')
        El.classList.add('is-invalid')
        return false
    }
}

function showSite(){
        var temp='';
    for(var i = 0 ; i < sites.length ; i++){
       
        temp+=`<tr>
                    <td>`+(i+1)+`</td>
                    <td>`+sites[i].name+`</td>
                    <td><a href=`+sites[i].url+` target="_blank"><button class="btn btn-warning"><i class="fa-regular fa-eye"></i> Visit</button></a></td>
                    <td><button type="button" onclick="deleteSite(`+i+`)" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
                    <td><button type="button" onclick="updateSite(`+i+`)" class="btn btn-info"><i class="fa-regular fa-pen-to-square"></i> Update</button></td>
                </tr>`
    }
   
    document.getElementById("mydata").innerHTML=temp;
}

function checkSite(){
    var equality=0
    for(var i=0;i<sites.length;i++){
        if(siteNameInput.value==sites[i].name || siteURLInput.value==sites[i].url || siteDesInput.value==sites[i].Des){
            equality++
        }
    }
    if(equality>0){return true}
    else{return false }
}

function addSite(){
    if(valid(regexName,siteNameInput)==true && valid(regexURL,siteURLInput)==true && valid(regexDes,siteDesInput)==true){
        if(checkSite()==true){alert("This site is alerady exist")}
        else{
        var site ={
        name : siteNameInput.value,
        url : siteURLInput.value,
        Des: siteDesInput.value,
    }
    sites.push(site)
    localStorage.setItem("sitesData",JSON.stringify(sites))
    showSite()

        }
    
    }
    else{
       showAlert()
       clearForm()
       document.getElementById('tocontainer').style.pointerEvents='none'
    }
    clearForm()

}
document.querySelector("#submitBtn").addEventListener('click',addSite)


function deleteSite(index){
    sites.splice(index,1)
    localStorage.setItem("sitesData",JSON.stringify(sites))
    showSite()
}

function search(){
    var searchVal=searchType.value.toLowerCase()
    var temp='';
    for(var i=0;i<sites.length;i++){
        if(sites[i].name.toLowerCase().includes(searchVal)){
            temp+=`<tr>
                    <td>`+i+`</td>
                    <td>`+sites[i].name.toLowerCase().replace(searchVal,"<span class='bg-info'>"+searchVal+"</span>")+`</td>
                    <td><a href=`+sites[i].url+` target="_blank"><button class="btn btn-warning">Visit</button></a></td>
                    <td><button type="button" onclick="deleteSite(`+i+`)" class="btn btn-danger">Delete</button></td>
                    <td><button type="button" onclick="updateSite(`+i+`)" class="btn btn-info"><i class="fa-regular fa-pen-to-square"></i> Update</button></td>
                </tr>`
            }
    }
    document.getElementById("mydata").innerHTML=temp;
}

function hideAlert(){
    document.getElementById("alert").style='display:none';
    document.getElementById("tocontainer").style='opacity:100%';
    document.getElementById('tocontainer').style.pointerEvents='auto'
}

function showAlert(){
    document.getElementById("alert").style='display:block';
    document.getElementById("tocontainer").style='opacity:50%';
}

function clearForm(){
    siteNameInput.value='';
    siteURLInput.value='';
    siteDesInput.value='';
    siteNameInput.classList.remove('is-invalid')
    siteURLInput.classList.remove('is-invalid')
    siteDesInput.classList.remove('is-invalid')
    siteNameInput.classList.remove('is-valid')
    siteURLInput.classList.remove('is-valid')
    siteDesInput.classList.remove('is-valid')
}

function updateSite(index){
    siteNameInput.value=sites[index].name
    siteURLInput.value=sites[index].url
    siteDesInput.value=sites[index].Des
    document.querySelector("#editBtn").classList.remove("d-none")
    document.querySelector("#submitBtn").classList.replace('d-grid',"d-none")
}

function editSite(index){
    if(valid(regexName,siteNameInput)==true && valid(regexURL,siteURLInput)==true && valid(regexDes,siteDesInput)==true){
        if(checkSite()==true){alert("This site is already exist")
                             document.querySelector("#submitBtn").classList.replace('d-none',"d-grid")
                            document.querySelector("#editBtn").classList.add("d-none")}
        else{    
            editIndex=index
        var site ={
        name : siteNameInput.value,
        url : siteURLInput.value,
        Des: siteDesInput.value,
    }
    sites.splice(index,1,site)
    localStorage.setItem("sitesData",JSON.stringify(sites))
    showSite()
    document.querySelector("#submitBtn").classList.replace('d-none',"d-grid")
    document.querySelector("#editBtn").classList.add("d-none")
         }
    
    }
    else{
       showAlert()
       clearForm()
       document.getElementById('tocontainer').style.pointerEvents='none'
    }
    clearForm()
}
document.querySelector("#editBtn").addEventListener('click',editSite)




             
// var data="Welcome in js file"
// console.log(data.charAt(14))      get element according to given index
// console.log(data.charCodeAt("n")) Asici code for element in array
// var res= data.repeat(4);          repeat array for many times
// console.log(data.toLowerCase())   convert array to lower case
// console.log(data.toUpperCase())   convert array to upper case
// console.log(data.trim())          delete outer spacing
// var res=data.replace("in","HI")      replace array element
// console.log(data.indexOf("i"))       indexof specific element in array 
// console.log(data.lastIndexOf("i"))  
// console.log(data.split("")) 
// console.log(data.slice(3,8))
// var searchvalue="IN"
// console.log(data.toLowerCase().includes(searchvalue.toLowerCase()))






 






