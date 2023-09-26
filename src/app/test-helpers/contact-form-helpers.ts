import { IContactForm } from "../contact-form/i-contact-form.dto";

export const name = 'yJwbgyieB4';
export const email = 'test@email.net';
export const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus aliquam eleifend mi in nulla posuere. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Cursus vitae congue mauris rhoncus. At elementum eu facilisis sed.';
export const contactFormModel = <IContactForm>{
  name: name, email: email, message: message
};

export const postContactFormResponse: { success: boolean } = {
    "success": true
  };