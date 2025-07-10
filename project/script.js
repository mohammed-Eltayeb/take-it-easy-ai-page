// Medical AI Assistant JavaScript
class MedicalAI {
    constructor() {
        this.symptoms = '';
        this.age = '';
        this.gender = '';
        this.duration = '';
        this.medicalDatabase = this.initializeMedicalDatabase();
        this.init();
    }

    init() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.addEventListener('click', () => this.analyzeSymptoms());
        
        // Add enter key support for textarea
        const symptomsTextarea = document.getElementById('symptoms');
        symptomsTextarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.analyzeSymptoms();
            }
        });
    }

    initializeMedicalDatabase() {
        return {
            conditions: [
                {
                    name: 'Common Cold',
                    symptoms: ['cough', 'sneezing', 'runny nose', 'mild headache', 'low fever', 'congestion', 'sore throat'],
                    treatments: [
                        'Get plenty of rest at home',
                        'Drink warm fluids frequently',
                        'Take vitamin C supplements',
                        'Use saline nasal rinse',
                        'Take pain relievers as needed'
                    ],
                    severity: 'Low',
                    duration: '1-2 weeks'
                },
                {
                    name: 'Sore Throat',
                    symptoms: ['throat pain', 'difficulty swallowing', 'swollen tonsils', 'fever', 'headache'],
                    treatments: [
                        'Gargle with warm salt water',
                        'Drink warm liquids',
                        'Take pain relievers',
                        'Use throat lozenges',
                        'See a doctor if symptoms persist'
                    ],
                    severity: 'Moderate',
                    duration: '3-7 days'
                },
                {
                    name: 'Migraine',
                    symptoms: ['severe headache', 'nausea', 'vomiting', 'light sensitivity', 'sound sensitivity', 'dizziness'],
                    treatments: [
                        'Rest in a dark, quiet room',
                        'Apply cold compress to forehead',
                        'Take prescribed migraine medication',
                        'Avoid known triggers',
                        'Consult a neurologist'
                    ],
                    severity: 'Moderate to High',
                    duration: '4-72 hours'
                },
                {
                    name: 'Gastritis',
                    symptoms: ['stomach pain', 'nausea', 'vomiting', 'bloating', 'heartburn', 'loss of appetite'],
                    treatments: [
                        'Eat small, frequent meals',
                        'Avoid spicy and fatty foods',
                        'Drink plenty of water',
                        'Take antacids',
                        'Consult a gastroenterologist'
                    ],
                    severity: 'Moderate',
                    duration: '3-7 days'
                },
                {
                    name: 'Influenza (Flu)',
                    symptoms: ['high fever', 'dry cough', 'body aches', 'severe fatigue', 'headache', 'chills'],
                    treatments: [
                        'Complete bed rest',
                        'Drink plenty of fluids',
                        'Take fever reducers',
                        'Take antiviral medication if prescribed',
                        'See a doctor if symptoms worsen'
                    ],
                    severity: 'Moderate to High',
                    duration: '1-2 weeks'
                },
                {
                    name: 'Sinusitis',
                    symptoms: ['nasal congestion', 'facial pain', 'headache', 'colored nasal discharge', 'loss of smell'],
                    treatments: [
                        'Use saline nasal spray',
                        'Steam inhalation',
                        'Take decongestants',
                        'Apply warm compress to face',
                        'See doctor for antibiotics if needed'
                    ],
                    severity: 'Moderate',
                    duration: '1-2 weeks'
                },
                {
                    name: 'Urinary Tract Infection',
                    symptoms: ['burning urination', 'frequent urination', 'lower abdominal pain', 'cloudy urine', 'strong urine odor'],
                    treatments: [
                        'Drink plenty of water',
                        'Take cranberry supplements',
                        'Avoid irritating beverages',
                        'See doctor for antibiotics',
                        'Maintain good hygiene'
                    ],
                    severity: 'Moderate',
                    duration: '3-7 days with treatment'
                },
                {
                    name: 'Seasonal Allergies',
                    symptoms: ['frequent sneezing', 'itchy eyes', 'runny nose', 'congestion', 'throat irritation'],
                    treatments: [
                        'Avoid allergen triggers',
                        'Take antihistamines',
                        'Use nasal saline rinse',
                        'Keep windows closed during allergy season',
                        'Consult an allergist'
                    ],
                    severity: 'Low to Moderate',
                    duration: 'Seasonal'
                },
                {
                    name: 'Food Poisoning',
                    symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'fever', 'dehydration'],
                    treatments: [
                        'Stay hydrated with clear fluids',
                        'Rest and avoid solid foods initially',
                        'Gradually reintroduce bland foods',
                        'Take probiotics',
                        'Seek medical attention if severe'
                    ],
                    severity: 'Moderate',
                    duration: '1-3 days'
                },
                {
                    name: 'Tension Headache',
                    symptoms: ['mild to moderate headache', 'pressure around head', 'neck stiffness', 'stress', 'fatigue'],
                    treatments: [
                        'Apply heat or cold to head/neck',
                        'Practice relaxation techniques',
                        'Take over-the-counter pain relievers',
                        'Get adequate sleep',
                        'Manage stress levels'
                    ],
                    severity: 'Low to Moderate',
                    duration: '30 minutes to several hours'
                }
            ]
        };
    }

    analyzeSymptoms() {
        // Get input values
        this.symptoms = document.getElementById('symptoms').value.trim();
        this.age = document.getElementById('age').value;
        this.gender = document.getElementById('gender').value;
        this.duration = document.getElementById('duration').value;

        // Validate input
        if (!this.symptoms) {
            alert('Please enter your symptoms first');
            return;
        }

        // Show loading
        this.showLoading();

        // Simulate AI processing delay
        setTimeout(() => {
            const diagnosis = this.processDiagnosis();
            this.displayResults(diagnosis);
            this.hideLoading();
        }, 2000);
    }

    processDiagnosis() {
        const symptomsLower = this.symptoms.toLowerCase();
        const matches = [];

        // Analyze symptoms against database
        this.medicalDatabase.conditions.forEach(condition => {
            let matchScore = 0;
            let matchedSymptoms = [];

            condition.symptoms.forEach(symptom => {
                if (symptomsLower.includes(symptom) || this.checkSimilarSymptoms(symptomsLower, symptom)) {
                    matchScore++;
                    matchedSymptoms.push(symptom);
                }
            });

            if (matchScore > 0) {
                const probability = Math.min((matchScore / condition.symptoms.length) * 100, 95);
                matches.push({
                    condition: condition,
                    probability: probability,
                    matchedSymptoms: matchedSymptoms
                });
            }
        });

        // Sort by probability
        matches.sort((a, b) => b.probability - a.probability);

        // If no matches, provide general advice
        if (matches.length === 0) {
            matches.push({
                condition: {
                    name: 'Unspecified Condition',
                    treatments: [
                        'Rest and maintain general health',
                        'Stay hydrated',
                        'Monitor symptoms',
                        'Consult a healthcare provider if symptoms persist',
                        'Avoid self-diagnosis'
                    ],
                    severity: 'Unknown',
                    duration: 'Variable'
                },
                probability: 0,
                matchedSymptoms: []
            });
        }

        return matches.slice(0, 3); // Return top 3 matches
    }

    checkSimilarSymptoms(userSymptoms, conditionSymptom) {
        const synonyms = {
            'headache': ['head pain', 'head ache', 'migraine'],
            'fever': ['temperature', 'hot', 'feverish'],
            'cough': ['coughing', 'hack'],
            'nausea': ['sick', 'queasy', 'upset stomach'],
            'pain': ['ache', 'hurt', 'sore'],
            'dizziness': ['dizzy', 'lightheaded', 'vertigo']
        };

        for (const [key, values] of Object.entries(synonyms)) {
            if (conditionSymptom.includes(key)) {
                return values.some(synonym => userSymptoms.includes(synonym));
            }
        }

        return false;
    }

    showLoading() {
        document.getElementById('loadingDiv').style.display = 'block';
        document.getElementById('resultsDiv').style.display = 'none';
        document.getElementById('analyzeBtn').disabled = true;
    }

    hideLoading() {
        document.getElementById('loadingDiv').style.display = 'none';
        document.getElementById('resultsDiv').style.display = 'block';
        document.getElementById('analyzeBtn').disabled = false;
    }

    displayResults(diagnosis) {
        // Display diagnosis
        const diagnosisContent = document.getElementById('diagnosisContent');
        diagnosisContent.innerHTML = this.formatDiagnosis(diagnosis);

        // Display treatment
        const treatmentContent = document.getElementById('treatmentContent');
        treatmentContent.innerHTML = this.formatTreatment(diagnosis[0]);

        // Scroll to results
        document.getElementById('resultsDiv').scrollIntoView({ behavior: 'smooth' });
    }

    formatDiagnosis(diagnosis) {
        let html = '<ul class="diagnosis-list">';
        
        diagnosis.forEach(item => {
            const probabilityClass = this.getProbabilityClass(item.probability);
            html += `
                <li>
                    <div class="probability ${probabilityClass}">${Math.round(item.probability)}%</div>
                    <div>
                        <strong>${item.condition.name}</strong><br>
                        <small style="color: #999;">Severity: ${item.condition.severity}</small>
                        ${item.condition.duration ? `<br><small style="color: #999;">Expected Duration: ${item.condition.duration}</small>` : ''}
                    </div>
                </li>
            `;
        });
        
        html += '</ul>';
        return html;
    }

    formatTreatment(diagnosisItem) {
        let html = '<ul class="treatment-list">';
        
        diagnosisItem.condition.treatments.forEach((treatment, index) => {
            html += `
                <li>
                    <div style="background: #333; color: #fff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">
                        ${index + 1}
                    </div>
                    <div>${treatment}</div>
                </li>
            `;
        });
        
        html += '</ul>';
        return html;
    }

    getProbabilityClass(probability) {
        if (probability >= 70) return 'high-probability';
        if (probability >= 40) return 'medium-probability';
        return 'low-probability';
    }
}

// Initialize the Medical AI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MedicalAI();
});

// Add some additional interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Add typing effect to placeholder
    const textarea = document.getElementById('symptoms');
    const originalPlaceholder = textarea.placeholder;
    
    textarea.addEventListener('focus', () => {
        textarea.placeholder = 'Describe your symptoms in detail...';
    });
    
    textarea.addEventListener('blur', () => {
        if (!textarea.value) {
            textarea.placeholder = originalPlaceholder;
        }
    });

    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter to analyze
        if (e.ctrlKey && e.key === 'Enter') {
            document.getElementById('analyzeBtn').click();
        }
        
        // Escape to clear results
        if (e.key === 'Escape') {
            const resultsDiv = document.getElementById('resultsDiv');
            if (resultsDiv.style.display === 'block') {
                resultsDiv.style.display = 'none';
            }
        }
    });
});