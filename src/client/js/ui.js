$(document).ready(function () {
  get()
    .then((rowsData) => {
      populateTable(rowsData);
    })
    .catch((e) => {
      console.log(e.message);
    });

  $('[data-toggle="tooltip"]').tooltip();

  $("#filter").click(function () {
    var searchText = $("#search-text").val().toLowerCase();

    $(".table tbody tr").each(function () {
      var customer = $(this).find("td:eq(1)").text().toLowerCase();
      var location = $(this).find("td:eq(2)").text().toLowerCase();
      var status = $(this).find("td:eq(4)").text().toLowerCase();

      if (
        customer.includes(searchText) ||
        location.includes(searchText) ||
        status.includes(searchText)
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $("#filter-location").change(function () {
    var location = $(this).val().toLowerCase();

    $(".table tbody tr").each(function () {
      var rowLocation = $(this).find("td:eq(2)").text().toLowerCase();

      if (location === "all" || rowLocation === location) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $("#add-new").click(function () {
    var newLine = $("#new-line");

    if (newLine.length === 0) {
      addNewTableRow();
    }
  });
});
