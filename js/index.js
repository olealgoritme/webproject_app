/*
 * JavaScript code for webproject in group
 *
 *
 */

var eventEnterColumn = new Event('eventEnterColumn');
var eventLeaveColumn = new Event('eventLeaveColumn');
var eventDone = new Event('eventDone');

const DEBUG = true;
var draggedCard = null, card = null, column = null, columnId = null;
var currentColumn = 0;

var currentTopicColumn = null;
function debug(s) {
  if (DEBUG)
    console.log(s);
}

function isCard(object) {
  if (object.id == null || !object.classList.contains('fullcard'))
    return false;
  else
    return true;
}

function addClass(object, className) {
  return object.className = object.className + " " + className;
}

function removeClass(object, className) {
  return object.className = object.className.replace(' ' + className, '');
}

function getColmnIdByCard(card) { return card.parentNode.parentNode.id; }

function getColumnByCard(card) {
  var columnId = card.parentNode.parentNode.id;
  return document.getElementById(columnId);
}

/*
function hasDummy(column) { return (column.dataset.dummy); }
*/

function createDummyCard(parent) {
  if (!$(parent).find('#dummyrow').length) {
    $(parent).prepend('<div class="row" id="dummyrow"><div class="black card mockup fullcard dummy-border dropover"><div class="card-content white-text"><span class="card-title">Drop</span><p class="card-text">Right here</p></div><div class="card-action"></div></div></div>');
  $(parent).attr('data-dummy=true');
  }
}

function removeDummyCard(parent) {
    var child = $(parent).find('#dummyrow');
    if(child != null)child.remove();
}
    /*
function columnToggle(column) {
  if ($(column).hasClass('expand-column'))
    removeClass(column, 'expand-column');
  else
    addClass(column, 'expand-column');
}

function handleEnterColumn(e) {
  debug("JA ENTERED COLUMN");
  //columnToggle(this);
  //if (!hasDummy(this))
    //createDummyCard(this);
}

function handleLeaveColumn(e) {
  debug("JA LEFT COLUMN");
  columnToggle(this);
  if (hasDummy(this))
    removeDummyCard(this);
}

function handleDone(e) {
  debug("HANDLING DONE");
  if ($(this).hasClass('expand-column'))
    removeClass(column, 'expand-column');
  if (hasDummy(this))
    removeDummyCard(this);
}


function getAllColumns() {
  return document.querySelectorAll('div.col.s3.column');
}
    */
function handleCardClick(e) {
  card = this;
    //card = BasicCard.fromHTML(card);
    //debug(this);

    //console.log("TEXT JA: ");
    //console.log(card.text);
    var cardId = card.id;
    var cardTitle = $('#card-title-' + cardId).text();
    var cardText = $('#card-text-' + cardId).text();

    // add pictures to modal
    $('a[id^="links-' + cardId + '-"]:not(a[href^="http"])').each(function() {
        var imgSrc = $(this).attr('href');
        console.log(imgSrc);
        $('#modal-photos').append('<img src="' + imgSrc + '" class="responsive-img rounded">');
        console.log(this);
    });

    var cardAssignees = $('[id^=assignees-' + cardId + '-]');
    var modalAssignees = $('#modal-user-list > img');

    $('#modal-title').text(cardTitle);
    $('#modal-text').text(cardText);

    
    // show selected assignees in modal
    for(var i=0; i < cardAssignees.length; i++) {

        $(modalAssignees[i]).click({id: $(cardAssignees[i]).attr('id')}, toggleAssignee);
        
        if ( $(cardAssignees[i]).hasClass('user-selected')) {
            $(modalAssignees[i]).removeClass('user-deselected');
            $(modalAssignees[i]).addClass('user-selected');
        } else {
            $(modalAssignees[i]).removeClass('user-selected');
            $(modalAssignees[i]).addClass('user-deselected');
        }
    }
        /* 
    for(var i=0; i < cardUsers.length; i++) {
        //$(users[i]).attr('id', ); // set corresponding ID in the modal img
        users[i].addEventListener('click', toggleAssignee(assigneeId), false);
        
        if((assignees[i].selected)) {
          $(users[i]).addClass('user-selected');
        } else {
          $(users[i]).addClass('user-deselected');
        }
    }
    */

    //    content += '<img id="' + id + '" data-name="' + name +'" data-email="' + email + '" title="' + name + ' (' + email + ')" src="' + avatar +'" class="right circle assignees">';

    //$('#modal-user-list').replaceWith(content);

    
    // add eventlisteners for all the users in the 'modal user assignee list'
    // so we can update the selected assignees in the card

}

