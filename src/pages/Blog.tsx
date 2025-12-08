import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Heart, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import agentLogoFull from '@/assets/agent14-logo-new.png';

const blogPosts = [
  {
    id: 1,
    title: "How Agent14 Saved My Anniversary Dinner",
    excerpt: "When our original reservation fell through last minute, Agent14's AI stepped in and found us the perfect romantic spot.",
    category: "Anniversary",
    author: "Sarah M.",
    location: "New York, NY",
    date: "December 5, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop",
    featured: true,
    content: {
      story: `My husband and I had been planning our 10th wedding anniversary dinner for months. We had reservations at this exclusive French restaurant downtown—the kind of place you book three months in advance. Then, disaster struck.

Two days before our anniversary, I got an email saying the restaurant had a kitchen fire and would be closed for renovations. I panicked. Every nice restaurant in the city was fully booked on a Saturday night.

That's when my friend mentioned Agent14. I was skeptical—could an AI really help me find a last-minute reservation at a comparable venue? I opened the chat at 11 PM, honestly just venting my frustration.

Within minutes, Agent14 understood exactly what I needed: an intimate, upscale French restaurant with good wine selection, preferably with a view. It didn't just give me a list of restaurants—it actually found availability at three stunning options I hadn't even heard of.

The AI suggested "Le Petit Étoile"—a hidden gem in Brooklyn with a rooftop terrace overlooking the Manhattan skyline. It even noted that the chef had trained at the same culinary school as the one from our original restaurant. Perfect.

Agent14 secured our reservation, sent me a confirmation with directions and parking tips, and even reminded me the day before with weather updates suggesting we bring a light jacket for the rooftop.

Our anniversary dinner was absolutely magical. Better than what we originally planned, honestly. The sunset over the skyline, the incredible tasting menu, the attentive service—everything was perfect.

I've now used Agent14 for every special occasion since. It's like having a personal concierge who actually understands what makes a dining experience special.`,
      quote: "Agent14 didn't just find us a restaurant—it found us the perfect memory.",
    }
  },
  {
    id: 2,
    title: "Surprise Birthday Party for 20? No Problem.",
    excerpt: "Planning a surprise party for my mom's 60th seemed impossible until Agent14 coordinated everything seamlessly.",
    category: "Birthday",
    author: "Michael T.",
    location: "Chicago, IL",
    date: "November 28, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=500&fit=crop",
    featured: false,
    content: {
      story: `Organizing a surprise 60th birthday party for my mother was supposed to be simple. Twenty guests, her favorite Italian restaurant, maybe a private room. What could go wrong?

Everything, apparently.

My mom has dietary restrictions (gluten-free, lactose intolerant), my aunt uses a wheelchair, my cousin is vegan, and my uncle refuses to eat anywhere "too trendy." Oh, and three of us were flying in from different states with unpredictable arrival times.

I spent two weeks calling restaurants, explaining our needs, getting put on hold, being told "we don't do private events on weekends." I was ready to give up and just order pizza.

Then I discovered Agent14. I typed out our entire chaotic situation—all the dietary needs, the accessibility requirements, the timing uncertainty, everything. I expected maybe a few suggestions.

Instead, Agent14 became my event planning partner. It found "Nonna's Garden," a family-owned Italian restaurant with a beautiful private garden room, fully accessible, with a chef who actually got excited about creating a custom menu for our group.

But here's what really impressed me: Agent14 helped coordinate the whole thing. It set up the reservation with a 30-minute buffer for our flight delays. It communicated with the restaurant about the surprise element—they dimmed the lights and had staff ready to bring out a cake when we arrived. It even sent separate reminders to each family member with directions tailored to their starting locations.

The night was flawless. Mom cried happy tears. The food was incredible—everyone found dishes they could eat. My aunt raved about how comfortable and accessible everything was.

My family still talks about that party. And they all now use Agent14 for their own reservations.`,
      quote: "I went from stressed event planner to relaxed guest at my own mother's party.",
    }
  },
  {
    id: 3,
    title: "First Date Nerves? Agent14 Had My Back",
    excerpt: "As someone with social anxiety, letting AI handle the reservation details let me focus on what mattered—connecting.",
    category: "First Date",
    author: "Jamie L.",
    location: "Austin, TX",
    date: "November 15, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=500&fit=crop",
    featured: false,
    content: {
      story: `I have pretty severe social anxiety. Making phone calls to strangers? Nightmare. Walking into a restaurant and hoping my reservation exists? Cold sweats.

When I finally worked up the courage to ask someone out, I realized I'd have to actually make a dinner reservation. The thought of calling a restaurant, potentially being put on hold, explaining what I wanted, maybe being told no—it was almost enough to make me cancel the whole date.

A colleague told me about Agent14, and honestly? It changed everything.

I opened the chat and just... talked. I explained I was nervous about a first date, wanted somewhere not too loud (so we could actually talk), not too dark (I wanted to see my food), with good vegetarian options (she mentioned she's vegetarian), and somewhere I wouldn't have to worry about awkward silences because the ambiance would carry some of the atmosphere.

Agent14 got it immediately. No judgment, no weird pauses, just helpful suggestions. It recommended a modern farm-to-table place with a beautiful open kitchen, live acoustic music on Thursday nights, and a seasonal vegetarian tasting menu.

It made the reservation, sent me confirmation, gave me tips on parking, and even mentioned that the restaurant has a great signature cocktail if I wanted a conversation starter.

I showed up feeling actually prepared. The restaurant was perfect. My date loved it. We talked for three hours and barely noticed the time passing.

We're still dating, by the way. And yes, I've used Agent14 for every date since—including the one where I'm planning to propose next month.`,
      quote: "Agent14 understood my anxiety without me having to over-explain. It just helped.",
    }
  },
  {
    id: 4,
    title: "Business Dinner with International Clients Made Effortless",
    excerpt: "Impressing overseas clients meant finding the perfect blend of local flavor and international comfort. Agent14 delivered.",
    category: "Business",
    author: "David K.",
    location: "San Francisco, CA",
    date: "November 8, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
    featured: true,
    content: {
      story: `When you're closing a seven-figure deal with clients from Tokyo, the dinner venue matters. It's not just about the food—it's about showing respect, understanding cultural nuances, and creating an environment where business relationships flourish.

Our Japanese partners were visiting San Francisco for three days of negotiations. The final dinner would be crucial—a chance to celebrate the partnership and solidify relationships that would last years.

I needed a restaurant that checked impossible boxes: exceptional quality (these clients dine at Michelin-starred restaurants regularly), Japanese-influenced but distinctly Californian (to showcase our local culture), private enough for confidential conversations, and ideally with a sake program that would impress.

My assistant spent days researching options. Nothing quite fit. Then our marketing director mentioned she'd been using Agent14 for client dinners.

I was skeptical—AI helping with something this culturally sensitive? But I was running out of time.

I explained the situation to Agent14 in detail. The stakes, the cultural considerations, even the personality dynamics of our client group (one partner loves bold flavors, another prefers subtle preparations).

Agent14's recommendation was inspired: a Japanese-Californian fusion restaurant in Napa Valley—far enough from the city to feel special, but not inconveniently far. Private dining room overlooking the vineyards. A chef who had trained in Kyoto. A sake sommelier who could lead a tasting.

The AI even suggested timing the reservation for sunset, knowing the vineyard views would be spectacular.

Our clients were genuinely impressed. The sake pairing sparked wonderful conversations. The chef came out to personally greet our group—Agent14 had apparently communicated the significance of the dinner.

We closed the deal that night, over dessert, overlooking the stars above wine country.`,
      quote: "Agent14 understood that business dinners are about much more than food. It understood relationship-building.",
    }
  },
  {
    id: 5,
    title: "Solo Traveler's Best Friend in a New City",
    excerpt: "Traveling alone in Barcelona, Agent14 became my personal food guide—finding hidden gems locals love.",
    category: "Solo Travel",
    author: "Emma R.",
    location: "Barcelona, Spain",
    date: "October 25, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&h=500&fit=crop",
    featured: false,
    content: {
      story: `Solo travel is liberating until you're standing alone in a foreign city, starving, surrounded by tourist traps, with no idea where the locals actually eat.

I was in Barcelona for a week—my first solo international trip. I speak maybe ten words of Spanish. Every restaurant near La Rambla looked overpriced and underwhelming. I was about to give up and eat at my hotel.

A friend back home texted me: "Just use Agent14, dummy."

So I did. I told the AI I was solo traveling, wanted authentic Catalan food, was open to adventure but nervous about language barriers, and really wanted to avoid tourist traps.

Agent14 became my Barcelona food guide. It found me a tiny tapas bar in the Gothic Quarter where the menu was handwritten in Catalan—but it also told me exactly what to order in Spanish, phonetically written out so I could pronounce it.

The bartender's eyes lit up when I asked for "pa amb tomàquet amb pernil ibèric" in my terrible accent. He laughed, gave me a thumbs up, and brought out the most incredible tomato bread with ham I've ever tasted.

Over the next week, Agent14 led me through the city's food scene like a local friend. A seafood restaurant in Barceloneta where fishermen actually sold their catch. A vermouth bar open only on Sunday mornings. A Michelin-starred restaurant where Agent14 secured a solo counter seat at the chef's table—something they apparently rarely offer.

Each recommendation came with cultural context, ordering tips, and even conversation starters in Spanish. By the end of my trip, I'd had a dozen incredible meals and made connections with restaurant staff who remembered me when I walked in.

Solo travel doesn't have to mean eating alone in silence. Agent14 gave me confidence to explore.`,
      quote: "I came for the architecture. I stayed for the food. Agent14 made both possible.",
    }
  },
  {
    id: 6,
    title: "Proposing at the Perfect Restaurant",
    excerpt: "The ring was ready. The speech was memorized. All I needed was the perfect setting—and absolute secrecy.",
    category: "Proposal",
    author: "Chris W.",
    location: "Miami, FL",
    date: "October 12, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1529543544277-750e580e538d?w=800&h=500&fit=crop",
    featured: true,
    content: {
      story: `I had the ring. I had practiced my speech fifty times. I had permission from her father. All I needed was the perfect restaurant—and to somehow coordinate the whole thing without my extremely perceptive girlfriend figuring out what I was planning.

My girlfriend and I share everything, including our phones and calendars. There's literally no way I could call a restaurant without her eventually seeing it in my call history or overhearing a confirmation callback.

Enter Agent14.

I could plan everything through text chat, late at night while she was asleep, without leaving any trace on shared devices. Perfect.

I told Agent14 everything: our story, how we met, what she loves (ocean views, French food, live music), what she hates (being the center of attention, surprise crowds), and the exact vibe I wanted—intimate, romantic, elegant but not stuffy.

Agent14 found a boutique French restaurant on the water with exactly twelve tables. It had a small terrace overlooking Biscayne Bay that could be privately reserved. The sunset timing would be perfect in October.

But Agent14 didn't stop there. It helped me plan the entire evening:
- Reserved the private terrace with a "anniversary dinner" cover story
- Coordinated with the restaurant to have champagne ready the moment she said yes
- Arranged for a violinist to play "our song" at precisely 7:45 PM
- Set up a secret photographer hidden among the terrace plants
- Even suggested the best menu items to order so the timing would work perfectly with sunset

The night arrived. Everything went exactly as planned. The sunset was golden. The violinist began playing. I got down on one knee.

She said yes. The photographer captured the whole thing. The champagne appeared like magic.

Six months later, we got married. And guess where we're having our anniversary dinner every year? Same restaurant. Same terrace. Same magic.

Agent14 wasn't just booking software. It was my secret wedding planner.`,
      quote: "She still doesn't know how I pulled off the perfect proposal. Agent14 is my secret.",
    }
  }
];

