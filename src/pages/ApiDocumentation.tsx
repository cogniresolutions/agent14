import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Code, Key, Globe, Zap, Shield, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import agentLogoFull from '@/assets/agent14-logo-new.png';

const CodeBlock = ({ code, language = 'json' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto text-sm">
        <code className="text-foreground">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
      </button>
    </div>
  );
};

const endpoints = [
  {
    method: 'POST',
    path: '/v1/reservations',
    description: 'Create a new reservation',
    request: `{
  "restaurant_id": "rest_abc123",
  "guest_name": "John Doe",
  "guest_email": "john@example.com",
  "guest_phone": "+1234567890",
  "party_size": 4,
  "date": "2024-12-15",
  "time": "19:00",
  "special_requests": "Window seat preferred"
}`,
    response: `{
  "id": "res_xyz789",
  "status": "confirmed",
  "confirmation_code": "AG14-2024-XYZ",
  "restaurant": {
    "id": "rest_abc123",
    "name": "The Golden Fork"
  },
  "guest": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "reservation_details": {
    "date": "2024-12-15",
    "time": "19:00",
    "party_size": 4
  },
  "created_at": "2024-12-08T10:30:00Z"
}`,
  },
  {
    method: 'GET',
    path: '/v1/reservations/{id}',
    description: 'Retrieve reservation details',
    request: `// No request body required
// Pass reservation ID in URL path`,
    response: `{
  "id": "res_xyz789",
  "status": "confirmed",
  "confirmation_code": "AG14-2024-XYZ",
  "restaurant": {
    "id": "rest_abc123",
    "name": "The Golden Fork",
    "address": "123 Main St, New York, NY"
  },
  "guest": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "reservation_details": {
    "date": "2024-12-15",
    "time": "19:00",
    "party_size": 4,
    "special_requests": "Window seat preferred"
  },
  "loyalty_points_earned": 100,
  "created_at": "2024-12-08T10:30:00Z",
  "updated_at": "2024-12-08T10:30:00Z"
}`,
  },
  {
    method: 'PATCH',
    path: '/v1/reservations/{id}',
    description: 'Modify an existing reservation',
    request: `{
  "date": "2024-12-16",
  "time": "20:00",
  "party_size": 6,
  "special_requests": "Birthday celebration"
}`,
    response: `{
  "id": "res_xyz789",
  "status": "modified",
  "confirmation_code": "AG14-2024-XYZ",
  "reservation_details": {
    "date": "2024-12-16",
    "time": "20:00",
    "party_size": 6,
    "special_requests": "Birthday celebration"
  },
  "modification_count": 1,
  "updated_at": "2024-12-08T14:45:00Z"
}`,
  },
  {
    method: 'DELETE',
    path: '/v1/reservations/{id}',
    description: 'Cancel a reservation',
    request: `{
  "cancellation_reason": "Change of plans"
}`,
    response: `{
  "id": "res_xyz789",
  "status": "cancelled",
  "cancellation_reason": "Change of plans",
  "loyalty_points_refunded": 100,
  "cancelled_at": "2024-12-08T16:00:00Z"
}`,
  },
  {
    method: 'GET',
    path: '/v1/availability',
    description: 'Check restaurant availability',
    request: `// Query parameters:
// ?restaurant_id=rest_abc123
// &date=2024-12-15
// &party_size=4`,
    response: `{
  "restaurant_id": "rest_abc123",
  "date": "2024-12-15",
  "party_size": 4,
  "available_slots": [
    { "time": "17:00", "tables_available": 3 },
    { "time": "17:30", "tables_available": 2 },
    { "time": "18:00", "tables_available": 4 },
    { "time": "19:00", "tables_available": 1 },
    { "time": "20:00", "tables_available": 5 },
    { "time": "21:00", "tables_available": 6 }
  ]
}`,
  },
  {
    method: 'POST',
    path: '/v1/webhooks',
    description: 'Register a webhook for reservation events',
    request: `{
  "url": "https://your-system.com/webhooks/agent14",
  "events": [
    "reservation.created",
    "reservation.modified",
    "reservation.cancelled",
    "reservation.reminder"
  ],
  "secret": "your_webhook_secret"
}`,
    response: `{
  "id": "wh_abc123",
  "url": "https://your-system.com/webhooks/agent14",
  "events": [
    "reservation.created",
    "reservation.modified",
    "reservation.cancelled",
    "reservation.reminder"
  ],
  "status": "active",
  "created_at": "2024-12-08T10:00:00Z"
}`,
  },
];

const webhookEvents = [
  { event: 'reservation.created', description: 'Triggered when a new reservation is created' },
  { event: 'reservation.modified', description: 'Triggered when a reservation is modified' },
  { event: 'reservation.cancelled', description: 'Triggered when a reservation is cancelled' },
  { event: 'reservation.reminder', description: 'Triggered 24 hours before the reservation' },
  { event: 'reservation.no_show', description: 'Triggered when a guest does not show up' },
  { event: 'reservation.completed', description: 'Triggered after the dining experience ends' },
];