function handleModalClose() {
    console.log("Modal CLOSED");
    // empty modal
    var modalAssignees = $('#modal-user-list > img');
    $('#modal-title').text("");
    $('#modal-text').text("");
    $('#modal-photos').empty();

    // remove eventhandlers
    for(var i=0; i < modalAssignees.length; i++) {
        $(modalAssignees[i]).off('click');
    }
}
function toggleAssignee(e) {
    e.preventDefault();
    var modalAssignee = this;
    var cardAssignee = e.data.id;
    
    if( $(modalAssignee).hasClass('user-selected') ) {
        
        $(modalAssignee).removeClass('user-selected');
        $(modalAssignee).addClass('user-deselected');
        
        $('#' + cardAssignee).removeClass('user-selected');
        $('#' + cardAssignee).addClass('user-deselected');
    } else {
        
        $(modalAssignee).removeClass('user-deselected');
        $(modalAssignee).addClass('user-selected');
        
        $('#' + cardAssignee).removeClass('user-deselected');
        $('#' + cardAssignee).addClass('user-selected');
    }
    
}

function handleDrop(e) {
  debug("dragDrop col:" + currentColumn);
  if (e.stopPropagation)
    e.stopPropagation();
  if (!isCard(this)) {
    e.preventDefault();
    return false;
  }
  thisCard = this;
  column = getColumnByCard(thisCard);
  columnId = getColmnIdByCard(thisCard);
    //removeClass(column, 'expand-column');

  // only swap cards if we're landing on other cards
  if (draggedCard != thisCard) {

      
      // Animate the card being swapped
      draggedCard.innerHTML = thisCard.innerHTML;
      draggedCard.id = thisCard.id;
      thisCard.innerHTML = e.dataTransfer.getData('text/html');
      thisCard.id = e.dataTransfer.getData('id');
    var icon = $('i#card-icon-' + thisCard.id);

      // column colors: green - orange - purple - red
      switch(currentColumn) {
          case 'column-1':
              icon.removeClass('red orange purple');
              icon.addClass(' green');
              break;
          case 'column-2':
              icon.removeClass('red green purple');
              icon.addClass(' orange');
              break;
          case 'column-3':
              icon.removeClass('red orange green');
              icon.addClass(' purple');
              break;
          case 'column-4':
              icon.removeClass('green orange purple');
              icon.addClass(' red');
              break;

      }
      $(draggedCard).focus();
      $(draggedCard).hover();

  }
    removeClass(thisCard, 'dropover');

    currentColumn = columnId;
}

function handleDragStart(e) {
  debug("dragStart: col: " + currentColumn);
  e.stopPropagation();
  if (!isCard(this)) {
    e.preventDefault();
    return false;
  }
  draggedCard = this; // for context reference passing
  addClass(draggedCard, 'is-dragged');
  e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('id', this.id);
}

function handleDragEnd(e) {
  debug("dragEnd: col: " + currentColumn);
  if (e.stopPropagation)
    e.stopPropagation();
  card = this;
  column = getColumnByCard(card);
  columnId = getColmnIdByCard(card);
  removeClass(card, 'is-dragged');
  removeClass(card, 'dropover');
}

function handleDragEnter(e) {
  debug("dragEnter: col: " + currentColumn);
  if (e.stopPropagation)
    e.stopPropagation();
  card = this;
  column = getColumnByCard(card);
  columnId = getColmnIdByCard(card);
  addClass(card, 'dropover');

  if (currentColumn != columnId)
    column.dispatchEvent(eventEnterColumn);

    currentColumn = columnId;

}

