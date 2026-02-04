import { Card, CardContent } from '@/components/ui/card';
import { Quote, User } from 'lucide-react';

interface Reference {
  name: string;
  title: string;
  company: string;
  testimonial: string;
  available: boolean;
}

const references: Reference[] = [
  {
    name: 'Reference 1',
    title: 'Senior Engineering Manager',
    company: 'Tech Company',
    testimonial: 'Ole demonstrated exceptional problem-solving skills and a deep understanding of cloud infrastructure. His ability to optimize our deployment pipeline was instrumental in improving our team\'s velocity.',
    available: true,
  },
  {
    name: 'Reference 2',
    title: 'Technical Lead',
    company: 'Software Solutions Inc.',
    testimonial: 'Working with Ole was a pleasure. His expertise in DevOps practices and willingness to share knowledge made him an invaluable team member. He consistently delivered high-quality work.',
    available: true,
  },
  {
    name: 'Reference 3',
    title: 'CTO',
    company: 'Startup Co.',
    testimonial: 'Ole\'s contributions to our backend architecture were significant. He brought a mature understanding of scalability and best practices that helped us prepare for growth.',
    available: true,
  },
];

const ReferencesSection = () => {
  return (
    <section id="references" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">References</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional references available upon request. Here's what colleagues have said about working with me.
          </p>
        </div>

        {/* References Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {references.map((reference, index) => (
            <Card
              key={index}
              className="bg-card hover:border-primary/50 transition-all duration-300 hover-lift"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/30" />
                </div>

                {/* Testimonial */}
                <p className="text-muted-foreground text-sm mb-6 italic">
                  "{reference.testimonial}"
                </p>

                {/* Reference Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{reference.name}</h4>
                    <p className="text-sm text-muted-foreground">{reference.title}</p>
                    <p className="text-sm text-primary">{reference.company}</p>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="inline-flex items-center text-xs text-muted-foreground">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Contact available upon request
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
