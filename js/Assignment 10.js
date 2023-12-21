
var siteNameInput = document.getElementById("sitename")
var siteURLInput = document.getElementById("siteurl")
var searchType=document.getElementById("searchInput")
var sites = []

if(localStorage.getItem("sitesData")!=null){
    sites=JSON.parse(localStorage.getItem("sitesData"))
    showSite()
}
function addSite(){
    var validRegexSiteName = /^[A-Z][a-z]{2,8}$/;
    var validRegexSiteURL=/^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    var text1=siteNameInput.value
    var text2=siteURLInput.value
    if(validRegexSiteName.test(text1)&&validRegexSiteURL.test(text2)){
    // siteNameInput.classList.add('is-valid')
    // siteURLInput.classList.add('is-valid')
    var site ={
        name : siteNameInput.value,
        url : siteURLInput.value,
    }
    sites.push(site)
    localStorage.setItem("sitesData",JSON.stringify(sites))
    showSite()
    }
    else{
       showAlert()
       clearForm()
       document.getElementById('tocontainer').style.pointerEvents='none'
    }
    clearForm()

}
function showSite(){
        var temp='';
    for(var i = 0 ; i < sites.length ; i++){
       
        temp+=`<tr>
                    <td>`+(i+1)+`</td>
                    <td>`+sites[i].name+`</td>
                    <td><a href=`+sites[i].url+` target="_blank"><button class="btn btn-warning"><i class="fa-regular fa-eye"></i> Visit</button></a></td>
                    <td><button type="button" onclick="deleteSite(`+i+`)" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
                </tr>`
    }
   
    document.getElementById("mydata").innerHTML=temp;
}
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
}

             
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






 

function update(){
    siteNameInput=sites[i].name
}