const Blog = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <Helmet>
        <title>Customer Stories | Agent14 Blog</title>
        <meta name="description" content="Real stories from real diners. Discover how Agent14 helped create unforgettable dining experiences for anniversaries, birthdays, proposals, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background border-b border-border">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={agentLogoFull} alt="Agent14" className="h-8 w-auto" />
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-light text-primary tracking-wide uppercase">Agent</span>
                <span className="text-xl font-bold text-gold">14</span>
              </div>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
              <Heart className="w-3 h-3 mr-1" />
              Real Stories, Real Experiences
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Dining Moments That Matter
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From surprise proposals to business dinners, discover how Agent14 helps create unforgettable dining experiences for every occasion.
            </p>
          </div>

          {/* Featured Stories */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Star className="w-5 h-5 text-gold" />
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-gold text-gold-foreground">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* All Stories */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">All Stories</h2>
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="group">
                  <Card className="border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3 relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <Badge className="absolute top-3 left-3 bg-gold text-gold-foreground">
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="md:w-2/3 p-6 md:p-8">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}, {post.location}
                          </span>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Story Preview */}
                        <div className="bg-muted/30 rounded-lg p-4 mb-4 border-l-4 border-gold">
                          <Quote className="w-5 h-5 text-gold mb-2" />
                          <p className="text-sm italic text-foreground">
                            "{post.content.quote}"
                          </p>
                        </div>

                        {/* Expandable Story Content */}
                        <details className="group/details">
                          <summary className="cursor-pointer text-primary font-medium hover:underline list-none flex items-center gap-2">
                            Read full story
                            <span className="text-xs group-open/details:rotate-180 transition-transform">▼</span>
                          </summary>
                          <div className="mt-4 prose prose-sm max-w-none text-muted-foreground">
                            {post.content.story.split('\n\n').map((paragraph, idx) => (
                              <p key={idx} className="mb-4 leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </details>
                      </CardContent>
                    </div>
                  </Card>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 px-6 bg-gradient-to-br from-primary/10 to-gold/10 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Create Your Own Story?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of diners who trust Agent14 to make their special moments unforgettable.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start Your Journey
              </Button>
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border">
          <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Agent14. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Blog;
