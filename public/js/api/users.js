import { delay } from './utils.js';

let users = JSON.parse(localStorage.getItem('users') || '[]');

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

export async function getUsers() {
    await delay();
    return [...users];
}

export async function addUser(name) {
    await delay();
    const newUser = { id: Date.now(), name };
    users.push(newUser);
    saveUsers();
    return newUser;
}
