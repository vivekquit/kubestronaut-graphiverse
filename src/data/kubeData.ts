export const kubeData = {
  nodes: [
    { id: "pod", label: "Pod", group: "core" },
    { id: "deployment", label: "Deployment", group: "workload" },
    { id: "service", label: "Service", group: "service" },
    { id: "configmap", label: "ConfigMap", group: "config" },
    { id: "secret", label: "Secret", group: "config" },
    { id: "volume", label: "Volume", group: "storage" },
    { id: "namespace", label: "Namespace", group: "core" },
    { id: "node", label: "Node", group: "core" }
  ],
  links: [
    { source: "deployment", target: "pod", value: 1 },
    { source: "service", target: "pod", value: 1 },
    { source: "pod", target: "volume", value: 1 },
    { source: "pod", target: "configmap", value: 1 },
    { source: "pod", target: "secret", value: 1 },
    { source: "namespace", target: "pod", value: 1 },
    { source: "node", target: "pod", value: 1 }
  ]
};