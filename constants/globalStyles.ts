import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#2a2a2a',
    secondary: '#ffffff',
    accent: '#39FF14',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.5)',
    textTertiary: 'rgba(255, 255, 255, 0.4)',
    dotLight: 'rgba(255, 255, 255, 0.2)',
    dotMedium: 'rgba(255, 255, 255, 0.5)',
    dotFull: 'rgba(255, 255, 255, 0.9)',
};

export const fonts = {
    light: 'Montserrat_300Light',
    regular: 'Montserrat_400Regular',
    medium: 'Montserrat_500Medium',
    semiBold: 'Montserrat_600SemiBold',
    bold: 'Montserrat_700Bold',
};

export const typography = {
    title: {
        fontSize: 16,
        fontWeight: '700' as const,
        fontFamily: fonts.bold,
        letterSpacing: 0.5,
        lineHeight: 20,
    },
    description: {
        fontSize: 11,
        fontWeight: '400' as const,
        fontFamily: fonts.regular,
        letterSpacing: 0.3,
        lineHeight: 16,
    },
    button: {
        fontSize: 11,
        fontWeight: '600' as const,
        fontFamily: fonts.semiBold,
        letterSpacing: 0.5,
        textTransform: 'uppercase' as const,
    },
    skip: {
        fontSize: 11,
        fontWeight: '600' as const,
        fontFamily: fonts.semiBold,
        letterSpacing: 0.5,
        opacity: 0.7,
    },
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLight: {
        fontFamily: fonts.light,
        color: colors.textPrimary,
    },
    textRegular: {
        fontFamily: fonts.regular,
        color: colors.textPrimary,
    },
    textMedium: {
        fontFamily: fonts.medium,
        color: colors.textPrimary,
    },
    textSemiBold: {
        fontFamily: fonts.semiBold,
        color: colors.textPrimary,
    },
    textBold: {
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    textSecondary: {
        fontFamily: fonts.regular,
        color: colors.textSecondary,
    },
    textTertiary: {
        fontFamily: fonts.light,
        color: colors.textTertiary,
    },
    accentText: {
        fontFamily: fonts.medium,
        color: colors.accent,
    },
});