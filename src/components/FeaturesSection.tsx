const features = [
  {
    title: 'Real-time Monitoring',
    description: 'Continuous analysis of spacecraft systems, crew, and environment with anomaly detection.',
    icon: '🛰️',
    gradient: 'from-neon-blue to-neon-blue',
    glowColor: 'shadow-glow',
  },
  {
    title: 'Predictive Analysis',
    description: 'AI algorithms predict risks and failures before they occur for proactive safety.',
    icon: '🔮',
    gradient: 'from-neon-purple to-neon-purple',
    glowColor: 'shadow-glow-purple',
  },
  {
    title: 'Emergency Response',
    description: 'Instant emergency protocols with communication to ground control and automated countermeasures.',
    icon: '🚨',
    gradient: 'from-neon-green to-neon-green',
    glowColor: 'shadow-glow-green',
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Why Space Safety AI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered safety systems designed for the unique challenges of space exploration.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-gradient-surface rounded-xl border border-border hover:border-neon-blue/30 transition-all duration-500 hover:scale-105 hover:${feature.glowColor} animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glow effect overlay */}
              <div className="absolute inset-0 bg-gradient-glow rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-6 group-hover:animate-float">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;