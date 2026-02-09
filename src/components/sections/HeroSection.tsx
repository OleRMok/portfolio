import { Button } from '@/components/ui/button';
import TypeWriter from '@/components/TypeWriter';
import { Download, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const roles = ['Backend Developer', 'Cloud Engineer', 'DevOps Engineer'];

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <p className="text-muted-foreground text-lg mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            <span className="text-foreground">Olebogeng</span>{' '}
            <span className="text-primary">"Ole"</span>{' '}
            <span className="text-foreground">Mokoma</span>
          </h1>

          {/* Typing Animation */}
          <div className="text-2xl md:text-3xl font-medium mb-8 h-10 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            <TypeWriter words={roles} />
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
            A tech enthusiast from Pretoria, passionate about building 
            robust backend systems, cloud infrastructure, and DevOps pipelines. 
            Currently seeking opportunities in Backend Development and Cloud/DevOps Engineering.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg glow"
            >
              View Projects
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg"
              asChild
            >
              <a href="#resume">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Location Badge */}
          <div className="mt-16 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available for opportunities • 
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
