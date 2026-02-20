# PorkBun Deployment Guide

## Prerequisites
- PorkBun hosting account with domain configured
- FTP/SFTP access or File Manager access

## Build the App

```bash
cd gear-track-app
npm run build
```

This creates a static export in the `out/` directory.

## Deploy to PorkBun

### Option 1: File Manager (Recommended)
1. Log in to your PorkBun hosting control panel
2. Open the File Manager
3. Go to `public_html` (or your desired subdirectory)
4. Upload all contents from the `out/` folder
5. Ensure `index.html` is in the root of your deployment directory

### Option 2: FTP/SFTP Upload
1. Connect via FTP/SFTP using your PorkBun credentials
2. Navigate to `public_html` (or subdirectory)
3. Upload all contents from the `out/` folder

### Option 3: SSH/SFTP
```bash
# From the gear-track-app directory
scp -r out/* username@yourdomain.com:public_html/gear-track/
```

## Directory Structure on PorkBun

```
public_html/
└── gear-track/          (or root if deploying to main domain)
    ├── index.html
    ├── _next/
    │   └── static/
    ├── checklists/
    ├── procedures/
    ├── rules/
    ├── inspection-sheets/
    ├── icons/
    └── manifest.json
```

## Configure for Subdirectory (Optional)

If deploying to a subdirectory like `yourdomain.com/gear-track/`:

1. Update `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gear-track",
  images: {
    unoptimized: true,
  },
  turbopack: {},
};
```

2. Rebuild: `npm run build`
3. Upload the new `out/` contents

## SSL Configuration
PorkBun provides free Let's Encrypt SSL. Ensure it's enabled:
1. Go to the SSL section in your PorkBun dashboard
2. Enable SSL for your domain
3. Enforce HTTPS if available

## Testing
1. Visit your domain/subdirectory
2. Test on mobile (iOS Safari)
3. Add to Home Screen to test PWA functionality
4. Verify all pages load correctly
5. Test interactive checklists

## Troubleshooting

### 404 Errors on Page Refresh
Add a `.htaccess` file to your deployment directory:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Caching Issues
Clear PorkBun cache if enabled in your hosting panel.

### PWA Not Installing
- Ensure HTTPS is enabled
- Check manifest.json is accessible at `/manifest.json`
- Verify icons are loading correctly
