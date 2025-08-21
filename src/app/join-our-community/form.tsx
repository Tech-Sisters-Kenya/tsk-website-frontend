import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { endpoints } from '@/api/constants';

import Button from '@/components/Button';
import Email from '@/assets/email-icon.svg';

import KenyaFlag from '@/assets/kenya-flag-icon.svg';
import Padlock from '@/assets/padlock-icon.svg';
import EyeOpen from '@/assets/eye-open-icon.svg';
import EyeClosed from '@/assets/eye-closed-icon.svg';

// Types for the CustomSelect component
interface OptionType {
  value: string;
  label: string;
}

type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | { target: { name: string; value: string } };

interface CustomSelectProps {
  options: OptionType[];
  value: string;
  onChange: (e: InputChangeEvent) => void;
  placeholder: string;
  error?: { message?: string };
  name: string;
  className?: string;
}

// Custom Dropdown Component
const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  error,
  name,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const customEvent = {
      target: {
        name,
        value: optionValue,
      },
    };
    onChange(customEvent);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        className={`w-full py-4 px-3 border ${
          error ? 'border-red-500' : 'border-[#45084A]/50'
        } rounded-xl flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent text-left`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? 'text-[#45084A]/50' : 'text-[#45084A]'}>{getDisplayValue()}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#45084A] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#45084A]/50 rounded-xl shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={handleSelect(option.value)}
              className="w-full px-3 py-4 text-left hover:bg-gray-50 text-[#45084A] border-b border-[#45084A]/10 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Form data type
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  occupation: string;
  customOccupation: string;
  experienceLevel: string;
  role: string;
  expertiseAreas: string;
  linkedInUrl: string;
  githubUrl: string;
  about: string;
  password: string;
  confirmPassword: string;
  isInterestedInMentoring: boolean;
}

interface FormProps {
  setActiveTab: (tab: 'guidelines' | 'personal-details') => void;
}

