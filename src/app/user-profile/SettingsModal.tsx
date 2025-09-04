import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import Button from '@/components/Button';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  // Profile section states
  const [profileData, setProfileData] = useState({
    username: '',
    phoneNumber: '+254 701 230406',
    email: 'jane.mary@gmail.com',
    bio: '',
  });
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(profileData.username);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [tempPhoneNumber, setTempPhoneNumber] = useState(profileData.phoneNumber);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(profileData.email);

  // Occupation section states
  const [occupationData, setOccupationData] = useState({
    currentRole: '',
    yearsExperience: '',
  });
  const [isEditingCurrentRole, setIsEditingCurrentRole] = useState(false);
  const [tempCurrentRole, setTempCurrentRole] = useState(occupationData.currentRole);
  const [isEditingYearsExperience, setIsEditingYearsExperience] = useState(false);
  const [tempYearsExperience, setTempYearsExperience] = useState(occupationData.yearsExperience);

  // Skills section states
  const [skills, setSkills] = useState(['UI/UX Designer']);
  const [isEditingSkills, setIsEditingSkills] = useState(skills.map(() => false));
  const [tempSkills, setTempSkills] = useState(skills);

  // Socials section states
  const [socials, setSocials] = useState([{ platform: '', url: '' }]);
  const [isEditingSocials, setIsEditingSocials] = useState(
    socials.map(() => ({ platform: false, url: false }))
  );
  const [tempSocials, setTempSocials] = useState(socials);

  // Bio section states
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(profileData.bio);

  const tabs = ['Profile', 'Occupation(s)', 'Skills', 'Socials', 'Bio'];

  if (!isOpen) return null;

  // Profile section handlers
  const handleUsernameClick = () => {
    setIsEditingUsername(true);
    setTempUsername(profileData.username);
  };

  const handleUsernameChange = (e) => {
    setTempUsername(e.target.value);
  };

  const handlePhoneNumberClick = () => {
    setIsEditingPhoneNumber(true);
    setTempPhoneNumber(profileData.phoneNumber);
  };

  const handlePhoneNumberChange = (e) => {
    setTempPhoneNumber(e.target.value);
  };

  const handleEmailClick = () => {
    setIsEditingEmail(true);
    setTempEmail(profileData.email);
  };

  const handleEmailChange = (e) => {
    setTempEmail(e.target.value);
  };

  // Occupation section handlers
  const handleCurrentRoleClick = () => {
    setIsEditingCurrentRole(true);
    setTempCurrentRole(occupationData.currentRole);
  };

  const handleCurrentRoleChange = (e) => {
    setTempCurrentRole(e.target.value);
  };

  const handleYearsExperienceClick = () => {
    setIsEditingYearsExperience(true);
    setTempYearsExperience(occupationData.yearsExperience);
  };

  const handleYearsExperienceChange = (e) => {
    setTempYearsExperience(e.target.value);
  };

  // Skills section handlers
  const handleAddSkill = () => {
    setSkills([...skills, '']);
    setTempSkills([...tempSkills, '']);
    setIsEditingSkills([...isEditingSkills, false]);
  };

  const handleSkillClick = (index) => {
    const newIsEditingSkills = [...isEditingSkills];
    newIsEditingSkills[index] = true;
    setIsEditingSkills(newIsEditingSkills);
    const newTempSkills = [...tempSkills];
    newTempSkills[index] = skills[index];
    setTempSkills(newTempSkills);
  };

  const handleSkillChange = (index, value) => {
    const newTempSkills = [...tempSkills];
    newTempSkills[index] = value;
    setTempSkills(newTempSkills);
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
    setTempSkills(tempSkills.filter((_, i) => i !== index));
    setIsEditingSkills(isEditingSkills.filter((_, i) => i !== index));
  };

  // Socials section handlers
  const handleAddSocial = () => {
    setSocials([...socials, { platform: '', url: '' }]);
    setTempSocials([...tempSocials, { platform: '', url: '' }]);
    setIsEditingSocials([...isEditingSocials, { platform: false, url: false }]);
  };

  const handleSocialPlatformClick = (index) => {
    const newIsEditingSocials = [...isEditingSocials];
    newIsEditingSocials[index] = { ...newIsEditingSocials[index], platform: true };
    setIsEditingSocials(newIsEditingSocials);
    const newTempSocials = [...tempSocials];
    newTempSocials[index] = { ...newTempSocials[index], platform: socials[index].platform };
    setTempSocials(newTempSocials);
  };

  const handleSocialUrlClick = (index) => {
    const newIsEditingSocials = [...isEditingSocials];
    newIsEditingSocials[index] = { ...newIsEditingSocials[index], url: true };
    setIsEditingSocials(newIsEditingSocials);
    const newTempSocials = [...tempSocials];
    newTempSocials[index] = { ...newTempSocials[index], url: socials[index].url };
    setTempSocials(newTempSocials);
  };

  const handleSocialChange = (index, field, value) => {
    const newTempSocials = [...tempSocials];
    newTempSocials[index] = { ...newTempSocials[index], [field]: value };
    setTempSocials(newTempSocials);
  };

  const handleRemoveSocial = (index) => {
    setSocials(socials.filter((_, i) => i !== index));
    setTempSocials(tempSocials.filter((_, i) => i !== index));
    setIsEditingSocials(isEditingSocials.filter((_, i) => i !== index));
  };

  // Bio section handlers
  const handleBioClick = () => {
    setIsEditingBio(true);
    setTempBio(profileData.bio);
  };

  const handleBioChange = (e) => {
    setTempBio(e.target.value);
  };

  // Save changes for all sections
  const handleSaveChanges = () => {
    // Update Profile section
    setProfileData({
      ...profileData,
      username: tempUsername,
      phoneNumber: tempPhoneNumber,
      email: tempEmail,
      bio: tempBio,
    });
    setIsEditingUsername(false);
    setIsEditingPhoneNumber(false);
    setIsEditingEmail(false);
    setIsEditingBio(false);

    // Update Occupation section
    setOccupationData({
      ...occupationData,
      currentRole: tempCurrentRole,
      yearsExperience: tempYearsExperience,
    });
    setIsEditingCurrentRole(false);
    setIsEditingYearsExperience(false);

    // Update Skills section
    setSkills([...tempSkills]);
    setIsEditingSkills(isEditingSkills.map(() => false));

    // Update Socials section
    setSocials([...tempSocials]);
    setIsEditingSocials(isEditingSocials.map(() => ({ platform: false, url: false })));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="space-y-6">
            <div className="gap-4">
              <div className="flex justify-between gap-4 items-center">
                <label className="text-sm font-medium text-tsk-primary-dark mb-2">Name</label>
                {isEditingUsername ? (
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={handleUsernameChange}
                    className="w-1/2 px-3 py-2 border border-tsk-primary rounded-md focus:outline-none"
                    placeholder="User Name"
                    autoFocus
                  />
                ) : (
                  <p onClick={handleUsernameClick} className="cursor-pointer text-tsk-primary-dark">
                    {profileData.username || 'Enter your name'}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex justify-between gap-4 items-center">
              <label className="text-sm font-medium text-tsk-primary-dark mb-2">Phone Number</label>

              {isEditingPhoneNumber ? (
                <input
                  type="text"
                  value={tempPhoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="w-1/2 px-3 py-2 border border-tsk-primary rounded-md focus:outline-none"
                  placeholder="Phone Number"
                  autoFocus
                />
              ) : (
                <p
                  onClick={handlePhoneNumberClick}
                  className="cursor-pointer text-tsk-primary-dark"
                >
                  {profileData.phoneNumber || 'Phone Number'}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-4 items-center">
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">Email</label>

              {isEditingEmail ? (
                <input
                  type="email"
                  value={tempEmail}
                  onChange={handleEmailChange}
                  className="w-1/2 px-3 py-2 border border-tsk-primary rounded-md focus:outline-none"
                  placeholder="Email"
                  autoFocus
                />
              ) : (
                <p onClick={handleEmailClick} className="cursor-pointer text-tsk-primary-dark">
                  {profileData.email || 'Email'}
                </p>
              )}
            </div>

            <p className="text-sm font-body font-normal text-tsk-primary-dark">
              Profile changes will be reviewed and validated before they are saved
            </p>
          </div>
        );

      case 'Occupation(s)':
        return (
          <div className="pr-10">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-tsk-primary-dark mb-2">Name</label>
                {isEditingCurrentRole ? (
                  <input
                    type="text"
                    value={tempCurrentRole}
                    onChange={handleCurrentRoleChange}
                    className="w-full px-3 py-2 border border-tsk-primary rounded-md focus:outline-none"
                    placeholder="Current Role"
                    autoFocus
                  />
                ) : (
                  <p
                    onClick={handleCurrentRoleClick}
                    className="cursor-pointer text-tsk-primary-dark"
                  >
                    {occupationData.currentRole || 'Current Role'}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center">
                <label className="text-sm font-medium text-tsk-primary-dark mb-2">Years</label>
                {isEditingYearsExperience ? (
                  <input
                    type="text"
                    value={tempYearsExperience}
                    onChange={handleYearsExperienceChange}
                    className="w-1/2 px-3 py-2 border border-tsk-primary rounded-md focus:outline-none"
                    placeholder="YOE"
                    autoFocus
                  />
                ) : (
                  <p
                    onClick={handleYearsExperienceClick}
                    className="cursor-pointer text-tsk-primary-dark"
                  >
                    {occupationData.yearsExperience || 'Years of Experience'}
                  </p>
                )}
              </div>
            </div>
            <button className="text-tsk-primary-dark text-sm font-medium flex items-center space-x-1 mt-2 float-right bg-tsk-light-1 px-2 py-1 rounded-xl">
              <Plus className="w-4 h-4" />
              <span>Add Occupation</span>
            </button>
          </div>
        );

      case 'Skills':
        return (
          <div className="space-y-6">
            <div className="">
              <label className="block text-sm font-medium text-tsk-primary-dark mb-2">Skills</label>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {isEditingSkills[index] ? (
                      <input
                        type="text"
                        value={tempSkills[index]}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-tsk-primary rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter skill"
                        autoFocus
                      />
                    ) : (
                      <p
                        onClick={() => handleSkillClick(index)}
                        className="flex-1 cursor-pointer text-tsk-primary-dark"
                      >
                        {skill || 'Enter skill'}
                      </p>
                    )}
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
                className="text-tsk-primary-dark text-sm font-medium flex items-center space-x-1 mt-3 float-right bg-tsk-light-1 px-2 py-1 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <p className="hidden text-sm text-tsk-primary-dark">
              You have not set up any skill yet
            </p>
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
                    <div>
                      {isEditingSocials[index]?.platform ? (
                        <input
                          type="text"
                          value={tempSocials[index].platform}
                          onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                          className="w-full px-3 py-2 border border-tsk-primary rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Platform (e.g., LinkedIn)"
                          autoFocus
                        />
                      ) : (
                        <p
                          onClick={() => handleSocialPlatformClick(index)}
                          className="cursor-pointer text-tsk-primary-dark"
                        >
                          {social.platform || 'Platform (e.g., LinkedIn)'}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {isEditingSocials[index]?.url ? (
                        <input
                          type="url"
                          value={tempSocials[index].url}
                          onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                          className="flex-1 px-3 py-2 border border-tsk-primary rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="https://..."
                          autoFocus
                        />
                      ) : (
                        <p
                          onClick={() => handleSocialUrlClick(index)}
                          className="flex-1 cursor-pointer text-tsk-primary-dark"
                        >
                          {social.url || 'https://...'}
                        </p>
                      )}
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
                className="text-tsk-primary-dark text-sm font-medium flex items-center space-x-1 mt-3 float-right bg-tsk-light-1 px-2 py-1 rounded-xl"
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
              {isEditingBio ? (
                <textarea
                  value={tempBio}
                  onChange={handleBioChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-tsk-primary rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Write your bio here"
                  autoFocus
                />
              ) : (
                <p onClick={handleBioClick} className="cursor-pointer text-tsk-primary-dark">
                  {profileData.bio || 'Write your bio here'}
                </p>
              )}
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
          <Button variant="primary" className="text-foreground" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