function handleDragLeave(e) {
  debug("dragLeave: col: " + currentColumn);
  if (e.stopPropagation)
    e.stopPropagation();
  card = this;
  column = getColumnByCard(card);
  columnId = getColmnIdByCard(card);
  removeClass(card, 'dropover');

  if (currentColumn != columnId)
    column.dispatchEvent(eventLeaveColumn);

    currentColumn = columnId;
}

function handleDragOver(e) {
  debug("dragOver");

  if (e.stopPropagation)
    e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}


// Simple modeling

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
  get selected() { return this._selected; }
  set selected(selected) { this._selected = selected; }

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
  get text() { return this._text; }
  set text(text) { this._text = text; }
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
      this._links = [];
    this._links.push(link);
  }
  removeLink(link) {
    var idx = this_.links.indexOf(link);
    if (idx > -1)
      this._links.splice(idx, 1);
  }
  addAssignee(user) {
    if (this._assignedto == null) // null catches both null and undefined
      this._assignedto = [];
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

    var id = object.id;
    var title = $('#card-title-' + id, object).text();
    var text = $('#card-text-' + id, object).text();
    var links = [];
    var icon = $("#card-icon-" + id, object).text();
    var assignedto = [];

    var links = $('[id^=links-' + id + '-]');
    var users = $('[id^=assignees-' + id + '-]');

      for(var i=0; i < users.length; i++) {
        var user, id, name, email, avatar, selected;
        id = users[i].id;
        name = users[i].dataset.name;
        email = users[i].dataset.email;
        avatar = users[i].src;
          user = new User(id, name, email, avatar)
          user.selected = ( $(users[i]).hasClass('user-selected') );
        assignedto.push(user);
        console.log(user);
    }
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

    card = new BasicCard(id, title, text);
    if (links != null)
      card.links = links;
    if (icon != null)
      card.icon = icon;
    if (assignedto != null)
      card.assignedto = assignedto;

    return card;
  }
}

