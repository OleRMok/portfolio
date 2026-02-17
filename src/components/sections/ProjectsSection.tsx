import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Cloud, Monitor, Globe, Linkedin } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  icon: React.ElementType;
  problem: string;
  process: string;
  tools: string[];
  result: string;
  learned: string;
  proofUrl: string; // Required for each project
}

const projects: Project[] = [
  {
    id: 'lift-shift',
    title: 'Lift & Shift to PaaS Migration',
    shortDescription: 'Migrated legacy infrastructure to AWS Elastic Beanstalk for improved scalability.',
    icon: Cloud,
    problem: 'Legacy on-premises infrastructure was costly and hard to scale.',
    process: 'Configured AWS Elastic Beanstalk, RDS, and automated CI/CD with GitHub Actions.',
    tools: ['AWS Elastic Beanstalk', 'AWS RDS', 'AWS S3', 'GitHub Actions', 'Terraform'],
    result: 'Zero-downtime migration. 40% cost reduction.',
    learned: 'Deep cloud-native architecture experience.',
    proofUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7416782540637843456/?originTrackingId=7duzxpW4CHLGyRkqUpZ5Jw%3D%3D', // LINK HERE TO LINKEDIN POST WITH PROOF
  },
  {
    id: 'monitoring',
    title: 'Prometheus & Grafana Monitoring Pipeline',
    shortDescription: 'Built an observability solution for real-time metrics and alerting.',
    icon: Monitor,
    problem: 'Lack of visibility into system health.',
    process: 'Deployed Prometheus and custom Grafana dashboards with Slack alerts.',
    tools: ['Prometheus', 'Grafana Alloy', 'Loki', 'AWS EC2'],
    result: '80% reduction in detection time.',
    learned: 'Mastered metrics-driven observability.',
    proofUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7422670368810840065/?originTrackingId=OFvMqPcPVPh2nS7bKT4bgQ%3D%3D', //  LINK HERE TO LINKEDIN POST WITH PROOF
  },
  {
    id: 'portfolio',
    title: 'AWS-Hosted Portfolio Website',
    shortDescription: 'Designed and deployed using AWS native tools for high availability.',
    icon: Globe,
    problem: 'Needed a high-performance professional presence.',
    process: 'Used S3 for hosting, CloudFront for global delivery, and Route 53 for DNS.',
    tools: ['React', 'AWS S3', 'AWS CloudFront', 'Route 53', 'Terraform'],
    result: 'Sub-second global load times.',
    learned: 'End-to-end cloud deployment experience.',
    proofUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7424874905927852033/?originTrackingId=Ui8sMYWuwxSxM3bbRBIJeg%3D%3D', // LINK TO LINKEDIN POST WITH PROOF
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* ... Header stays the same ... */}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flip-card h-80 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Card content stays as you had it */}
              <div className="flip-card-inner relative w-full h-full">
                <Card className="flip-card-front absolute w-full h-full">
                   <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <project.icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.shortDescription}</p>
                   </CardContent>
                </Card>
                <Card className="flip-card-back absolute w-full h-full bg-secondary">
                  <CardContent className="flex flex-col items-center justify-center h-full">
                    <p className="font-medium mb-4">Click to view Proof & Details</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-card">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <selectedProject.icon className="h-6 w-6 text-primary" />
                    <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                  </div>
                  
                  {/* The Unique Link for this specific project */}
                  <a 
                    href={selectedProject.proofUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-md hover:bg-[#005582] transition-colors font-medium shadow-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                    View Proof
                  </a>
                </div>
              </DialogHeader>

              <div className="space-y-4 text-sm md:text-base">
                <p><strong>Problem:</strong> {selectedProject.problem}</p>
                <p><strong>Process:</strong> {selectedProject.process}</p>
                <p><strong>Result:</strong> {selectedProject.result}</p>
                <p><strong>Learned:</strong> {selectedProject.learned}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;