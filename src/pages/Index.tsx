import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollToTop from '@/components/ScrollToTop';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  // 1. Hooks must be INSIDE the function body
  const [views, setViews] = useState<number | string>("...");

  useEffect(() => {
    //  actual AWS API Gateway endpoint from Terraform
    const apiURL = "https://q0hpnkvi80.execute-api.us-east-1.amazonaws.com/count";

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        // Access the count from Python Lambda's return JSON
        setViews(data.count || data.body?.count || data);
      })
      .catch(error => {
        console.error("Error fetching visitor count:", error);
        setViews("Error");
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
        
        {/* Visitor Counter Display */}
        <div className="py-10 text-center opacity-50">
          <p className="text-sm font-mono">Cloud Visitor Count: {views}</p>
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
};

export default Index;
