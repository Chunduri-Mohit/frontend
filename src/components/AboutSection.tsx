const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          About Space Safety AI
        </h2>

        {/* Main Content */}
        <div className="prose prose-lg mx-auto text-foreground">
          <p className="text-xl leading-relaxed mb-8 text-muted-foreground">
            Space Safety AI is a cutting-edge hackathon demonstration showcasing the power of artificial intelligence 
            in ensuring crew safety during space missions. Our system leverages advanced computer vision and machine 
            learning algorithms to provide real-time analysis of safety conditions in spacecraft environments.
          </p>

          {/* Key Points */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-neon-blue mt-3 shadow-glow" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Mission Critical Safety</h4>
                  <p className="text-muted-foreground">
                    Designed specifically for the unique challenges of space exploration where every safety measure is critical.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-neon-purple mt-3 shadow-glow-purple" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Advanced AI Detection</h4>
                  <p className="text-muted-foreground">
                    Utilizes state-of-the-art object detection models trained on space-specific safety equipment and hazards.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-neon-green mt-3 shadow-glow-green" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Real-time Processing</h4>
                  <p className="text-muted-foreground">
                    Instant analysis and feedback to ensure immediate response to potential safety issues.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 rounded-full bg-neon-orange mt-3" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Hackathon Demo</h4>
                  <p className="text-muted-foreground">
                    This prototype demonstrates the potential for AI-driven safety systems in future space missions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gradient-surface rounded-xl border border-neon-blue/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready for the Future of Space Safety</h3>
            <p className="text-muted-foreground mb-6">
              Experience how AI can revolutionize safety protocols in space exploration. 
              Try the demo above to see our detection system in action.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 rounded-lg font-semibold animate-glow-pulse"
              >
                Try the Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;