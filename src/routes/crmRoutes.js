import { addNewContact, deleteContact, getContacts, getContactWithID, updateContact } from '../controllers/crmController'
import { loginRequired, register, login } from '../controllers/userController';

const routes = (app) => {
    app.route('/contact')
        //get all contact
        .get((req, res, next) => {
            //middleware
            console.log(`Request from : ${req.originalUrl}`)
            console.log(`Request type : ${req.method}`)
            next();
        }, loginRequired, getContacts)
        //post a new contact
        .post(loginRequired, addNewContact);



    app.route('/contact/:contactId')
        //get a specific contact
        .get(loginRequired, getContactWithID)
        //update a contact
        .put(loginRequired, updateContact)

        .delete(loginRequired, deleteContact)

    //registration route
    app.route('/auth/register')
        .post(register);

    //login route    
    app.route('/login')
        .post(login);
}

export default routes;