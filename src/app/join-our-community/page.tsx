'use client';

import React, { useState } from 'react';
import Form from '@/app/join-our-community/form';

export default function JoinOurCommunity() {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'personal-details'>('guidelines');
  const [agreed, setAgreed] = useState(false);
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
                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={!agreed}
                      className={`w-full md:w-auto rounded-lg px-8 py-2 ${
                        agreed
                          ? 'bg-tsk-primary-dark hover:bg-tsk-primary text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Form />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
