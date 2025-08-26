import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface TeamMemberProps {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio?: string;
  isFounder?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

const TeamMember = ({
  name,
  role,
  imageUrl,
  isFounder = false,
  onClick,
  isSelected = false,
}: TeamMemberProps) => {
  return (
    <div
      className={`transition-all duration-300 ${isFounder ? 'cursor-pointer' : ''}`}
      onClick={isFounder ? onClick : undefined}
    >
      <Card className={`border-tsk-primary-dark shadow-md ${isSelected ? 'bg-tsk-light-2' : ''}`}>
        <CardContent className="p-0">
          <div className="flex flex-col h-full">
            <div className="relative w-full h-64 overflow-hidden">
              <Image src={imageUrl} alt={name} fill className="object-cover rounded-t-2xl" />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-body font-medium text-tsk-primary-dark">{name}</h3>
              <p className="text-tsk-primary-dark font-body">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMember;
