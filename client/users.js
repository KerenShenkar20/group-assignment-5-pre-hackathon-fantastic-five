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
            console.log(rests);
        }
    });
}

function getRestaurantById(restaurantId) {
    $.ajax({
        url: `http://localhost:8080/api/users/${restaurantId}`,
        type: 'GET',
        success: function (rest) {
            showRestaurant(rest);
        }
    });
}

function showRestaurant(rest) {
    $("#restaurant-result").empty();

    $("#restaurant-result").append(
        '<p>' +
        'Firsr Name: ' + rest.first_name + '<br>' +
        'Last Name: ' + rest.last_name + '<br>' +
        '<p>'
    );
}

function recreateRestaurantsTable(rests) {
    $("table").empty().remove();
    // $("#restaurant-result").empty().remove();
    rests.map(item => {
        // console.log(rests);
        // if(item)
        //     item.location[0].lng = 0;
        // console.log(item.location[0]);

        $("#restaurants-list").append(
            '<p>' +
            'Firsr Name: ' + rest.first_name + '<br>' +
            'Last Name: ' + rest.last_name + '<br>' +
            '<p>'
        );
    })

}

function restaurantOperationsListeners() {
    $("#get-button").click(() => {
        $("#get-delete-restaurant").css("display", "block");
        $("#get-delete-do").text("Get");
    });

    $("#delete-button").click(() => {
        $("#get-delete-restaurant").css("display", "none");

        alert("Delete");
    });

    $("#add-button").click(() => {
        $("#get-delete-restaurant").css("display", "none");
        alert("Add");
    });

    $("#update-button").click(() => {
        $("#get-delete-restaurant").css("display", "none");
        alert("Update");
    });

    $("#get-delete-do").click(() => {
        recreateRestaurantsTable();
    }
    );
}