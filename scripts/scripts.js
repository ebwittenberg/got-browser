let namesDiv = document.querySelector('[data-names-list]');


function getNames(object) {
    object.forEach(character => {
        let para = document.createElement('p');
        para.textContent = character.name;
        namesDiv.append(para);
        
    })
}
getNames(characters);


