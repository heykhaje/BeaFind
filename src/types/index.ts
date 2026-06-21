export type OpportunityCategory = string;

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  deadline: string;
  deadlineUrgent?: boolean;
  description: string;
  location?: string;
  requirements?: unknown;
  benefits?: unknown;
  featured?: boolean;
}

export interface CarouselSlide {
  id: string;
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  buttonText: string;
  buttonClass: string;
  bgClass: string;
  icon: string;
  iconClass: string;
  href: string;
}

export interface HelpArticle {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}
