"use strict";

const keyPetArr = "petArr";
const keyBreedArr = "breedArr";

const petArr = getFromStorage(keyPetArr);
const breedArr = getFromStorage(keyBreedArr);

const idInputFind = document.getElementById("input-id");
const nameInputFind = document.getElementById("input-name");
const typeInputFind = document.getElementById("input-type");
const breedInputFind = document.getElementById("input-breed");
const vaccinatedInputFind = document.getElementById("input-vaccinated");
const dewormedInputFind = document.getElementById("input-dewormed");
const sterilizedInputFind = document.getElementById("input-sterilized");

const tbody = document.getElementById("tbody");
const findBtn = document.getElementById("find-btn");

// Find button
findBtn.addEventListener("click", function () {
    const dataFind = {
        id: idInputFind.value,
        name: nameInputFind.value,
        type: typeInputFind.value,
        breed: breedInputFind.value,
        vaccinated: vaccinatedInputFind.checked,
        dewormed: dewormedInputFind.checked,
        sterilized: sterilizedInputFind.checked,
    }

    let result = [...petArr]

    // Find ID
    if (idInputFind.value.toUpperCase() !== "") {
        result = result.filter(pet => {
        return pet.id.toUpperCase().includes(idInputFind.value.toUpperCase())
        });
    }
    //Find name
    if (nameInputFind.value.toUpperCase() !== "") {
        result = result.filter(pet => {
        return pet.name.toUpperCase().includes(nameInputFind.value.toUpperCase())
        });
    }
    // Find type
    if (typeInputFind.value !== "Select Type") {
        result = result.filter(pet => {
        return pet.type === typeInputFind.value
        })
        }// Find Breed
    if (breedInputFind.value !== "Select Breed") {
        result = result.filter(pet => {
        return pet.breed.includes(breedInputFind.value)
        })
    }
    // Find vaccinated
    if (vaccinatedInputFind.checked === true){
        result = result.filter(pet => {
        return pet.vaccinated === vaccinatedInputFind.checked
        })
    }
    //Find dewormed
    if (dewormedInputFind.checked === true){
        result = result.filter( pet => {
            return pet.dewormed === dewormedInputFind.checked
        })
    }
    //Find sterilized
    if (sterilizedInputFind.checked === true){
        result = result.filter(pet => {
            return pet.sterilized === sterilizedInputFind.checked
        })
    }
        
    // console.log(result)
    renderTableFind(result)
})


// Render table
function renderTableFind(arr){
    tbody.innerHTML = ""
    for (let i=0; i<arr.length; i++){
        const row = document.createElement(`tr`)
        row.innerHTML = 
        `<tr>
            <th scope="row">${arr[i].id}</th>
            <td>${arr[i].name}</td>
            <td>${arr[i].age}</td>
            <td>${arr[i].type}</td>
            <td>${arr[i].weight} kg</td>
            <td>${arr[i].length} cm</td>
            <td>${arr[i].breed}</td>
            <td><i class="bi bi-square-fill" style="color: ${arr[i].color}"></i></td>
            <td><i class="${arr[i].vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
            <td><i class="${arr[i].dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
            <td><i class="${arr[i].sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
            <td>${arr[i].date}</td>
        </tr>`
        tbody.appendChild(row)
    }
}

// Render Breed
function renderBreed(arr){
    breedInputFind.innerHTML = "<option>Select Breed</option>"
    for (let i=0; i<arr.length; i++){
        const option = document.createElement(`option`)
        option.innerHTML = `<option>${arr[i].name}</option>`
        breedInputFind.appendChild(option)
    }
}

typeInputFind.addEventListener('change', function(){
    if (typeInputFind.value === "Dog"){
        const result = breedArr.filter(item => item.type == "Dog" )
        renderBreed(result)
    } else if (typeInputFind.value === "Cat") {
        const result = breedArr.filter(item => item.type == "Cat" )
        renderBreed(result)
    }
})

