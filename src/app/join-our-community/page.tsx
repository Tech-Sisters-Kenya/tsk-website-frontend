'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Email from '@/assets/email-icon.svg';
import KenyaFlag from '@/assets/kenya-flag-icon.svg';
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  occupation: string;
  customOccupation?: string;
  experienceLevel: string;
  role: 'Mentor' | 'Mentee' | 'Both';
  expertiseAreas: string;
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
    <main className="min-h-screen w-full ml-8 py-40 bg-white">
      {/* Main Content */}
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-[35%] h-fit bg-tsk-light-2 rounded-2xl px-6 py-16 sticky top-8">
            <div className="relative p-4">
              {/* Connecting line */}
              <div
                className={`absolute left-8 top-8 h-44 w-0.5 ${
                  !agreed
                    ? 'bg-[#45084A]/50 cursor-not-allowed'
                    : 'bg-tsk-primary-dark transition-colors'
                } `}
              ></div>

              {/* First step - Guidelines */}
              <div className="relative z-10 mb-40">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold bg-tsk-primary-dark text-white">
                    1
                  </div>
                  <button
                    onClick={() => setActiveTab('guidelines')}
                    className="ml-4 text-left font-bold text-xl text-tsk-primary-dark"
                  >
                    Guidelines
                  </button>
                </div>
              </div>

              {/* Second step - Personal Details */}
              <div className="relative z-10 mb-28">
                <div className="flex items-center">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${
                      activeTab === 'personal-details'
                        ? 'bg-tsk-primary-dark text-white'
                        : !agreed
                          ? 'border border-[#45084A]/50 text-[#45084A]/50'
                          : 'border border-tsk-primary-dark text-tsk-primary-dark transition-colors'
                    }`}
                  >
                    2
                  </div>
                  <button
                    onClick={() => agreed && setActiveTab('personal-details')}
                    className={`ml-4 text-left font-bold text-xl ${
                      activeTab === 'personal-details'
                        ? 'text-tsk-primary-dark'
                        : !agreed
                          ? 'text-[#45084A]/50 cursor-not-allowed'
                          : 'text-tsk-primary-dark transition-colors'
                    }`}
                    disabled={!agreed}
                  >
                    Personal Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="z-10 w-[calc(100%-4rem)] bg-white border border-tsk-primary-dark rounded-2xl shadow-md py-8 pl-10 pr-20 mt-14 -ml-24 -mr-20  h-[600px] overflow-y-auto">
            {activeTab === 'guidelines' ? (
              <div className="space-y-6">
                <h2 className="text-5xl font-bold text-tsk-primary-dark">
                  Tech Sisters Kenya Registration Form
                </h2>

                <div className="space-y-4 text-tsk-primary-dark mt-4 ">
                  <div className="flex flex-col gap-8 my-8">
                    <p className="text-xl font-semibold">Guidelines</p>
                    <p className="text-xl font-semibold">
                      Guidelines for Tech Sisters Kenya Community:
                    </p>
                  </div>

                  <ol className="list-decimal pl-6 mt-4 font-medium">
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

                  <p className="font-medium text-lg">
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
                        className="h-4 w-4 text-tsk-primary-dark focus:ring-tsk-primary rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="agree-to-guidelines"
                        className="font-bold text-tsk-primary-dark"
                      >
                        I agree to the guidelines
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="button"
                      onClick={handleContinue}
                      disabled={!agreed}
                      className={`w-full md:w-auto rounded-lg px-8 ${
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
                <h2 className="text-4xl font-bold text-tsk-primary-dark">
                  Tech Sisters Kenya Registration Form
                </h2>
                <h2 className="text-2xl font-bold text-tsk-primary-dark mb-6">Personal Details</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-tsk-primary-dark font-semibold text-md">
                      First Name*
                    </label>
                    <div className="mt-1">
                      <input
                        {...register('firstName', { required: 'First name is required' } as const)}
                        type="text"
                        placeholder="Enter your first name"
                        className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                          errors.firstName ? 'border-red-300' : 'border-[#45084A]/50'
                        } rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary-dark`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-tsk-primary-dark font-semibold text-md">
                      Last Name*
                    </label>
                    <div className="mt-1">
                      <input
                        {...register('lastName', { required: 'Last name is required' } as const)}
                        type="text"
                        placeholder="Enter your last name"
                        className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                          errors.lastName ? 'border-red-300' : 'border-[#45084A]/50'
                        } rounded-xl focus:outline-none focus:ring-tsk-primary-dark focus:border-tsk-primary-dark`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-tsk-primary-dark font-semibold text-md">
                    Email Address*
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={Email} alt="Email icon" width={20} height={20} className="mr-2" />
                    </div>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address',
                        },
                      } as const)}
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                        errors.email ? 'border-red-300' : 'border-[#45084A]/50'
                      } rounded-xl focus:outline-none focus:ring-tsk-primary-dark focus:border-tsk-primary-dark`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-tsk-primary-dark font-semibold text-md">
                    Phone Number (provide +254xxxxxxx) No spaces
                  </label>
                  <div className="mt-1 flex">
                    <div className="flex items-center px-4 py-4 border border-r-0 rounded-l-xl bg-tsk-light-2 border-[#45084A]/50">
                      <span className="font-semibold text-tsk-primary-dark flex flex-row items-center">
                        {' '}
                        <Image
                          src={KenyaFlag}
                          alt="Kenyan flag icon"
                          width={32}
                          height={32}
                          className="mr-2"
                        />{' '}
                        +254
                      </span>
                    </div>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{9}$/,
                          message: 'Please enter a valid 9-digit phone number',
                        },
                      } as const)}
                      type="tel"
                      placeholder="700000000"
                      className={`flex-1 px-3 py-2 border border-l-0 rounded-r-xl focus:outline-none focus:ring-tsk-primary-dark focus:border-tsk-primary-dark placeholder:text-[#45084A]/50 ${
                        errors.phone ? 'border-red-300' : 'border-[#45084A]/50'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-tsk-primary-dark font-semibold text-md mb-1">
                    Gender (This community is exclusively for Women in Tech or aspiring to join
                    Tech)
                  </label>
                  <div className="w-full py-4 px-3 border bg-tsk-light-2 rounded-xl border-[#45084A]/50">
                    Female
                  </div>
                  <input type="hidden" {...register('gender')} value="female" />
                </div>

                <div className="mb-4">
                  <label className="block text-tsk-primary-dark font-semibold text-md mb-1">
                    What is your Occupation/Role in Tech? If yours is not among the options provided
                    type in your answer in the next question*
                  </label>
                  <select
                    {...register('occupation', { required: 'Occupation is required' } as const)}
                    className={`w-full py-4 px-3 border text-[#45084A]/50 rounded-xl focus:outline-none focus:ring-tsk-primary-dark focus:border-tsk-primary-dark ${
                      errors.occupation ? 'border-red-300' : 'border-[#45084A]/50'
                    } [&>option]:border [&>option]:border-[#45084A]/50 [&>option]:text-[#45084A]/50 [&>option]:text-base [&>option]:py-2 [&>option]:px-3 [&>option]:bg-white [&>option:checked]:bg-tsk-light-2 [&>option:checked]:font-bold`}
                    defaultValue=""
                  >
                    <option value="">Choose your occupation</option>
                    <option value="Back End Software Engineer">Back End Software Engineer</option>
                    <option value="Full Stack Software Engineer">
                      Full Stack Software Engineer
                    </option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Cyber Security Engineer">Cyber Security Engineer</option>
                    <option value="Mobile App Developer">Mobile App Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Quality Assurance Engineer">Quality Assurance Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="other">Not listed</option>
                  </select>
                  {errors.occupation && (
                    <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-tsk-primary-dark font-semibold text-md mb-1">
                    My role is not listed above (Please write your role)
                  </label>
                  <input
                    {...register('customOccupation')}
                    type="text"
                    placeholder="Type your role"
                    className={`w-full py-4 px-3 border rounded-xl focus:outline-none focus:ring-tsk-primary-dark focus:border-tsk-primary-dark ${
                      errors.customOccupation ? 'border-red-300' : 'border-[#45084A]/50'
                    }`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-tsk-primary-dark font-semibold text-md mb-1">
                    Years of Experience in Tech (Please select one)*
                  </label>
                  <select
                    {...register('experienceLevel', {
                      required: 'Experience level is required',
                    } as const)}
                    className={`w-full py-4 px-3 border text-[#45084A]/50 rounded-xl focus:outline-none focus:ring-tsk-primary-dark focus:border-tsk-primary-dark ${
                      errors.experienceLevel ? 'border-red-300' : 'border-[#45084A]/50'
                    } [&>option]:border [&>option]:border-[#45084A]/50 [&>option]:text-[#45084A]/50 [&>option]:text-base [&>option]:py-2 [&>option]:px-3 [&>option]:bg-white [&>option:checked]:bg-tsk-light-2 [&>option:checked]:font-bold`}
                    defaultValue="2 years and more"
                  >
                    <option value="less than 1 year">Less than 1 year</option>
                    <option value="1 year">1 year</option>
                    <option value="2 years and above">2 years and more</option>
                    <option value="Student">Student</option>
                    <option value="Aspiring to join tech">Aspiring to join tech</option>
                  </select>
                  {errors.experienceLevel && (
                    <p className="mt-1 text-sm text-red-600">{errors.experienceLevel.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-tsk-primary-dark font-semibold text-md mb-1">
                    Are you interested in being a mentor, mentee, or both?*
                  </label>
                  <select
                    {...register('role', { required: 'Please select an option' })}
                    className={`w-full py-4 px-3 border rounded-xl focus:outline-none focus:ring-tsk-primary-dark focus:border-tsk-primary-dark ${
                      errors.role ? 'border-red-300' : 'border-[#45084A]/50'
                    }`}
                    defaultValue="Mentor"
                  >
                    <option value="Mentor">Mentor</option>
                    <option value="Mentee">Mentee</option>
                    <option value="Both">Both</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-tsk-primary-dark font-semibold text-md mb-1">
                    What specific areas of your technical expertise would you like to develop
                    further?*
                  </label>
                  <textarea
                    {...register('expertiseAreas', {
                      required: 'Please specify areas of expertise',
                    })}
                    placeholder="Type your answer"
                    rows={4}
                    className={`w-full py-4 px-3 border rounded-xl focus:outline-none focus:ring-tsk-primary-dark focus:border-tsk-primary-dark ${
                      errors.expertiseAreas ? 'border-red-300' : 'border-[#45084A]/50'
                    }`}
                  />
                  {errors.expertiseAreas && (
                    <p className="mt-1 text-sm text-red-600">{errors.expertiseAreas.message}</p>
                  )}
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab('guidelines')}
                    className="px-8 py-3 border border-tsk-primary-dark rounded-xl text-tsk-primary-dark font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-tsk-primary-dark text-white rounded-xl font-semibold hover:bg-tsk-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
