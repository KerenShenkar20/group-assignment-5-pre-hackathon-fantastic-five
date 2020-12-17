$(function () {
    getAllRestaurants();
    usersOperationsListeners();
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
    console.log(query);
    $.ajax({
        url: `http://localhost:8080/api/users/filter/${query}`,
        type: 'GET',
        success: function (rest) {
            $("#restaurant-list").empty();
            recreateRestaurantsTable(rest);
        }
    });
}

function filterUsers() {
    str = '?';
    if ($("#job").val())
        str += 'job=' + $("#job").val() + '&'
    if ($("#email").val())
        str += 'email=' + $("#email").val() + '&'
    if ($("#gender").val())
        str += 'gender=' + $("#gender").val() + '&'
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
        <input type="text" id="email" name="email"><br>
        <label for="gender">gender:</label><br>
        <input type="text" id="gender" name="gender"><br><br>
        <button id="submit" type="submit">Send!</button>
    `
    );
}

/////////////////////////////////////////////////////////////////////////////////////

function showRestaurant(rest) {
    $("#restaurant-result").empty();
    if(rest){
        $("#restaurant-result").append(
            '<p>' +
            'First Name: ' + rest.first_name + '<br>' +
            'Last Name: ' + rest.last_name + '<br>' +
            'Geneder: ' + rest.gender + '<br>' +
            'Email: ' + rest.email + '<br>' +
            'Color: ' + rest.color + '<br>' +
            'Job: ' + rest.job + '<br>' +
            '<p>'
        )}
        else{
            $("#restaurant-result").append(
                '<p>' + 
                'User Does Not Exist' +
                '<p>'
            )}

    
    ;
}

/////////////////////////////////////////////////////////////////////////////////////

function recreateRestaurantsTable(rests) {
    $("table").empty().remove();
    // $("#restaurant-result").empty().remove();
    console.log(rests);
    $("#restaurants-list").empty();
    rests.map(item => {

        $("#restaurants-list").append(
            
            '<div class="new-user" style="color:' + item.color + ';display:block' + '">' +
            '<img src="' + item.avatar + '" style="position:absolute;margin-left:300px;margin-top:50px">' +
            '<p>' +
            'First Name: ' + item.first_name + '<br>' +
            'Last Name: ' + item.last_name + '<br>' +
            'Geneder: ' + item.gender + '<br>' +
            'Email: ' + item.email + '<br>' +
            'Color: ' + item.color + '<br>' +
            'Job: ' + item.job + '<br>' +
            '<p></div>'
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

function usersOperationsListeners() {
    $("#get-button").click(() => {
        resetView();

        $("#get-delete-restaurant").css("display", "block");
        $("#get-delete-do").css("display", "block");
        $("#get-delete-do").text("Get");
    });

    $("#delete-button").click(() => {
        resetView();

        $("#get-delete-restaurant").css("display", "block");
        $("#get-delete-do").css("display", "block");
        $("#get-delete-do").text("Delete");

    });

    $("#add-button").click(() => {
        resetView();
        // Deleting the button
        $("#get-delete-restaurant").css("display", "none");
        $("#get-delete-do").css("display", "none");

        //Adding filter options
        filterForm();
        $("#submit").click(() => {
            filterUsers()
            resetView();
        })
    });

    $("#update-button").click(() => {
        resetView();
        $("#get-delete-restaurant").css("display", "block");
        $("#get-delete-do").css("display", "block");
        $("#get-delete-do").text("Update");
    });

    $("#get-delete-do").click(() => {
        resetView();
        $("#get-delete-do").css("display", "block");
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