import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'conference-application',
  clientId: 'conference-client',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
