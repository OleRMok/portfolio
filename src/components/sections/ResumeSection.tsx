import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';

interface TimelineItem {
  type: 'work' | 'education' | 'certification';
  title: string;
  organization: string;
  period: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    type: 'work',
    title: 'Cloud & DevOps Engineering',
    organization: 'Technical Projects',
    period: 'Oct 2025 - Present',
    description: 'Executing "Lift-and-Shift" migrations to AWS EC2/VPC and refactoring monolithic apps to PaaS models. Implementing IaC using Terraform for secure, reproducible environments.',
  },
  {
    type: 'work',
    title: 'Project Lead & Backend Developer',
    organization: 'AB4IR',
    period: 'Apr 2025 - Sep 2025',
    description: 'Served as Project Lead for a 4-member team, overseeing backend architecture for an insurance-management prototype. Designed normalized MySQL schemas and implemented RBAC security.',
  },
  {
    type: 'certification',
    title: 'OCI Architect Associate & DevOps Expert',
    organization: 'Oracle / Microsoft (Nemisa)',
    period: '2025 - 2026',
    description: 'Certified OCI Architect Associate (82%) and Microsoft DevOps Engineer Expert (86%). Specialized in IaC with Terraform and automated CI/CD pipelines.',
  },
  {
    type: 'education',
    title: 'Bachelor of Laws (LLB)',
    organization: 'UNISA & University of Free State',
    period: '2021 - 2025',
    description: 'Focused on legal principles and commercial law, providing a structured and analytical approach to complex cloud governance and technical problem-solving.',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'work': return Briefcase;
    case 'education': return GraduationCap;
    case 'certification': return Award;
    default: return Briefcase;
  }
};

const ResumeSection = () => {
  return (
    <section id="resume" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary">Resume</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            A timeline of my professional journey as a Cloud & DevOps Engineer, merging legal precision with technical automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* VIEW CV: Opens in a new tab */}
            <a href="/OlebogengCV.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-8 border-primary text-primary hover:bg-primary/10"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Full CV
              </Button>
            </a>

            {/* DOWNLOAD CV: Triggers direct download */}
            <a href="/OlebogengCV.pdf" download="Olebogeng_Mokoma_CV.pdf">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 glow"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </a>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-border" />

            {/* Timeline Items */}
            {timelineItems.map((item, index) => {
              const Icon = getIcon(item.type);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 pl-8 md:pl-0' : 'md:pl-12 pl-8'}`}>
                    <Card className="bg-card hover:border-primary/50 transition-colors hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-sm text-primary font-medium">{item.period}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{item.organization}</p>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
