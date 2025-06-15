 // Guests List
const guests = []

// The HTML Input Element
const inputElement = document.querySelector('.input');
// The HTML List Element
const listELement = document.getElementById('list');


document.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents the page from reloading
    const guestName = inputElement.value    //  Get the value entered in the input field
    if (!guestName) {
        //  Deny if the input field is empty
        return alert('Please enter name')
    }
    if (guests.length >= 10) {
        //  Deny if the guests list has already 10 members
        return alert('Maximum limit!')
    }
    //  Creates a guest object with their name, attending status, and time added and add it to the guests list
    guests.push({ name: guestName, attending: false, time: new Date().toLocaleString('en-UK') });
    inputElement.value = '';    //  Reset the input field
    renderGuests(); //  Display the updated list to the user
})

// This function renders the guests array as html and adds it to the list element
const renderGuests = () => {
    listELement.innerHTML = guests.reduce((initial, guest, guestIndex) => {
        return initial + `
            <div class="list-item">
                <p>${guest.name} - ${guest.attending ? "Attending" : "Not Attending"} - Added On ${guest.time}</p>
                <div class="list-buttons">
                    <button onclick="toggleGuestAttendance(${guestIndex})">RSVP</button>
                    <button onclick="deleteGuestHandler(${guestIndex})" class="item-delete" style="background-color: red;">Remove</button>
                </div>
            </div>
        `;
    }, '');
}

const toggleGuestAttendance = (guestIndex) => {
    const foundGuest = guests.find((guest, index) => index === guestIndex); //  Looking for the guest in the guests list based on the index passed in the argument
    if (foundGuest) {
        //  If guest is found, replace the existing guest details at the passed index with a new object of the same guest but changed attendance status
        guests.splice(guestIndex, 1, { ...foundGuest, attending: !foundGuest.attending })
    }
    renderGuests(); 
}


const deleteGuestHandler = (guestIndex) => {
    //  Remove the guest based on the index passed as a parameter and renders the guests lists to the user
    guests.splice(guestIndex, 1);
    renderGuests();
}
