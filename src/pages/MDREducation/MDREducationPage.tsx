import React from 'react';
import HeroSection from '../../components/MDREducation/HeroSection';
import PracticalExamplesSection from '../../components/MDREducation/PracticalExamplesSection';
import CommunitySection from '../../components/MDREducation/CommunitySection';
import AIToolsSection from '../../components/MDREducation/AIToolsSection';
import BlogSection from '../../components/MDREducation/BlogSection';
import TeamSection from '../../components/MDREducation/TeamSection';
import FooterSection from '../../components/MDREducation/FooterSection';

const MDREducationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeroSection />
      <PracticalExamplesSection />
      <CommunitySection />
      <AIToolsSection />
      <BlogSection />
      <TeamSection />
      <FooterSection />
    </div>
  );
};

export default MDREducationPage;
