'use client';
import Button from '@/components/Button';
import React, { useState } from 'react';
import SuccessModal from './SuccessModal';

interface FormData {
  fullName: string;
  email: string;
  organisation: string;
  reason: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    organisation: '',
    reason: '',
    message: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://api.techsisterskenya.org/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          organisation: formData.organisation,
          email: formData.email,
          reason: formData.reason,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Please try again.');
      }

      const data = await response.json();
      console.log('Success:', data);

      setIsModalOpen(true);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      fullName: '',
      email: '',
      organisation: '',
      reason: '',
      message: '',
    });
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col md:gap-8 sm:gap-6 gap-4">
            {/* Error message */}
            {error && (
              <div className="w-full p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Name and Email address */}
            <div className="w-full flex md:flex-row flex-col justify-between items-center gap-6">
              <span className="w-full flex flex-col gap-2">
                <label htmlFor="fullName" className="text-[16px] font-semibold font-body">
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
                  disabled={isSubmitting}
                />
              </span>
              <span className="w-full flex flex-col gap-2">
                <label htmlFor="email" className="text-[16px] font-semibold font-body">
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
                  disabled={isSubmitting}
                />
              </span>
            </div>

            {/* Inquiry type and organization */}
            <div className="w-full flex md:flex-row flex-col justify-between items-center gap-6">
              <span className="w-full flex flex-col gap-2">
                <label htmlFor="organisation" className="text-[16px] font-semibold font-body">
                  Organisation/Affiliation
                </label>
                <input
                  type="text"
                  name="organisation"
                  id="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  className="border-[1px] border-tsk-primary px-3 py-2 rounded-2xl w-full"
                  placeholder="Enter organisation"
                  disabled={isSubmitting}
                />
              </span>

              {/* Dropdown */}
              <span className="w-full flex flex-col gap-2">
                <label htmlFor="reason" className="text-[16px] font-semibold font-body">
                  I am contacting about: *
                </label>
                <select
                  name="reason"
                  id="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="border-[1px] border-tsk-primary px-4 py-2.5 rounded-2xl cursor-pointer
                          [&>option]:px-4 [&>option]:py-2 [&>option]:cursor-pointer
                          [&>option]:border-b [&>option]:border-gray-100
                          [&>option:hover]:bg-[#efd5f8] [&>option:hover]:text-tsk-primary
                          [&>option:checked]:bg-[#efd5f8]
                          [&>option:last-child]:border-b-0
                          focus:outline-none focus:border-tsk-primary"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select an option</option>
                  <option value="general inquiry">General Inquiry</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="membership">Membership</option>
                  <option value="sponsorship">Sponsorship</option>
                  <option value="press/media inquiry">Press/Media Inquiry</option>
                </select>
              </span>
            </div>

            <div>
              <span className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[16px] font-semibold font-body">
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
                  disabled={isSubmitting}
                />
              </span>
            </div>
          </div>

          <div className="w-full md:mt-8 mt-6">
            <Button className="block mx-auto" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
      <SuccessModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ContactForm;
