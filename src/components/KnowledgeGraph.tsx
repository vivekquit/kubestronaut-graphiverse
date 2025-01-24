import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { kubeData } from '../data/kubeData';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface Node {
  id: string;
  group: string;
  label: string;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

export const KnowledgeGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth - 400;
    const height = window.innerHeight - 100;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation(kubeData.nodes as any)
      .force('link', d3.forceLink(kubeData.links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(kubeData.links)
      .join('line')
      .attr('class', 'link');

    const node = svg.append('g')
      .selectAll('circle')
      .data(kubeData.nodes)
      .join('circle')
      .attr('class', 'node')
      .attr('r', 20)
      .attr('fill', (d: any) => getNodeColor(d.group))
      .on('click', (event: any, d: Node) => {
        setSelectedNode(d);
      });

    const labels = svg.append('g')
      .selectAll('text')
      .data(kubeData.nodes)
      .join('text')
      .attr('class', 'node-label')
      .text((d: any) => d.label)
      .attr('dx', 25)
      .attr('dy', 5);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    return () => {
      simulation.stop();
    };
  }, [searchTerm]);

  const getNodeColor = (group: string) => {
    const colors: { [key: string]: string } = {
      'core': '#3B82F6',
      'workload': '#10B981',
      'service': '#F59E0B',
      'config': '#8B5CF6',
      'storage': '#EC4899'
    };
    return colors[group] || '#6B7280';
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Kubernetes concepts..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <svg ref={svgRef} />
      </div>
      
      {selectedNode && (
        <Card className="w-96 p-6 m-4 h-fit">
          <h2 className="text-2xl font-bold mb-4">{selectedNode.label}</h2>
          <p className="text-muted-foreground mb-2">Group: {selectedNode.group}</p>
          <p className="text-sm">
            {getNodeDescription(selectedNode.id)}
          </p>
        </Card>
      )}
    </div>
  );
};

function getNodeDescription(id: string): string {
  const descriptions: { [key: string]: string } = {
    'pod': 'The smallest deployable unit in Kubernetes that can be created and managed.',
    'deployment': 'Manages a replicated application on your cluster.',
    'service': 'An abstract way to expose an application running on a set of Pods.',
    'configmap': 'Stores non-confidential data in key-value pairs.',
    'secret': 'Stores and manages sensitive information.',
    // Add more descriptions as needed
  };
  return descriptions[id] || 'No description available.';
}