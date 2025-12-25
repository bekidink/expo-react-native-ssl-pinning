# SSL Certificate Pinning Demo

A practical React Native/Expo demo app showcasing **real-world SSL certificate pinning** for banking and financial apps. This project demonstrates how to implement certificate pinning to prevent man-in-the-middle attacks.

## 🎯 What's Inside

- **Complete SSL Pinning Implementation** with `react-native-ssl-public-key-pinning`
- **Certificate Hash Generator** tool for extracting public key hashes
- **Domain Security Tester** to validate SSL configurations
- **Error Simulation** to test pinning failures


## 🚀 Quick Start

```bash
# Clone and install
git clone <your-repo-url>
cd ssl-pinning-demo
npm install

# Configure your certificate hashes in app.config.js
# Build and run
eas build --platform android --profile development
```

## 🔧 Key Features

- ✅ **Production-ready SSL pinning** for banking apps
- ✅ **Expo Router** with intuitive tab navigation
- ✅ **Real certificate hash generation** from domains
- ✅ **Comprehensive testing tools** including error simulation
- ✅ **Security dashboard** with live monitoring
- ✅ **No native code required** – works with Expo managed workflow

## 📁 Project Structure

```
app/          # Expo Router app with all features

├── _layout.tsx # Security initialization
└── index.tsx # Dashboard
services/     # Core pinning logic
config/       # Certificate configurations
```



## ⚠️ Important Notes

- **Development Build Required**: SSL pinning doesn't work in Expo Go
- **Certificate Hashes**: You must add your own server certificate hashes
- **iOS Requirement**: At least 2 certificate hashes needed for iOS
- **Production Use**: Replace demo hashes with your actual server certificates

## 🔗 Useful Commands

```bash
# Get certificate hashes from your server
echo | openssl s_client -servername your-domain.com -connect your-domain.com:443 2>/dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform DER | openssl dgst -sha256 -binary | openssl enc -base64

# Build for development
eas build --platform android --profile development
```

---

**Perfect for**: Banking apps, financial services, healthcare apps, and any app requiring maximum transport security.
