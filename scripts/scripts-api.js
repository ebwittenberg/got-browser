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

// prints all names to the character names list div
function getNames(object) {
    // object.forEach(character => {
        let para = document.createElement('p');
        para.classList.add('char');
        para.textContent = object.name;
        // adds event listener to each newly created paragraph tag, calls getCharDetails when clicked
        para.addEventListener('click', getCharDetails);
        namesDiv.append(para);
}

// holds array of promises
let promisesArray = [];
for (let i = 0; i < 44; i++) {
    let currentPageURL = `https://www.anapioficeandfire.com/api/characters?page=${i}&pageSize=50`

    fetchRequest(currentPageURL);
}

function fetchRequest(characterURL) {
    let request = fetch(characterURL)
    .then(response => response.json())

    promisesArray.push(request);

}

let charactersArray = [];
// when all promises are resolved
Promise.all(promisesArray)
    // take the result of that promise and put into charactersArray
    .then(function(characterData) {
        characterData.forEach(function(charactersArray) {
            charactersArray.forEach(character => {
                getNames(character);
            });
        })
    })



// add event listener to a targetted name


function getCharDetails(event) {



    // reset character details
    details.forEach(detail => {
        detail.textContent = '';
    })
    // saves character name
    let charName = event.target.textContent

    // let para = document.createElement('p');
    // loop through characters
    characters.forEach(character => {
        if (character.name === charName) {
            name.textContent = `Name: ${character.name}`;
            if (character.born.length) {
                born.textContent = `Born: ${character.born}`;
            } else {
                born.textContent = `Born: unknown`;
            }
            if (character.died.length) {
                died.textContent = `Died: ${character.died}`;
            } else {
                died.textContent = 'Died: Still alive (as far as we know)'
            }
            titles.textContent = `Titles: ${character.titles}`;
            aliases.textContent = `Aliases: ${character.aliases}`;
        }
    })


}

// creates selector that points to all the names
// let allNames = document.querySelectorAll('.char');


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

// gets the character details and prints to right hand details div