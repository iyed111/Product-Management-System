let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mode = "create" ;
let temp ;

//console.log(title,price,taxes,ads,discount,total,count,category,submit)

//total
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result ;

        total.style.background="#040"
    }
    else{
        total.innerHTML = "";
        total.style.background="#a00d02"

    }
}

//creation
let dataProd;
if(localStorage.product  != null){
    dataProd = JSON.parse(localStorage.product)
}
else{
    dataProd = [];

}

submit.onclick = function(){
    let newProd = {                                 //objet  
        title: title.value.toLowerCase() ,
        price: price.value ,
        taxes: taxes.value ,
        ads: ads.value ,
        discount: discount.value ,

        total: total.innerHTML ,

        count: count.value ,
        category: category.value.toLowerCase() ,

    }


    if(title.value != "" && price.value !="" && category.value !="" && newProd.count < 101){
        if(mode === "create"){

            if(newProd.count > 1 ){
                for(let i=0 ; i < newProd.count ; i++){
                    dataProd.push(newProd);
                }
            }else{
                dataProd.push(newProd) ;
            }
    
            // update
        }else{
    
            dataProd[temp] = newProd ;
    
            mode = "create" ;
            submit.innerHTML ="Créer" ;
            count.style.display="block" ;
    
        }

        clearData() ;

    }
    

    
    // save on localstorage
    localStorage.setItem("product" , JSON.stringify(dataProd))

     
    showData() ;      
}

//clear
function clearData(){
    title.value ="" ;
    price.value ="" ;
    taxes.value ="" ;
    ads.value ="" ;
    discount.value="" ;         ///

    total.innerHTML ="" ;

    count.value ="" ;
    category.value ="" ;

    //window.alert("done")

}

//read
function showData(){
    getTotal() ;

    let table = "";
    for(let i=0 ; i< dataProd.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Mise a jour</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Effacer</button></td>
        </tr>
        
        `;

    }

    document.getElementById("tbody").innerHTML = table ;


    //suppression de tout les prods
    let btnDelete = document.getElementById("deleteAll");
    if(dataProd.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Effacer Tout (${dataProd.length})</button>        
        
        `
    }
    else{
        btnDelete.innerHTML = "" ;
    }


}
showData() ;            //toujours data affichee


//delete
function deleteData(i){
    dataProd.splice(i , 1) ;
    localStorage.product = JSON.stringify(dataProd);
    showData()              // refesh


}

function deleteAll(){
    localStorage.clear()
    dataProd.splice(0)  // mn 0 le5er length
    showData()  
}


//update
function updateData(i){
    title.value = dataProd[i].title ;
    price.value = dataProd[i].price ;
    taxes.value = dataProd[i].taxes ;
    ads.value = dataProd[i].ads ;
    discount.value = dataProd[i].discount ;
    getTotal() 
    count.style.display="none" ;
    category.value = dataProd[i].category ;

    submit.innerHTML = "Mise a jour" ;

    mode = "update"  ;
    temp = i ;
    scroll({
        top:0 ,
        behavior: "smooth",
    })

}



//search
let searchMode = "title" ;

function getSearchMode(id){
    let search = document.getElementById("search") ;

    if(id == "searchTitle"){
        searchMode = "title" ;
    }else{
        searchMode = "category" ;
    }


    search.placeholder="Recherche par "+ searchMode ;


    search.focus() ;
    search.value="" ;
    showData() ;

}

function searchData(value){
    let table="" ;


    for(let i=0 ; i <dataProd.length ; i++){
        if(searchMode == "title"){
        
            if(dataProd[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProd[i].title}</td>
                        <td>${dataProd[i].price}</td>
                        <td>${dataProd[i].taxes}</td>
                        <td>${dataProd[i].ads}</td>
                        <td>${dataProd[i].discount}</td>
                        <td>${dataProd[i].total}</td>
                        <td>${dataProd[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Mise a jour</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Effacer</button></td>
                    </tr>
        
                `;

            }
    }else{
        
            if(dataProd[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProd[i].title}</td>
                        <td>${dataProd[i].price}</td>
                        <td>${dataProd[i].taxes}</td>
                        <td>${dataProd[i].ads}</td>
                        <td>${dataProd[i].discount}</td>
                        <td>${dataProd[i].total}</td>
                        <td>${dataProd[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Mise a jour</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Effacer</button></td>
                    </tr>
        
                `;
            }
    }


    }

    document.getElementById("tbody").innerHTML = table ;

}


