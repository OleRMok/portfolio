import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Cloud, Monitor, Globe, Server } from 'lucide-react';

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
}

const projects: Project[] = [
  {
    id: 'lift-shift',
    title: 'Lift & Shift to PaaS Migration',
    shortDescription: 'Migrated legacy infrastructure to AWS Elastic Beanstalk for improved scalability and reduced operational overhead.',
    icon: Cloud,
    problem: 'Legacy on-premises infrastructure was becoming costly to maintain, lacked scalability, and required significant manual intervention for deployments.',
    process: 'Assessed the existing application architecture, configured AWS Elastic Beanstalk environments, set up CI/CD pipelines, and performed staged migration with rollback strategies.',
    tools: ['AWS Elastic Beanstalk', 'AWS RDS', 'AWS S3', 'GitHub Actions', 'Terraform'],
    result: 'Successfully migrated the application with zero downtime. Achieved 40% reduction in infrastructure costs and 70% faster deployment times.',
    learned: 'Gained deep understanding of cloud-native architecture patterns, the importance of infrastructure as code, and strategies for risk-free production migrations.',
  },
  {
    id: 'monitoring',
    title: 'Prometheus & Grafana Monitoring Pipeline',
    shortDescription: 'Built a comprehensive observability solution for real-time metrics collection, visualization, and alerting.',
    icon: Monitor,
    problem: 'Lack of visibility into system health and performance metrics made it difficult to identify issues before they impacted users.',
    process: 'Deployed Prometheus for metrics collection, configured exporters for various services, built custom Grafana dashboards, set up AlertManager for intelligent alerting, and integrated with Slack for notifications.',
    tools: ['Prometheus', 'Grafana Alloy', 'AlertManager', 'Node Exporter', 'Slack', 'Loki', 'AWS EC2'],
    result: 'Established 24/7 monitoring coverage with real-time dashboards. Reduced mean time to detection (MTTD) by 80% and enabled proactive issue resolution.',
    learned: 'Mastered metrics-driven observability, learned the importance of SLIs/SLOs, and understood how to build actionable alerts that reduce alert fatigue.',
  },
  {
    id: 'portfolio',
    title: 'AWS-Hosted Portfolio Website',
    shortDescription: 'This portfolio—designed, built, and deployed using AWS native tools for high availability and performance.',
    icon: Globe,
    problem: 'Needed a professional online presence to showcase skills and projects, with full control over hosting and deployment.',
    process: 'Developed the frontend using React and TypeScript, configured S3 for static hosting, set up CloudFront CDN for global distribution, managed DNS with Route 53, and automated deployments.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'AWS CloudFront', 'AWS Route 53', 'GitHub Actions', 'Terraform', 'AWS Lambda', 'AWS ACM', 'AWS DynamoDB', 'AWS API Gateway','Python', 'GitBash&Powershell'],
    result: 'Fully functional portfolio with sub-second load times globally, automated CI/CD pipeline, and minimal hosting costs.',
    learned: 'End-to-end deployment experience, CDN optimization techniques, and the value of infrastructure automation for even small projects.',
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my recent work in cloud infrastructure, DevOps automation, and backend development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="flip-card h-80 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flip-card-inner relative w-full h-full">
                  {/* Front of Card */}
                  <Card className="flip-card-front absolute w-full h-full bg-card hover:border-primary/50 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.shortDescription}</p>
                    </CardContent>
                  </Card>

                  {/* Back of Card */}
                  <Card className="flip-card-back absolute w-full h-full bg-secondary">
                    <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <p className="text-foreground font-medium mb-4">Click to view details</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.tools.slice(0, 4).map((tool) => (
                          <Badge key={tool} variant="secondary" className="bg-primary/20 text-primary">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <selectedProject.icon className="h-6 w-6 text-primary" />
                  </div>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                </div>
                <DialogDescription className="text-muted-foreground">
                  {selectedProject.shortDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">THE PROBLEM</h4>
                  <p className="text-muted-foreground">{selectedProject.problem}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">MY PROCESS</h4>
                  <p className="text-muted-foreground">{selectedProject.process}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">TOOLS & TECHNOLOGIES</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="bg-primary/20 text-primary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">THE RESULT</h4>
                  <p className="text-muted-foreground">{selectedProject.result}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">WHAT I LEARNED</h4>
                  <p className="text-muted-foreground">{selectedProject.learned}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
