import React from 'react';
import { useState } from 'react';
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
      className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'shadow-lg' : 'shadow-md hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <CardContent className="p-0">
        {isExpanded ? (
          <div className="p-8 flex flex-col h-full justify-between">
            <div className="text-center mb-4">
              <h3 className="text-xl font-medium text-purple-900 mb-1">{name}</h3>
              <p className="text-gray-600 font-medium">{role}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{bio}</p>
            </div>
            <div className="text-center">
              <Button
                variant="ghost"
                className="text-purple-700 hover:text-purple-900 hover:bg-purple-50 font-medium"
                onClick={() => setIsExpanded(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {imageUrl.includes('unsplash') ? (
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ) : (
              <div className="bg-pink-100 p-6 flex justify-center items-center">
                <Image
                  src={imageUrl}
                  alt={name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
              </div>
            )}
            <div className="p-6 text-center">
              <h3 className="text-3xl font-medium text-purple-900 mb-1">{name}</h3>
              <p className="text-gray-600 text-lg font-medium">{role}</p>
              <p className="text-sm text-gray-500 mt-2">More...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMember;
