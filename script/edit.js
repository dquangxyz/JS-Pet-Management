'use strict';

const tbody = document.getElementById("tbody")
const submitBtn = document.getElementById("submit-btn")
const containerForm = document.getElementById("container-form")

const idInputEdit = document.getElementById("input-id");
const nameInputEdit = document.getElementById("input-name");
const ageInputEdit = document.getElementById("input-age");
const typeInputEdit = document.getElementById("input-type");
const weightInputEdit = document.getElementById("input-weight");
const lengthInputEdit = document.getElementById("input-length");
const colorInputEdit = document.getElementById("input-color-1");
const breedInputEdit = document.getElementById("input-breed");
const vaccinatedInputEdit = document.getElementById("input-vaccinated");
const dewormedInputEdit = document.getElementById("input-dewormed");
const sterilizedInputEdit = document.getElementById("input-sterilized");

//Key for local storage
const keyPetArr = "petArr";
const keyBreedArr = "breedArr";
const petArr = getFromStorage(keyPetArr);
const breedArr = getFromStorage(keyBreedArr);

renderTableDataEdit(petArr)

//Render data rows
function renderTableDataEdit(arr){
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
            <td><button type="button" class="btn btn-warning" onClick="startEditPet('${ arr[i].id }')">Edit</button>
            </td>
        </tr>`
        tbody.appendChild(row)
    }
}

//getDate function to format date into dd/mm/yyyy
function getDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + yyyy;
}

//Validate input
function validateData(data){
    let status = true

    // Check if the input is empty
    let emptyInput = false
    for (const key in data){
        if (["id", "name", "age","weight", "length"].includes(key) && data[key] == ""){
            alert(`Please provide ${key} !`)
            emptyInput = true
            status = false
            break
        }
    }
    if (!emptyInput){ //If the input is not empty, proceed to other validation conditions
        //Validate ID
        // petArr.forEach(pet => {
        //     if (pet.id == data.id){
        //         alert("ID must unique!")
        //         status = false
        //     }
        // })
        // Validate age
        if (data.age < 1 || data.age > 15 || isNaN(data.age)){
            alert("Age must be between 1 and 15!")
            status = false
        }
        // Validate weight
        if (data.weight < 1 || data.weight > 15){
            alert("Weight must be between 1 and 15!")
            status = false
        }
        // Validate length
        if (data.length < 1 || data.length > 15){
            alert("Length must be between 1 and 100!")
            status = false
        }
        //Validate type
        if (data.type == "Select Type"){
            alert("Please select Type!")
            status = false
        }
        // Validate breed
        if (data.breed == "Select Breed" || data.breed == ""){
            alert("Please select Breed!")
            status = false
        }
    }
    return status
}

//Clear input
function clearInput(){
    idInputEdit.value = ""
    nameInputEdit.value = ""
    ageInputEdit.value = ""
    typeInputEdit.value = "Select Type"
    weightInputEdit.value = ""
    lengthInputEdit.value = ""
    breedInputEdit.value = "Select Breed"
    colorInputEdit.value = "#000000"
    vaccinatedInputEdit.checked = false
    dewormedInputEdit.checked = false
    sterilizedInputEdit.checked = false
}



// Edit pet function
function startEditPet(petId){
    // Show the form
    containerForm.classList.remove("hide")

    // Find index and parse value into the form
    const index = petArr.findIndex(pet => pet.id === petId)
    idInputEdit.value = petArr[index].id
    nameInputEdit.value = petArr[index].name
    ageInputEdit.value = petArr[index].age
    typeInputEdit.value = petArr[index].type
    weightInputEdit.value = petArr[index].weight
    lengthInputEdit.value = petArr[index].length
    breedInputEdit.value = petArr[index].breed
    breedInputEdit.innerHTML = `<option>${petArr[index].breed}</option>`
    colorInputEdit.value = petArr[index].color
    vaccinatedInputEdit.checked = petArr[index].vaccinated
    dewormedInputEdit.checked = petArr[index].dewormed
    sterilizedInputEdit.checked = petArr[index].sterilized
}

// Submit button
submitBtn.addEventListener('click', function(){
    const data = {
        id: idInputEdit.value,
        name: nameInputEdit.value,
        age: parseInt(ageInputEdit.value),
        type: typeInputEdit.value,
        weight: weightInputEdit.value,
        length: lengthInputEdit.value,
        breed: breedInputEdit.value,
        color: colorInputEdit.value,
        vaccinated: vaccinatedInputEdit.checked,
        dewormed: dewormedInputEdit.checked,
        sterilized: sterilizedInputEdit.checked,
        date: getDate()
    }
    let valid = validateData(data)
    if (valid){
        const indexEdit = petArr.findIndex(pet => pet.id === data.id)
        petArr.splice(indexEdit, 1, data)
        clearInput()      
        renderTableDataEdit(petArr)
        saveToStorage(keyPetArr, petArr)
    }
})

// Render Breed
function renderBreed(arr){
    breedInputEdit.innerHTML = "<option>Select Breed</option>"
    for (let i=0; i<arr.length; i++){
        const option = document.createElement(`option`)
        option.innerHTML = `<option>${arr[i].name}</option>`
        breedInputEdit.appendChild(option)
    }
}
typeInputEdit.addEventListener('change', function(){
    if (typeInputEdit.value === "Dog"){
        const result = breedArr.filter(item => item.type == "Dog" )
        renderBreed(result)
    } else if (typeInputEdit.value === "Cat") {
        const result = breedArr.filter(item => item.type == "Cat" )
        renderBreed(result)
    }
})