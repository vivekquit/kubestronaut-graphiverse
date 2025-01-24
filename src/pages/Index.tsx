import KnowledgeGraph from "@/components/KnowledgeGraph";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Kubestronaut Knowledge Graph
          </h1>
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Kubernetes Learning Path
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Track your progress through the Kubernetes certification ecosystem and discover learning paths
          </p>
        </div>
        <KnowledgeGraph />
      </div>
    </div>
  );
};

export default Index;