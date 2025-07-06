targetScope = 'subscription'

@description('The name of the resource group')
param resourceGroupName string = 'rg-wedding-timeline'

@description('The location of all resources')
param location string = 'eastus'

@description('Environment (dev, staging, prod)')
@allowed(['dev', 'staging', 'prod'])
param environment string = 'prod'

@description('The name of the static web app')
param staticWebAppName string = 'swa-carolina-thor-wedding-${environment}'

@description('The SKU of the static web app')
@allowed(['Free', 'Standard'])
param staticWebAppSku string = 'Free'

@description('The GitHub repository URL')
param repositoryUrl string = 'https://github.com/Thor-DraperJr/WeddingTimeline.git'

@description('The GitHub branch name')
param branch string = 'main'

@description('Google Maps API Key (stored securely)')
@secure()
param googleMapsApiKey string = ''

// Create resource group
resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
  tags: {
    project: 'Carolina-Thor-Wedding'
    environment: environment
    createdBy: 'bicep-template'
    security: 'managed-identity-enabled'
  }
}

// Deploy Key Vault for secure secret storage
module keyVault 'modules/keyVault.bicep' = {
  name: 'keyVaultDeployment'
  scope: resourceGroup
  params: {
    keyVaultName: 'kv-wedding-${environment}-${uniqueString(resourceGroup.id)}'
    location: location
    environment: environment
    googleMapsApiKey: googleMapsApiKey
  }
}

// Deploy Application Insights for monitoring
module appInsights 'modules/appInsights.bicep' = {
  name: 'appInsightsDeployment'
  scope: resourceGroup
  params: {
    appInsightsName: 'ai-wedding-${environment}'
    location: location
    environment: environment
  }
}

// Deploy static web app
module staticWebApp 'modules/staticWebApp.bicep' = {
  name: 'staticWebAppDeployment'
  scope: resourceGroup
  params: {
    staticWebAppName: staticWebAppName
    location: location
    sku: staticWebAppSku
    repositoryUrl: repositoryUrl
    branch: branch
    environment: environment
    keyVaultName: keyVault.outputs.keyVaultName
    appInsightsConnectionString: appInsights.outputs.connectionString
  }
}

// Outputs
output resourceGroupName string = resourceGroup.name
output staticWebAppUrl string = staticWebApp.outputs.defaultHostname
output staticWebAppName string = staticWebApp.outputs.name
output keyVaultName string = keyVault.outputs.keyVaultName
output appInsightsConnectionString string = appInsights.outputs.connectionString
