# SwasthyaSetu – Dual-Coding Terminology Prototype

A clean, professional health-tech styled prototype for a dual-coding microservice demo that bridges AYUSH NAMASTE codes and ICD-11 medical classifications.

## 🌟 Features

- **Landing Page**: Hero section with medical graphics and minimal, impactful design
- **Dashboard**: Four main feature cards with medical icons
- **Search Codes**: Autocomplete functionality with dual-column results
- **Translate Codes**: Code mapping with confidence scoring
- **Upload Encounter**: Patient encounter form with dual coding support
- **Analytics**: Pie chart visualization for mapping gaps dashboard

## 🎨 Design

- **Theme**: Blue + white healthcare aesthetic
- **Typography**: Modern Inter font family
- **Graphics**: Medical icons (doctor, stethoscope, medical records, coding symbols)
- **Layout**: Professional, minimal, and responsive design
- **Animation**: Subtle floating animations and smooth transitions

## 🚀 Quick Start

1. **Clone or Download** this repository
2. **Navigate** to the SwasthyaSetu folder
3. **Install dependencies** (optional, for live server):
   ```bash
   npm install
   ```
4. **Run the application**:
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use live server (if installed):
     ```bash
     npm start
     ```
   - Option 3: Use any local web server

## 📁 Project Structure

```
SwasthyaSetu/
├── index.html          # Landing page
├── dashboard.html      # Main dashboard
├── search.html         # Search codes page
├── translate.html      # Code translation page
├── upload.html         # Encounter upload page
├── analytics.html      # Analytics dashboard
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── app.js          # JavaScript functionality
├── package.json        # Project configuration
└── README.md          # This file
```

## 🔧 Demo Functionality

### Search Page
- Type "Fever" in the search box to see demo results
- Shows both NAMASTE and ICD-11 codes in dual columns
- Example: Jwara (NMT123) ↔ Typhoid Fever (ICD11:1A00)

### Translate Page
- Select any NAMASTE code from the dropdown
- View mapped ICD-11 code with confidence score
- Example: NMT123 (Jwara) → ICD11:1A00 (Typhoid Fever), Confidence: 92%

### Upload Page
- Fill patient information and select codes
- Submit to see confirmation with dual coding
- Displays "Record stored with dual coding (demo)"

### Analytics Page
- View pie chart showing 80% mapped, 20% unmapped codes
- Interactive tabs for detailed analytics
- Progress bars and trend visualizations

## 🎯 Sample Data

The demo includes sample NAMASTE and ICD-11 codes:

**NAMASTE Codes:**
- NMT123: Jwara (Fever symptoms)
- NMT124: Kasa (Cough and cold)  
- NMT125: Shwasa (Breathing disorders)
- NMT126: Atisara (Diarrhea)
- NMT127: Arsha (Hemorrhoids)

**ICD-11 Codes:**
- ICD11:1A00: Typhoid Fever
- ICD11:CA80: Cough
- ICD11:MD11: Dyspnoea
- ICD11:DD90: Diarrhoea

## 🛠 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Interactive functionality
- **Font Awesome**: Medical and UI icons
- **Google Fonts**: Inter font family

## 📱 Responsive Design

- **Desktop**: Full-featured layout with side-by-side elements
- **Tablet**: Adjusted grid layouts and stacked elements
- **Mobile**: Single-column layout with optimized touch targets

## 🎨 Color Palette

- **Primary Blue**: #2563eb
- **Secondary Blue**: #3b82f6
- **Accent Teal**: #14b8a6
- **Light Blue**: #dbeafe
- **Gray Tones**: Various shades for text and backgrounds

## 🚀 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 Notes

This is a **prototype/demo application** designed to showcase the concept of dual-coding between AYUSH NAMASTE and ICD-11 systems. The functionality is simulated with sample data and is not connected to real medical databases.

## 🔮 Future Enhancements

- Real database integration
- User authentication
- Advanced search filters
- Bulk code upload
- Export functionality
- More detailed analytics

## 📄 License

This project is licensed under the MIT License.

---

**SwasthyaSetu** - Bridging traditional and modern healthcare coding systems for smarter healthcare.