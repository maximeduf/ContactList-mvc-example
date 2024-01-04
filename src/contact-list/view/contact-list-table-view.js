import { Observer } from "../../utils/observer.js";
import { Contact } from "../../contact-list/model/contact.js";

/* html of a Contact
<tr>
    <td>John</td>
    <td>max@max.com</td>
    <td>1234567890</td>
    <td>
        <button class="btn btn-outline-dark btn-delete-contact"><svg>...</svg></button>
    </td>
</tr>
*/

export class ContactListTableView extends Observer {

    constructor(contactList, controller) {
        super();
        this.controller = controller;
        this.parentElement = document.querySelector("#table-data");
        this.contactList = contactList;
        this.trashSvg = null;
        this.init();
    }

    init() {
        // add this view as an observer of the model
        this.contactList.addObserver(this);

        // setup contact button event listener
        this.getAddContactButton().addEventListener("click", (e) => {
            e.preventDefault();
            const newContactName = this.getContactFormName();
            this.controller.submitNewContact(newContactName);
        });

        this.refresh();
    }

    refresh() {
        this.parentElement.innerHTML = "";
        this.contactList.forEach(async contact => {
            const tableRow = document.createElement("tr");

            const dataName = document.createElement("td");
            const dataEmail = document.createElement("td");
            const dataPhone = document.createElement("td");
            const dataTrashButton = document.createElement("td");
            const trashButton = document.createElement("button");
            const trashSvg = await this.getTrashSvg();
            trashButton.innerHTML = trashSvg;
            trashButton.classList.add("btn", "btn-outline-dark", "btn-delete-contact");
            trashButton.addEventListener("click", () => {
                this.controller.deleteContact(contact.name);
            });
            dataName.innerHTML = contact.name;
            dataEmail.innerHTML = contact.email;
            dataPhone.innerHTML = contact.phone;
            dataTrashButton.appendChild(trashButton);

            tableRow.appendChild(dataName);
            tableRow.appendChild(dataEmail);
            tableRow.appendChild(dataPhone);
            tableRow.appendChild(dataTrashButton);
            this.parentElement.appendChild(tableRow);
        });
    }

    async getTrashSvg() {
        if (this.trashSvg) {
            return this.trashSvg;
        } else {
            return fetch("assets/trash-svg.html").then(response => {
                this.trashSvg = response.text();
                return this.trashSvg;
            });
        }
    }

    getContactFormName() {
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const phone = document.querySelector("#phone").value;
        return new Contact(name, email, phone);
    }

    getAddContactButton() {
        return document.querySelector("#add-contact");
    }

    update() {
        this.refresh();
    }

}
