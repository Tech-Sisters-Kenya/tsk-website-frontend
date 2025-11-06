'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/Button';
import SelectField from '../SelectField';
import Input from '../Input';
import TextAreaField from '../TextAreaField';
import PhoneNumberInput from '../PhoneNumberInput';
import CheckboxField from '../CheckboxField';
import { NatureOfPartnershipOptions, TechSistersHeardFromOptions } from '../info';
import RadioGroup from '../RadioGroup';
import { endpoints } from '@/api/constants';
import { IFormProps } from './IFormProps';
import Modal from '../Modal';

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setError,
  } = useForm<IFormProps>({
    defaultValues: {
      organisation_name: '',
      contact_person_name: '',
      position: '',
      email: '',
      phone: '',
      nature_of_partnership_interest: '',
      how_did_you_hear_about_us: '',
      preferred_timeline: '',
      pitch_deck: '',
      additional_notes: '',
      preferred_communication_channel: '',
    },
  });

  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    setIsLoading(true);
    setFormError('');

    try {
      const trimmedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) =>
          typeof value === 'string' ? [key, value.trim()] : [key, value]
        )
      );

      const response = await fetch(endpoints.registerPartner, {
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
          {/* Contact Person */}
          <Input
            id="contact_person_name"
            type="text"
            label=" Contact Person *"
            placeholder="Enter your contact person"
            error={errors.contact_person_name}
            {...register('contact_person_name', {
              required: 'Contact Person is required',
              setValueAs: (v) => v.trim(),
            })}
          />

          {/* Position / Title */}
          <Input
            id="position"
            type="text"
            label=" Position / Title"
            placeholder="Enter your position"
            error={errors.position}
            {...register('position', {
              setValueAs: (v) => v.trim(),
            })}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-8">
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

        {/* Nature of Partnership Interest */}
        <div className="mt-8">
          <CheckboxField
            label="Nature of Partnership Interest *"
            name="nature_of_partnership_interest"
            control={control}
            options={NatureOfPartnershipOptions}
            error={errors.nature_of_partnership_interest}
          />
        </div>

        <div className="mt-8">
          <SelectField
            id="how_did_you_hear_about_us"
            label="In what Ways have you heard about Tech Sisters Kenya (Select all that apply)"
            placeholder="Select an option"
            options={TechSistersHeardFromOptions}
            error={errors.how_did_you_hear_about_us}
            control={control}
            name="how_did_you_hear_about_us"
          />
        </div>

        <div className="mt-8">
          <TextAreaField
            id="pitch_deck"
            label="Please describe your idea or intention for this partnership (short paragraph) *"
            placeholder="Describe your idea or intention for this partnership"
            {...register('pitch_deck', {
              required: 'Describe your idea or intention for this partnership',
              setValueAs: (v) => v.trim(),
            })}
            error={errors.pitch_deck}
          />
        </div>

        <div className="mt-8">
          <Input
            id="preferred_timeline"
            type="text"
            label="Preferred timeline or period (e.g. Q3 2025, October event, etc.) *"
            placeholder="Enter your preferred timeline or period"
            error={errors.preferred_timeline}
            {...register('preferred_timeline', {
              required: 'Timeline or period is required',
              setValueAs: (v) => v.trim(),
            })}
          />
        </div>

        <div className="mt-8">
          <RadioGroup
            name="preferred_communication_channel"
            control={control}
            error={errors.preferred_communication_channel}
            label="Preferred communication channel"
            options={[
              { label: 'Email', value: 'Email' },
              { label: 'Phone', value: 'Phone' },
            ]}
          />
        </div>

        <div className="mt-8">
          <TextAreaField
            id="additional_notes"
            label="Any additional notes or questions?"
            placeholder="Enter additional notes"
            error={errors.additional_notes}
            {...register('additional_notes', { setValueAs: (v) => v.trim() })}
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
