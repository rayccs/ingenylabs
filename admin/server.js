const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Path to the target HTML file
const targetHtmlPath = path.join(__dirname, '..', 'index.html');

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support large HTML files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/demo', express.static(path.join(__dirname, '..', 'demo')));

// Load existing HTML
app.get('/api/load-html', (req, res) => {
    try {
        if (!fs.existsSync(targetHtmlPath)) {
            return res.status(404).json({ error: 'index.html not found in the parent directory.' });
        }
        const html = fs.readFileSync(targetHtmlPath, 'utf8');
        res.json({ html });
    } catch (e) {
        console.error('Error reading index.html:', e);
        res.status(500).json({ error: 'Failed to read index.html' });
    }
});

// Save modified HTML
app.post('/api/save-html', (req, res) => {
    try {
        const { html } = req.body;
        if (!html) {
            return res.status(400).json({ error: 'HTML content missing' });
        }

        fs.writeFileSync(targetHtmlPath, html, 'utf8');
        res.json({ success: true, message: 'index.html successfully updated!' });
    } catch (e) {
        console.error('Error saving index.html:', e);
        res.status(500).json({ error: 'Failed to write to index.html' });
    }
});

app.listen(PORT, () => {
    console.log(`Ingeny Labs Admin Builder running on http://localhost:${PORT}`);
});
