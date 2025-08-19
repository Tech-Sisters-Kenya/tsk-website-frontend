'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  agreeToGuidelines: boolean;
}

export default function JoinOurCommunity() {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'personal-details'>('guidelines');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: Connect to backend API when ready
      console.log('Form submitted:', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    setActiveTab('personal-details');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-1/4 bg-tsk-light-2 rounded-lg p-6">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('guidelines')}
                className={`w-full text-left px-4 py-3 rounded-lg font-bold ${
                  activeTab === 'guidelines'
                    ? 'text-tsk-primary-dark'
                    : 'text-tsk-light-2 cursor-not-allowed'
                }`}
              >
                Guidelines
              </button>
              <button
                onClick={() => {}}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                  activeTab === 'personal-details'
                    ? 'text-tsk-primary-dark'
                    : 'text-tsk-light-2 cursor-not-allowed'
                }`}
                disabled={!agreed}
              >
                Personal Details
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full md:w-3/4 bg-white border border-tsk-primary-dark rounded-lg shadow-md p-8 mt-16 -ml-16 h-[600px] overflow-y-auto">
            {activeTab === 'guidelines' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-tsk-primary-dark">
                  Tech Sisters Kenya Registration Form
                </h2>
                <h3 className="text-xl font-semibold mt-4">Guidelines</h3>
                <div className="space-y-4 text-tsk-primary-dark mt-4">
                  <p className="text-xl font-semibold">
                    Guidelines for Tech Sisters Kenya Community:
                  </p>

                  <ol className="list-decimal pl-6 space-y-2 mt-4 font-medium">
                    <li>
                      Tech Sisters Kenya is a community for elevating women in tech, connecting,
                      inspiring, and supporting women on their tech journeys. While we are
                      women-focused, we are open to collaborations with other communities of any
                      genders. However, please note that our private channels like WhatsApp, Slack,
                      and other private channels are exclusively for women in tech and women
                      aspiring to join the tech industry.
                    </li>
                    <li>
                      Respect and support each other: Treat all community members with kindness,
                      empathy, and respect, fostering a safe and inclusive environment.
                    </li>
                    <li>
                      Uphold integrity and professionalism: Maintain professional conduct and
                      ethical standards in all interactions within the community.
                    </li>
                    <li>
                      Ensure confidentiality: Respect the privacy and confidentiality of fellow
                      members. Do not share or screenshot any sensitive information or views shared
                      within the community, unless it pertains to opportunities or public
                      information.
                    </li>
                    <li>
                      Share knowledge and experiences: Encourage open communication,
                      knowledge-sharing, and mentorship among members to promote growth and
                      learning.
                    </li>
                    <li>
                      Collaborate and network: Foster opportunities for collaboration, networking,
                      and professional development within the community.
                    </li>
                    <li>
                      Embrace diversity and inclusion: Celebrate and embrace the diverse
                      backgrounds, experiences, and perspectives of all community members.
                    </li>
                    <li>
                      Be supportive and encouraging: Provide support, encouragement, and guidance to
                      fellow members, especially those who are new to the field.
                    </li>
                  </ol>

                  <p className="mt-4 italic">
                    Find our Slack link at the end (Note: you will be added to our WhatsApp
                    community after joining Slack)
                  </p>

                  <p className="font-medium ">
                    By proceeding with the registration, you acknowledge and agree to abide by the
                    Tech Sisters Kenya Community Guidelines.
                  </p>
                </div>

                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-start mt-8">
                    <div className="flex items-center h-5">
                      <input
                        id="agree-to-guidelines"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="h-4 w-4 text-tsk-primary-dark focus:ring-tsk-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agree-to-guidelines" className="font-medium text-gray-700">
                        I agree to the community guidelines and code of conduct
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="button"
                      onClick={handleContinue}
                      disabled={!agreed}
                      className={`w-full md:w-auto px-8 ${
                        agreed
                          ? 'bg-tsk-primary-dark hover:bg-tsk-primary text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-2xl font-bold text-tsk-primary-dark mb-6">Personal Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-tsk-primary focus:border-transparent`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address',
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-tsk-primary focus:border-transparent`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-tsk-primary focus:border-transparent`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="location"
                      type="text"
                      {...register('location', { required: 'Location is required' })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-tsk-primary focus:border-transparent`}
                      placeholder="Enter your location"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="profession"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Profession <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="profession"
                      {...register('profession', { required: 'Profession is required' })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.profession ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-tsk-primary focus:border-transparent bg-white`}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select your profession
                      </option>
                      <option value="student">Student</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="product-manager">Product Manager</option>
                      <option value="data-scientist">Data Scientist</option>
                      <option value="other-tech">Other Tech Role</option>
                      <option value="non-tech">Non-Tech Role</option>
                    </select>
                    {errors.profession && (
                      <p className="mt-1 text-sm text-red-600">{errors.profession.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab('guidelines')}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tsk-primary"
                  >
                    Back
                  </button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 bg-tsk-primary-dark hover:bg-tsk-primary text-white"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
