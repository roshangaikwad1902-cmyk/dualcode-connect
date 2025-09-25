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

// Helpers for prefill transfer
function storePrefillSelection({ namasteCode, icd11Code, source, query, selectedItem }) {
    const payload = {
        namasteCode: namasteCode || '',
        icd11Code: icd11Code || '',
        source: source || 'search',
        query: query || '',
        selectedItem: selectedItem || null,
        timestamp: new Date().toISOString()
    };
    try {
        localStorage.setItem('swasthyasetu_prefill', JSON.stringify(payload));
    } catch (e) {
        // ignore storage errors
    }
}

function deriveBestMatchesFromQuery(query) {
    const q = (query || '').toLowerCase();
    const namaste = namasteCodesData.find(item =>
        item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.code.toLowerCase().includes(q)
    );
    const icd = icd11CodesData.find(item =>
        item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.code.toLowerCase().includes(q)
    );
    return { namasteCode: namaste ? namaste.code : '', icd11Code: icd ? icd.code : '' };
}

function mapBetweenSystemsFromSelection(selected) {
    if (!selected) return { namasteCode: '', icd11Code: '' };
    // If a NAMASTE code was selected
    if (selected.code && selected.code.startsWith('NMT')) {
        const mapping = codeMappings[selected.code];
        return { namasteCode: selected.code, icd11Code: mapping ? mapping.icd11 : '' };
    }
    // If an ICD11 code was selected: attempt reverse mapping
    if (selected.code && selected.code.startsWith('ICD11')) {
        const reverse = Object.entries(codeMappings).find(([nmt, map]) => map.icd11 === selected.code);
        return { namasteCode: reverse ? reverse[0] : '', icd11Code: selected.code };
    }
    // If only a name (static suggestion), try name match in both lists
    const byNameNamaste = namasteCodesData.find(i => i.name.toLowerCase().includes(selected.name.toLowerCase()));
    const byNameIcd = icd11CodesData.find(i => i.name.toLowerCase().includes(selected.name.toLowerCase()));
    return { namasteCode: byNameNamaste ? byNameNamaste.code : '', icd11Code: byNameIcd ? byNameIcd.code : '' };
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    const suggestionsList = document.getElementById('searchSuggestions');
    const addBtn = document.getElementById('addToPatientRecordBtn');
    
    if (searchInput) {
        let activeIndex = -1;
        let currentSuggestions = [];

        // Static quick suggestions and action
        const staticSuggestions = [
            { name: 'Fever', code: '', type: 'static' },
            { name: 'Cough', code: '', type: 'static' },
            { name: 'Breathing', code: '', type: 'static' },
            { name: 'Diarrhea', code: '', type: 'static' }
        ];
        const actionSuggestion = { name: 'Add to Patient Record', code: '', type: 'action' };

        function renderSuggestions(items) {
            if (!suggestionsList) return;
            if (!items.length) {
                suggestionsList.innerHTML = '';
                suggestionsList.classList.add('hidden');
                searchInput.setAttribute('aria-expanded', 'false');
                return;
            }
            suggestionsList.innerHTML = items.map((item, idx) => {
                if (item.type === 'action') {
                    return `
                <li class="autocomplete-item" role="option" data-index="${idx}" data-action="navigate-upload">
                    <i class="fas fa-notes-medical" aria-hidden="true"></i>
                    <span class="item-name">${item.name}</span>
                </li>`;
                }
                return `
                <li class="autocomplete-item" role="option" data-index="${idx}">
                    <i class="fas fa-stethoscope" aria-hidden="true"></i>
                    <span class="item-name">${item.name}</span>
                    ${item.code ? `<span class=\"item-code\">${item.code}</span>` : ''}
                </li>`;
            }).join('');
            suggestionsList.classList.remove('hidden');
            searchInput.setAttribute('aria-expanded', 'true');
        }

        function closeSuggestions() {
            if (!suggestionsList) return;
            suggestionsList.classList.add('hidden');
            searchInput.setAttribute('aria-expanded', 'false');
            activeIndex = -1;
        }

        function applySelection(index) {
            const selected = currentSuggestions[index];
            if (!selected) return;
            if (selected.type === 'action') {
                // Store best matches before navigating
                const matches = mapBetweenSystemsFromSelection(currentSuggestions.find(i => i.type !== 'action'));
                const fallbacks = deriveBestMatchesFromQuery(searchInput.value);
                storePrefillSelection({
                    namasteCode: matches.namasteCode || fallbacks.namasteCode,
                    icd11Code: matches.icd11Code || fallbacks.icd11Code,
                    source: 'search-action',
                    query: searchInput.value,
                    selectedItem: null
                });
                navigateTo('upload.html');
                return;
            }
            searchInput.value = `${selected.name}`;
            closeSuggestions();
            // Trigger results filter as before
            triggerResults(selected.name);
        }

        function triggerResults(queryStr) {
            const query = (queryStr ?? searchInput.value).toLowerCase();
            if (query.length < 2) {
                resultsContainer && resultsContainer.classList.add('hidden');
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
            resultsContainer && resultsContainer.classList.remove('hidden');
        }

        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();

            // Build unified suggestion list from both datasets
            const merged = [...namasteCodesData, ...icd11CodesData];
            const dynamic = merged.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.code.toLowerCase().includes(query)
            );

            // Static suggestions filtered by query (or show all when query empty)
            const staticFiltered = staticSuggestions.filter(s =>
                !query || s.name.toLowerCase().includes(query)
            );

            // Compose list: static, dynamic (deduped by name+code), then action
            const seen = new Set();
            function keyOf(item) { return `${item.name}|${item.code||''}`.toLowerCase(); }
            const combined = [...staticFiltered, ...dynamic].filter(item => {
                const k = keyOf(item);
                if (seen.has(k)) return false;
                seen.add(k);
                return true;
            }).slice(0, 7);
            // Add action item at the end
            const withAction = [...combined, actionSuggestion];

            currentSuggestions = withAction;
            renderSuggestions(currentSuggestions);
            triggerResults(query);
        });

        // Mouse interactions
        suggestionsList && suggestionsList.addEventListener('click', function(e) {
            const li = e.target.closest('.autocomplete-item');
            if (!li) return;
            if (li.getAttribute('data-action') === 'navigate-upload') {
                // Store based on current query
                const matches = deriveBestMatchesFromQuery(searchInput.value);
                storePrefillSelection({
                    namasteCode: matches.namasteCode,
                    icd11Code: matches.icd11Code,
                    source: 'search-action',
                    query: searchInput.value,
                    selectedItem: null
                });
                navigateTo('upload.html');
                return;
            }
            const idx = Number(li.getAttribute('data-index'));
            applySelection(idx);
        });

        // Keyboard interactions
        searchInput.addEventListener('keydown', function(e) {
            if (suggestionsList && suggestionsList.classList.contains('hidden')) return;

            const max = currentSuggestions.length - 1;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = activeIndex < max ? activeIndex + 1 : 0;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = activeIndex > 0 ? activeIndex - 1 : max;
            } else if (e.key === 'Enter') {
                if (activeIndex >= 0) {
                    e.preventDefault();
                    applySelection(activeIndex);
                }
            } else if (e.key === 'Escape') {
                closeSuggestions();
            } else {
                return; // other keys fall through
            }

            // Update aria-selected state
            if (suggestionsList) {
                [...suggestionsList.querySelectorAll('.autocomplete-item')].forEach((el, idx) => {
                    el.setAttribute('aria-selected', idx === activeIndex ? 'true' : 'false');
                });
            }
        });

        // Close on blur/click outside
        document.addEventListener('click', function(e) {
            if (!suggestionsList) return;
            if (!e.target.closest('.autocomplete')) {
                closeSuggestions();
            }
        });

        // Add button click: store best matches and navigate
        if (addBtn) {
            addBtn.addEventListener('click', function(e) {
                // Allow normal navigation but set storage first
                const matches = deriveBestMatchesFromQuery(searchInput.value);
                storePrefillSelection({
                    namasteCode: matches.namasteCode,
                    icd11Code: matches.icd11Code,
                    source: 'search-button',
                    query: searchInput.value,
                    selectedItem: null
                });
            });
        }
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
    const namasteInput = document.getElementById('namasteSelect');
    const suggestions = document.getElementById('translateSuggestions');
    const translationResult = document.getElementById('translationResult');

    if (namasteInput) {
        let activeIndex = -1;
        let current = [];

        function render(items) {
            if (!suggestions) return;
            if (!items.length) {
                suggestions.innerHTML = '';
                suggestions.classList.add('hidden');
                namasteInput.setAttribute('aria-expanded', 'false');
                return;
            }
            suggestions.innerHTML = items.map((item, idx) => `
                <li class="autocomplete-item" role="option" data-index="${idx}">
                    <i class="fas fa-leaf" aria-hidden="true"></i>
                    <span class="item-name">${item.name}</span>
                    <span class="item-code">${item.code}</span>
                </li>
            `).join('');
            suggestions.classList.remove('hidden');
            namasteInput.setAttribute('aria-expanded', 'true');
        }

        function close() {
            if (!suggestions) return;
            suggestions.classList.add('hidden');
            namasteInput.setAttribute('aria-expanded', 'false');
            activeIndex = -1;
        }

        function selectIndex(index) {
            const sel = current[index];
            if (!sel) return;
            namasteInput.value = `${sel.name} (${sel.code})`;
            close();

            const mapping = codeMappings[sel.code];
            const icd11Code = mapping ? icd11CodesData.find(c => c.code === mapping.icd11) : null;
            if (mapping && icd11Code) {
                translationResult.innerHTML = `
                    <div class="translation-card">
                        <div class="mapping-result">
                            <h4>Translation Result</h4>
                            <div class="code-mapping">
                                <div class="source-code">
                                    <span class="code-label">NAMASTE:</span>
                                    <span class="code-value">${sel.code}</span>
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
            } else {
                translationResult.classList.add('hidden');
            }
        }

        namasteInput.addEventListener('input', function(e) {
            const q = e.target.value.toLowerCase();
            current = namasteCodesData.filter(item =>
                item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                item.code.toLowerCase().includes(q)
            ).slice(0, 8);
            render(current);
        });

        suggestions && suggestions.addEventListener('click', function(e) {
            const li = e.target.closest('.autocomplete-item');
            if (!li) return;
            const idx = Number(li.getAttribute('data-index'));
            selectIndex(idx);
        });

        namasteInput.addEventListener('keydown', function(e) {
            if (suggestions && suggestions.classList.contains('hidden')) return;
            const max = current.length - 1;
            if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = activeIndex < max ? activeIndex + 1 : 0; }
            else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = activeIndex > 0 ? activeIndex - 1 : max; }
            else if (e.key === 'Enter') { if (activeIndex >= 0) { e.preventDefault(); selectIndex(activeIndex); } }
            else if (e.key === 'Escape') { close(); }
            else { return; }
            if (suggestions) {
                [...suggestions.querySelectorAll('.autocomplete-item')].forEach((el, idx) => {
                    el.setAttribute('aria-selected', idx === activeIndex ? 'true' : 'false');
                });
            }
        });

        document.addEventListener('click', function(e) {
            if (!suggestions) return;
            if (!e.target.closest('.autocomplete')) close();
        });
    }
}

