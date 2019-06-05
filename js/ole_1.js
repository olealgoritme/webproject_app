/*
 * blablabla
 *
 */

const DEBUG = true;
var draggedCard = null;

function debug(s) {
  if (DEBUG)
    console.log(s);
}

function handleCardClick(e) {

  var card = this;
  card = BasicCard.fromHTML(card);
  debug(this);
  $('#modal-title').text(card._title);
  $('#modal-text').text(card._text);

  // TODO: Add dynamically through JS
  /*
                  <div class="row">
                      <div class="col s6">
                          <img src="img/daniel/daniel_1.jpg"
     class="responsive-img rounded">
                      </div>
                      <div class="col s6">
                          <img src="img/daniel/daniel_1.jpg"
     class="responsive-img rounded">
                      </div>
                  </div>
                  */
}

// Function that moves the content between two HTML elements
function handleDrop(e) {
  if (e.stopPropagation)
    e.stopPropagation();

  var thisCard = this;
  thisCard.className = thisCard.className.replace(' dropover', '');
  thisCard.className = thisCard.className.replace(' card-swapped', '');

  // only swap cards if we're landing on other cards
  if (draggedCard != thisCard) {

    // Animate the card being swapped - OR NOT? FU.
    thisCard.className = thisCard.className + ' card-swapped';
    setTimeout(function() {
      thisCard.className = thisCard.className.replace(' card-swapped', '');
    }, 500);

    draggedCard.innerHTML = thisCard.innerHTML;
    thisCard.innerHTML = e.dataTransfer.getData('text/html');
    debug("droppedOn: card=");
    debug(thisCard);
  }
  return false;
}

function handleDragStart(e) {
  e.stopPropagation();

  draggedCard = this; // for context reference passing

  this.className = this.className + " is-dragged";
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  debug("preparing to send data: ");
  debug(this.innerHTML);
}

function handleDragEnd(e) {
  e.stopPropagation();
  var card = this;
  card.className = card.className.replace(' is-dragged', '');
}

function handleDragEnter(e) {
  if (e.stopPropagation)
    e.stopPropagation();
  var card = this;
  card.className = card.className + " dropover";
}

function handleDragLeave(e) {
  if (e.stopPropagation)
    e.stopPropagation();
  var card = this;
  card.className = card.className.replace(' dropover', '');
}

function handleDragOver(e) {
  if (e.stopPropagation)
    e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

// Simple modeling
//

class User {
  constructor(id, name, email, avatar) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._avatar = avatar;
  }

  get id() { return this._id; }
  set id(id) { this._id = id; }
  get name() { return this._name; }
  set name(name) { this._name = name; }
  get email() { return this._email; }
  set email(email) { this._email = email; }
  get avatar() { return this._avatar; }
  set avatar(avatar) { this._avatar = avatar; }

  static toJSON() { return new JSON.stringify(this); }
}

class Card {
  constructor(id, title, text) {
    debug("Inside a Superclass Card object");
    this._id = id;
    this._title = title;
    this._text = text;
  }

  get id() { return this._id; }
  set id(id) { this._id = id; }
  get title() { return this._title; }
  set title(title) { this._title = title; }
  get title() { return this._title; }
  set title(title) { this._title = title; }
}

/*
 * BasicCard
 * Properties: id, title, text
 * Optional: icon, links(array of URIs), assignedto(array of Users)
 *
 * + Helper functionality for converting to/from JSON
 * + as well as converting from HTML object -> BasicCard object
 */

class BasicCard extends Card {

  constructor(id, title, text) {
    debug("Inside a BasicCard object");
    super(id, title, text);
  }

  get icon() { return this._icon; }
  set icon(icon) { this._icon = icon; }
  get links() { return this._links; }
  set links(links) { this._links = links; }
  get assignedto() { return this._assignedto; }
  set assignedto(assignedto) { this._assignedto = assignedto; }
  addLink(link) {
    if (this._links == null) // null catches both null and undefined
      this._links = new array();
    this._links.push(link);
  }
  removeLink(link) {
    var idx = this_.links.indexOf(link);
    if (idx > -1)
      this._links.splice(idx, 1);
  }
  addAssignee(user) {
    if (this._assignedto == null) // null catches both null and undefined
      this._assignedto = new array();
    this._assignedto.push(user);
  }
  removeAssignee(user) {
    var idx = this_.assignedto.indexOf(user);
    if (idx > -1)
      this._assignedto.splice(idx, 1);
  }

  static fromHTML(object) {
    /*
     * default DOM HTML attributes (ID's should be unique)
     *
     * DOM attributes: data-id=1, #card-title-1, #card-text-1, #card-icon-1,
     * #card-1-link-1, #card-1-link-2 etc
     *
     * Example:
     * <div class="fullcard" data-id="1">
     * <span id="card-title-1">
     * <p id="card-text-1">
     * <i id="card-icon-1">
     * <a href="https://link" id="card-1-link-1">
     * <a href="https://link" id="card-1-link-2">
     *
     * -Ole
     */

    var id = object.dataset.id;
    var title = $('#card-title-' + id, object).text();
    var text = $('#card-text-' + id, object).text();
    var links;
    /*=object.querySelectorAll("div[data-id='" + id + "'] a[card-link-^]");
    links = JSON.stringify(links); // TODO: convert to js array
    debug(links); */
    var icon = $("#card-icon-" + id, object).text();
    var assignedto; // = object.dataset.assignedto; // TODO: convert to js array

    var card = new BasicCard(id, title, text);
    if (links != null)
      card.links = links;
    if (icon != null)
      card.icon = icon;
    if (assignedto != null)
      card.assignedto = assignedto;

    return card;
  }

  static toJSON() { return new JSON.stringify(this); }

  static fromJSON(jsonObject) {
    debug(jsonObject);
    var id, title, text, links, icon, assignedto;
    id = jsonObject._id;
    title = jsonObject._title;
    text = jsonObject._text;
    links = jsonObject._links;
    icon = jsonObject._icon;
    assignedto = jsonObject._assignedto;

    var card = new BasicCard(id, title, text);
    if (links != null)
      card.links = links;
    if (icon != null)
      card.icon = icon;
    if (assignedto != null)
      card.assignedto = assignedto;

    return card;
  }
}

$(document).ready(function() {
  $('.editable-text').editable('https://google.no');

  var cards = document.querySelectorAll('div.card.fullcard');
  debug(cards);

  for (var i = 0; i < cards.length; i++) {

    cards[i].addEventListener('click', handleCardClick, false);
    cards[i].addEventListener('dragstart', handleDragStart, false);
    cards[i].addEventListener('dragend', handleDragEnd, false);
    cards[i].addEventListener('dragenter', handleDragEnter, false);
    cards[i].addEventListener('dragleave', handleDragLeave, false);
    cards[i].addEventListener('dragover', handleDragOver, false);
    cards[i].addEventListener('drop', handleDrop, false);
  }
});