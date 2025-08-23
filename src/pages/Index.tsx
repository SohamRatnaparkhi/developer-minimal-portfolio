import React from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Hero/HeroSection';
import ExperienceSection from '@/components/Experience/ExperienceSection';
import SkillsSection from '@/components/Skills/SkillsSection';
import GitHubActivity from '@/components/GitHub/GitHubActivity';
import ProjectsSection from '@/components/Projects/ProjectsSection';
import ExtraCurricularsSection from '@/components/ExtraCurriculars/ExtraCurricularsSection';
import BlogSection from '@/components/Blog/BlogSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <GitHubActivity />
      <ProjectsSection />
      <ExtraCurricularsSection />
      <BlogSection />
    </Layout>
  );
};

export default Index;
