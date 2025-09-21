import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DemoSection from '../components/DemoSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import Particles from '../components/Particles';

const Index = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden relative">
      {/* WebGL Particles Background */}
      <Particles
        particleCount={300}
        particleColors={['#ffffff', '#00ffcc', '#ff00ff']}
        moveParticlesOnHover={true}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <AboutSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-border/20">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Space Safety AI - Hackathon Demo Project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
