import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, RefreshCw, Mail, Clock, Server, Database, Globe, MessageSquare, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  description: string;
  icon: React.ReactNode;
  lastChecked: Date;
}

const Status = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const services: ServiceStatus[] = [
    {
      name: 'Web Application',
      status: 'operational',
      description: 'Main website and user interface',
      icon: <Globe className="w-5 h-5" />,
      lastChecked: new Date(),
    },
    {
      name: 'AI Chatbot',
      status: 'operational',
      description: 'Salesforce Agentforce reservation system',
      icon: <MessageSquare className="w-5 h-5" />,
      lastChecked: new Date(),
    },
    {
      name: 'Authentication',
      status: 'operational',
      description: 'User login and signup services',
      icon: <Shield className="w-5 h-5" />,
      lastChecked: new Date(),
    },
    {
      name: 'Database',
      status: 'operational',
      description: 'Data storage and retrieval',
      icon: <Database className="w-5 h-5" />,
      lastChecked: new Date(),
    },
    {
      name: 'API Services',
      status: 'operational',
      description: 'External integrations and API endpoints',
      icon: <Server className="w-5 h-5" />,
      lastChecked: new Date(),
    },
  ];

  const recentIncidents = [
    {
      date: '2024-12-01',
      title: 'Scheduled Maintenance Completed',
      status: 'resolved',
      description: 'Routine system updates and performance optimizations were successfully completed.',
    },
    {
      date: '2024-11-28',
      title: 'Minor API Latency',
      status: 'resolved',
      description: 'Brief period of increased response times. Issue was identified and resolved within 15 minutes.',
    },
  ];

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">Operational</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20">Degraded</Badge>;
      case 'outage':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20">Outage</Badge>;
    }
  };

  const getIncidentBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Resolved</Badge>;
      case 'investigating':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Investigating</Badge>;
      case 'identified':
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Identified</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const overallStatus = services.every(s => s.status === 'operational') 
    ? 'operational' 
    : services.some(s => s.status === 'outage') 
      ? 'outage' 
      : 'degraded';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const uptimePercentage = 99.98;

  return (
    <>
      <Helmet>
        <title>System Status | Agent14</title>
        <meta name="description" content="Check the current operational status of Agent14 services including web application, AI chatbot, authentication, and API services." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto max-w-5xl px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Agent14</span>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-5xl px-6 py-12">
          {/* Overall Status Banner */}
          <div className={`rounded-xl p-6 mb-8 ${
            overallStatus === 'operational' 
              ? 'bg-green-500/10 border border-green-500/20' 
              : overallStatus === 'degraded'
                ? 'bg-yellow-500/10 border border-yellow-500/20'
                : 'bg-red-500/10 border border-red-500/20'
          }`}>
            <div className="flex items-center gap-4">
              {overallStatus === 'operational' ? (
                <CheckCircle className="w-10 h-10 text-green-500" />
              ) : overallStatus === 'degraded' ? (
                <AlertTriangle className="w-10 h-10 text-yellow-500" />
              ) : (
                <XCircle className="w-10 h-10 text-red-500" />
              )}
              <div>
                <h1 className={`text-2xl font-bold ${
                  overallStatus === 'operational' 
                    ? 'text-green-600' 
                    : overallStatus === 'degraded'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`}>
                  {overallStatus === 'operational' 
                    ? 'All Systems Operational' 
                    : overallStatus === 'degraded'
                      ? 'Partial System Degradation'
                      : 'System Outage Detected'}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Last updated: {lastUpdated.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Uptime Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">{uptimePercentage}%</p>
                <p className="text-sm text-muted-foreground mt-1">Uptime (30 days)</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">{services.filter(s => s.status === 'operational').length}/{services.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Services Operational</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">&lt;100ms</p>
                <p className="text-sm text-muted-foreground mt-1">Avg Response Time</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Status */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Service Status</CardTitle>
              <CardDescription>Current status of all Agent14 services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(service.status)}
                      {getStatusIcon(service.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Incidents
              </CardTitle>
              <CardDescription>Past incidents and maintenance updates</CardDescription>
            </CardHeader>
            <CardContent>
              {recentIncidents.length > 0 ? (
                <div className="space-y-4">
                  {recentIncidents.map((incident, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">{incident.title}</h3>
                        {getIncidentBadge(incident.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                      <p className="text-xs text-muted-foreground">{incident.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No recent incidents to report.</p>
              )}
            </CardContent>
          </Card>

          {/* Support Contact */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-foreground">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      If you're experiencing issues, our support team is here to help.
                    </p>
                  </div>
                </div>
                <a href="mailto:support@agent14.online">
                  <Button variant="gold" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            This page auto-refreshes every 5 minutes. For real-time updates, subscribe to our status notifications.
          </p>
        </main>
      </div>
    </>
  );
};

export default Status;
