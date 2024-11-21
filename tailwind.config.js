/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'herobg': "url('/assets/herobg.jpg')",
        'aboutbg': "url('/assets/bgimage.png')",
               

      },
      boxShadow: {
        shad: '0px 0px 6px 6px #c2c0c033',
        lightshad: '0px 0px 8px 0px #0000001A',
        custom: '0 0 20px 0 rgba(0, 0, 0, 0.1)',
        
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'white': "#fff",
        'blackish': "#25262f",
        'blackish2': "rgb(59, 60, 70)",
        'blackish3': "#212529",
        'red': "#E50200",
        'lightred': "#FBB0B0",
        'black': "#000000",
        'bluegray': "#e2ecf6",
        'lightgray': "#f0f7fe",
        'gray': "#999999",
        'darkgray': "#4d4d5c",

        'purplelight': "#9D5EC5",
        'purple': "#6D31A3",
        'purpledark': "#160C1C",
        'purple4': "#321743",
        'yellow': "#E6FF00",
        'blue': "#4802BA",
        'green': "#80db66",
        'lightgreen': "#A9D7AD",
      },
    },
  },
  plugins: [],
};