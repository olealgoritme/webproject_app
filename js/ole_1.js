// TODO:
// 1. Dynamic creation of columns
// 2. Dynamic creation of cards
// 3. Event listener for "empty column" -> remove it
// 4. Event listener for "attached to different column" ->


// Simple modeling
class Card {
    constructor(id, title, text) {
        console.log("Inside a Superclass Card object");
        this._id = id;
        this._title = title;
        this._text = text;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }
    
    get title() {
        return this._title;
    }
    
    set title(title) {
        this._title = title;
    }
}

class BasicCard extends Card {
    constructor(id, title, text, link) {
        console.log("Inside a BasicCard object");
        super(id, title, text);
        this._link = link;
    }

    get id() {
        return super.id;
    }

    get link() {
        return this._link;
    }

    set link(link) {
        this._link = link;
    }
}

class ImageCard extends BasicCard {
    constructor(title, text, link, imgPath) {
        console.log("Inside a ImageCard object");
        super(title, text, link);
        this._imgPath = imgPath;
    }

    get imgPath() {
        return this._imgPath;
    }

    set imgPath(imgPath) {
        this._imgPath = imgPath;
    }
}




var cards = new Array();
cards.push( new BasicCard(1, "Heisann tittel", "Text og sånn og de"));
cards.push( new ImageCard(2, "Heisann tittel", "Text og sånn og de", "img/test.jpg"));
cards.push( new ImageCard(3, "Heisann tittel", "Text og sånn og de", "img/test.jpg"));

console.log(cards[2].id);
