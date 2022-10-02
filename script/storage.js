'use strict';

function saveToStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