function addCards() {
    
    var user;
    var users = [];
    user = new User(1, "Ole Algoritme", "olealgoritme@gmail.com", "img/ole_avatar.jpg");
    users.push(user);
    user = new User(2, "Daniel Johansen", "daniel@gmail.com", "img/daniel_avatar.jpg");
    users.push(user);
    user = new User(3, "Kamil Smola", "kamil@gmail.com", "img/kamil_avatar.jpg");
    users.push(user);
    user = new User(4, "Andreas Falkenberg", "andreas@gmail.com", "img/andreas_avatar.jpg");
    users.push(user);


    var cards = [];
    var card;

    /* Assignee IDer
     *
     * 1 = Ole
     * 2 = Daniel
     * 3 = Kamil
     * 4 = Andreas
     */

    /* Card 1 */
    card = new BasicCard();
    card.title   = "Layout idèer";
    card.text    = "Forskjellige tegninger og mockups av hva og hvordan vi tenker å løse layoutene";
    card.icon    = "attach_file"; //navnet på ikonet
    card.addLink("img/project/card1-1.jpg");
    card.addLink("img/project/card1-2.jpg");
    card.addAssignee(1); // id til bruker (1 = Ole)
    card.addAssignee(2); // id til bruker (2 = Daniel)
    card.addAssignee(3); // id til bruker (3 = Kamil)
    card.addAssignee(4); // id til bruker (4 = Andreas)
    cards.push(card);

    /* Card 2 */
    card = new BasicCard();
    card.title   = "JS drag and drop";
    card.text    = "Teste ut forskjellige JS drag and drop løsninger";
    card.icon    = "attach_file"; // navnet på ikonet
    card.addLink("img/project/card2-1.jpg");
    card.addLink("img/project/card2-2.jpg");
    card.addAssignee(1); // id til bruker (1 = Ole)
    card.addAssignee(2); // id til bruker (2 = Daniel)
    card.addAssignee(3); // id til bruker (3 = Kamil)
    card.addAssignee(4); // id til bruker (4 = Andreas)
    cards.push(card);

    /* Card 3 */
    card = new BasicCard();
    card.title   = "Navigation bar";
    card.text    = "Her er noen foreløpige eksempler vi har laget";
    card.icon    = "attach_file"; // navnet på ikonet
    card.addLink("img/project/card3-1.jpg");
    card.addLink("img/project/card3-2.jpg");
    card.addAssignee(1); // id til bruker (1 = Ole)
    card.addAssignee(2); // id til bruker (2 = Daniel)
    card.addAssignee(3); // id til bruker (3 = Kamil)
    cards.push(card);

    /* Card 4 */
    card = new BasicCard();
    card.title   = "Lage en logo";
    card.text    = "Vi må lage en logo til prosjektet vårt. Gjerne også finne navn. Vi har foreløpig kun funnet disse, som er vedlagt";
    card.icon    = "attach_file"; // navnet på ikonet
    card.addLink("img/project/card4-1.jpg");
    card.addLink("img/project/card4-2.jpg");
    card.addAssignee(1); // id til bruker (1 = Ole)
    card.addAssignee(2); // id til bruker (2 = Daniel)
    card.addAssignee(3); // id til bruker (3 = Kamil)
    cards.push(card);

    /* Card 5 */
    card = new BasicCard();
    card.title   = "Lage en modal og velge fargekombinasjoner";
    card.text    = "Må ha en ordentlig modal som viser hvilke vedlegg som er i cardet, samt en liste over de som har eierskap til selve cardet. Må også bestemme oss for hvilke farger vi vil ha";
    card.icon    = "thumb_up"; // navnet på ikonet
    card.addLink("img/project/card5-1.jpg");
    card.addLink("img/project/card5-2.jpg");
    card.addAssignee(1); // id til bruker (1 = Ole)
    card.addAssignee(2); // id til bruker (2 = Daniel)
    card.addAssignee(3); // id til bruker (3 = Kamil)
    cards.push(card);

    /* Card 6 */
    card = new BasicCard();
    card.title   = "Javascript programmering";
    card.text    = "Sette sammen alle bitene, så det ikke bare er et jævla rot...";
    card.icon    = "warning"; // navnet på ikonet
    card.addLink("img/project/card6-1.jpg");
    card.addLink("img/project/card6-2.jpg");
    card.addAssignee(1); // id til bruker (1 = Ole)
    card.addAssignee(2); // id til bruker (2 = Daniel)
    card.addAssignee(3); // id til bruker (3 = Kamil)
    cards.push(card);

    /*
    card = new BasicCard();
    card.title   = "Lage en modal og velge fargekombinasjoner";
    card.text    = "Må ha en ordentlig modal som viser hvilke vedlegg som er i cardet, samt en liste over de som har eierskap til selve cardet. Må også bestemme oss for hvilke farger vi vil ha";
    card.icon    = "attach_file"; // navnet på ikonet
    card.addLink("img/project/card7-1.jpg");
    card.addLink("img/project/card7-2.jpg");
    card.addAssignee(1); // id til bruker (1 = Ole)
    card.addAssignee(2); // id til bruker (2 = Daniel)
    card.addAssignee(3); // id til bruker (3 = Kamil)
    card.addAssignee(4); // id til bruker (4 = Andreas)
    cards.push(card);

    card = new BasicCard();
    card.title   = "Lage en modal og velge fargekombinasjoner";
    card.text    = "Må ha en ordentlig modal som viser hvilke vedlegg som er i cardet, samt en liste over de som har eierskap til selve cardet. Må også bestemme oss for hvilke farger vi vil ha";
    card.icon    = "attach_file"; // navnet på ikonet
    card.addLink("img/project/card8-1.jpg");
    card.addLink("img/project/card8-2.jpg");
    card.addAssignee(1); // id til bruker (1 = Ole)
    card.addAssignee(2); // id til bruker (2 = Daniel)
    card.addAssignee(3); // id til bruker (3 = Kamil)
    card.addAssignee(4); // id til bruker (4 = Andreas)
    cards.push(card);
    */
    addCardToColumn(cards);

}

