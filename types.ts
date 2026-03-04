
export type PostCategory = 'Study Guide' | 'Project Insight' | 'Note' | 'Funding Guide' | 'Funding Insight' | 'Methodology' | 'Eligibility' | 'Proposal Strategy' | 'Technical Guide' | 'Research Gaps' | 'Impact Strategy';

export interface Post {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  date: string;
  author: string;
  readTime: string;
  imageUrl?: string;
  faqSchema?: { question: string; answer: string }[];
}

export interface GeminiSummary {
  summary: string;
  keyTakeaways: string[];
}
