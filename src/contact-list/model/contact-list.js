import { Observable } from "../../utils/observable.js";

export class ContactList extends Observable {

    constructor() {
        super();
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
        this.notifyObservers(this.contacts);

    }

    deleteContact(contactName) {
        this.contacts = this.contacts.filter(contact => contact.name !== contactName);
        this.notifyObservers(this.contacts);
    }

    forEach(callback) {
        this.contacts.forEach(callback);
    }
}

