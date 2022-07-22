let id = [];
let input = document.getElementById("input");
let button = document.getElementById("submitBtn")

const baseURL = "http://www.omdbapi.com/"
const API = "apikey=adeca441"


// if(input.value.length === 0){
//     button.setAttribute("disabled", "")
// }


button.addEventListener(("click"), clickhandler)

function clickhandler(){
    getMovie()
    console.log(input.value)
}

function getMovie() {
    // this is getiing the id of movies in result of search.
    fetch(`${baseURL}?s=${input.value}&${API}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        // storing the id in global variable
        for (let i=0; i<data.Search.length; i++){
            id.push(data.Search[i].imdbID)
        }
        // id = data.Search[0].imdbID
        // invoking function to get movie detail by above id
        getMovieDetails()
        console.log(id)
        input.value = "";

    })
}

// this is using id from getMovie() and id variable and getting movie details
function getMovieDetails() {
    // this is fetching us movi detail
    for(let i=0; i<id.length; i++){
        fetch(`${baseURL}?i=${id[i]}&${API}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
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
                <button>Watchlist</button>
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