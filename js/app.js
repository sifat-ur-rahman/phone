const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''
    // display 10 phone
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none')

    }
    else {
        showAll.classList.add('d-none')
    }


    // display no phone
    const noPhone = document.getElementById('no-found')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }
    // display all phone
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little longer.</p>
            <button onclick="loadPhoneDetalis('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)

    });

    toggleSpinner(false)
}
const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('Search-field')
    const searchText = searchField.value
    loadPhone(searchText, dataLimit)
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loder
    processSearch(10)
})
// search input field enter key handler
document.getElementById('Search-field').addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        processSearch(10)
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }

}
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch()
})
const loadPhoneDetalis = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}
const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneModalLabel')
    modalTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date'}</p>
    <p>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    `
}
// loadPhone()