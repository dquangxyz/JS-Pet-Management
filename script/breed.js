'use strict';

const breedInputBreed = document.getElementById("input-breed");
const typeInputBreed = document.getElementById("input-type");
const tbodyBreed = document.getElementById("tbody");
const submitBreedBtn = document.getElementById("submit-btn");

const keyBreedArr = "breedArr"
const breedArr = getFromStorage(keyBreedArr)
console.log(breedArr)
renderTableBreed(breedArr)

// Validate data
function validateData(data){
    let status = true
    if (data.type == "Select Type"){
        alert("Please select type!")
        status = false
    }
    if (data.name == ""){
        alert("Please type the breed name!")
        status = false
    }
    return status
}

// Render Table
function renderTableBreed(arr) {
    tbodyBreed.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      const row = document.createElement("tr");
      row.innerHTML = 
      `<tr>
            <td>${[i + 1]}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].type}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${arr[i].name}')">Delete</button></td>
        </tr>`;
      tbodyBreed.appendChild(row);
    }
}

//Clear input
function clearInput(){
    breedInputBreed.value = ""
    typeInputBreed.value = "Select Type"
}

// Delete row
const deleteBreed = (name) => {
    for(let i=0; i<breedArr.length; i++){
        if (breedArr[i].name == name){
            breedArr.splice(i, 1)
        }
    }
    renderTableBreed(breedArr)
    saveToStorage(keyBreedArr, breedArr)
}

submitBreedBtn.addEventListener('click', function(){
    const data = {
        name: breedInputBreed.value,
        type: typeInputBreed.value
    }
    if (validateData(data)){
        breedArr.push(data)
        clearInput()
        renderTableBreed(breedArr)
        saveToStorage(keyBreedArr, breedArr)
    }
})