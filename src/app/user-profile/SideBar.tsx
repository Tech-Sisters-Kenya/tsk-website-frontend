'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Profile from '@/../public/imanigrace.svg';
import { LogOut, Settings, StretchHorizontal } from 'lucide-react';
import SettingsModal from './SettingsModal';

const SideBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <>
      <div className="bg-foreground rounded-2xl px-4 h-screen mt-36 mb-10">
        <div className="h-full flex flex-col justify-between">
          {/* User Profile details */}
          <div className="h-full">
            <div className="flex sm:justify-around justify-center items-center flex-wrap gap-4 pt-8">
              <div className="w-[60px] h-[60px] rounded-full">
                <Image
                  src={Profile}
                  alt="user profile picture"
                  className="bg-cover rounded-full"
                  width={57}
                  height={57}
                />
              </div>
              <div className="text-tsk-primary-dark font-body flex flex-col justify-center sm:items-start items-center">
                <h1 className="sm:text-[20px] text-[16px] font-medium">User Name</h1>
                <p className="sm:text-[14px] text-[12px] font-medium opacity-60">
                  Tech Sisters Member
                </p>
                <p className="sm:text-[12px] text-[10px] font-semibold">Mentee</p>
              </div>
            </div>

            <hr className="border-1 border-[#D4BED8] my-2" />

            <div className="flex items-center gap-4 bg-tsk-light-2 p-2 rounded-xl mt-6">
              <StretchHorizontal className="text-tsk-primary-dark w-4 h-4 rounded-none" />
              <h1 className="font-semibold sm:text-[15px] text-[12px] text-tsk-primary-dark font-body">
                Dashboard
              </h1>
            </div>
          </div>
          {/* Dashboard settings and logout button */}
          <div className="font-body text-tsk-primary-dark px-2">
            <div className="flex md:gap-6 gap-3 items-center">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex md:gap-6 gap-3 items-center w-full"
              >
                <Settings className="w-4 h-4" />
                <p className="font-semibold md:text-[16px] text-[14px]">Settings</p>
              </button>
            </div>
            <hr className="border-1 border-[#D4BED8] my-2" />
            <div className="flex md:gap-6 gap-3 items-center my-4">
              <LogOut className="w-4 h-4" />
              <button className="font-semibold md:text-[16px] text-[14px]">Log Out</button>
            </div>
          </div>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default SideBar;
