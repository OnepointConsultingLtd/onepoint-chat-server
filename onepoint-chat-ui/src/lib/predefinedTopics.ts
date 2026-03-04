export const predefinedQuestions = [
  { id: 1, text: "How does Onepoint mitigate risk during large-scale transformations?", label: "", type: "predefined" },
  { id: 2, text: "How quickly can Onepoint help me to get a technical proof for an idea that I have?", label: "", type: "predefined" },
  { id: 3, text: "What technologies does Onepoint specialise in?", label: "", type: "predefined" },
  { id: 4, text: "How does Onepoint handle system integration with legacy architectures?", label: "", type: "predefined" },
  { id: 5, text: "What is Onepoint's approach to security and compliance?", label: "", type: "predefined" },
  { id: 6, text: "How does Onepoint handle scalability requirements?", label: "", type: "predefined" },
  { id: 7, text: "How does Onepoint ensure data quality and lineage across pipelines?", label: "", type: "predefined" },
  { id: 8, text: "How does Onepoint handle master data management?", label: "", type: "predefined" },
  { id: 9, text: "How does Onepoint support real-time vs. batch data processing?", label: "", type: "predefined" },
  { id: 10, text: "How does Onepoint handle CI/CD pipeline setup and automation?", label: "", type: "predefined" },
  { id: 11, text: "How does Onepoint approach containerization and orchestration (e.g. Kubernetes)?", label: "", type: "predefined" },
  { id: 12, text: "How does Onepoint manage environment parity (dev/staging/prod)?", label: "", type: "predefined" },
  { id: 13, text: "How does Onepoint approach technical upskilling and knowledge transfer?", label: "", type: "predefined" },
  { id: 14, text: "What does Onepoint's approach to data testing and validation look like?", label: "", type: "predefined" },
  { id: 15, text: "How does Onepoint approach schema design for large-scale data systems?", label: "", type: "predefined" },
  { id: 16, text: "How does Onepoint integrate data platforms with existing BI tools?", label: "", type: "predefined" },
  { id: 17, text: "How does Onepoint structure its pricing models (fixed, T&M, outcome-based)?", label: "", type: "predefined" },
  { id: 18, text: "What certifications or compliance standards does Onepoint hold?", label: "", type: "predefined" },
  { id: 19, text: "How does Onepoint handle data privacy and IP ownership in contracts?", label: "", type: "predefined" },
  { id: 20, text: "What kind of roles does Onepoint typically hire for?", label: "", type: "predefined" },
  { id: 21, text: "What technologies will I get hands-on experience with at Onepoint?", label: "", type: "predefined" },
  { id: 22, text: "What is Onepoint's culture like?", label: "", type: "predefined" },
];

/** Fisher-Yates shuffle - returns a new shuffled array */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
