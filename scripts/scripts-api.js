let namesDiv = document.querySelector('[data-names-list]');
let detailsDiv = document.querySelector('[data-details]');
let details = document.querySelectorAll('[data-detail]');
let name = document.querySelector('[data-name]');
let born = document.querySelector('[data-born]');
let died = document.querySelector(`[data-died]`);
let titles = document.querySelector(`[data-titles]`);
let aliases = document.querySelector(`[data-aliases]`);
let father = document.querySelector(`[data-father]`);
let mother = document.querySelector(`[data-mother]`);
let spouse = document.querySelector(`[data-spouse]`);
let allegiances = document.querySelector(`[data-allegiances]`);

let resetList = document.querySelector(`[data-reset]`);
resetList.addEventListener('click', showAllChars);

let topSortDiv = document.querySelector('[data-sort-nums]')

// prints all names to the character names list div
function getNames(object) {
    // object.forEach(character => {
        let para = document.createElement('p');
        para.classList.add('char');
        para.textContent = object.name;
        // adds event listener to each newly created paragraph tag, calls getCharDetails when clicked
        para.addEventListener('click', getDetails);
        namesDiv.append(para);
}

let promisesArray = [];

// loops through all pages of GOT characters and calls fetchRequest
function createURLs() {
    for (let i = 0; i < 44; i++) {
        let currentPageURL = `https://www.anapioficeandfire.com/api/characters?page=${i}&pageSize=50`
    
        fetchRequest(currentPageURL);
    }
}

createURLs();

// takes URL from createURLs function and pushes the fetch request to the promisesArray
function fetchRequest(characterURL) {
    let request = fetch(characterURL)
    .then(response => response.json())

    promisesArray.push(request);

}

let charactersArray = [];

// uses Promise.all on array of promises, then calls getNames on each character object
function getCharactersInfo() {

    // when all promises are resolved
    Promise.all(promisesArray)
        // take the result of that promise and put into charactersArray
        .then(function(characterData) {
            // console.log(characterData);
            characterData.forEach(function(charactersArray) {
                charactersArray.forEach(character => {
                    getNames(character);
                });
            })
        })

}

getCharactersInfo();

// creates another array of promises and finds the character that matches the clicked name
function getCharactersDetails(charName) {

    let promisesArray2 = [];

    for (let i = 0; i < 44; i++) {
        let currentPageURL = `https://www.anapioficeandfire.com/api/characters?page=${i}&pageSize=50`;
        let request = fetch(currentPageURL)
        .then(response => response.json())

        promisesArray2.push(request)
    }

    // when all promises are resolved
    Promise.all(promisesArray2)
        .then(function(characterData) {
            characterData.forEach(function(charactersArray) {
                charactersArray.forEach(character => {
                    if (character.name === charName) {
                        name.textContent = `Name: ${character.name}`;
                        born.textContent = `Born: ${character.born}`;
                        titles.textContent = `Titles: ${character.titles}`;
                        aliases.textContent = `Aliases: ${character.aliases}`
                    };
            })
        })

    })
} 



function getDetails(event) {
    let characterName = event.target.textContent;
    getCharactersDetails(characterName);
}









// function that handles sorting, depending on which letter is clicked by user
function sortList(event) {
    charList.forEach(letter => {
        letter.style.color = 'blue';
    })
    event.target.style.color = 'red';
    let sortLetter = event.target.textContent;

    allNames.forEach(name => {
        name.style.display = 'block';
        if (name.textContent[0] !== sortLetter) {
            name.style.display = 'none';
        }
    })
}

function showAllChars() {
    // reset sort letters
    charList.forEach(letter => {
        letter.style.color = 'blue';
    })
    // reset the character list (unhide all hidden characters)
    allNames.forEach(name => {
        name.style.display = 'block';
    })
}



// makes list of letters at the top for sorting
let charList = [];
function makeList() {
    let charCode = 65;
    while (charCode <= 90) {
        let letter = String.fromCharCode(charCode);
        let newH3 = document.createElement('h3');
        newH3.style.margin = '5px';
        newH3.style.display = 'inline-block';
        newH3.textContent = letter;
        topSortDiv.append(newH3);
        charList.push(newH3);
        charCode += 1;
    }
}
makeList();

// adds event listener to each letter in sorting list
charList.forEach(letter => {
    letter.addEventListener('click', sortList);
})