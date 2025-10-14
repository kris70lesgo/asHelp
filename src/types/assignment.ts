export interface AssignmentFormData {
  topic: string;
  subject: string;
  wordCount: string;
  level: 'high-school' | 'undergraduate' | 'graduate' | 'phd';
  requirements: string;
}

export interface GeneratedAssignment {
  content: string;
  topic: string;
  subject: string;
  wordCount?: number;
  generatedAt: Date;
}

export interface ExportOptions {
  format: 'pdf' | 'docx';
  filename: string;
  includeImages?: boolean;
}

export interface APIResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}