// Encounter upload functionality
function setupEncounterUpload() {
    const uploadForm = document.getElementById('encounterForm');
    const namasteEncounterSelect = document.getElementById('namasteEncounterSelect');
    const icd11EncounterSelect = document.getElementById('icd11EncounterSelect');
    const exportBtn = document.getElementById('exportRecordBtn');
    
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

    // Apply prefill from search if available
    try {
        const raw = localStorage.getItem('swasthyasetu_prefill');
        if (raw) {
            const prefill = JSON.parse(raw);
            if (prefill.namasteCode && namasteEncounterSelect) {
                namasteEncounterSelect.value = prefill.namasteCode;
            }
            if (prefill.icd11Code && icd11EncounterSelect) {
                icd11EncounterSelect.value = prefill.icd11Code;
            }
            // Clear prefill after applying
            localStorage.removeItem('swasthyasetu_prefill');
        }
    } catch (e) {
        // ignore JSON/Storage errors
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

    if (exportBtn && uploadForm) {
        exportBtn.addEventListener('click', function() {
            const formData = new FormData(uploadForm);
            const record = {
                patientId: formData.get('patientId') || '',
                namasteCode: formData.get('namasteCode') || '',
                icd11Code: formData.get('icd11Code') || '',
                symptoms: formData.get('symptoms') || '',
                metadata: {
                    exportedAt: new Date().toISOString(),
                    page: 'upload',
                    app: 'SwasthyaSetu',
                    version: 'demo-1.0'
                }
            };
            const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `encounter_record_${record.patientId || 'unknown'}.json`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
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
            </div>
            <div class="chart-legend">
                <div class="legend-item"><span class="legend-color mapped"></span>Mapped (80%)</div>
                <div class="legend-item"><span class="legend-color unmapped"></span>Unmapped (20%)</div>
            </div>
        `;
        
        // Inject minimal CSS for pie chart if not present
        if (!document.getElementById('analytics-inline-style')) {
            const style = document.createElement('style');
            style.id = 'analytics-inline-style';
            style.textContent = `
                .pie-chart { position: relative; width: 220px; height: 220px; border-radius: 50%; overflow: hidden; margin: 0 auto; }
                .pie-segment { position: absolute; inset: 0; background: conic-gradient(var(--primary-blue) calc(var(--percentage) * 1%), var(--light-blue) 0); border-radius: 50%; }
                .pie-segment.unmapped { background: conic-gradient(var(--gray-200) calc(var(--percentage) * 1%), transparent 0); mask: radial-gradient(circle at center, transparent 62%, black 62%); }
                .chart-legend { margin-top: 1rem; display: flex; gap: 1rem; justify-content: center; }
                .legend-item { display: flex; align-items: center; gap: 0.5rem; color: var(--gray-800); }
                .legend-color { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
                .legend-color.mapped { background: var(--primary-blue); }
                .legend-color.unmapped { background: var(--gray-300); }
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