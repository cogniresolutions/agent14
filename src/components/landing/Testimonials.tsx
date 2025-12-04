import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Food Blogger',
    content: 'Agent14 completely transformed how I book restaurants. The AI understands exactly what I need and confirms instantly. No more waiting on hold!',
    rating: 5,
    image: null,
  },
  {
    name: 'David Chen',
    role: 'Business Executive',
    content: 'As someone who books client dinners frequently, this saves me hours every week. The modification feature is a game-changer for last-minute changes.',
    rating: 5,
    image: null,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Travel Writer',
    content: 'I\'ve tried every reservation app out there. Agent14 is by far the most intuitive. It feels like texting a friend who knows every restaurant in town.',
    rating: 5,
    image: null,
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by diners everywhere
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            See what our users are saying about their experience
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative p-8 rounded-2xl bg-muted/30 border border-border"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
