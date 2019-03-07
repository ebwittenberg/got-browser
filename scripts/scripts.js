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

let topSortDiv = document.querySelector('[data-sort-nums]')

function makeList() {
    let charCode = 65;
    while (charCode <= 90) {
        let letter = String.fromCharCode(charCode);
        let newH3 = document.createElement('h3')
        newH3.textContent = letter;
        topSortDiv.append(letter);
        charCode += 1;
    }
}
makeList();

function getNames(object) {
    object.forEach(character => {
        let para = document.createElement('p');
        para.classList.add('char');
        para.textContent = character.name;
        namesDiv.append(para);
        
    })
}
getNames(characters);

let allNames = document.querySelectorAll('.char');

allNames.forEach(name => {
    name.addEventListener('click', getCharDetails)
})

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

