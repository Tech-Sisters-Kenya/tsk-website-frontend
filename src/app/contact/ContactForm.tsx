'use client';
import Button from '@/components/Button';
import React, { useState } from 'react';
import SuccessModal from './SuccessModal';

interface FormData {
  fullName: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    organization: '',
    inquiryType: '',
    message: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setIsModalOpen(true); // Open modal on successful submission
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form if needed
    setFormData({
      fullName: '',
      email: '',
      organization: '',
      inquiryType: '',
      message: '',
    });
  };
  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col md:gap-8 sm:gap-6 gap-4">
            {/* Name and Email address */}
            <div className="w-full flex md:flex-row flex-col justify-between items-center gap-6">
              <span className="w-full flex flex-col gap-2">
                <label htmlFor="" className="text-[16px] font-semibold font-body">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border-[1px] border-tsk-primary px-3 py-2 rounded-2xl"
                  placeholder="Enter your full name"
                  required
                />
              </span>
              <span className="w-full flex flex-col gap-2">
                <label htmlFor="" className="text-[16px] font-semibold font-body">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-[1px] border-tsk-primary px-3 py-2 rounded-2xl"
                  placeholder="Email"
                  required
                />
              </span>
            </div>
            {/* Inquiry type and organization */}
            <div className="w-full flex md:flex-row flex-col justify-between items-center gap-6">
              <span className="w-full flex flex-col gap-2">
                <label htmlFor="" className="text-[16px] font-semibold font-body">
                  Organisation/Affiliation
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="border-[1px] border-tsk-primary px-3 py-2 rounded-2xl w-full"
                  placeholder="Enter organisation"
                />
              </span>
              {/* Dropdown */}
              <span className="w-full flex flex-col gap-2">
                <label htmlFor="" className="text-[16px] font-semibold font-body">
                  I am contacting about: *
                </label>
                <select
                  name="inquiryType"
                  id="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="border-[1px] border-tsk-primary px-4 py-2.5 rounded-2xl cursor-pointer
                          [&>option]:px-4 [&>option]:py-2 [&>option]:cursor-pointer
                          [&>option]:border-b [&>option]:border-gray-100
                          [&>option:hover]:bg-[#efd5f8] [&>option:hover]:text-tsk-primary
                          [&>option:checked]:bg-[#efd5f8]
                          [&>option:last-child]:border-b-0
                          focus:outline-none focus:border-tsk-primary"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="option1">General Inquiry</option>
                  <option value="option2">Partnerships</option>
                  <option value="option3">Membership</option>
                  <option value="option3">Sponsorship</option>
                  <option value="option3">Press/Media Inquiry</option>
                </select>
              </span>
            </div>
            <div>
              <span className="flex flex-col gap-2">
                <label htmlFor="" className="text-[16px] font-semibold font-body">
                  Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type Here"
                  className="border-[1px] border-tsk-primary px-3 py-2 rounded-2xl"
                  required
                />
              </span>
            </div>
          </div>
          <div className="w-full md:mt-8 mt-6">
            <Button className="block mx-auto">Submit</Button>
          </div>
        </form>
      </div>
      <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ContactForm;
