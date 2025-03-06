
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.62d64ea08b324d68b5a5b0349620432c',
  appName: 'financial-saver-genie',
  webDir: 'dist',
  server: {
    url: 'https://62d64ea0-8b32-4d68-b5a5-b0349620432c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      signingType: 'apksigner'
    }
  },
  ios: {
    // iOS specific configurations
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    backgroundColor: '#ffffff'
  }
};

export default config;
