/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    hover: "hsl(var(--primary) / 0.9)", // Approximation
                    light: "hsl(var(--primary) / 0.8)",
                    dark: "hsl(var(--primary))", // Fallback or assume darker
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    hover: "hsl(var(--secondary) / 0.9)",
                    light: "hsl(var(--secondary) / 0.8)",
                    dark: "hsl(var(--secondary))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                    hover: "hsl(var(--accent) / 0.9)",
                    light: "hsl(var(--accent) / 0.8)",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Aliases for retro-compatibility
                dark: {
                    DEFAULT: "hsl(var(--foreground))", // Was #2D3748
                    light: "hsl(var(--muted-foreground))",   // Was #718096
                    card: "hsl(var(--card))",
                },
                light: {
                    DEFAULT: "hsl(var(--background))", // Was #F7FAFC
                    card: "hsl(var(--card))", // Was #FFFFFF
                    hover: "hsl(var(--muted))", // Was #EDF2F7
                },
                // Status badge colors - keep static or map to vars
                allocated: {
                    bg: '#C6F6D5',
                    text: '#22543D',
                },
                vacant: {
                    bg: '#BEE3F8',
                    text: '#2A4365',
                },
                maintenance: {
                    bg: '#FED7D7',
                    text: '#742A2A',
                },
                // Priority colors
                'priority-high': '#C53030',
                'priority-medium': '#D69E2E',
                'priority-low': '#38A169',
                // Success and Danger colors for buttons
                success: {
                    DEFAULT: '#38A169',   // Green
                    light: '#C6F6D5',      // Light green
                    dark: '#22543D',       // Dark green
                },
                danger: {
                    DEFAULT: '#E53E3E',    // Red
                    light: '#FED7D7',      // Light red
                    dark: '#742A2A',       // Dark red
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
                '3xl': '24px',
            },
            boxShadow: {
                'card': '0 4px 12px rgba(43, 108, 176, 0.08)',
                'floating': '0 8px 24px rgba(43, 108, 176, 0.12)',
                'elevated': '0 12px 32px rgba(43, 108, 176, 0.15)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in',
                'slide-up': 'slideUp 0.4s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
