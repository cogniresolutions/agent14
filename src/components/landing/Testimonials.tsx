import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Food Enthusiast',
    content: 'Agent14 completely changed how I book restaurants. I just say what I want, and it handles everything. So much easier than calling or using complicated apps.',
    rating: 5,
  },
  {
    name: 'David L.',
    role: 'Business Professional',
    content: 'As someone who books client dinners frequently, this saves me hours every week. The AI understands exactly what I need and confirms instantly.',
    rating: 5,
  },
  {
    name: 'Emma K.',
    role: 'Travel Blogger',
    content: 'I\'ve tried every reservation app out there. Agent14 is by far the most intuitive. It feels like texting a friend who happens to know every restaurant.',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by Diners
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            See what our users are saying about their experience
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
