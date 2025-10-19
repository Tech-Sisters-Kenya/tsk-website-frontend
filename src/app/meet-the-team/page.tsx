'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TeamMember from '@/app/meet-the-team/TeamMember';
import Button from '@/components/Button';

interface TeamMemberType {
  id: string;
  user: string | null;
  role: string;
  image_url: string;
  about?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

// Hardcoded Founder/Co-Founder
const founderMembers: TeamMemberType[] = [
  {
    id: 'founder-1',
    user: 'Imani Grace',
    role: 'Founder',
    image_url: '/imanigrace.svg',
    about:
      "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
  {
    id: 'cofounder-1',
    user: 'Imani Grace',
    role: 'Co-Founder',
    image_url: '/imani.svg',
    about:
      "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
];

const MeetTheTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [selectedFounder, setSelectedFounder] = useState<TeamMemberType | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch only team members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/team-members`);
        if (!res.ok) throw new Error('Failed to fetch team members');
        const data = await res.json();

        // filter out Founder/Co-Founder since those are hardcoded
        const filtered = data.data.filter(
          (m: TeamMemberType) => m.role !== 'Founder' && m.role !== 'Co-Founder'
        );

        setTeamMembers(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleFounderClick = (founder: TeamMemberType) => {
    setSelectedFounder(selectedFounder?.id === founder.id ? null : founder);
  };

  const closeBio = () => setSelectedFounder(null);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center" data-testid="loading-state">
        <p className="text-lg">Loading team...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-foreground py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10"
      data-testid="meet-the-team-page"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 px-4 mt-16 space-y-6" data-testid="header-section">
          <h1 className="text-4xl md:text-5xl font-bold text-tsk-primary-dark font-heading mb-6">
            Meet The Team
          </h1>
          <p className="text-tsk-primary-dark font-medium font-body text-lg">
            The hearts and minds behind Tech Sisters.
          </p>
          <p className="text-tsk-primary-dark font-body font-medium text-lg leading-relaxed max-w-3xl mx-auto mt-8">
            We are a passionate group of women dedicated to creating a space where others feel seen,
            supported, and skilled in tech...
          </p>
        </div>

        {/*Founder/Co-Founder Section */}
        <div className="mb-8" data-testid="founder-section">
          <h2 className="text-2xl font-medium font-body text-center text-tsk-primary-dark mb-8">
            Founder / Co-Founder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center max-w-2xl mx-auto">
            {founderMembers.map((member) => (
              <div key={member.id} className="w-full max-w-sm">
                <TeamMember
                  id={member.id}
                  user={member.user || 'Unknown'}
                  role={member.role}
                  image_url={member.image_url}
                  about={member.about || ''}
                  isFounder={true}
                  onClick={() => handleFounderClick(member)}
                  isSelected={selectedFounder?.id === member.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bio Popup */}
        {selectedFounder && (
          <div className="my-16 max-w-4xl mx-auto px-4" data-testid="founder-bio-popup">
            <div className="flex justify-end">
              <Button
                variant="secondary"
                onClick={closeBio}
                className="flex items-center gap-2"
                data-testid="close-bio-btn"
              >
                <Image
                  src="/close-icon.svg"
                  alt="Close"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>Close</span>
              </Button>
            </div>
            <div className="flex flex-col items-start text-start my-8">
              <h3 className="text-2xl font-heading font-bold text-tsk-primary-dark mb-1">
                {selectedFounder.user}
              </h3>
              <p className="text-tsk-primary-dark font-body underline">{selectedFounder.role}</p>
            </div>

            <div className="prose max-w-none text-tsk-primary-dark">
              <p className="whitespace-pre-line text-start">{selectedFounder.about}</p>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-tsk-primary-dark w-full mx-auto my-12"></div>

        {/*Team Section */}
        <div className="mt-12" data-testid="team-section">
          <h2 className="text-2xl font-medium text-center text-tsk-primary-dark font-body mb-8">
            Team
          </h2>
          <div className="flex flex-wrap justify-center gap-20">
            {teamMembers.map((member) => (
              <div key={member.id} className="w-full max-w-xs flex-shrink-0">
                <TeamMember
                  id={member.id}
                  user={member.user || 'Unknown'}
                  role={member.role}
                  image_url={member.image_url}
                  isFounder={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
