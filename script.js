'use strict';
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
// const calculateBMIBtn = document.getElementById("calculateBMI-btn");
const tbody = document.getElementById("tbody")

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

//Key for local storage
const keyPetArr = "petArr"
const keyBreedArr = "breedArr"
const petArr = getFromStorage(keyPetArr)
const breedArr = getFromStorage(keyBreedArr)

renderTableData(petArr)

//Render data rows
function renderTableData(arr){
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
            <td><button type="button" class="btn btn-danger" onClick="deletePet('${ arr[i].id }')">Delete</button></td>
        </tr>`
        tbody.appendChild(row)
    }
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
        petArr.forEach(pet => {
            if (pet.id == data.id){
                alert("ID must unique!")
                status = false
            }
        })
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
    idInput.value = ""
    nameInput.value = ""
    ageInput.value = ""
    typeInput.value = "Select Type"
    weightInput.value = ""
    lengthInput.value = ""
    breedInput.value = "Select Breed"
    colorInput.value = "#000000"
    vaccinatedInput.checked = false
    dewormedInput.checked = false
    sterilizedInput.checked = false
}

// Delete row
const deletePet = (petId) => {
    if (confirm('Are you sure?')) {
        for(let i=0; i<petArr.length; i++){
            if (petArr[i].id == petId){
                petArr.splice(i, 1)
            }
        }
        renderTableData(petArr)
        saveToStorage(keyPetArr, petArr)
	}
}

//Filter healthy pet
let healthyCheck = false
healthyBtn.addEventListener('click', function(){
    healthyCheck = !healthyCheck
    if (healthyCheck){
        healthyBtn.textContent = "Show All Pet"
        let result = petArr.filter(pet => pet.vaccinated == true && pet.dewormed == true && pet.sterilized == true)
        renderTableData(result)
    } else {
        healthyBtn.textContent = "Show Healthy Pet"
        renderTableData(petArr)
    }
})

//Add row
submitBtn.addEventListener('click', function () {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: weightInput.value,
        length: lengthInput.value,
        breed: breedInput.value,
        color: colorInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: getDate()
    }

    const validate = validateData(data)
    if (validate) {
        petArr.push(data)
        clearInput()      
        renderTableData(petArr)
        saveToStorage(keyPetArr, petArr)
    }
});

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


//Asm 2

// Slidebar animation
const sidebar = document.getElementById("sidebar");
const toggleNavbar = document.querySelector(".sidebar-header")
toggleNavbar.addEventListener('click', function(e){
    sidebar.classList.toggle("active")
})

// Render Breed
function renderBreed(arr){
    breedInput.innerHTML = "<option>Select Breed</option>"
    for (let i=0; i<arr.length; i++){
        const option = document.createElement(`option`)
        option.innerHTML = `<option>${arr[i].name}</option>`
        breedInput.appendChild(option)
    }
}

typeInput.addEventListener('change', function(){
    if (typeInput.value === "Dog"){
        const result = breedArr.filter(item => item.type == "Dog" )
        renderBreed(result)
    } else if (typeInput.value === "Cat") {
        const result = breedArr.filter(item => item.type == "Cat" )
        renderBreed(result)
    }
})
