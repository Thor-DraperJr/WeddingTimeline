@description('The name of the static web app')
param staticWebAppName string

@description('The location of the static web app')
param location string

@description('The SKU of the static web app')
@allowed(['Free', 'Standard'])
param sku string = 'Free'

@description('The GitHub repository URL')
param repositoryUrl string

@description('The GitHub branch name')
param branch string = 'main'

@description('Environment for tagging')
param environment string

@description('Key Vault name for secure configuration')
param keyVaultName string

@description('Application Insights connection string')
@secure()
param appInsightsConnectionString string

// Static Web App
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticWebAppName
  location: location
  tags: {
    project: 'Carolina-Thor-Wedding'
    environment: environment
    security: 'managed-identity-enabled'
  }
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      outputLocation: 'out'
      appBuildCommand: 'npm run build'
      apiBuildCommand: ''
    }
    allowConfigFileUpdates: true
    stagingEnvironmentPolicy: 'Enabled'
  }
  identity: {
    type: 'SystemAssigned'
  }
}

// Configure app settings with secure Key Vault references
resource staticWebAppConfig 'Microsoft.Web/staticSites/config@2023-01-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING: appInsightsConnectionString
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: '@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=google-maps-api-key)'
    NEXT_PUBLIC_WEDDING_DATE: '2025-07-11'
    NEXT_PUBLIC_COUPLE_NAMES: 'Carolina & Thor'
    NEXT_PUBLIC_TIMEZONE: 'America/Edmonton'
    NODE_ENV: environment == 'prod' ? 'production' : 'development'
  }
}

// Custom domain (if needed)
// resource customDomain 'Microsoft.Web/staticSites/customDomains@2023-01-01' = {
//   name: 'www.carolinaandthor.com'
//   parent: staticWebApp
//   properties: {}
// }

// Outputs
output name string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
output repositoryUrl string = staticWebApp.properties.repositoryUrl
