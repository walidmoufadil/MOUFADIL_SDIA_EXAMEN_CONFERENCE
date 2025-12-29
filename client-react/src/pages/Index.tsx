import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Star, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/loading-spinner';

const Index = () => {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-hero">
        <div className="container flex flex-col items-center justify-center min-h-screen py-20">
          <div className="text-center space-y-6 max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              Gestion de conférences simplifiée
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent gradient-primary">
                ConferenceHub
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La plateforme complète pour organiser, gérer et suivre vos conférences 
              et keynotes en toute simplicité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={login}
                className="gradient-primary text-primary-foreground shadow-glow text-lg px-8"
              >
                Commencer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl animate-slide-up" style={{ animationDelay: '200ms' }}>
            {[
              {
                icon: Calendar,
                title: 'Gestion des conférences',
                description: 'Créez et organisez vos conférences académiques ou commerciales en quelques clics.',
              },
              {
                icon: Users,
                title: 'Keynote speakers',
                description: 'Gérez votre base de données de speakers et assignez-les à vos événements.',
              },
              {
                icon: Star,
                title: 'Reviews & notation',
                description: 'Collectez les avis et suivez les scores de satisfaction de chaque événement.',
              },
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-primary mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 flex items-center gap-8 text-muted-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Sécurisé par Keycloak</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-secondary" />
              <span className="text-sm">Architecture microservices</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Bienvenue sur <span className="bg-clip-text text-transparent gradient-primary">ConferenceHub</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gérez vos conférences et keynotes en toute simplicité
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link to="/conferences">
            <Card className="group cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-primary mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-7 w-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Conférences</CardTitle>
                <CardDescription className="text-base">
                  Gérez vos événements, suivez les inscriptions et les scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-primary">
                  Voir les conférences
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/keynotes">
            <Card className="group cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Keynotes</CardTitle>
                <CardDescription className="text-base">
                  Gérez vos speakers et leurs informations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-secondary">
                  Voir les keynotes
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
