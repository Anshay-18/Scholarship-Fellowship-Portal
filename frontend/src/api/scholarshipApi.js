import apiClient from './client';

/**
 * Spring Boot REST API Service wrapper for MoTA ST Scholarship System
 * Architecture-ready for seamless backend connectivity
 */
export const scholarshipApi = {
  // Scheme Endpoints
  getSchemes: () => apiClient.get('/schemes'),
  getSchemeById: (id) => apiClient.get(`/schemes/${id}`),
  updateSchemeRules: (id, rules) => apiClient.put(`/schemes/${id}/rules`, rules),

  // Application Endpoints
  getApplications: (params) => apiClient.get('/applications', { params }),
  getApplicationById: (id) => apiClient.get(`/applications/${id}`),
  submitApplication: (payload) => apiClient.post('/applications', payload),
  updateApplicationStatus: (id, status, remarks) => 
    apiClient.patch(`/applications/${id}/status`, { status, remarks }),

  // Document Verification & Scrutiny
  verifyDocument: (appId, docId, remarks) => 
    apiClient.post(`/applications/${appId}/documents/${docId}/verify`, { remarks }),
  raiseDeficiency: (appId, deficiencyData) => 
    apiClient.post(`/applications/${appId}/deficiencies`, deficiencyData),
  resolveDeficiency: (appId, resolutionData) => 
    apiClient.post(`/applications/${appId}/deficiencies/resolve`, resolutionData),

  // Scrutiny & Award
  forwardToScrutiny: (appId, remarks) => 
    apiClient.post(`/applications/${appId}/scrutiny/forward`, { remarks }),
  awardSanction: (appId, sanctionData) => 
    apiClient.post(`/applications/${appId}/sanction`, sanctionData),

  // Audit Ledger
  getAuditLogs: (params) => apiClient.get('/audit-logs', { params }),

  // AI OCR Pre-screening Microservice Proxy
  triggerOcrPreScreen: (documentFile) => {
    const formData = new FormData();
    formData.append('document', documentFile);
    return apiClient.post('/ai/ocr-prescreen', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};