function getColorForColumn(column) {
    var icon;
    // column colors: green - orange - purple - red
    switch(column) {
        case 'column-1':
            icon = 'green';
            return icon;
        case 'column-2':
            icon = 'orange';
            return icon;
        case 'column-3':
            icon = 'purple';
            return icon;
        case 'column-4':
            icon = 'red';
            return icon;
    }
    return icon;
}
function addCardToColumn(cards) {

    var column = "column-1";
    var icon = getColorForColumn();

    for(var i=0; i < cards.length; i++) {
        if(i==1) { column = "column-2"; icon = getColorForColumn(column); }
        if(i==3) { column = "column-3"; icon = getColorForColumn(column); }
        if(i==5) { column = "column-4"; icon = getColorForColumn(column); }
        $('#' + column).append('<div class="row"><div class="black card mockup space fullcard" id="'+ i +'" draggable=true><a class="modal-trigger" href="#generic-modal"><div class="card-content white-text"><span class="card-title text-ellipsis" id="card-title-' + i + '">'+ cards[i].title +'</span><p class="card-text text-ellipsis" id="card-text-' + i + '">' + cards[i].text + '</p></div><div class="card-action pad-top-24"><a class="mockup-fab btn-floating waves-light ' + icon + '"><i id="card-icon-' + i + '" class="material-icons">'+ cards[i].icon +'</i></a><a href="' + cards[i].links[0] + '" id="links-' + i + '-1" class="left links" target="_blank"><i class="material-icons">photo</i></a><a href="' + cards[i].links[1] + '" id="links-' + i + '-2" class="left links" target="_blank"><i class="material-icons">photo</i></a><a href="https://bfy.tw/O0Ag" id="links-' + i + '-3" class="left links" target="_blank"><i class="material-icons">attach_file</i></a><img id="assignees-' + i +'-1" data-name="Ole Algoritme" data-email="olealgoritme@gmail.com" title="Ole Algoritme (olealgoritme@gmail.com)" src="img/ole_avatar.jpg" class="right circle assignees user-selected"><img id="assignees-' + i + '-2" data-name="Kamil Smola" data-email="kamil@gmail.com" title="Kamil Smola (kamil@gmail.com)" src="img/kamil_avatar.jpg" class="right circle assignees user-selected"><img id="assignees-' + i +'-3" data-name="Daniel Johansen" data-email="daniel@gmail.com" title="Daniel Johansen (daniel@gmail.com)" src="img/daniel_avatar.jpg" class="right circle assignees user-selected"><img id="assignees-' + i + '-4" data-name="Andreas Falkenberg" data-email="andreas@gmail.com" title="Andreas Falkenberg (andreas@gmail.com)" src="img/andreas_avatar.jpg" class="right circle assignees user-deselected"></div></a></div></div>');
    }

}
/*

function topicDragEnter(e) {
    e.stopPropagation();
    card = this;
    addClass(card, 'dropover');
}
function topicDragLeave(e) {
    e.stopPropagation();
    card = this;
    removeClass(card, 'dropover');
}

function topicDragStart(e) {
    e.stopPropagation();
    card = this;
    addClass(card, 'dropover');
    e.dataTransfer.effectAllowed = 'move';
    //e.dataTransfer.setData('text/html', this.innerHTML);
    //e.dataTransfer.setData('id', this.id);
}

function topicDragEnd(e) {
    e.stopPropagation();
    card = this;
    removeClass(card, 'dropover');
}

function topicDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function topicDrop(e) {
    removeClass(card, 'dropover');
}
    */

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems, null);

  var fab = document.querySelectorAll('.btn-floating');
  M.FloatingActionButton.init(fab, {
        direction: 'top',
        hovedEnabled: false
  });


});


function getRandomID(min, max) {
    return Math.floor(Math.random() * ( max - min + 1 ) + min);
}

