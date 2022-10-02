'use strict';
const keyPetArr = "petArr"
const keyBreedArr = "breedArr"

var petArr = getFromStorage(keyPetArr)
const breedArr = getFromStorage(keyBreedArr)


function savePetDataToFile() {
    const petData = new Blob([JSON.stringify(petArr)], { type: "text/plain;charset=utf-8" })
    saveAs(petData, "petData.json");
}

function loadFile() {
    let file = document.getElementById("input-file").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (event) {
            petArr = JSON.parse(event.target.result)
            saveToStorage(keyPetArr, petArr)
            console.log("Successfully imported data")
        }
        reader.onerror = function (event) {
            console.log("error")
        }
    }
}