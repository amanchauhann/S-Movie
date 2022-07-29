import {localId} from './main2.js';



function removeFromLocalStorage(index){
    // if(index>-1){
    //     idsFromLocalStorage.splice(index, 1)
        localId.splice(index, 1)
        localStorage.setItem("localIds", JSON.stringify(localId) )
    // }
    
    location.reload();
}



if(idsFromLocalStorage.length>0){
    for(let i=0; i<idsFromLocalStorage.length; i++){
        // function localFunction(){
        //     localId.push(id[i])
        // }
        fetch(`${baseURL}?i=${idsFromLocalStorage[i]}&${API}`)
    .then(res=>res.json())
    .then(data=>{

        document.getElementById("laterContainer").innerHTML += `
        <div class="movieContainer">
        <div class="imageContainer">
            <img src=${data.Poster} />
        </div>
        
        <div class="rightContainer">
            <div class="firstContainer">
                <h3 class="title">${data.Title}</h3>
                <p class="rating">${data.imdbRating}</p>
            </div>
            
            <div class="secondContainer">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <button onClick="removeFromLocalStorage(${i})"}>Remove</button>
            </div>

            <div class="thirdContainer">
            ${data.Plot}
            </div>
        </div>
    </div>
    <hr>
        `
    })
    }
}