//const api_url = "<heroku_app_url>"
// const api_url = "https://palak-demo-3.herokuapp.com/user"
// const api_url = "http://localhost:8080/user";
 const api_url = "https://ayushpjt2.herokuapp.com/user"

function loadData(records = []) {
    var table_data = "";
    for (let i = 0; i < records.length; i++) {
        table_data += `<tr>`;
        table_data += `<td>${records[i].name}</td>`;
        table_data += `<td>${records[i].phone}</td>`;
        table_data += `<td>${records[i].service}</td>`;
        table_data += `<td>${records[i].type}</td>`;
        table_data += `<td>${records[i].location}</td>`;
        table_data += `<td>${records[i].address}</td>`;
        table_data += `<td>${records[i].size}</td>`;
        table_data += `<td>${records[i].rooms}</td>`;
        table_data += `<td>${records[i].cost}</td>`;
        table_data += `<td>`;
        table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
        table_data += '&nbsp;&nbsp;';
        table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
        table_data += `</td>`;
        table_data += `</tr>`;
    }
    //console.log(table_data);
    document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            loadData(data);
        });
}


function getDataById(id) {
    fetch(`${api_url}/${id}`)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            document.getElementById("id").value = data._id;
            document.getElementById("name").value = data.name;
            document.getElementById("phone").value = data.phone;
            document.getElementById("service").value = data.service;
            document.getElementById("type").value = data.type;
            document.getElementById("location").value = data.location;
            document.getElementById("address").value = data.address;
            document.getElementById("size").value = data.size;
            document.getElementById("rooms").value = data.rooms;
            document.getElementById("cost").value = data.cost;
        })
}


function postData() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var service = document.getElementById("service").value;
    var type = document.getElementById("type").value;
    var location = document.getElementById("location").value;
    var address = document.getElementById("address").value;
    var size = document.getElementById("size").value;
    var rooms = document.getElementById("rooms").value;
    var cost = document.getElementById("cost").value;

    data = { name: name, phone: phone, service: service, type: type, location: location, address: address, size: size, rooms: rooms, cost: cost };

    fetch(api_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.href = "index.html";
        })
}


function putData() {

    var _id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var service = document.getElementById("service").value;
    var type = document.getElementById("type").value;
    var location = document.getElementById("location").value;
    var address = document.getElementById("address").value;
    var size = document.getElementById("size").value;
    var rooms = document.getElementById("rooms").value;
    var cost = document.getElementById("cost").value;

    data = { _id: _id, name: name, phone: phone, service: service, type: type, location: location, address: address, size: size, rooms: rooms, cost: cost };

    fetch(api_url, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            window.location.href = "index.html";
        })
}


function deleteData(id) {
    user_input = confirm("Are you sure you want to delete this record?");
    if (user_input) {
        fetch(api_url, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "_id": id })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
    }
}