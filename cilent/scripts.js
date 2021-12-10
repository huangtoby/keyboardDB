document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => loadMainTable(data['data'])); 
    
    fetch('http://localhost:3000/getRec')
    .then(response => response.json())
    .then(data => loadRecTable(data['data'])); 
});

document.querySelector('main tbody').addEventListener('click', function(event) {
    if(event.target.className === "find-btn") {
        findRetailers(event.target.dataset.keyboard_name);
    }
}); 

function whileFilter() {
    document.getElementById("search-input").onkeyup = "whileFilter()";
    const searchValue = document.querySelector('#search-input').value;
    const mech = document.getElementById("mech").checked;
    const mac = document.getElementById("mac").checked;
    // const connect = document.getElementById("connect").value;
    // const back = document.getElementById("back").value;
    // const layout = document.getElementById("layout").value;

    if(searchValue == ''){
        console.log("OVER")
        fetch('http://localhost:3000/filter/'+mech+'/'+mac)
        .then(response => response.json())
        .then(data => loadMainTable(data['data']));
    }else{
        console.log("HERE")
        fetch('http://localhost:3000/searchfilter/'+searchValue+'/'+mech+'/'+mac)
        .then(response => response.json())
        .then(data => loadMainTable(data['data']));
    }
}

function whileSearch() {
    const searchValue = document.querySelector('#search-input').value;

    if(searchValue == ''){
        fetch('http://localhost:3000/getALL')
        .then(response => response.json())
        .then(data => loadMainTable(data['data']));
    }else{
        fetch('http://localhost:3000/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadMainTable(data['data']));
    }  
}

function findRetailers(name) {
    fetch('http://localhost:3000/retailers/' +name)
    .then(response => response.json())
    .then(data => loadRetailTable(data['data']));
}

//MAIN 
function loadMainTable(data) {
    const table = document.getElementById('main');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='9'>Keyboard Not Found</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({keyboard_name, mechanical, connection, backlight, layout, mac_spec, length, width, height}) {
        tableHtml += "<tr>";
        tableHtml += `<td><a href="#retailSection"><button class="find-btn" data-keyboard_name="${keyboard_name}">${keyboard_name}</button></a></td>`;
        tableHtml += `<td>${mechanical ? "yes":"no"}</td>`;
        tableHtml += `<td>${connection}</td>`;
        tableHtml += `<td>${backlight}</td>`;
        tableHtml += `<td>${layout}</td>`;
        tableHtml += `<td>${mac_spec ? "yes":"no"}</td>`;
        tableHtml += `<td>${length}</td>`;
        tableHtml += `<td>${width}</td>`;
        tableHtml += `<td>${height}</td>`;
        //tableHtml += `<td><button class="delete-row-btn" data-id=${keyboard_name}>Delete</td>`;
        //tableHtml += `<td><button class="edit-row-btn" data-id=${keyboard_name}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

//RETAILERS LIST
function loadRetailTable(data) {
    const table = document.getElementById('retailers');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='7'>Keyboard Not Found</td></tr>";
        return;
    }

    let tableHtml = "";
    let retailName = "";

    data.forEach(function ({retailer_name, keyboard_name, price, rating, delivery_options, return_days, link}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${retailer_name}</button></td>`;
        tableHtml += `<td>${keyboard_name}</td>`;
        retailName = keyboard_name
        tableHtml += `<td>${price}</td>`;
        tableHtml += `<td>${rating}</td>`;
        tableHtml += `<td>${delivery_options}</td>`;
        tableHtml += `<td>${return_days}</td>`;
        tableHtml += `<td><a target="_blank" href=${link}>${retailer_name} link</a></td>`;
        tableHtml += "</tr>";
    });

    var title = `<span style='color:salmon'>${retailName}</span>`;
    document.getElementById('retailTitle').innerHTML = `Retailers to purchase the ${title}:`

    table.innerHTML = tableHtml;
}

//RECOMMENDED PICKS
function loadRecTable(data) {
    const table = document.getElementById('recommend');

    let tableHtml = "";

    data.forEach(function ({keyboard_name, mechanical, connection, backlight, layout, mac_spec, rating, price}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${keyboard_name}</td>`;
        tableHtml += `<td>${mechanical ? "yes":"no"}</td>`;
        tableHtml += `<td>${connection}</td>`;
        tableHtml += `<td>${backlight}</td>`;
        tableHtml += `<td>${layout}</td>`;
        tableHtml += `<td>${mac_spec ? "yes":"no"}</td>`;
        tableHtml += `<td>${rating}</td>`;
        tableHtml += `<td>${price}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

var mybutton = document.getElementById("scroll-btn");
window.onscroll = function(){scrollFunction()};

function scrollFunction(){
    if(document.body.scrollTop>20 || document.documentElement.scrollTop>20){
        mybutton.style.display = "block";
    }else{
        mybutton.style.display = "none";
    }
}

function scrollUp(){
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
    });
}