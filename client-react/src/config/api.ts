export const API_CONFIG = {
  GATEWAY_URL: 'http://localhost:8888',
  CONFERENCE_SERVICE: 'conference-service',
  KEYNOTE_SERVICE: 'keynote-service',
};

export const getConferenceApiUrl = (path: string) => 
  `${API_CONFIG.GATEWAY_URL}/${API_CONFIG.CONFERENCE_SERVICE}${path}`;

export const getKeynoteApiUrl = (path: string) => 
  `${API_CONFIG.GATEWAY_URL}/${API_CONFIG.KEYNOTE_SERVICE}${path}`;
