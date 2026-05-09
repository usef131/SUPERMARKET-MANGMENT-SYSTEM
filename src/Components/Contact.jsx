import  { useRef } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

function Contact() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_5y5f9e9', 'template_4nkab4b', form.current, {
        publicKey: 'aeGIhdSAgRU9dJJcC',
      })
      .then((result) => {
          console.log(result.text);
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error("Failed to send message.");
        },
      );
  };
  return (
    <>
      <header className="bg-dark text-white text-center py-3 mb-4 mx-auto rounded shadow-sm w-25 mt-4">
        <h1 className="text-center">Contact us</h1>
      </header>


      <div className="container mb-5 mt-5 ">
        <form className="w-25 mx-auto" onSubmit={sendEmail} ref={form}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label"><b>Email</b></label>
            <input type="email" className="form-control shadow-sm" id="email" placeholder="examble@gmail.com" name='user_email' />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="form-label "><b>Message</b></label>
            <textarea name="message" id="message" className="form-control shadow-sm" placeholder="Enter your message here..."></textarea>
          </div>
          <input type="submit" value="Send" className="btn btn-primary" />



        </form>
      </div>
    </>

  );
};

export default Contact;