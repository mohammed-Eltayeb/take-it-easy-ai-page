import { DiagnosisResponse } from '../types/medical';

const medicalKnowledge = {
  // Fever-related conditions
  fever: {
    condition: 'Viral Infection (Flu-like illness)',
    description: 'A common viral infection affecting the respiratory system, often accompanied by fever, body aches, and fatigue.',
    confidence: 85,
    severity: 'Moderate' as const,
    treatments: [
      'Get plenty of rest and sleep',
      'Drink lots of fluids (water, herbal teas, warm broths)',
      'Take fever reducers like acetaminophen or ibuprofen',
      'Use a humidifier or breathe steam from hot shower',
      'Eat light, nutritious foods when appetite returns'
    ],
    advice: [
      'Monitor temperature regularly - seek medical care if fever exceeds 103°F (39.4°C)',
      'Stay home to rest and avoid spreading infection to others',
      'Contact doctor if symptoms worsen or persist beyond 7-10 days',
      'Seek immediate medical attention if experiencing difficulty breathing'
    ]
  },

  // Headache-related conditions
  headache: {
    condition: 'Tension Headache',
    description: 'The most common type of headache, often caused by stress, muscle tension, or dehydration.',
    confidence: 80,
    severity: 'Mild' as const,
    treatments: [
      'Apply cold or warm compress to head or neck',
      'Take over-the-counter pain relievers (acetaminophen, ibuprofen)',
      'Practice relaxation techniques and deep breathing',
      'Ensure adequate hydration by drinking water',
      'Get adequate sleep and maintain regular sleep schedule'
    ],
    advice: [
      'Keep a headache diary to identify triggers',
      'Limit screen time and take regular breaks',
      'If headaches are frequent or severe, consult a healthcare provider',
      'Seek immediate care for sudden, severe headaches or those with vision changes'
    ]
  },

  // Stomach/digestive issues
  stomach: {
    condition: 'Gastroenteritis (Stomach Bug)',
    description: 'Inflammation of the stomach and intestines, commonly caused by viral or bacterial infection.',
    confidence: 75,
    severity: 'Moderate' as const,
    treatments: [
      'Stay hydrated with clear fluids, electrolyte solutions',
      'Follow BRAT diet (bananas, rice, applesauce, toast)',
      'Avoid dairy, fatty, and spicy foods temporarily',
      'Take probiotics to restore healthy gut bacteria',
      'Rest and avoid strenuous activities'
    ],
    advice: [
      'Seek medical care if experiencing signs of severe dehydration',
      'Contact doctor if symptoms persist more than 3 days',
      'Watch for blood in vomit or stool - seek immediate care',
      'Gradually return to normal diet as symptoms improve'
    ]
  },

  // Respiratory symptoms
  cough: {
    condition: 'Upper Respiratory Infection',
    description: 'Infection of the nose, throat, and upper airways, commonly caused by viruses.',
    confidence: 80,
    severity: 'Mild' as const,
    treatments: [
      'Use throat lozenges or gargle with warm salt water',
      'Drink warm liquids like tea with honey',
      'Use a humidifier to add moisture to the air',
      'Take cough suppressants if cough is dry and persistent',
      'Get plenty of rest to help your body fight the infection'
    ],
    advice: [
      'Avoid smoking and secondhand smoke',
      'Cover coughs and wash hands frequently',
      'See doctor if cough persists more than 2 weeks',
      'Seek immediate care if experiencing difficulty breathing or chest pain'
    ]
  },

  // Chest pain - emergency
  chest: {
    condition: 'Possible Cardiac Event',
    description: 'Chest pain can indicate serious heart conditions requiring immediate medical evaluation.',
    confidence: 90,
    severity: 'Severe' as const,
    treatments: [
      'Call emergency services (911) immediately',
      'Chew aspirin if not allergic and no contraindications',
      'Sit upright and try to stay calm',
      'Loosen tight clothing around chest and neck',
      'Do not drive yourself to hospital'
    ],
    advice: [
      'This is a medical emergency - seek immediate professional care',
      'Do not delay seeking treatment',
      'Have someone stay with you until help arrives',
      'Provide medical history and current medications to emergency responders'
    ]
  },

  // General/default response
  general: {
    condition: 'General Health Concern',
    description: 'Based on your symptoms, this appears to be a common health issue that may benefit from basic care and monitoring.',
    confidence: 70,
    severity: 'Mild' as const,
    treatments: [
      'Get adequate rest and sleep',
      'Stay well hydrated with water and healthy fluids',
      'Eat a balanced, nutritious diet',
      'Take over-the-counter medications as appropriate',
      'Monitor symptoms and note any changes'
    ],
    advice: [
      'Keep track of your symptoms and their progression',
      'Consult with a healthcare provider if symptoms persist or worsen',
      'Maintain good hygiene and healthy lifestyle habits',
      'Seek medical attention if you develop concerning new symptoms'
    ]
  }
};

export function analyzeSymptoms(symptomsText: string): DiagnosisResponse {
  const text = symptomsText.toLowerCase();
  
  // Emergency symptoms - chest pain
  if (text.includes('chest pain') || text.includes('chest pressure') || text.includes('heart pain')) {
    return medicalKnowledge.chest;
  }
  
  // Fever-related symptoms
  if (text.includes('fever') || text.includes('temperature') || text.includes('hot') || text.includes('chills')) {
    return medicalKnowledge.fever;
  }
  
  // Headache symptoms
  if (text.includes('headache') || text.includes('head pain') || text.includes('migraine')) {
    return medicalKnowledge.headache;
  }
  
  // Digestive symptoms
  if (text.includes('stomach') || text.includes('nausea') || text.includes('vomit') || 
      text.includes('diarrhea') || text.includes('abdominal') || text.includes('belly')) {
    return medicalKnowledge.stomach;
  }
  
  // Respiratory symptoms
  if (text.includes('cough') || text.includes('throat') || text.includes('cold') || 
      text.includes('runny nose') || text.includes('congestion')) {
    return medicalKnowledge.cough;
  }
  
  // Default response for unrecognized symptoms
  return medicalKnowledge.general;
}