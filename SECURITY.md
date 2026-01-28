# Security Features & Best Practices

This document outlines the security features implemented in this portfolio website.

## 🔒 Security Features Implemented

### 1. **Content Security Policy (CSP)**

- **Location**: `<meta http-equiv="Content-Security-Policy">` in HTML head
- **Protection**: Prevents XSS (Cross-Site Scripting) attacks
- **Policy Details**:
  - `default-src 'self'` - Only allow resources from same origin
  - `script-src 'self' 'unsafe-inline'` - Allow scripts from same origin
  - `style-src 'self' 'unsafe-inline'` - Allow styles from same origin and Google Fonts
  - `font-src 'self'` - Font resources from same origin
  - `img-src 'self' data: https:` - Allow images from same origin and data URLs
  - `frame-ancestors 'none'` - Prevent site from being framed
  - `form-action 'self'` - Forms can only submit to same origin

### 2. **HTTP Security Headers**

- **X-Content-Type-Options: nosniff** - Prevents MIME-type sniffing
- **X-Frame-Options: DENY** - Prevents clickjacking attacks
- **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer information

### 3. **Input Sanitization**

- **Function**: `sanitizeInput()`
- **Protection**: Escapes HTML special characters to prevent XSS
- **Applied To**: Name, email, company, and message fields
- **Example**:
  ```javascript
  const sanitized = sanitizeInput("<script>alert('xss')</script>");
  // Returns: "&lt;script&gt;alert('xss')&lt;/script&gt;"
  ```

### 4. **Form Validation**

- **Email Validation**: RFC-compliant regex pattern
  - Format check: `user@domain.com`
  - Max length: 254 characters (RFC 5321)
- **Name Validation**: 2-100 characters
- **Company Validation**: Max 200 characters
- **Message Validation**: 10-5000 characters
- **All fields**: Trimmed and type-checked

### 5. **XSS Pattern Detection**

Detects and blocks common XSS attack vectors:

```javascript
- <script> tags
- onclick= event handler
- onerror= event handler
- javascript: protocol
```

### 6. **Rate Limiting**

- **Implementation**: Form submission cooldown
- **Duration**: 3 seconds between submissions
- **Purpose**: Prevents spam and brute-force attacks
- **User Feedback**: Clear error message when limit exceeded

### 7. **CSRF Protection**

- **Token Generation**: Random token created per form submission
- **Implementation**: `generateCSRFToken()`
- **Usage**: Can be sent to backend for verification
- **Header Support**: Include `X-CSRF-Token` header in fetch requests

### 8. **Security Monitoring**

- **Error Logging**: Monitors for XSS keywords in errors
- **CSP Violations**: Logs Content Security Policy violations
- **Submission Logging**: Records submission timestamps

## 🔐 Best Practices for Deployment

### Before Going Live:

1. **SSL/TLS Certificate**
   - Ensure HTTPS is enforced
   - Use a valid SSL certificate from trusted CA

2. **Server-Side Validation**
   - Never trust client-side validation alone
   - Always validate and sanitize on backend
   - Implement server-side CSRF tokens

3. **Email Backend Integration**
   - Use a secure email service (SendGrid, Mailgun, etc.)
   - Don't expose email addresses in client code
   - Implement rate limiting on backend

4. **Environment Variables**
   - Store API keys securely
   - Never commit sensitive data
   - Use environment-specific configs

5. **CORS Configuration**
   - Set appropriate `Access-Control-Allow-Origin` header
   - Restrict to specific domains if API is separate

6. **Logging & Monitoring**
   - Log form submissions securely
   - Monitor for suspicious patterns
   - Set up alerts for security events

## 📋 Recommended Security Headers (Server-Level)

Add these headers at your hosting provider or web server:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## 🚀 Integration with Backend

### Recommended Backend Endpoint:

```javascript
POST /api/contact
Content-Type: application/json
X-CSRF-Token: [token]
X-Requested-With: XMLHttpRequest

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "budget": "25k-50k",
  "message": "I'd like to discuss...",
  "csrf_token": "...",
  "timestamp": "2026-01-28T10:00:00Z"
}
```

### Backend Validation Checklist:

- [ ] Verify CSRF token
- [ ] Validate all input formats
- [ ] Check rate limits per IP
- [ ] Sanitize all data
- [ ] Store securely
- [ ] Send confirmation email (verify address first)
- [ ] Log all submissions
- [ ] Monitor for spam

## 🛡️ Common Security Vulnerabilities Covered

| Vulnerability                     | Protection                        | Status             |
| --------------------------------- | --------------------------------- | ------------------ |
| XSS (Cross-Site Scripting)        | Input sanitization + CSP          | ✅ Covered         |
| CSRF (Cross-Site Request Forgery) | CSRF token generation             | ✅ Covered         |
| Clickjacking                      | X-Frame-Options                   | ✅ Covered         |
| MIME-type sniffing                | X-Content-Type-Options            | ✅ Covered         |
| Spam                              | Rate limiting                     | ✅ Covered         |
| SQL Injection                     | Client-side (N/A for static site) | ✅ N/A             |
| Malicious file upload             | No file upload feature            | ✅ N/A             |
| DDoS                              | Handled by hosting provider       | ✅ Provider's duty |

## 📝 Security Checklist Before Deployment

- [ ] HTTPS enabled on domain
- [ ] Valid SSL certificate installed
- [ ] Security headers configured on server
- [ ] Contact form endpoint secured with CSRF token validation
- [ ] Rate limiting implemented on server
- [ ] Email validation on server side
- [ ] Input sanitization on server side
- [ ] Logging and monitoring set up
- [ ] Error messages don't leak sensitive info
- [ ] No hardcoded secrets in code
- [ ] Regular security updates applied
- [ ] GDPR compliance reviewed
- [ ] Privacy policy added
- [ ] Terms of service added

## 🔍 Testing Security

### Manual Testing:

1. Try submitting `<script>alert('xss')</script>` in name field
2. Try submitting with invalid email format
3. Try rapid form submissions (rate limit test)
4. Check browser console for CSP violations
5. Test with browser DevTools security tab

### Automated Testing:

- Use tools like [OWASP ZAP](https://www.zaproxy.org/)
- Run [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) if using Node
- Check with [Mozilla Observatory](https://observatory.mozilla.org/)
- Test with [SSL Labs](https://www.ssllabs.com/ssltest/)

## 📚 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Web Fundamentals Security](https://developers.google.com/web/fundamentals/security)

## 🔄 Security Updates

Keep your dependencies and frameworks updated:

- Monitor for security advisories
- Test updates in development first
- Apply critical patches immediately
- Document all security updates

---

**Last Updated**: January 28, 2026
**Security Level**: Standard (Recommended for production)
