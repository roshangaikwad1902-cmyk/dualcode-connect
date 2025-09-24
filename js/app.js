// SwasthyaSetu Application JavaScript

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Sample data for demo purposes
const namasteCodesData = [
    { code: 'NMT123', name: 'Jwara', description: 'Fever symptoms' },
    { code: 'NMT124', name: 'Kasa', description: 'Cough and cold' },
    { code: 'NMT125', name: 'Shwasa', description: 'Breathing disorders' },
    { code: 'NMT126', name: 'Atisara', description: 'Diarrhea' },
    { code: 'NMT127', name: 'Arsha', description: 'Hemorrhoids' }
];

const icd11CodesData = [
    { code: 'ICD11:1A00', name: 'Typhoid Fever', description: 'Bacterial infection' },
    { code: 'ICD11:1A01', name: 'Paratyphoid Fever', description: 'Related bacterial infection' },
    { code: 'ICD11:CA80', name: 'Cough', description: 'Respiratory symptom' },
    { code: 'ICD11:MD11', name: 'Dyspnoea', description: 'Difficulty breathing' },
    { code: 'ICD11:DD90', name: 'Diarrhoea', description: 'Digestive disorder' }
];

const codeMappings = {
    'NMT123': { icd11: 'ICD11:1A00', confidence: 92 },
    'NMT124': { icd11: 'ICD11:CA80', confidence: 87 },
    'NMT125': { icd11: 'ICD11:MD11', confidence: 94 },
    'NMT126': { icd11: 'ICD11:DD90', confidence: 89 },
    'NMT127': { icd11: 'ICD11:K64', confidence: 85 }
};

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                resultsContainer.classList.add('hidden');
                return;
            }
            
            const namasteResults = namasteCodesData.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            );
            
            const icd11Results = icd11CodesData.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            );
            
            displaySearchResults(namasteResults, icd11Results);
            resultsContainer.classList.remove('hidden');
        });
    }
}

function displaySearchResults(namasteResults, icd11Results) {
    const namasteColumn = document.getElementById('namasteResults');
    const icd11Column = document.getElementById('icd11Results');
    
    // Display NAMASTE results
    namasteColumn.innerHTML = namasteResults.map(result => `
        <div class="code-result">
            <div class="code-name">${result.name}</div>
            <div class="code-id">${result.code}</div>
            <div class="code-description">${result.description}</div>
        </div>
    `).join('');
    
    // Display ICD-11 results
    icd11Column.innerHTML = icd11Results.map(result => `
        <div class="code-result">
            <div class="code-name">${result.name}</div>
            <div class="code-id">${result.code}</div>
            <div class="code-description">${result.description}</div>
        </div>
    `).join('');
}

// Translation functionality
function setupTranslation() {
    const namasteSelect = document.getElementById('namasteSelect');
    const translationResult = document.getElementById('translationResult');
    
    if (namasteSelect) {
        // Populate NAMASTE dropdown
        namasteSelect.innerHTML = '<option value="">Select NAMASTE Code</option>' +
            namasteCodesData.map(code => 
                `<option value="${code.code}">${code.name} (${code.code})</option>`
            ).join('');
        
        namasteSelect.addEventListener('change', function(e) {
            const selectedCode = e.target.value;
            if (selectedCode && codeMappings[selectedCode]) {
                const mapping = codeMappings[selectedCode];
                const icd11Code = icd11CodesData.find(code => code.code === mapping.icd11);
                
                if (icd11Code) {
                    translationResult.innerHTML = `
                        <div class="translation-card">
                            <div class="mapping-result">
                                <h4>Translation Result</h4>
                                <div class="code-mapping">
                                    <div class="source-code">
                                        <span class="code-label">NAMASTE:</span>
                                        <span class="code-value">${selectedCode}</span>
                                    </div>
                                    <div class="arrow">→</div>
                                    <div class="target-code">
                                        <span class="code-label">ICD-11:</span>
                                        <span class="code-value">${icd11Code.code}</span>
                                    </div>
                                </div>
                                <div class="code-details">
                                    <div><strong>ICD-11 Name:</strong> ${icd11Code.name}</div>
                                    <div><strong>Confidence:</strong> <span class="confidence-score">${mapping.confidence}%</span></div>
                                </div>
                            </div>
                        </div>
                    `;
                    translationResult.classList.remove('hidden');
                }
            } else {
                translationResult.classList.add('hidden');
            }
        });
    }
}

