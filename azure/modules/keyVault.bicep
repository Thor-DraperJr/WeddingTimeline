@description('Name of the Key Vault')
param keyVaultName string

@description('Location for the Key Vault')
param location string = resourceGroup().location

@description('Environment tag')
param environment string

@description('Google Maps API Key to store securely')
@secure()
param googleMapsApiKey string = ''

// Key Vault
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: keyVaultName
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    accessPolicies: []
    enabledForDeployment: false
    enabledForDiskEncryption: false
    enabledForTemplateDeployment: true
    enableSoftDelete: true
    softDeleteRetentionInDays: 7
    enablePurgeProtection: false
    networkAcls: {
      defaultAction: 'Allow'
      bypass: 'AzureServices'
    }
    publicNetworkAccess: 'Enabled'
  }
  tags: {
    Environment: environment
    Project: 'Carolina-Thor-Wedding'
    Purpose: 'Secret-Management'
  }
}

// Store Google Maps API Key in Key Vault (if provided)
resource googleMapsSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = if (!empty(googleMapsApiKey)) {
  parent: keyVault
  name: 'google-maps-api-key'
  properties: {
    value: googleMapsApiKey
    attributes: {
      enabled: true
    }
  }
}

output keyVaultName string = keyVault.name
output keyVaultId string = keyVault.id
