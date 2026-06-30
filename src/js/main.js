const express = require('express');
const JavaScriptObfuscator = require('javascript-obfuscator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Environment configuration keys (With fallback configurations for local testing)
const JWT_SECRET = process.env.JWT_SECRET || 'core-cryptographic-fallback-key-9988';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';

/**
 * 1. SESSION MANAGEMENT PIPELINE
 * Handles incoming authentication verification queries
 */
app.post('/api/auth', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === ADMIN_PASSWORD) {
    // Generate secure session payload signature expiring in 24 hours
    const token = jwt.sign({ identity: username }, JWT_SECRET, { expiresIn: '24h' });
    
    // Bind token to isolated HTTP cookie stream
    res.cookie('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 day operational life
      path: '/'
    });

    return res.json({ success: true });
  }

  return res.status(401).json({ success: false, message: 'Authentication mismatch' });
});

/**
 * 2. PROTECTION & OBFUSCATION ENGINE
 * Transforms clear texts into unreadable runtime packages
 */
app.post('/api/encrypt', (req, res) => {
  const { code, mode } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ success: false, message: 'Empty compilation target string' });
  }

  try {
    let protectionResult = '';

    if (mode === 'js') {
      // Run high-tier AST layout mangling on raw script lines
      const obfuscationInstance = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.8,
        deadCodeInjection: false,
        numbersToExpressions: true,
        simplify: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.8,
        splitStrings: true
      });
      protectionResult = obfuscationInstance.getObfuscatedCode();

    } else if (mode === 'html') {
      // Compresses code layout into an executable document write sequence
      const compressedString = encodeURIComponent(code);
      protectionResult = `<script>document.write(decodeURIComponent("${compressedString}"));</script>`;
    
    } else {
      return res.status(400).json({ success: false, message: 'Unknown architecture mode selection' });
    }

    return res.json({ success: true, output: protectionResult });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      output: `/* Compilation Error within compiler chain: \n ${error.message} */` 
    });
  }
});

// Run standalone server if loaded outside global edge instances
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Development engine bound to port: ${PORT}`);
  });
}

// CRITICAL FOR VERCEL DEPLOYMENT ENGINE:
module.exports = app;
