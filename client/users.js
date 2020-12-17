$(function () {
    getAllRestaurants();
    restaurantOperationsListeners();
});

function getAllRestaurants() {
    $.ajax({
        url: 'http://localhost:8080/api/users',
        type: 'GET',
        success: function (rests) {
            recreateRestaurantsTable(rests);
            //console.log(rests);
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////

function getRestaurantById(userId) {
    $.ajax({
        url: `http://localhost:8080/api/users/${userId}`,
        type: 'GET',
        success: function (rest) {
            showRestaurant(rest);
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////

function filterUser(query) {
    $.ajax({
        url: `http://localhost:8080/api/users/filter/${query}`,
        type: 'GET',
        success: function (rest) {
            recreateRestaurantsTable(rests);
        }
    });
}

function filterUsers() {
    str = '?';
    if ($("#job").val())
        str+= 'job='+$("#job").val() +'&'
    if ($("#email").val())
        str+= 'email='+$("#email").val()+'&'
    if ($("#gender").val())
        str+= 'gender='+$("#gender").val()+'&'
    console.log(str);
    filterUser(str);
}

function filterForm() {
    $("#get-delete-restaurant").hide();

    $("#test").append(
        `
        <label for="job">job</label><br>
        <input type="text" id="job" name="job"><br>
        <label for="email">email:</label><br>
        <input type="text" id="email" name="email">
        <label for="gender">gender:</label><br>
        <input type="text" id="gender" name="gender">
        <button id="submit" type="submit">Send!</button>
    `
    );
}

/////////////////////////////////////////////////////////////////////////////////////

function showRestaurant(rest) {
    $("#restaurant-result").empty();

    $("#restaurant-result").append(
        '<p>' +
        'First Name: ' + rest.first_name + '<br>' +
        'Last Name: ' + rest.last_name + '<br>' +            
        'Geneder: ' + rest.gender + '<br>' +
        'Email: ' + rest.email + '<br>' +
        'Color: ' + rest.color + '<br>' +
        'Job: ' + rest.job + '<br>' +

        '<p>'
    );
}

/////////////////////////////////////////////////////////////////////////////////////

function recreateRestaurantsTable(rests) {
    $("table").empty().remove();
    // $("#restaurant-result").empty().remove();
    console.log(rests);
    rests.map(item => {
        // console.log(rests);
        // if(item)
        //     item.location[0].lng = 0;
        // console.log(item.location[0]);

        $("#restaurants-list").append(
            '<p>' +
            'First Name: ' + item.first_name + '<br>' +
            'Last Name: ' + item.last_name + '<br>' +            
            'Geneder: ' + item.gender + '<br>' +
            'Email: ' + item.email + '<br>' +
            'Color: ' + item.color + '<br>' +
            'Job: ' + item.job + '<br>' +
            '<p>'
        );
    })

}

/////////////////////////////////////////////////////////////////////////////////////

function deleteRestaurantById(userId) {
    $.ajax({
        url: `http://localhost:8080/api/users/${userId}`,
        type: 'DELETE',
        success: function (rest) {
            console.log(`User - ${userId} Deleted!!!`)
            showRestaurant(rest);
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////

function updateUserById(userId, obj) {
    $.ajax({
        url: `http://localhost:8080/api/users/${userId}`,
        type: 'PUT',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj),
        success: function () {
            console.log(`User - ${userId} Updated!!!`, obj)
            getAllRestaurants();
        }
    });
}
function updatedUser(UserId) {
    user = new Object();
    if ($("#first_name").val())
        user.first_name = $("#first_name").val();
    if ($("#last_name").val())
        user.last_name = $("#last_name").val();
    console.log(user);
    updateUserById(UserId, user);
}

function updateForm() {
    $("#get-delete-restaurant").hide();

    $("#test").append(
        `
        <label for="first_name">First name:</label><br>
        <input type="text" id="first_name" name="first_name"><br>
        <label for="last_name">Last name:</label><br>
        <input type="text" id="last_name" name="last_name">
        <button id="submit" type="submit">Send!</button>

    `
    );
}

function resetView() {
    $("#test").empty();
}


/////////////////////////////////////////////////////////////////////////////////////

function restaurantOperationsListeners() {
    $("#get-button").click(() => {
        $("#get-delete-restaurant").css("display", "block");
        $("#get-delete-do").text("Get");
    });

    $("#delete-button").click(() => {
        $("#get-delete-restaurant").css("display", "block");
        $("#get-delete-do").text("Delete");

    });

    $("#add-button").click(() => {
        $("#get-delete-restaurant").css("display", "block");
        $("#get-delete-do").text("Filter");
    });

    $("#update-button").click(() => {
        $("#get-delete-restaurant").css("display", "block");
        $("#get-delete-do").text("Update");
    });

    $("#get-delete-do").click(() => {
        if ($("#get-delete-do").text() === "Get") {
            const UserId = $("#rest-id").val();
            getRestaurantById(UserId);
        }
        else if ($("#get-delete-do").text() === "Delete") {
            const UserId = $("#rest-id").val();
            deleteRestaurantById(UserId);
        }
        else if ($("#get-delete-do").text() === "Update") {
            const UserId = $("#rest-id").val();
            updateForm();
            $("#submit").click(() => {
                updatedUser(UserId)
                resetView();
                // addView();
            });
        }
        else if ($("#get-delete-do").text() === "Filter") {
            filterForm();
            $("#submit").click(() => {
                filterUsers()
                resetView();
                // addView();
            });
        }
    }
    );
}