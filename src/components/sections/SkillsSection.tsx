import AnimatedSkillBar from '@/components/AnimatedSkillBar';
import { Code, Cloud, Settings, Database, Monitor } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Frameworks',
    icon: Code,
    skills: [
      { name: 'Python', level: 70 },
      { name: 'Java', level: 70 },
      { name: 'Node.js', level: 85 },
      { name: 'TypeScript', level: 75 },
      { name: 'Bash/Shell', level: 90 },
      { name: 'PHP', level: 75 },
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: Cloud,
    skills: [
      { name: 'AWS (EC2, S3, Lambda, RDS)', level: 90 },
      { name: 'AWS Elastic Beanstalk', level: 85 },
      { name: 'AWS CloudFormation', level: 85 },
      { name: 'Azure', level: 85 },
      { name: 'GCP', level: 65 },
      { name: 'OCI', level: 90 },
    ],
  },
  {
    title: 'DevOps Tools',
    icon: Settings,
    skills: [
      { name: 'Docker', level: 75 },
      { name: 'Kubernetes', level: 60 },
      { name: 'Terraform', level: 85 },
      { name: 'Jenkins / GitHub Actions', level: 85 },
      { name: 'Ansible', level: 75 },
    ],
  },
  {
    title: 'Monitoring & Observability',
    icon: Monitor,
    skills: [
      { name: 'Prometheus', level: 90 },
      { name: 'Grafana', level: 90 },
      { name: 'AWS CloudWatch', level: 85 },
      { name: 'ELK Stack', level: 75 },
      { name: 'Datadog', level: 70 },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'AWS DynamoDB', level: 85 },
    
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across cloud, DevOps, and backend development.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <div className="space-y-1">
                  {category.skills.map((skill, skillIndex) => (
                    <AnimatedSkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={(categoryIndex * 100) + (skillIndex * 50)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
