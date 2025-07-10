export interface DiagnosisResponse {
  condition: string;
  description: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  treatments: string[];
  advice: string[];
}