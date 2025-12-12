// components/SERPResults.jsx
import { ChevronRight } from 'lucide-react';

const SERPResults = ({ results = [] }) => {
  const defaultResults = [
    {
      id: 1,
      title: "AI in Education",
      description: "Explore our Agentic AI, Deep Learning solutions for personalized learning platforms. Transform educational outcomes with privacy-first technology.",
      url: "/ai-education"
    },
    {
      id: 2,
      title: "Personalized Learning Platforms",
      description: "Discover how our AI-driven solutions create customized learning experiences. Deep Knowledge Tracing and adaptive learning systems.",
      url: "/personalized-learning"
    },
    {
      id: 3,
      title: "Educational Technology Solutions",
      description: "Privacy-focused EdTech with end-to-end encryption. Secure learning platforms for institutions, students, and educators.",
      url: "/technology"
    },
    {
      id: 4,
      title: "Institutional Memory & Data Intelligence", 
      description: "Hyper-local information intelligence research. Data-driven decision making tools for educational institutions.",
      url: "/institutional-memory"
    },
    {
      id: 5,
      title: "Learning Ecosystem Management",
      description: "Comprehensive ecosystem management tools for Education 4.0. Digital transformation solutions for modern learning environments.",
      url: "/ecosystem"
    }
  ];

  const displayResults = results.length > 0 ? results : defaultResults;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-1">
        {displayResults.map((result) => (
          <div 
            key={result.id}
            className="group bg-white hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
          >
            <a 
              href={result.url}
              className="block px-6 py-5 text-decoration-none"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-2 group-hover:underline">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {result.description}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <ChevronRight 
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" 
                  />
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SERPResults;