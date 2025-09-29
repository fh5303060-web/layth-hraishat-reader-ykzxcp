
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#1565C0',        // Blue for primary elements
  secondary: '#D32F2F',      // Red for secondary elements (matching school colors)
  accent: '#FFA726',         // Orange for accents
  background: 'rgba(255, 255, 255, 0.95)',  // Semi-transparent white
  backgroundAlt: 'rgba(255, 255, 255, 0.9)', // Alternative background
  text: '#1565C0',           // Blue text for headers
  textSecondary: '#424242',  // Dark gray for body text
  grey: '#666666',           // Gray for secondary text
  card: 'rgba(255, 255, 255, 0.9)', // Card background
  success: '#4CAF50',        // Green for success
  warning: '#FF9800',        // Orange for warnings
  error: '#F44336',          // Red for errors
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10,
    writingDirection: 'rtl',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
  // Arabic text styles
  arabicTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 12,
  },
  arabicText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 24,
  },
  arabicSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
});
