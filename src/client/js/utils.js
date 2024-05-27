function createElement({ id = null, elementType, className = null }) {
  const element = document.createElement(elementType);
  if (id) element.id = id;
  if (className) element.className = className;
  return element;
}

function createParagraph({ id, textContent, parent = null }) {
  const paragraph = createElement({ id, elementType: "p" });
  paragraph.textContent = textContent;

  if (parent) parent.appendChild(paragraph);

  return paragraph;
}

function createinput({ id, className, content, parent = null }) {
  const input = createElement({
    id,
    elementType: "input",
    className,
  });

  if (content) input.value = content;
  if (parent) parent.appendChild(input);

  return input;
}

function createOption({ select, option }) {
  const optionElement = createElement({
    elementType: "option",
  });

  optionElement.textContent = option;
  select.appendChild(optionElement);
  return optionElement;
}

function createSelect({
  id,
  options,
  selectedOption,
  className,
  parent = null,
}) {
  const select = createElement({
    id,
    elementType: "select",
    className,
  });
  options.forEach((option) => {
    const optionElement = createOption({
      select,
      option,
    });
    if (option === selectedOption) optionElement.selected = true;
    if (parent) parent.appendChild(select);
  });
  return select;
}

function createCell({ id, row, className }) {
  const cell = createElement({ elementType: "td", className });
  cell.id = id;
  row.appendChild(cell);

  return cell;
}

function createActionIcon({
  icon,
  title,
  className,
  display = "inline",
  disabled = false,
}) {
  const link = createElement({ elementType: "a", className });
  link.href = "#";
  link.title = title;
  link.dataset.toggle = "tooltip";

  const iconElement = createElement({
    elementType: "i",
    className: "material-icons",
  });
  iconElement.textContent = icon;

  link.appendChild(iconElement);
  link.style.display = display;

  return link;
}

function getTdById({ row, inputId }) {
  return row.find(`td#${inputId}`);
}

function getParagraphValue({ td }) {
  const $paragraph = td.find("p");

  return $paragraph.text();
}

function getInputValue({ td }) {
  const $input = td.find("input");

  return $input.val();
}

function getSelectValue({ td }) {
  const $input = td.find("select");

  return $input.val();
}

function deleteAllTdChildren({ $tr }) {
  $tr.find("td").empty();
}

function getNumberOfPreviousRow($row) {
  return $row.prevAll("tr").length;
}
