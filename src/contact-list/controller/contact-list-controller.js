
export class ContactListController {
    constructor(contactList) {
        this.contactList = contactList;
    }

    submitNewContact(contact) {
        this.contactList.addContact(contact);
        console.log("added contact", this.contactList);
    }

    deleteContact(contactName) {
        this.contactList.deleteContact(contactName);
        console.log("deleted contact", this.contactList);
    }
}
