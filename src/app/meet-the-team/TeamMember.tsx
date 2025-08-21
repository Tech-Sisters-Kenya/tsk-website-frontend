import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

const TeamMember = ({ name, role, imageUrl, bio }: TeamMemberProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 border-tsk-primary-dark ${
        isExpanded ? 'shadow-lg' : 'shadow-md hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <CardContent className="p-0">
        {isExpanded ? (
          <div className="p-8 flex flex-col h-full justify-between">
            <div className="text-center mb-4">
              <h3 className="text-xl font-body font-medium text-tsk-primary-dark mb-1">{name}</h3>
              <p className="text-tsk-primary-dark font-medium font-body">{role}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-tsk-primary-dark mb-4 font-body font-medium leading-relaxed">
                {bio}
              </p>
            </div>
            <div className="text-center">
              <Button
                variant="ghost"
                className="text-tsk-primary-dark hover:text-tsk-light-1 hover:bg-tsk-light-2 font-medium"
                onClick={() => setIsExpanded(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-full h-64  overflow-hidden rounded-none m-0">
              <Image src={imageUrl} alt={name} fill className="object-contain rounded-none" />
            </div>

            <div className="p-6 text-center">
              <h3 className="text-3xl font-medium font-heading text-tsk-primary-dark mb-1">
                {name}
              </h3>
              <p className="text-tsk-primary-dark font-body text-lg font-medium">{role}</p>
              <p className="text-sm text-gray-500 mt-2">More...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMember;
