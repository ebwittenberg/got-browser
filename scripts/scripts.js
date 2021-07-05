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
    object.forEach(character => {
        let para = document.createElement('p');
        para.classList.add('char');
        para.textContent = character.name;
        namesDiv.append(para);
    })
}
getNames(characters);


// creates selector that points to all the names
let allNames = document.querySelectorAll('.char');

// attaches event listener to each name
allNames.forEach(name => {
    name.addEventListener('click', getCharDetails)
})

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
function getCharDetails(event) {
    // reset selected character color
    allNames.forEach(name => {
        name.style.color = 'black';
    })


    // reset character details
    details.forEach(detail => {
        detail.textContent = '';
    })
    // saves character name
    event.target.style.color = 'red';
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

