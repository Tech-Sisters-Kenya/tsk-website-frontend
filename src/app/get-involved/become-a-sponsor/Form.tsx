'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '../Input';
import PhoneNumberInput from '../PhoneNumberInput';
import CheckboxField from '../CheckboxField';
import { SponsorshipTypeOptions } from '../info';
import RadioGroup from '../RadioGroup';
import TextAreaField from '../TextAreaField';
import { IFormProps } from './IFormProps';
import { endpoints } from '@/api/constants';
import Modal from '../Modal';

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setError,
  } = useForm<IFormProps>({
    defaultValues: {
      contact_name: '',
      organisation_name: '',
      position_title: '',
      email: '',
      phone: '',
      sponsorship_type: [],
      amount: '',
      notes: '',
      preferred_communication_method: '',
      sponsorship_goals_and_expectations: '',
      in_kind_support_type: '',
    },
  });

  // const conditionalFields = watch('sponsorship_type') || [];

  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    setIsLoading(true);
    setFormError('');

    try {
      const trimmedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) =>
          typeof value === 'string' ? [key, value.trim()] : [key, value]
        )
      );

      const response = await fetch(endpoints.registerSponsor, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(trimmedData),
      });
      console.log('Server response:', response);

      const result = await response.json();
      console.log('Server result:', result);

      if (!response.ok) {
        console.error('Server error response:', trimmedData);

        if (response.status === 422 && result.errors) {
          // Handle validation errors
          Object.entries(result.errors).forEach(([field, messages]) => {
            setError(field as keyof IFormProps, {
              type: 'manual',
              message: Array.isArray(messages) ? messages[0] : String(messages),
            });
          });
          return;
        }

        throw new Error(result.message || `Registration failed. Status: ${response.status}`);
      }

      // Registration successful, open modal
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setFormError(errorMessage);
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-tsk-light-1 p-8 rounded-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="mt-8">
          {/* Organisation / Group Name */}
          <Input
            id="organisation_name"
            type="text"
            label="Organisation / Group Name *"
            placeholder="Enter your organisation / group name"
            error={errors.organisation_name}
            {...register('organisation_name', {
              required: 'Organisation / Group Name is required',
              setValueAs: (v) => v.trim(),
            })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {/* Contact Person */}
          <Input
            id="contact_name"
            type="text"
            label=" Contact Person *"
            placeholder="Enter your contact person"
            error={errors.contact_name}
            {...register('contact_name', {
              required: 'Contact Person is required',
              setValueAs: (v) => v.trim(),
            })}
          />

          {/* Position / Title */}
          <Input
            id="position"
            type="text"
            label=" Position / Title *"
            placeholder="Enter your position"
            error={errors.position_title}
            {...register('position_title', {
              required: 'Position / Title is required',
              setValueAs: (v) => v.trim(),
            })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {/* Email */}
          <Input
            id="email"
            type="email"
            label="Email Address *"
            placeholder="Enter your email address"
            error={errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email address',
              },
              setValueAs: (v) => v.trim(),
            })}
          />

          {/*   Phone Number  */}
          <PhoneNumberInput name="phone" control={control} error={errors.phone} />
        </div>

        <div className="mt-8">
          {/* Sponsorhsip type */}
          <CheckboxField
            label="What type of sponsorship are you proposing? *"
            name="sponsorship_type"
            control={control}
            options={SponsorshipTypeOptions}
            error={errors.sponsorship_type}
          />
        </div>

        {/* {conditionalFields.includes('Financial support') && (
          <div className="mt-8">
            <Input
              id="amount"
              type="text"
              label="Financial support: What’s your expected sponsorship range? *"
              placeholder="e.g Ksh 20,000 - 40,000"
              error={errors.amount}
              {...register('amount', {
                required: 'This field is required',
                setValueAs: (v) => v.trim(),
              })}
            />
          </div>
        )} */}

        {/* {conditionalFields.includes('In-kind contribution') && (
          <div className="mt-8">
            <Input
              id="in_kind_support_type"
              type="text"
              label="In kind support: What support are you offering? ( e.g Venue , logistics , swag ) *"
              placeholder="Enter your in kind support type"
              error={errors.in_kind_support_type}
              {...register('in_kind_support_type', {
                required: 'This field is required',
                setValueAs: (v) => v.trim(),
              })}
            />
          </div>
        )} */}

        {/* <div className="mt-8">
          <Input
            id="sponsorship_goals_and_expectations"
            type="text"
            label="What are your sponsorship goals or expectations?(brand visibility, community engagement, CSR, etc.) *"
            placeholder="Enter your goals and expectations"
            error={errors.sponsorship_goals_and_expectations}
            {...register('sponsorship_goals_and_expectations', {
              required: 'This field is required',
              setValueAs: (v) => v.trim(),
            })}
          />
        </div> */}

        <div className="mt-8">
          <RadioGroup
            name="preferred_communication_method"
            control={control}
            error={errors.preferred_communication_method}
            label="Preferred communication channel"
            options={[
              { label: 'Email', value: 'Email' },
              { label: 'Phone', value: 'Phone' },
            ]}
          />
        </div>

        <div className="mt-8">
          <TextAreaField
            id="notes"
            label="Any additional notes or links you'd like to share?"
            placeholder="Enter any additional notes or links"
            error={errors.notes}
            {...register('notes', {
              setValueAs: (v) => v.trim(),
            })}
          />
        </div>

        {/* if there is an error */}
        {formError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{formError}</div>
        )}

        {/*  Submit */}
        <Button
          type="submit"
          variant="primary"
          className="flex mt-8 w-full justify-center  md:w-fit md:justify-self-center py-4"
          disabled={isLoading}
        >
          <span className="text-lg">{isLoading ? 'Submitting...' : 'Submit'}</span>
        </Button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </form>
    </div>
  );
}

export default Form;
