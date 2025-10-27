import React from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section className="w-full xl:px-32 flex flex-col min-h-screen py-32 container mx-auto text-tsk-primary-dark lg:px-20 sm:px-8 px-2">
      <div className="w-full block mx-auto">
        <div className="mt-12 mx-auto flex flex-col justify-center items-center">
          <h1 className="sm:text-5xl text-3xl font-bold font-heading">Contact Us</h1>
          <p className="font-heading sm:text-[32px] text-2xl font-medium">
            We are looking forward to hearing from you.
          </p>
        </div>
        <div className="border-[1.5px] rounded-xl p-5 border-[#45084a]/30 shadow-md w-full mt-8 md:px-20 block mx-auto">
          <div className="flex lg:flex-row flex-col gap-4 justify-center md:justify-between">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
