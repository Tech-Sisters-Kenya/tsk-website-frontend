'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import SelectField from '../SelectField';
import Input from '../Input';
import TextAreaField from '../TextAreaField';
import PhoneNumberInput from '../PhoneNumberInput';
import CheckboxField from '../CheckboxField';
import { NatureOfPartnershipOptions, TechSistersHeardFromOptions } from '../info';
import RadioGroup from '../RadioGroup';
import { endpoints } from '@/api/constants';

interface IFormProps {
  organisation_name: string;
  contact_person_name: string;
  position: string;
  email: string;
  phone: string;
  nature_of_partnership_interest: string[];
  how_did_you_hear_about_us: string;
  preferred_timeline: string;
  pitch_deck: string;
  // additional_notes: string;
  preferred_communication_channel: string;
}

function Form() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setError,
  } = useForm<IFormProps>();

  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    setIsLoading(true);
    setFormError('');

    try {
      const trimmedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) =>
          typeof value === 'string' ? [key, value.trim()] : [key, value]
        )
      );

      console.log(
        'Sending registration request with payload:',
        JSON.stringify(trimmedData, null, 2)
      );

      const response = await fetch(endpoints.registerPartner, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(trimmedData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Server error response:', data);

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

      // Registration successful
      router.push('/get-involved/partner-with-us/success');
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
    <div className="mt-12">
      <p className="font-body text-tsk-primary-dark text-xl font-semibold text-center">
        To partner with us, please fill out the form below.
      </p>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
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
            label=" Position / Title *"
            placeholder="Enter your position"
            error={errors.position}
            {...register('position', {
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
          {/* Nature of Partnership Interest */}
          <CheckboxField
            label="Nature of Partnership Interest *"
            name="nature_of_partnership_interest"
            control={control}
            options={NatureOfPartnershipOptions}
            error={errors.nature_of_partnership_interest}
          />
        </div>

        <div className="mt-8">
          <TextAreaField
            id="pitch_deck"
            label="Please describe your idea or intention for this partnership (short paragraph) *"
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
          <SelectField
            id="how_did_you_hear_about_us"
            label="How Did You Hear About Tech Sisters Kenya?"
            placeholder="Select an option"
            options={TechSistersHeardFromOptions}
            error={errors.how_did_you_hear_about_us}
            control={control}
            name="how_did_you_hear_about_us"
          />
        </div>

        {/* <div className="mt-8">
          <Input
            id="additional_notes"
            type="text"
            label="Any additional notes or questions?"
            placeholder="Enter additional notes"
            error={errors.additional_notes}
            {...register('additional_notes', { setValueAs: (v) => v.trim() })}
          />
        </div> */}

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
      </form>
    </div>
  );
}

export default Form;
