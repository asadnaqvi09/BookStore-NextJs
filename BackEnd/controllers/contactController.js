const { sendEmail } = require("../utilis/sendEmail");
const Contact = require("../models/contactModel");
const { z } = require('zod');
const response = require('../utilis/response');
const validator = require('validator');

const contactSchema = z.object({
  Name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phoneNo: z.string().min(10, "Phone number too short").regex(/^03\d{9}$/, "Phone no must be like 03XXXXXXXXX"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

const createContact = async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    data.Name = validator.escape(data.Name);
    data.email = validator.normalizeEmail(data.email);
    data.phoneNo = validator.escape(data.phoneNo);
    data.message = validator.escape(data.message);

    const newContact = await Contact.create(data);
    const subject = `📩 New message from ${data.email}`;
    const html = `
      <div style="font-family: sans-serif;">
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${data.Name} (${data.email})</p>
        <p><strong>Phone:</strong> ${data.phoneNo}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="color: #444; border-left: 4px solid #ccc; padding-left: 10px;">
          ${data.message}
        </blockquote>
        <br>
        <p style="font-size:14px; color:gray;">
          — This message was sent via the Denture Dental Clinic contact form.
        </p>
      </div>
    `;
    await sendEmail(process.env.SMTP_EMAILS, subject, html, data.email);

    response.success(res, "Your message has been sent successfully!", newContact, 201);
  } catch (error) {
    response.error(res, "Internal Server Error", 500);
    console.log("Error in Contact Controller : ",error.message);
  }
};

const getContacts = async (req,res)=> {
  try {
    const contacts = await Contact.find();
    response.success(res, "Contacts fetched successfully", contacts, 200);
  } catch (error) {
    response.error(res, "Internal Server Error", 500);
    console.log("Error in Contact Controller : ",error.message);
  }
};

const deleteContact = async (req,res)=> {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return response.error(res, "Contact not found", 404);
    }
    response.success(res, "Contact deleted successfully", contact);
  } catch (error) {
    response.error(res, "Internal Server Error", 500);
    console.log("Error in Contact Controller : ",error.message);
  }
}

module.exports = { createContact, getContacts, deleteContact };