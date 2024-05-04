import mongoose from "mongoose";
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save()
        .then(savedContact => {
            res.send(savedContact)
        })
        .catch(err => {
            res.send(err)
        })
}

export const getContacts = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.send(contacts)
        })
        .catch(err => {
            res.send(err)
        })

}

export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactId)
        .then(contact => {
            res.send(contact)
        })
        .catch(err => {
            res.send(err)
        })
}

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true })
        .then(updatedContact => {
            res.json(updatedContact)
        })
        .catch(err => {
            res.send(err)
        })
}

export const deleteContact = (req, res) => {
    Contact.deleteOne({ _id: req.params.contactId })
        .then(deletedContact => {
            res.json({ message: 'Contact deleted!' })
        })
        .catch(err => {
            res.send(err)
        })
}