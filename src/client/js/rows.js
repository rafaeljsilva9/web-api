function addNewTableRow() {
  const tableBody = document.querySelector("#dataTable tbody");
  const newRow = createElement({ id: "new-line", elementType: "tr" });

  /* index */
  const indexCell = createCell({ id: "indexCell", row: newRow });
  createParagraph({ textContent: "#", parent: indexCell });

  /* customer */
  const customerCell = createCell({
    id: "customerCell",
    row: newRow,
  });
  createinput({
    className: "form-control",
    parent: customerCell,
  });

  /* location */
  const locationCell = createCell({
    id: "locationCell",
    row: newRow,
  });
  createSelect({
    options: ["All", "Berlin", "London", "Madrid"],
    className: "form-control",
    parent: locationCell,
  });

  /* orderDate */
  const orderDateCell = createCell({
    id: "orderDateCell",
    row: newRow,
  });
  createinput({
    className: "form-control",
    parent: orderDateCell,
  });

  /* status */
  const statusCell = createCell({ id: "statusCell", row: newRow });
  createSelect({
    options: ["All", "Berlin", "London", "Madrid"],
    className: "form-control",
    parent: statusCell,
  });

  /* netAmount */
  const netAmountCell = createCell({
    id: "netAmountCell",
    row: newRow,
  });
  createinput({
    className: "form-control",
    parent: netAmountCell,
  });

  /** actions */
  const confirmNewRowLink = createConfirmLink({ isNewRow: true });
  const deleteNewRowLink = createDeleteRowLink();

  const actionsCell = createElement({ id: "actionsCell", elementType: "td" });
  actionsCell.appendChild(confirmNewRowLink);
  actionsCell.appendChild(deleteNewRowLink);
  newRow.appendChild(actionsCell);
  tableBody.appendChild(newRow);
}

function addRow(row) {
  const tableBody = document.querySelector("#dataTable tbody");
  const rowIndex = row.index + 1;
  const rowData = row && row.data;
  const newRow = createElement({ id: row?.data?.id, elementType: "tr" });

  /* index */
  const indexCell = createCell({ id: "indexCell", row: newRow });
  createParagraph({ id: "", textContent: rowIndex, parent: indexCell });

  /* customer */
  const customerCell = createCell({
    id: "customerCell",
    row: newRow,
  });
  createParagraph({
    textContent: rowData?.customer,
    parent: customerCell,
  });

  /* location */
  const locationCell = createCell({
    id: "locationCell",
    row: newRow,
  });
  createParagraph({
    textContent: rowData?.location,
    parent: locationCell,
  });

  /* orderDate */
  const orderDateCell = createCell({
    id: "orderDateCell",
    row: newRow,
  });
  createParagraph({
    textContent: rowData?.orderDate,
    parent: orderDateCell,
  });

  /* status */
  const statusCell = createCell({ id: "statusCell", row: newRow });
  createParagraph({
    textContent: rowData?.status,
    parent: statusCell,
  });

  /* netAmount */
  const netAmountCell = createCell({
    id: "netAmountCell",
    row: newRow,
  });
  createParagraph({
    textContent: rowData?.netAmount,
    parent: netAmountCell,
  });

  /** actions cell */
  const editLink = createEditRowLink();
  const deleteLink = createDeleteRowLink();

  const actionsCell = createElement({ id: "actionsCell", elementType: "td" });
  actionsCell.appendChild(editLink);
  actionsCell.appendChild(deleteLink);

  newRow.appendChild(actionsCell);
  tableBody.appendChild(newRow);
}

function populateTable(rowsData) {
  rowsData.forEach(function (row, index) {
    addRow({ index, data: row });
  });
}

function getNextIndex($row) {
  const numberOfPreviousRows = getNumberOfPreviousRow($row);
  return numberOfPreviousRows + 1;
}

function createDeleteRowLink() {
  const deleteNewRowLink = createActionIcon({
    icon: "\u{e872}",
    title: "Delete",
    className: "delete",
  });
  deleteNewRowLink.addEventListener("click", function (event) {
    $(this).closest("tr").remove();
    reorderIndexes();
  });
  return deleteNewRowLink;
}