// Encounter upload functionality
function setupEncounterUpload() {
    const uploadForm = document.getElementById('encounterForm');
    const namasteEncounterSelect = document.getElementById('namasteEncounterSelect');
    const icd11EncounterSelect = document.getElementById('icd11EncounterSelect');
    
    if (namasteEncounterSelect) {
        namasteEncounterSelect.innerHTML = '<option value="">Select NAMASTE Code</option>' +
            namasteCodesData.map(code => 
                `<option value="${code.code}">${code.name} (${code.code})</option>`
            ).join('');
    }
    
    if (icd11EncounterSelect) {
        icd11EncounterSelect.innerHTML = '<option value="">Select ICD-11 Code</option>' +
            icd11CodesData.map(code => 
                `<option value="${code.code}">${code.name} (${code.code})</option>`
            ).join('');
    }
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(uploadForm);
            const patientId = formData.get('patientId');
            const namasteCode = formData.get('namasteCode');
            const icd11Code = formData.get('icd11Code');
            
            // Simulate upload
            showUploadConfirmation(patientId, namasteCode, icd11Code);
        });
    }
}

function showUploadConfirmation(patientId, namasteCode, icd11Code) {
    const confirmationDiv = document.getElementById('uploadConfirmation');
    
    confirmationDiv.innerHTML = `
        <div class="confirmation-card fade-in">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Record Uploaded Successfully!</h3>
            <div class="confirmation-details">
                <p><strong>Patient ID:</strong> ${patientId}</p>
                <p><strong>NAMASTE Code:</strong> ${namasteCode}</p>
                <p><strong>ICD-11 Code:</strong> ${icd11Code}</p>
                <p class="success-message">Record stored with dual coding (demo)</p>
            </div>
        </div>
    `;
    
    confirmationDiv.classList.remove('hidden');
}

// Analytics chart setup
function setupAnalytics() {
    const chartContainer = document.getElementById('mappingChart');
    
    if (chartContainer) {
        // Create a simple pie chart using CSS
        chartContainer.innerHTML = `
            <div class="pie-chart">
                <div class="pie-segment mapped" style="--percentage: 80"></div>
                <div class="pie-segment unmapped" style="--percentage: 20"></div>
                <div class="pie-center">
                    <div class="pie-label">Mapping Status</div>
                </div>
            </div>
            <div class="chart-legend">
                <div class="legend-item">
                    <div class="legend-color mapped-color"></div>
                    <span>Mapped Codes (80%)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color unmapped-color"></div>
                    <span>Unmapped Codes (20%)</span>
                </div>
            </div>
        `;
        
        // Add additional CSS for pie chart
        if (!document.getElementById('pieChartStyles')) {
            const style = document.createElement('style');
            style.id = 'pieChartStyles';
            style.textContent = `
                .pie-chart {
                    position: relative;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background: conic-gradient(
                        var(--primary-blue) 0deg 288deg,
                        var(--gray-300) 288deg 360deg
                    );
                    margin: 0 auto 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .pie-center {
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    background: var(--white);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                
                .pie-label {
                    font-weight: 600;
                    color: var(--gray-900);
                    font-size: 0.9rem;
                }
                
                .chart-legend {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .legend-color {
                    width: 16px;
                    height: 16px;
                    border-radius: 4px;
                }
                
                .mapped-color {
                    background: var(--primary-blue);
                }
                
                .unmapped-color {
                    background: var(--gray-300);
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize functionality based on current page
function initializePage() {
    // Get current page from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'search.html':
            setupSearch();
            break;
        case 'translate.html':
            setupTranslation();
            break;
        case 'upload.html':
            setupEncounterUpload();
            break;
        case 'analytics.html':
            setupAnalytics();
            break;
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} fade-in`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}