export default class NoteItem {
    constructor() {
        this._id = null;
        this._title = null;
        this._text = null;
        this._date_created = null;
        this._date_modified = null
    }

    getId() {
        return this._id;
    }

    setId(id) {
        this._id = id;
    }

    getTitle() {
        return this._title;
    }

    setTitle(title) {
        this._title = title;
    }

    getText() {
        return this._text;
    }

    setText(text) {
        this._text = text;
    }

    getDateCreated() {
        return this._date_created;
    }

    setDateCreated(date_created) {
        this._date_created = date_created;
    }

    getDateModified() {
        return this._date_modified;
    }

    setDateModified(date_modified) {
        this._date_modified = date_modified;
    }
}