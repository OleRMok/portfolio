import React from 'react';
import { Code, Cloud, Settings, Database, Monitor, Star } from 'lucide-react';

// 1. Define the mapping for levels to words
const getLevelLabel = (level: number): string => {
  const labels: Record<number, string> = {
    1: 'Novice',
    2: 'Familiar',
    3: 'Proficient',
    4: 'Advanced',
    5: 'Expert',
  };
  return labels[level] || 'Novice';
};

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Cloud Platforms',
    icon: Cloud,
    skills: [
      { name: 'AWS (EC2, S3, RDS)', level: 5 },
      { name: 'OCI (Oracle Cloud)', level: 5 },
      { name: 'Azure', level: 4 },
      { name: 'AWS CloudFormation', level: 4 },
      { name: 'GCP', level: 2 },
    ],
  },
  {
    title: 'DevOps & Infrastructure',
    icon: Settings,
    skills: [
      { name: 'Terraform', level: 4 },
      { name: 'Jenkins / GitHub Actions', level: 4 },
      { name: 'Docker', level: 3 },
      { name: 'Ansible', level: 3 },
      { name: 'Kubernetes', level: 2 },
    ],
  },
  {
    title: 'Monitoring & Observability',
    icon: Monitor,
    skills: [
      { name: 'Prometheus & Grafana', level: 5 },
      { name: 'Loki & Grafana Alloy', level: 5 },
      { name: 'AWS CloudWatch', level: 4 },
      { name: 'ELK Stack', level: 3 },
    ],
  },
  {
    title: 'Languages & Automation',
    icon: Code,
    skills: [
      { name: 'Bash/Shell', level: 5 },
      { name: 'Python', level: 3 },
      { name: 'Java', level: 3 },
      { name: 'Node.js', level: 4 },
      { name: 'TypeScript', level: 3 },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 4 },
      { name: 'MySQL', level: 4 },
      { name: 'AWS DynamoDB', level: 4 },
      { name: 'MongoDB', level: 3 },
    ],
  },
];

// New component to replace the percentage bar
const SkillRating = ({ name, level }: { name: string; level: number }) => (
  <div className="flex flex-col mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="font-medium text-sm">{name}</span>
      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
        {getLevelLabel(level)}
      </span>
    </div>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className={`h-1.5 w-full rounded-full transition-colors duration-500 ${
            step <= level ? 'bg-primary' : 'bg-muted'
          }`}
        />
      ))}
    </div>
  </div>
);

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
            A focused look at my DevOps and Cloud Engineering expertise.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <SkillRating 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level} 
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
