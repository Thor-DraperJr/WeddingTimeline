# Wedding Timeline - Lina & Thor 💕

A beautiful,## 📝 Deployment

The site automatically deploys to Azure Static Web Apps when changes are pushed to the `main` branch via GitHub Actions.

### Custom Domain

The wedding timeline is available at **https://www.thorandlina.love** with a custom domain configured through:
- **Domain**: Purchased from Namecheap (`thorandlina.love`)
- **DNS**: CNAME record pointing `www` to `blue-sand-0bdcf971e.1.azurestaticapps.net`
- **SSL**: Automatically managed by Azure Static Web Apps
- **CDN**: Global content delivery via Azure

### Azure Resourcesractive wedding timeline website built with Next.js, Tailwind CSS, and deployed on Azure Static Web Apps.

## � Features

- **Interactive Timeline**: Beautiful timeline with event filtering (All, Next, Upcoming)
- **Real-time Status**: Current events are highlighted automatically
- **Mobile-First Design**: Optimized for wedding guests using smartphones
- **Elegant Styling**: Rose/pink wedding theme with smooth animations
- **Quick Access**: Direct links to WhatsApp group and board games app
- **Accessible**: High contrast, keyboard navigation, screen reader friendly

## 🚀 Live Site

- **Production**: https://www.thorandlina.love
- **Azure Preview**: https://blue-sand-0bdcf971e-preview.westus2.1.azurestaticapps.net
- **Azure Default**: https://blue-sand-0bdcf971e.1.azurestaticapps.net

## � Event Information

**Wedding Dates**: July 10-11, 2025  
**Location**: Banff, Alberta

## 🛠️ Technology Stack

- **Framework:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS with custom wedding theme
- **Hosting:** Azure Static Web Apps (Free tier)
- **CI/CD:** GitHub Actions
- **Icons:** Lucide React

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Thor-DraperJr/WeddingTimeline.git
cd WeddingTimeline

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## � Deployment

The site automatically deploys to Azure Static Web Apps when changes are pushed to the `main` branch via GitHub Actions.

### Azure Resources

- **Resource Group**: `wedding-timeline-rg`
- **Static Web App**: `wedding-timeline` (West US 2)
- **SKU**: Free tier (perfect for wedding site needs)

### Manual Deployment (if needed)

```bash
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Build the project
npm run build

# Deploy to Azure
swa deploy --app-location . --output-location out --resource-group wedding-timeline-rg --app-name wedding-timeline --subscription-id YOUR_SUBSCRIPTION_ID
```

### GitHub Actions Setup


To enable automatic deployment, add this secret to your GitHub repository:

- **Secret Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- **Secret Value**: *(get this from the Azure Portal or CLI; never commit secrets to the repo)*

## 📱 Quick Links for Guests

- **WhatsApp Group**: [Join here](https://chat.whatsapp.com/GXnhYAKikvREQv6GsHWGb4)
- **Board Games App**: [Play games](https://blue-ocean-05fae780f.1.azurestaticapps.net)

## 📝 Updating Events

To update the wedding timeline events:

1. Edit `src/data/weddingTimeline.ts`
2. Commit and push changes to `main` branch
3. GitHub Actions will automatically rebuild and deploy

## 🔒 Security & Best Practices

- ✅ No hardcoded secrets or API keys
- ✅ HTTPS enabled by default
- ✅ Azure CDN for fast global delivery
- ✅ Responsive design for all devices
- ✅ Accessible design following WCAG guidelines

## 🤝 Contributing

This is a personal wedding website, but if you spot any issues:

1. Open an issue describing the problem
2. Or submit a pull request with the fix

---

**Made with 💕 for Lina & Thor's special day**

**🎊 We can't wait to celebrate with you! 💕**