$(document).ready(function() {


  $(".dropdown-trigger").dropdown();
  $('.sidenav').sidenav();

  addCards();

    // disable clicks on the card assignee's avatars
    $('img[id^=assignees-]').each(function() {
        console.log(this);
        $(this).off('click');
        $(this).off('draggable');
    });

    // topic click sets global variable currentTopicColumn (se know which topic was clicked on, and add card to correct place)
    $('div[id^=topic-]').each(function() {
        $(this).on('click', function() {
            var id = $(this).attr('id');
            id = id.substring(6,id.length);
            currentTopicColumn = "column-" + id;
            console.log(currentTopicColumn);
        });
    });

    // card add button (in modal)
    $('#card-add').on('click', function() {
        
        // get title, text, icon, column and id
        var title = $('#card-input-title').val();
        var text = $('#card-input-text').val();

        if(title.length < 5 || text.length < 5) {
            M.toast({html: 'Title / text needs more than 5 characters'});
            return false;
        }
        var icon = 'thumb_up';
        var column = currentTopicColumn;
        var id = getRandomID(50,2000);

        // put new card in correct column, with attributes
        $('#' + column).append('<div class="row"><div class="black card mockup space fullcard" id="'+ id +'" draggable=true><a class="modal-trigger" href="#generic-modal"><div class="card-content white-text"><span class="card-title text-ellipsis" id="card-title-' + id + '">'+ title +'</span><p class="card-text text-ellipsis" id="card-text-' + id + '">' + text + '</p></div><div class="card-action pad-top-24"><a class="mockup-fab btn-floating waves-light ' + icon + '"><i id="card-icon-' + id + '" class="material-icons">'+ icon +'</i></a><img id="assignees-' + id +'-1" data-name="Ole Algoritme" data-email="olealgoritme@gmail.com" title="Ole Algoritme (olealgoritme@gmail.com)" src="img/ole_avatar.jpg" class="right circle assignees user-deselected"><img id="assignees-' + id + '-2" data-name="Kamil Smola" data-email="kamil@gmail.com" title="Kamil Smola (kamil@gmail.com)" src="img/kamil_avatar.jpg" class="right circle assignees user-deselected"><img id="assignees-' + id +'-3" data-name="Daniel Johansen" data-email="daniel@gmail.com" title="Daniel Johansen (daniel@gmail.com)" src="img/daniel_avatar.jpg" class="right circle assignees user-deselected"><img id="assignees-' + id + '-4" data-name="Andreas Falkenberg" data-email="andreas@gmail.com" title="Andreas Falkenberg (andreas@gmail.com)" src="img/andreas_avatar.jpg" class="right circle assignees user-deselected"></div></a></div></div>');


        // add eventlistener for new card added
        var element = document.getElementById(id);
          element.addEventListener('click', handleCardClick, false);
          element.addEventListener('dragstart', handleDragStart, false);
          element.addEventListener('dragend', handleDragEnd, false);
          element.addEventListener('dragenter', handleDragEnter, false);
          element.addEventListener('dragleave', handleDragLeave, false);
          element.addEventListener('dragover', handleDragOver, false);
          element.addEventListener('drop', handleDrop, false);
        

        $('#modal-add-card').modal('close');
    
    });
    /*
  
    $('.fullcard').hover(function() {
       $(this).prepend('<a href="#close"><i id="card-close" class="close-hidden close material-icons right white-text">close</i></a>'); 
    },
   function() {
        $(this).remove('#card-close');
    
    });
    */
    
    //$('.editable-text').editable('https://bfy.tw/O0Ag');
    /*
    var topics = document.querySelectorAll('div.topic.title');
    console.log(topics);
    for (var i = 0; i < topics.length; i++) {
        topics[i].addEventListener('dragenter', topicDragEnter, false);
        topics[i].addEventListener('dragleave', topicDragLeave, false);
        topics[i].addEventListener('dragstart', topicDragStart, false);
        topics[i].addEventListener('dragend', topicDragEnd, false);
        topics[i].addEventListener('dragover', topicDragOver, false);
        topics[i].addEventListener('drop', topicDrop, false);
    }
    */
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

    $('#modal-add-card').modal({
       dismissible: true, // Modal can be dismissed by clicking outside of the modal
       onOpenEnd: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
         console.log(modal, trigger);
       },
        onCloseEnd: function() {
            // reset modal
            var title = $('#card-input-title');
            var text = $('#card-input-text');
            $('#modal-add-card').modal('close');
            text.val('');
            title.val('');
        }
    }
   );

    $('#generic-modal').modal({
       dismissible: true, // Modal can be dismissed by clicking outside of the modal
       onOpenEnd: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
         console.log(modal, trigger);
       },
       onCloseEnd: handleModalClose
     }
   );

});