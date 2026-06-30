// Simple example of client-side/server-side helper
import JavaScriptObfuscator from 'javascript-obfuscator';

export function obfuscateJS(code: string): string {
  try {
    const result = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      numbersToExpressions: true,
      simplify: true,
      stringArrayEncoding: ['base64']
    });
    return result.getObfuscatedCode();
  } catch (error) {
    return `// Error obfuscating code: ${error.message}`;
  }
}

export function encryptHTML(html: string): string {
  // Encodes HTML string to an executable document.write sequence
  const escaped = encodeURIComponent(html);
  return `<script>document.write(decodeURIComponent("${escaped}"));</script>`;
}
