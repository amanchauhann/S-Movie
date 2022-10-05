const baseURL = "http://www.omdbapi.com/"
const API = "apikey=adeca441"
let id = [];
let input = document.getElementById("input");
let button = document.getElementById("submitBtn")
let idsFromLocalStorage = JSON.parse( localStorage.getItem("localIds") );
let addToWatchlistBtns = "";
let localId = [];
let html = "";

/* This grabs data from localStorage if it exists */
if(idsFromLocalStorage) {
    localId = idsFromLocalStorage;
}

// This is submit button after entering input in search field.
/* Refactored this to simply call getMovie instead of calling a function just to call another function */
button.addEventListener(("click"), getMovie)

/* Changed this to async / await to better control the data */
async function getMovie() {
    // This is clearing the id so previous results doesnt show up with the current results.
    id=[]

    // this is getiing the id of movies in result of search.
    const response = await fetch(`${baseURL}?s=${input.value}&${API}`)
    const data = await response.json()
    // storing the id in global array.
    for (let i=0; i<data.Search.length; i++){
        id.push(data.Search[i].imdbID)
    }

    // invoking function to get movie detail by above id
    getMovieDetails()

    // clearing input field
    input.value = "";
}
// Personal: this is a short way of writing *function on line 140*

// this is storing ids to localId array
function setLocalMemory(imdbID) {

    /* Uses Nullish Coalescing Operator to determine if localIds is null or undefined, if null/undefined it sets localId to a blank array, otherwise sets localId to localIds */
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator */
    localId = JSON.parse(localStorage.getItem("localIds")) ?? [];
    const isExist = localId.includes(imdbID);
    if (isExist) return;
    localId.push(imdbID);
    localStorage.setItem("localIds", JSON.stringify(localId) )
}

// this is using id from getMovie() and id variable and getting movie details
/* Changed this to async / await to better control the data 
   Moved the HTML creation into a new function
   After the for loop called a new function to render the HTML onto the DOM so the DOM is only updated once instead of being updated for each movie
*/
async function getMovieDetails() {
    // this is fetching us movie detail
    for(let i=0; i<id.length; i++){
        // function localFunction(){
        //     localId.push(id[i])
        // }
        const response = await fetch(`${baseURL}?i=${id[i]}&${API}`)
        const data = await response.json()

        /* Takes the feteched data and creates HTML for the element */
        getHTML(data);
    }

    /*  Renders the HTML onto the DOM*/
    renderHTML();
}

/* This function uses the fetched data from getMovieDetails and creates the HTML for the fetched movie */
function getHTML(data) {
    html += `
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
                    <button id="${data.imdbID}" class="myBtn">Watchlist</button>
                </div>
                <div class="thirdContainer">
                ${data.Plot}
                </div>
            </div>
        </div>
        <hr>
    `
}

/* This function renders the HTML from getHTML onto the DOM */
function renderHTML() {
    document.getElementById("watchlistContainer").innerHTML = html;
    addWatchlistButtons()
}

/* This function adds event listeners to all of the buttons */
function addWatchlistButtons() {
    addToWatchlistBtns = document.getElementsByClassName("myBtn");
    for (let i=0; i<addToWatchlistBtns.length; i++) {
        addToWatchlistBtns[i].addEventListener("click", (event) => {
            setLocalMemory(event.target.id);
        })
    }
}