const ApiDocumentation = () => {
  return (
    <>
      <Helmet>
        <title>API Documentation | Agent14</title>
        <meta name="description" content="Integrate Agent14's AI-powered reservation system with your external systems using our REST API." />
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
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Code className="w-4 h-4" />
              Developer Documentation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Agent14 API
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Integrate Agent14's AI-powered reservation system directly into your POS, CRM, or any external system with our RESTful API.
            </p>
          </div>

          {/* Quick Start Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-border">
              <CardHeader>
                <Key className="w-8 h-8 text-gold mb-2" />
                <CardTitle className="text-lg">Authentication</CardTitle>
                <CardDescription>Secure API key-based authentication</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={`Authorization: Bearer YOUR_API_KEY`} />
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Globe className="w-8 h-8 text-gold mb-2" />
                <CardTitle className="text-lg">Base URL</CardTitle>
                <CardDescription>All API requests go to this endpoint</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={`https://api.agent14.online/v1`} />
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Zap className="w-8 h-8 text-gold mb-2" />
                <CardTitle className="text-lg">Rate Limits</CardTitle>
                <CardDescription>Request limits per minute</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Standard:</span> 100 req/min</p>
                  <p><span className="font-medium">Enterprise:</span> 1000 req/min</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gold" />
              API Endpoints
            </h2>

            <Tabs defaultValue="reservations" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="reservations">Reservations</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>

              <TabsContent value="reservations" className="space-y-6">
                {endpoints.slice(0, 4).map((endpoint, index) => (
                  <Card key={index} className="border-border">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs font-bold rounded ${
                          endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                          endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                          endpoint.method === 'PATCH' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-foreground font-mono">{endpoint.path}</code>
                      </div>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Request</p>
                          <CodeBlock code={endpoint.request} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Response</p>
                          <CodeBlock code={endpoint.response} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="availability" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 text-xs font-bold rounded bg-blue-500/20 text-blue-400">GET</span>
                      <code className="text-foreground font-mono">/v1/availability</code>
                    </div>
                    <CardDescription>Check restaurant availability for a specific date and party size</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Request</p>
                        <CodeBlock code={endpoints[4].request} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Response</p>
                        <CodeBlock code={endpoints[4].response} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="webhooks" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 text-xs font-bold rounded bg-green-500/20 text-green-400">POST</span>
                      <code className="text-foreground font-mono">/v1/webhooks</code>
                    </div>
                    <CardDescription>Register a webhook to receive real-time reservation events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Request</p>
                        <CodeBlock code={endpoints[5].request} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Response</p>
                        <CodeBlock code={endpoints[5].response} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Available Webhook Events</CardTitle>
                    <CardDescription>Subscribe to these events to receive real-time notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {webhookEvents.map((event, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <code className="text-sm text-gold font-mono">{event.event}</code>
                          <span className="text-sm text-muted-foreground">{event.description}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Security Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              Security & Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">API Key Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>• Never expose your API key in client-side code</p>
                  <p>• Rotate your keys regularly (recommended: every 90 days)</p>
                  <p>• Use environment variables to store keys</p>
                  <p>• Restrict API keys to specific IP addresses when possible</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Webhook Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>• Verify webhook signatures using HMAC-SHA256</p>
                  <p>• Check the X-Agent14-Signature header</p>
                  <p>• Respond with 200 OK within 5 seconds</p>
                  <p>• Implement idempotency for duplicate events</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Start Examples</h2>

            <Tabs defaultValue="curl" className="w-full">
              <TabsList>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>

              <TabsContent value="curl">
                <CodeBlock code={`curl -X POST https://api.agent14.online/v1/reservations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "restaurant_id": "rest_abc123",
    "guest_name": "John Doe",
    "guest_email": "john@example.com",
    "party_size": 4,
    "date": "2024-12-15",
    "time": "19:00"
  }'`} />
              </TabsContent>

              <TabsContent value="javascript">
                <CodeBlock code={`const response = await fetch('https://api.agent14.online/v1/reservations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    restaurant_id: 'rest_abc123',
    guest_name: 'John Doe',
    guest_email: 'john@example.com',
    party_size: 4,
    date: '2024-12-15',
    time: '19:00'
  })
});

const reservation = await response.json();
console.log(reservation);`} />
              </TabsContent>

              <TabsContent value="python">
                <CodeBlock code={`import requests

response = requests.post(
    'https://api.agent14.online/v1/reservations',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'restaurant_id': 'rest_abc123',
        'guest_name': 'John Doe',
        'guest_email': 'john@example.com',
        'party_size': 4,
        'date': '2024-12-15',
        'time': '19:00'
    }
)

reservation = response.json()
print(reservation)`} />
              </TabsContent>
            </Tabs>
          </section>

          {/* CTA */}
          <section className="text-center py-12 px-6 bg-gradient-to-br from-primary/10 to-gold/10 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Integrate?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Contact our team to get your API credentials and start building your integration today.
            </p>
            <a href="mailto:api@agent14.online">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Request API Access
              </Button>
            </a>
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

export default ApiDocumentation;