// Main Form Component
const Form: React.FC<FormProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Female',
    occupation: '',
    customOccupation: '',
    experienceLevel: '2 years and above',
    role: 'Mentor',
    expertiseAreas: '',
    linkedInUrl: '',
    githubUrl: '',
    about: '',
    password: '',
    confirmPassword: '',
    isInterestedInMentoring: true,
  });

  const [errors, setErrors] = useState<Record<string, { message: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Add validation for all fields
  const validateForm = (data: FormData) => {
    console.log('Validating form data:', data);
    const errors: Partial<Record<keyof FormData, { message: string }>> = {};

    // Password validation
    if (!data.password) {
      errors.password = { message: 'Password is required' };
    } else if (data.password.length < 8) {
      errors.password = { message: 'Password must be at least 8 characters long' };
    } else if (!/[0-9]/.test(data.password)) {
      errors.password = { message: 'Password must contain at least one number' };
    } else if (!/[a-zA-Z]/.test(data.password)) {
      errors.password = { message: 'Password must contain at least one letter' };
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = { message: 'Passwords do not match' };
    }

    // Check all required fields
    const requiredFields: (keyof Omit<FormData, 'customOccupation' | 'githubUrl'>)[] = [
      'firstName',
      'lastName',
      'email',
      'gender',
      'occupation',
      'experienceLevel',
      'role',
      'expertiseAreas',
      'linkedInUrl',
      'about',
      'password',
      'confirmPassword',
    ];

    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = { message: 'This field is required' };
      }
    });

    if (!data.firstName.trim()) {
      errors.firstName = { message: 'First name is required' };
    }

    if (!data.lastName.trim()) {
      errors.lastName = { message: 'Last name is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      errors.email = { message: 'Email is required' };
    } else if (!emailRegex.test(data.email)) {
      errors.email = { message: 'Please enter a valid email address' };
    }

    if (!data.occupation) {
      errors.occupation = { message: 'Occupation is required' };
    }

    if (data.occupation === 'other' && !data.customOccupation.trim()) {
      errors.customOccupation = { message: 'Please specify your occupation' };
    }

    if (!data.expertiseAreas.trim()) {
      errors.expertiseAreas = { message: 'Please specify areas of expertise' };
    }

    if (!data.password) {
      errors.password = { message: 'Password is required' };
    } else if (data.password.length < 8) {
      errors.password = { message: 'Password must be at least 8 characters long' };
    } else if (!/[0-9]/.test(data.password)) {
      errors.password = { message: 'Password must contain at least one number' };
    } else if (!/[a-zA-Z]/.test(data.password)) {
      errors.password = { message: 'Password must contain at least one letter' };
    }

    if (data.linkedInUrl && !data.linkedInUrl.startsWith('http')) {
      errors.linkedInUrl = { message: 'Please enter a valid LinkedIn URL' };
    }

    if (data.githubUrl && !data.githubUrl.startsWith('http')) {
      errors.githubUrl = { message: 'Please enter a valid GitHub URL' };
    }

    return errors;
  };

  // Handle input changes
  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing in a field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit called');
    e?.preventDefault?.();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    console.log('Validation errors:', validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('No validation errors, proceeding with submission');
      setIsSubmitting(true);

      try {
        const payload = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || null,
          gender: formData.gender,
          occupation_category_id:
            formData.occupation === 'other' ? formData.customOccupation : formData.occupation,
          years_of_experience_in_tech:
            formData.experienceLevel === 'less than 1 year'
              ? 0
              : formData.experienceLevel === '1 year'
                ? 1
                : 2, // Default to 2+ years for other options
          is_interested_in_being_a_mentor: formData.role === 'Mentor' || formData.role === 'Both',
          linked_in_url: formData.linkedInUrl,
          github_account_url: formData.githubUrl || null,
          about: formData.about || null,
          status: 'pending',
          technical_event_preferences: formData.expertiseAreas,
          social_event_preferences: null,
          mental_health_event_preferences: null,
          available_for_virtual_mornings: true, // Default values as per form design
          available_for_virtual_evenings: true,
          available_for_physical_saturdays: true,
          available_for_physical_sundays: true,
          is_person_with_disability: false, // Default as not specified in form
          disability_description: null,
          past_tech_communities: null,
          additional_comments: null,
          password: formData.password,
          areas_of_expertise_to_develop: formData.expertiseAreas
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        };

        const response = await fetch(endpoints.registerTechSister, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Server error response:', data);
          throw new Error(data.message || `Failed to submit form. Status: ${response.status}`);
        }

        // Redirect to join-slack page after successful submission
        console.log('Form submitted successfully, redirecting to /join-slack');
        window.location.href = '/join-slack';
        return true;
      } catch (error: unknown) {
        console.error('Error submitting form:', error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An error occurred while submitting the form. Please try again.';
        setErrors((prev) => ({
          ...prev,
          form: { message: errorMessage },
        }));
      } finally {
        setIsSubmitting(false);
      }
      return false;
    }
  };

  // Option arrays
  const occupationOptions: OptionType[] = [
    { value: '', label: 'Choose your occupation' },
    { value: 'Back End Software Engineer', label: 'Back End Software Engineer' },
    { value: 'Front End Software Engineer', label: 'Front End Software Engineer' },
    { value: 'Full Stack Software Engineer', label: 'Full Stack Software Engineer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Data Analyst', label: 'Data Analyst' },
    { value: 'Cyber Security Engineer', label: 'Cyber Security Engineer' },
    { value: 'Mobile App Developer', label: 'Mobile App Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Quality Assurance Engineer', label: 'Quality Assurance Engineer' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'other', label: 'Not listed' },
  ];

  const experienceOptions: OptionType[] = [
    { value: 'less than 1 year', label: 'Less than 1 year' },
    { value: '1 year', label: '1 year' },
    { value: '2 years and above', label: '2 years and more' },
    { value: 'Student', label: 'Student' },
    { value: 'Aspiring to join tech', label: 'Aspiring to join tech' },
  ];

  const roleOptions: OptionType[] = [
    { value: 'Mentor', label: 'Mentor' },
    { value: 'Mentee', label: 'Mentee' },
    { value: 'Both', label: 'Both' },
  ];

  const onSubmit = async (e: React.FormEvent) => {
    console.log('Form submission started');
    e.preventDefault();
    console.log('Form preventDefault called');
    try {
      const result = await handleSubmit(e);
      console.log('Form submission result:', result);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <form onSubmit={onSubmit} className="space-y-6">
        <h2 className="text-4xl font-bold text-[#45084A]">Tech Sisters Kenya Registration Form</h2>
        <h2 className="text-2xl font-bold text-[#45084A] mb-6">Personal Details</h2>

        {errors.form && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600">{errors.form.message}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[#45084A] font-semibold text-md">First Name*</label>
            <div className="mt-1">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter your first name"
                className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                  errors.firstName ? 'border-red-500' : 'border-[#45084A]/50'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[#45084A] font-semibold text-md">Last Name*</label>
            <div className="mt-1">
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter your last name"
                className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                  errors.lastName ? 'border-red-500' : 'border-[#45084A]/50'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md">Email Address*</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image src={Email} alt="Email icon" width={20} height={20} className="mr-2" />
            </div>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="Enter your email"
              className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                errors.email ? 'border-red-500' : 'border-[#45084A]/50'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="w-full gap-4 mb-4">
          <div>
            <label className="block text-[#45084A] font-semibold text-md">Create a Password*</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Padlock} alt="Padlock icon" width={20} height={20} className="mr-2" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
                placeholder="Enter your password"
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${errors.password ? 'border-red-300' : 'border-[#45084A]/50'} rounded-xl focus:outline-none focus:ring-tsk-primary focus:border-tsk-primary`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <Image src={EyeClosed} alt="Eye closed icon" width={20} height={20} />
                  ) : (
                    <Image src={EyeOpen} alt="Eye open icon" width={20} height={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[#45084A] font-semibold text-md">Confirm Password*</label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image src={Padlock} alt="Padlock icon" width={20} height={20} className="mr-2" />
              </div>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
                placeholder="Confirm your password"
                className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#45084A]/50'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <Image src={EyeClosed} alt="Hide password" width={20} height={20} />
                  ) : (
                    <Image src={EyeOpen} alt="Show password" width={20} height={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md">
            Phone Number (provide +254xxxxxxx) No spaces*
          </label>
          <div className="mt-1 flex">
            <div className="flex items-center px-4 py-4 border border-r-0 rounded-l-xl bg-purple-50 border-[#45084A]/50">
              <span className="font-semibold text-[#45084A] flex flex-row items-center">
                <Image
                  src={KenyaFlag}
                  alt="Kenyan flag icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                +254
              </span>
            </div>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              type="tel"
              placeholder="700000000"
              className={`flex-1 px-3 py-4 border border-l-0 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent placeholder:text-[#45084A]/50 ${
                errors.phone ? 'border-red-500' : 'border-[#45084A]/50'
              }`}
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            Gender (This community is exclusively for Women in Tech or aspiring to join Tech)
          </label>
          <div className="w-full py-4 px-3 border bg-purple-50 rounded-xl border-[#45084A]/50 text-[#45084A]">
            Female
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            LinkedIn Profile URL*
          </label>
          <input
            name="linkedInUrl"
            value={formData.linkedInUrl}
            onChange={handleInputChange}
            type="url"
            placeholder="https://linkedin.com/in/yourusername"
            className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
              errors.linkedInUrl ? 'border-red-500' : 'border-[#45084A]/50'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
          />
          {errors.linkedInUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.linkedInUrl.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            GitHub Profile URL (Optional)
          </label>
          <input
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleInputChange}
            type="url"
            placeholder="https://github.com/yourusername"
            className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
              errors.githubUrl ? 'border-red-500' : 'border-[#45084A]/50'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
          />
          {errors.githubUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.githubUrl.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            Tell us about yourself and your tech journey*
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Share a bit about your background, experience, and what you hope to achieve in the tech community..."
            rows={4}
            className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
              errors.about ? 'border-red-500' : 'border-[#45084A]/50'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
          />
          {errors.about && <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            What is your Occupation/Role in Tech? If yours is not among the options provided type in
            your answer in the next question*
          </label>
          <CustomSelect
            options={occupationOptions}
            value={formData.occupation}
            onChange={handleInputChange}
            placeholder="Choose your occupation"
            error={errors.occupation}
            name="occupation"
          />
          {errors.occupation && (
            <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            My role is not listed above (Please write your role)
          </label>
          <input
            name="customOccupation"
            value={formData.customOccupation}
            onChange={handleInputChange}
            type="text"
            placeholder="Type your role"
            className={`w-full py-4 px-3 border rounded-xl placeholder:text-[#45084A]/50 text-tsk-primary-dark focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent ${
              errors.customOccupation ? 'border-red-500' : 'border-[#45084A]/50'
            }`}
          />
          {errors.customOccupation && (
            <p className="mt-1 text-sm text-red-600">{errors.customOccupation.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            Years of Experience in Tech (Please select one)*
          </label>
          <CustomSelect
            options={experienceOptions}
            value={formData.experienceLevel}
            onChange={handleInputChange}
            placeholder="Select experience level"
            error={errors.experienceLevel}
            name="experienceLevel"
          />
          {errors.experienceLevel && (
            <p className="mt-1 text-sm text-red-600">{errors.experienceLevel.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            Are you interested in being a mentor, mentee, or both?*
          </label>
          <CustomSelect
            options={roleOptions}
            value={formData.role}
            onChange={handleInputChange}
            placeholder="Select role preference"
            error={errors.role}
            name="role"
          />
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            What specific areas of your technical expertise would you like to develop further?*
          </label>
          <input
            name="expertiseAreas"
            value={formData.expertiseAreas}
            onChange={handleInputChange}
            placeholder="Type your answer"
            className={`w-full py-4 px-3 border rounded-xl placeholder:text-[#45084A]/50 text-tsk-primary-dark focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent ${
              errors.expertiseAreas ? 'border-red-500' : 'border-[#45084A]/50'
            }`}
          />
          {errors.expertiseAreas && (
            <p className="mt-1 text-sm text-red-600">{errors.expertiseAreas.message}</p>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setActiveTab('guidelines')}
            className="px-8 py-3"
          >
            Back
          </Button>
          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                console.log('Submit button clicked');
                e.preventDefault();
                onSubmit(e);
              }}
              disabled={isSubmitting}
              className="px-8 py-3"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
