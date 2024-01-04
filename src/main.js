import { ContactListController } from "./contact-list/controller/contact-list-controller.js";
import { ContactListTableView } from "./contact-list/view/contact-list-table-view.js";
import { ContactList } from "./contact-list/model/contact-list.js";
import { Contact } from "./contact-list/model/contact.js";

function main() {
    const contactList = new ContactList();
    contactList.addContact(new Contact("John", "max@max.com", "1234567890"));

    const controller = new ContactListController(contactList);

    new ContactListTableView(contactList, controller);
}

window.onload = () => {
    main();
}
