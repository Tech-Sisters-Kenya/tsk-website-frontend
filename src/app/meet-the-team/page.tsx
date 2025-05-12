'use client';

import React from 'react';

//import { Card } from "@/components/ui/card";
import TeamMember from '@/components/TeamMember';
//import imaniGrace from "./assets/imani_Grace.svg";
//import EclipseSvg from "@/components/svgs/eclise_svg";

const teamMembers = [
  {
    name: 'Imani Grace',
    role: 'Founder',
    imageUrl: './imanigrace.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
    /*componentImage : <EclipseSvg /> */
  },
  {
    name: 'Imani Grace',
    role: 'Founder',
    imageUrl: './imani.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
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
  {
    name: 'Imani Grace',
    role: 'Founder',
    imageUrl: './imanigrace.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
  {
    name: 'Imani Grace',
    role: 'Founder',
    imageUrl: './imani.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
  {
    name: 'Imani Grace',
    role: 'Co-Founder',
    imageUrl: './imanigrace.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
  {
    name: 'Imani Grace',
    role: 'Founder',
    imageUrl: './imani.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
  {
    name: 'Imani Grace',
    role: 'Co-Founder',
    imageUrl: './imanigrace.svg',
    bio: "At the heart of TSK is a passionate software developer whose love for building extends far beyond just lines of code. She's a baker, a dreamer, and a firm believer in the power of community. Her journey into tech wasn't just about finding a career—it was about creating space for women like her to feel seen, supported, and celebrated.\n\nWith one hand on her keyboard and the other in a mixing bowl, she blends logic with creativity, tech with tenderness. Baking has always been her way of expressing love, and building TSK became her way of extending that love to the tech world—especially to women navigating it.\n\nThrough TSK, she's built more than a community—she's sparked a movement. One where women support women, share knowledge, lift each other up, and grow together in a space where everyone belongs.",
  },
];

const MeetTheTeam = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center w- mb-16">
          <h1 className="text-4xl h3 font-bold  mb-6">Meet The Team</h1>
          <p className="text-lg text-purple-900 max-w-3xl mx-auto">
            The hearts and minds behind Tech Sisters.{' '}
          </p>

          <p>
            We are a passionate group of women dedicated to creating a space where others feel seen,
            supported, and skilled in tech. From developers to designers, mentors to organizers — we
            show up, not just for ourselves, but for each other.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
              bio={member.bio}
              //componentImage={member.componentImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;
