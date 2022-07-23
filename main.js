let id = [];
let input = document.getElementById("input");
let button = document.getElementById("submitBtn")
let idsFromLocalStorage = JSON.parse( localStorage.getItem("localIds") );

let localId = [];

if(idsFromLocalStorage){
    localId = idsFromLocalStorage;
}


const baseURL = "http://www.omdbapi.com/"
const API = "apikey=adeca441"


// This is submit button after entering input in search field.
button.addEventListener(("click"), clickhandler)

function clickhandler(){
    // This is clearing the watchList so previous results doesnt show up with the current results.
    document.getElementById("watchlistContainer").innerHTML ="";

    getMovie()
}

function getMovie() {
    // This is clearing the id so previous results doesnt show up with the current results.
    id=[]

    // this is getiing the id of movies in result of search.
    fetch(`${baseURL}?s=${input.value}&${API}`)
    .then(res=>res.json())
    .then(data=>{
        // storing the id in global array.
        for (let i=0; i<data.Search.length; i++){
            id.push(data.Search[i].imdbID)
        }

        // invoking function to get movie detail by above id
        getMovieDetails()

        // clearing input field
        input.value = "";

    })
}
// Personal: this is a short way of writing *function on line 140*

// this is storing ids to localId array
function setLocalMemory(index) {
    const movieId = id[index];

    const isExist = localId.includes(movieId);
    if (isExist) return;

    localId.push(movieId);
    localStorage.setItem("localIds", JSON.stringify(localId) )
    console.log(localId)

}

// this is using id from getMovie() and id variable and getting movie details
function getMovieDetails() {
    // this is fetching us movie detail
    for(let i=0; i<id.length; i++){
        // function localFunction(){
        //     localId.push(id[i])
        // }
        fetch(`${baseURL}?i=${id[i]}&${API}`)
    .then(res=>res.json())
    .then(data=>{

        document.getElementById("watchlistContainer").innerHTML += `
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
                <button onClick="setLocalMemory(${i})"}>Watchlist</button>
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

// myWatchList JS starts from here


// document.getElementById("some").addEventListener("click", ()=>{
    
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
    
// })




























// fetch(`${baseURL}?s=Game of Thrones&${API}`)
//     .then(res=>res.json())
//     .then(data=>{
//         console.log(data)
//         id = data.Search[0].imdbID
//         console.log(id)


    // fetch(`${baseURL}?i=${id}&${API}`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //     })
    // })



    // if(input.value.length === 0){
//     button.setAttribute("disabled", "")
// }


// function localFunction(i){
//     const movieIndex = id[i];
//     if(!localId.includes(movieIndex)){
//         localId.push(movieIndex)
//     }
    
//     console.log(localId)
// }
