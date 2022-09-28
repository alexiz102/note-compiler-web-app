export default class NoteList {
    constructor() {
        this.list = [];
    }

    get_list() {
        return this.list;
    }

    set_list(note_list) {
        this.list = note_list;
    }

    clear_list() {
        this.list = [];
    }

    addItem(itemObj) {
        this.list.push(itemObj);
    }

    removeItem(id) {
        const list = this.list;
        for (let i=0; i<list.length; i++) {
            if (list[i]._id == id) {
                list.splice(i,1);
                break
            }
        }
    }
}