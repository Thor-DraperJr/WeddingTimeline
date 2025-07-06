/**
 * Secure Configuration Manager
 * Handles environment variables and secrets safely
 * No sensitive values should be hardcoded in this file
 */

interface AppConfig {
  googleMaps: {
    apiKey: string | null;
    isEnabled: boolean;
  };
  monitoring: {
    applicationInsights: string | null;
    isEnabled: boolean;
  };
  analytics: {
    id: string | null;
    isEnabled: boolean;
  };
  wedding: {
    date: string;
    coupleNames: string;
    timezone: string;
  };
  app: {
    isProduction: boolean;
    isDevelopment: boolean;
  };
}

class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfig();
    this.validateConfig();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): AppConfig {
    return {
      googleMaps: {
        apiKey: this.getEnvVar('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'),
        isEnabled: !!this.getEnvVar('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'),
      },
      monitoring: {
        applicationInsights: this.getEnvVar(
          'NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING'
        ),
        isEnabled: !!this.getEnvVar(
          'NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING'
        ),
      },
      analytics: {
        id: this.getEnvVar('NEXT_PUBLIC_ANALYTICS_ID'),
        isEnabled: !!this.getEnvVar('NEXT_PUBLIC_ANALYTICS_ID'),
      },
      wedding: {
        date: this.getEnvVar('NEXT_PUBLIC_WEDDING_DATE') || '2025-07-11',
        coupleNames:
          this.getEnvVar('NEXT_PUBLIC_COUPLE_NAMES') || 'Lina & Thor',
        timezone: this.getEnvVar('NEXT_PUBLIC_TIMEZONE') || 'America/Denver',
      },
      app: {
        isProduction: process.env.NODE_ENV === 'production',
        isDevelopment: process.env.NODE_ENV === 'development',
      },
    };
  }

  private getEnvVar(name: string): string | null {
    const value = process.env[name];

    // Log missing environment variables in development
    if (!value && this.isDevelopment()) {
      console.warn(`⚠️  Environment variable ${name} is not set`);
    }

    return value || null;
  }

  private validateConfig(): void {
    // No validation required - all configuration is optional
    // The app will work without external API keys
    if (this.isDevelopment()) {
      if (!this.config.googleMaps.apiKey) {
        console.warn('⚠️  Google Maps API key not configured. Maps functionality will use basic links.');
      }
      if (!this.config.monitoring.applicationInsights) {
        console.warn('⚠️  Application Insights not configured. Monitoring disabled.');
      }
    }
  }

  private isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  // Public getters
  public getGoogleMapsConfig() {
    return this.config.googleMaps;
  }

  public getMonitoringConfig() {
    return this.config.monitoring;
  }

  public getAnalyticsConfig() {
    return this.config.analytics;
  }

  public getWeddingConfig() {
    return this.config.wedding;
  }

  public getAppConfig() {
    return this.config.app;
  }

  // Utility methods
  public isFeatureEnabled(
    feature: 'googleMaps' | 'monitoring' | 'analytics'
  ): boolean {
    return this.config[feature].isEnabled;
  }

  public getGoogleMapsUrl(location: string): string {
    if (!this.isFeatureEnabled('googleMaps')) {
      // Fallback to basic Google Maps search without API key
      const encodedLocation = encodeURIComponent(location);
      return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    }

    // Enhanced URL with API key (if available)
    const encodedLocation = encodeURIComponent(location);
    const apiKey = this.config.googleMaps.apiKey;

    if (apiKey) {
      return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedLocation}`;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  }

  // Security utility
  public getMaskedConfig(): Partial<AppConfig> {
    return {
      googleMaps: {
        apiKey: this.config.googleMaps.apiKey ? '***CONFIGURED***' : null,
        isEnabled: this.config.googleMaps.isEnabled,
      },
      monitoring: {
        applicationInsights: this.config.monitoring.applicationInsights
          ? '***CONFIGURED***'
          : null,
        isEnabled: this.config.monitoring.isEnabled,
      },
      analytics: {
        id: this.config.analytics.id ? '***CONFIGURED***' : null,
        isEnabled: this.config.analytics.isEnabled,
      },
      wedding: this.config.wedding,
      app: this.config.app,
    };
  }
}

// Export singleton instance
export const config = ConfigManager.getInstance();

// Export types for use elsewhere
export type { AppConfig };