function createConfirmLink({ isNewRow = false }) {
  const confirmNewRowLink = createActionIcon({
    icon: "\u{e5ca}",
    title: "Confirm Edit",
    className: "confirm-edit",
    disabled: true,
  });

  confirmNewRowLink.addEventListener("click", function () {
    const $row = $(this).closest("tr");

    const indexCell = getTdById({ row: $row, inputId: "indexCell" });
    const index = getParagraphValue({ td: indexCell });

    const customerCell = getTdById({ row: $row, inputId: "customerCell" });
    const customer = getInputValue({ td: customerCell });

    const locationCell = getTdById({ row: $row, inputId: "locationCell" });
    const location = getSelectValue({ td: locationCell });

    const orderDateCell = getTdById({ row: $row, inputId: "orderDateCell" });
    const orderDate = getInputValue({ td: orderDateCell });

    const statusCell = getTdById({ row: $row, inputId: "statusCell" });
    const status = getSelectValue({ td: statusCell });

    const netAmountCell = getTdById({ row: $row, inputId: "netAmountCell" });
    const netAmount = getInputValue({ td: netAmountCell });

    const actionsCell = getTdById({ row: $row, inputId: "actionsCell" });

    save({ customer, location, orderDate, status, netAmount })
      .then(() => {
        $row.attr("id", "newId");
        deleteAllTdChildren({ $tr: $row });

        createParagraph({
          textContent: isNewRow ? getNextIndex($row) : index,
          parent: indexCell.get(0),
        });
        createParagraph({
          textContent: customer,
          parent: customerCell.get(0),
        });
        createParagraph({
          textContent: location,
          parent: locationCell.get(0),
        });
        createParagraph({
          textContent: orderDate,
          parent: orderDateCell.get(0),
        });
        createParagraph({
          textContent: status,
          parent: statusCell.get(0),
        });
        createParagraph({
          textContent: netAmount,
          parent: netAmountCell.get(0),
        });

        /** Add actions cell */
        actionsCell.append(createEditRowLink());
        actionsCell.append(createDeleteRowLink());
      })
      .catch((error) => console.log(error));
  });
  return confirmNewRowLink;
}

function createEditRowLink() {
  const editLink = createActionIcon({
    icon: "\u{e254}",
    title: "Edit",
    className: "edit",
    // display: addingNewRow ? "none" : "inline",
  });

  editLink.addEventListener("click", function () {
    const $row = $(this).closest("tr");
    const id = $row.attr("id");

    const indexCell = getTdById({ row: $row, inputId: "indexCell" });
    const index = getParagraphValue({ td: indexCell });

    const customerCell = getTdById({ row: $row, inputId: "customerCell" });
    const customer = getParagraphValue({ td: customerCell });

    const locationCell = getTdById({ row: $row, inputId: "locationCell" });
    const location = getParagraphValue({ td: locationCell });

    const orderDateCell = getTdById({ row: $row, inputId: "orderDateCell" });
    const orderDate = getParagraphValue({ td: orderDateCell });

    const statusCell = getTdById({ row: $row, inputId: "statusCell" });
    const status = getParagraphValue({ td: statusCell });

    const netAmountCell = getTdById({ row: $row, inputId: "netAmountCell" });
    const netAmount = getParagraphValue({ td: netAmountCell });

    const actionsCell = getTdById({ row: $row, inputId: "actionsCell" });

    edit({ id, customer, location, orderDate, status, netAmount })
      .then(() => {
        deleteAllTdChildren({ $tr: $row });

        /* index */
        createParagraph({
          id: "",
          textContent: index,
          content: index,
          parent: indexCell.get(0),
        });

        /* customer */
        createinput({
          id: "",
          className: "form-control",
          content: customer,
          parent: customerCell.get(0),
        });

        /* location */
        createSelect({
          id: "",
          options: ["All", "Berlin", "London", "Madrid"],
          className: "form-control",
          content: location,
          parent: locationCell.get(0),
        });

        /* orderDate */
        createinput({
          id: "",
          className: "form-control",
          content: orderDate,
          parent: orderDateCell.get(0),
        });

        /* status */
        createSelect({
          id: "",
          options: ["All", "Berlin", "London", "Madrid"],
          className: "form-control",
          content: status,
          parent: statusCell.get(0),
        });

        /* netAmount */
        createinput({
          id: "",
          className: "form-control",
          content: netAmount,
          parent: netAmountCell.get(0),
        });

        /** Add actions cell */
        actionsCell.append(createConfirmLink({ isNewRow: false }));
      })
      .catch((error) => console.log(error));
    // Ao inves de colocar a classe em cada td eu devo colocar diretamente na tr
    // $row.find(".view-mode").each(function () {
    //   $(this).removeClass("view-mode").addClass("edit-mode");
    // });
    // $row.find(".delete").hide();
    // $row.find(".edit").hide();
    // $row.find(".confirm-edit").show();
  });
  return editLink;
}

function reorderIndexes() {
  $("#dataTable tr td:first-child").each(function (index) {
    $(this)
      .find("p")
      .text(index + 1);
  });
}
