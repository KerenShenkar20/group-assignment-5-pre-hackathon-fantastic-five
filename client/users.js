
$(function () {
    getAllUsers();
    usersOperationsListeners();
});

function getAllUsers() {
    $.ajax({
        url: 'http://localhost:8080/api/users',
        type: 'GET',
        success: function (rests) {
            recreateUsersTable(rests);
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////

function getUserById(userId) {
    $.ajax({
        url: `http://localhost:8080/api/users/${userId}`,
        type: 'GET',
        success: function (rest) {
            showUsers(rest);
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////

function filterUser(query) {
    // console.log(query);
    $.ajax({
        url: `http://localhost:8080/api/users/filter/${query}`,
        type: 'GET',
        success: function (rest) {
            $("#users-list").empty();
            recreateUsersTable(rest);
        }
    });
}

function runFilters() {
    str = '?';
    if ($("#job").val())
        str += 'job=' + $("#job").val() + '&'
    if ($("#email").val())
        str += 'email=' + $("#email").val() + '&'
    if ($("#gender").val())
        str += 'gender=' + $("#gender").val() + '&'
    filterUser(str);
}

/////////////////////////////////////////////////////////////////////////////////////

function showUsers(rest) {
    $("#operation-result").empty();
    if (rest) {
        $("#operation-result").append(
            '<p>' +
            'First Name: ' + rest.first_name + '<br>' +
            'Last Name: ' + rest.last_name + '<br>' +
            'Geneder: ' + rest.gender + '<br>' +
            'Email: ' + rest.email + '<br>' +
            'Color: ' + rest.color + '<br>' +
            'Job: ' + rest.job + '<br>' +
            '<p>'
        )
    }
    else {
        $("#operation-result").append(
            '<p>' +
            'User Does Not Exist' +
            '<p>'
        )
    };
}

function showFeedback(userID, msg) {
    $("#operation-result").empty();
    $("#operations").css("display", "block");
    $("#operation-result").append(
        '<p>' +
        '<b>User ' + userID + ' ' + msg + ' Successfully !</b>' +
        '<p><br>'
    );

}

/////////////////////////////////////////////////////////////////////////////////////

function recreateUsersTable(rests) {
    $("table").empty().remove();
    $("#users-list").empty();
    $("#users-list").append(
        '<h2>Users list</h2>'
    );
    rests.map(item => {

        $("#users-list").append(

            '<br>' +
            '<div class="new-user" style="color:' + item.color + ';' + 'margin-left:30px">' +
            '<img src="' + item.avatar + '" style="display:block;position:absolute; margin-top:30px">' +
            '<div class="user-details" style="margin-left:80px;">' +
            '<p>' +
            'First Name: ' + item.first_name + '<br>' +
            'Last Name: ' + item.last_name + '<br>' +
            'Geneder: ' + item.gender + '<br>' +
            'Email: ' + item.email + '<br>' +
            'Color: ' + item.color + '<br>' +
            'Job: ' + item.job + '<br>' +
            '<p> </div>' +
            '</div>'
        );
    })

}

/////////////////////////////////////////////////////////////////////////////////////

function deleteUserById(userId) {
    $.ajax({
        url: `http://localhost:8080/api/users/${userId}`,
        type: 'DELETE',
        success: function (rest) {
            showFeedback(userId, 'Deleted');
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////

function updateUserById(userId, obj) {
    console.log(obj);
    $.ajax({
        url: `http://localhost:8080/api/users/${userId}`,
        type: 'PUT',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj),
        success: function () {
            showFeedback(userId, 'Updated');
        }
    });
}
function updatedUser(userId) {
    user = new Object();
    if ($("#first_name").val())
        user.first_name = $("#first_name").val();
    if ($("#last_name").val())
        user.last_name = $("#last_name").val();
    updateUserById(userId, user);
}

function filterForm() {
    resetView();
    $("#filters").append(
        `<br><br>
        <label for="job">job</label>
        <input type="text" id="job" name="job"><br>
        <label for="email">email:</label>
        <input type="text" id="email" name="email"><br>
        <label for="gender">gender:</label>
        <input type="text" id="gender" name="gender"><br><br>
        <button id="btn-submit" type="submit">Filter</button>
    `
    );
}

function updateForm() {
    $("#input-operation").hide();
    $("#btn-do-operation").hide();


    $("#filters").append(
        `
        <label for="first_name">First name:</label><br>
        <input type="text" id="first_name" name="first_name"><br>
        <label for="last_name">Last name:</label><br>
        <input type="text" id="last_name" name="last_name">
        <button id="btn-submit" type="submit">Update</button>

    `
    );
}

function resetView() {
    $("#operation-result").empty();
    $("#filters").empty();
}


/////////////////////////////////////////////////////////////////////////////////////
function showOperations() {
    $("#operations").css("display", "block");
    $("#btn-do-operation").css("display", "block");
    $("#input-operation").css("display", "block");
}

function hideOperations() {
    $("#operations").hide();
    $("#btn-do-operation").hide();
    $("#input-operation").hide();
}

function showAllButton() {

}

function usersOperationsListeners() {

    //GET
    $("#get-button").click(() => {
        resetView();
        showOperations();
        $("#btn-do-operation").text("Get");
    });

    //DELETE
    $("#delete-button").click(() => {
        resetView();
        showOperations();
        $("#btn-do-operation").text("Delete");
    });

    // UPDATE
    $("#update-button").click(() => {
        resetView();
        showOperations();
        $("#btn-do-operation").text("Update");
    });

    //FILTER
    $("#filter-button").click(() => {
        resetView();
        hideOperations();
        filterForm();
        $("#btn-submit").click(() => {
            console.log("CHECK");
            runFilters();
            showAllButton()
        });
    });

    //SHOW ALL
    $("#show-all-button").click(() => {
        getAllUsers();
    });


    // BUTTONS HANDLER
    $("#btn-do-operation").click(() => {
        resetView();
        $("#operation-result").css("display", "block");

        if ($("#btn-do-operation").text() === "Get") {
            const UserId = $("#input-operation").val();
            getUserById(UserId);
        }
        else if ($("#btn-do-operation").text() === "Delete") {
            const UserId = $("#input-operation").val();
            deleteUserById(UserId);
        }
        else if ($("#btn-do-operation").text() === "Update") {
            const UserId = $("#input-operation").val();
            updateForm();
            $("#btn-submit").click(() => {
                updatedUser(UserId);
            });
        }

        // else if ($("#btn-do-operation").text() === "Filter") {
        //     console.log("CHECK");
        // $("#btn-submit").click(() => {
        //     console.log("CHECK");
        //     runFilters();
        //     resetView();
        // });
        // }
    });

}
