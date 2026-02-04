import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Linkedin, Github, Copy, Check, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}

const contactItems: ContactItem[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'olemokoma@email.com',
    href: 'mailto:olemokoma@email.com',
    copyable: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+27 83 215 2737',
    href: 'tel:+27832152737',
    copyable: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/olebogeng',
    href: 'https://www.linkedin.com/in/olebogeng-mokoma-77b97a308/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/olebogeng',
    href: 'https://github.com/OleRMok',
  },
];

const ContactSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      toast({
        title: 'Copied to clipboard',
        description: value,
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy manually',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about tech.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="bg-card hover:border-primary/50 transition-all duration-300 hover-lift"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-foreground hover:text-primary transition-colors font-medium"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">{item.value}</p>
                          )}
                        </div>
                      </div>
                      {item.copyable && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(item.value, index)}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {copiedIndex === index ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Location */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Pretoria, South Africa</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center border-t border-border pt-8">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Olebogeng Mokoma. Built with React & deployed on AWS.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
