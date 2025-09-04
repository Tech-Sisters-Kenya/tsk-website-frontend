import React from 'react';
import SideBar from './SideBar';
import ProfileDetails from './ProfileDetails';

const UserProfile = () => {
  return (
    <main className="bg-tsk-light-2 flex items-start justify-start lg:gap-8 gap-4 px-8">
      <SideBar />
      <ProfileDetails />
    </main>
  );
};

export default UserProfile;
