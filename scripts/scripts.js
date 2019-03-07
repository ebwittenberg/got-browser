let namesDiv = document.querySelector('[data-names-list]');

function getNames(object) {
    object.forEach(character => {
        let para = document.createElement('p');
        para.textContent = character.name;
        namesDiv.append(para);
        
    })
}
getNames(characters);

let allNames = document.querySelectorAll('p');

allNames.forEach(name => {
    name.addEventListener('click', getCharDetails)
})

function getCharDetails(event) {
    console.log(event.target.textContent);
}

