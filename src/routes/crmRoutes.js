import { addNewContact, deleteContact, getContacts, getContactWithID, updateContact } from '../controllers/crmController'

const routes = (app) => {
    app.route('/contact')
        //get all contact
        .get((req, res, next) => {
            //middleware
            console.log(`Request from : ${req.originalUrl}`)
            console.log(`Request type : ${req.method}`)
            next();
        }, getContacts)
        //post a new contact
        .post(addNewContact);



    app.route('/contact/:contactId')
        //get a specific contact
        .get(getContactWithID)
        //update a contact
        .put(updateContact)

        .delete(deleteContact)
}

export default routes;