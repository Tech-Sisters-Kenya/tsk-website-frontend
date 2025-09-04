import React, { useState } from 'react';
import { X, Phone, Mail, Plus, Trash2 } from 'lucide-react';
import Button from '@/components/Button';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [profileData, setProfileData] = useState({
    username: '',
    phoneNumber: '+254 701 230406',
    email: 'jane.mary@gmail.com',
    bio: '',
  });

  const [occupationData, setOccupationData] = useState({
    currentRole: '',
    company: '',
    yearsExperience: '',
  });

  const [skills, setSkills] = useState(['UI/UX Designer']);
  const [socials, setSocials] = useState([{ platform: '', url: '' }]);

  const tabs = ['Profile', 'Occupation', 'Skills', 'Socials', 'Bio'];

  if (!isOpen) return null;

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleAddSocial = () => {
    setSocials([...socials, { platform: '', url: '' }]);
  };

  const handleSocialChange = (index, field, value) => {
    const newSocials = [...socials];
    newSocials[index][field] = value;
    setSocials(newSocials);
  };

  const handleRemoveSocial = (index) => {
    const newSocials = socials.filter((_, i) => i !== index);
    setSocials(newSocials);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="space-y-6">
            <div className="gap-4">
              <div>
                <label className="block text-sm font-medium text-tsk-primary-dark mb-2">Name</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="User Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">
                Phone Number
              </label>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-tsk-primary-dark" />
                <input
                  type="text"
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">Email</label>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-tsk-primary-dark" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
            </div>

            <p className="text-sm font-body font-normal text-tsk-primary-dark">
              Profile changes will be reviewed and validated before they are saved
            </p>
          </div>
        );

      case 'Occupation':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">Name</label>
              <input
                type="text"
                value={occupationData.currentRole}
                onChange={(e) =>
                  setOccupationData({ ...occupationData, currentRole: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Current Role"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">
                Years of Experience
              </label>
              <input
                type="text"
                value={occupationData.company}
                onChange={(e) => setOccupationData({ ...occupationData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Company"
              />
            </div>

            <button className="text-tsk-primary-dark text-sm font-medium flex items-center space-x-1">
              <Plus className="w-4 h-4" />
              <span>Add Occupation</span>
            </button>
          </div>
        );

      case 'Skills':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">Skills</label>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter skill"
                    />
                    {skills.length > 1 && (
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddSkill}
                className="text-tsk-primary-dark text-sm font-medium flex items-center space-x-1 mt-3"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <p className="text-sm text-tsk-primary-dark">You have not set up any skill yet</p>
          </div>
        );

      case 'Socials':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">
                Social Media Links
              </label>
              <div className="space-y-3">
                {socials.map((social, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Platform (e.g., LinkedIn)"
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://..."
                      />
                      {socials.length > 1 && (
                        <button
                          onClick={() => handleRemoveSocial(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddSocial}
                className="text-tsk-primary-dark text-sm font-medium flex items-center space-x-1 mt-3"
              >
                <Plus className="w-4 h-4 font-semibold" />
                <span>Add Social</span>
              </button>
            </div>
          </div>
        );

      case 'Bio':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Write your bio here"
              />
              <p className="text-xs text-tsk-primary-dark mt-1">
                Anna is a software engineer passionate about building scalable, user-focused
                solutions that make technology accessible and impactful. With a strong
                problem-solving mindset and a forward-thinking approach, she develops clean,
                efficient applications that are a true reflection of user needs to life. Shes
                committed to continuous learning and creating inclusive tech spaces where everyone
                can thrive.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#45084a] bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6">
          <button
            onClick={onClose}
            className="float-right top-0 text-tsk-primary-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-center text-[18px] font-medium text-tsk-primary-dark font-body">
            Settings
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b-[0.5px] border-tsk-primary-dark px-6 font-body">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-sm font-medium transition-colors font-body ${
                activeTab === tab
                  ? 'bg-tsk-light-1 rounded-t-xl text-tsk-primary-dark font-semibold'
                  : 'text-tsk-primary-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">{renderTabContent()}</div>

        {/* Footer */}
        <div className="flex justify-center items-center space-x-3 p-6">
          <Button variant="primary" className="text-foreground">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;
