
# FinHealth SME Navigator

A world-class financial health assessment tool for SMEs, powered by Google Gemini AI.

## 📹 Demo Video

👉 [Click here to watch the demo video](https://drive.google.com/file/d/19j-c_9viJQrpdN_lVpIk3Nd-LsrljbqL/view?usp=drive_link)


## 🚀 Quick Start for Deployment

To make this app live on GitHub Pages, follow these three steps:

### 1. Setup GitHub Secrets
1. Go to your GitHub Repository **Settings**.
2. Navigate to **Secrets and variables** > **Actions**.
3. Add a **New repository secret**:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `your_actual_gemini_api_key_here`

### 2. Configure Pages
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

### 3. Push to Main
- Simply push your code to the `main` branch. 
- GitHub will automatically trigger the workflow in `.github/workflows/deploy.yml`.
- Your site will be live at `https://PeetlaMahesh123.github.io/FinHealth-SME-Navigator/` within minutes.

## 🛠 Features
- **AI Financial Auditor**: Deep analysis of P&L, Balance Sheets, and Cash Flow.
- **Credit Risk Engine**: Automated credit grading (A+ to D) and borrowing capacity estimation.
- **Multilingual Support**: Instant switching between English, Hindi, Gujarati, Marathi, Bengali, Tamil, and Telugu.
- **Scenario Modeling**: "What-if" simulations for market volatility.
- **Privacy First**: AES-256 encrypted local storage for audit history.

## 💻 Local Development
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file: `VITE_GEMINI_API_KEY=your_key_here`.
4. Start the dev server: `npm run dev`.

## 📄 Supported Upload Formats
- The app accepts **.txt, .csv, .pdf, .xls, .xlsx, .png, .jpg** files for analysis.
- PDFs and Excel files are converted to text on upload. If a PDF is image-based (scanned) or you upload images, the app will attempt OCR using Tesseract.js to extract text. OCR can be slower and may not perfectly recognize low-quality scans.
- If text extraction fails entirely, the app shows: "Analysis Failed. Upload a supported file..." and suggests exporting to CSV/TXT or providing a searchable PDF.

## 🔬 Testing OCR locally
- Start dev server: `npm run dev` and open http://localhost:3000/
- Use `sample-data/sample_financial.txt` to confirm the parsing/analysis pipeline works quickly.
- To test OCR on scanned PDFs or images, upload a scanned PDF or a `.png/.jpg` image containing clear printed text — OCR will be attempted automatically. Large files or many pages can take longer to process.


## ⚠️ Troubleshooting
- If you see: "Analysis Failed. Ensure you are uploading a text-based financial statement", verify your file contains selectable text (not scanned images) or try exporting as CSV/TXT from your accounting software.
