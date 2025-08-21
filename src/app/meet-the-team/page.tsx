'use client';

import React from 'react';
import TeamMember from '@/app/meet-the-team/TeamMember';

const founderMembers = [
  {
    name: 'Imani Grace',
    role: 'Founder',
    imageUrl: './imanigrace.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
  {
    name: 'Imani Grace',
    role: 'Co-Founder',
    imageUrl: './imani.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
];

const teamMembers = [
  {
    name: 'Imani Grace',
    role: 'Developer',
    imageUrl: './imanigrace.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community.",
  },
  {
    name: 'Imani Grace',
    role: 'Designer',
    imageUrl: './imani.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community.",
  },
  {
    name: 'Imani Grace',
    role: 'UX/UI Designer',
    imageUrl: './imanigrace.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community.",
  },
  {
    name: 'Imani Grace',
    role: 'UX/UI Designer',
    imageUrl: './imanigrace.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community.",
  },
  {
    name: 'Imani Grace',
    role: 'Co-Founder',
    imageUrl: './imani.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community.",
  },
];

const MeetTheTeam = () => {
  return (
    <div className="min-h-screen bg-foreground py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24 px-4 mt-24 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-tsk-primary-dark font-heading mb-6">
            Meet The Team
          </h1>
          <p className="text-tsk-primary-dark font-medium font-body text-lg">
            The hearts and minds behind Tech Sisters.
          </p>
          <p className="text-tsk-primary-dark font-body font-medium text-lg leading-relaxed max-w-3xl mx-auto mt-16">
            We are a passionate group of women dedicated to creating a space where others feel seen,
            supported, and skilled in tech. From developers to designers, mentors to organizers — we
            show up, not just for ourselves, but for each other.
          </p>
        </div>

        {/* Founder/Co-Founder Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium font-body text-center text-tsk-primary-dark mb-8">
            Founder / Co-Founder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-2xl mx-auto">
            {founderMembers.map((member, index) => (
              <TeamMember
                key={`founder-${index}`}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
        {/*horizontal line */}
        <div className="border-t border-tsk-primary-dark w-full max-w-4xl mx-auto  mb-6"></div>
        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-medium text-center text-tsk-primary-dark font-body mb-8">
            Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={`team-${index}`}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
