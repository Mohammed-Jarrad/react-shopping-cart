module.exports = {
	content: ['./src/components/**/*.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		screens: {
			'2xl': {max: '1535px'},
			xl: {max: '1279px'},
			lg: {max: '1170px'},
			md: {max: '970px'},
			sm: {max: '750px'},
		},
		colors: {
			main: '#41b1d3',
			body: '#F6F9F9',
			secondBody: '#fff',
			white: '#fff',
			redColor: '#d23f57',
			'main-light': '#b8d8e088',
		},
		borderRadius: {
			none: '0',
			sm: '.125rem',
			DEFAULT: '.25rem',
			lg: '.5rem',
			full: '9999px',
		},
		opacity: {
			0: '0',
			20: '0.2',
			40: '0.4',
			60: '0.6',
			80: '0.8',
			100: '1',
		},
	},
	plugins: [],
};
