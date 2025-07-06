# Carolina & Thor's Wedding Timeline 💕

Welcome to our interactive wedding timeline! This beautiful, responsive web application helps our guests stay informed about all the events during our special weekend in Banff & Canmore, Alberta.

## 🎉 Wedding Details

- **Dates:** July 10-11, 2025
- **Locations:** Banff & Canmore, Alberta, Canada
- **Couples:** Carolina & Thor

## ✨ Features

- 📱 **Mobile-first design** - Perfect for day-of use on smartphones
- 🕐 **Real-time updates** - See current and upcoming events
- 📍 **Location integration** - Direct links to Google Maps
- ♿ **Accessibility focused** - Screen reader friendly and keyboard navigable
- 🎨 **Beautiful wedding theme** - Soft pastels and rose gold accents
- 📋 **Detailed information** - Times, locations, participants, and notes

## 🏗️ Technical Stack

- **Frontend:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS with custom wedding theme
- **Hosting:** Azure Static Web Apps
- **CI/CD:** GitHub Actions
- **Infrastructure:** Azure Bicep templates

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📱 Azure Deployment

This application is designed for Azure-native deployment using Infrastructure as Code.

### Prerequisites

- Azure CLI installed and configured
- GitHub account with repository access
- Node.js 18+ and npm

### Deploy Infrastructure

1. **Clone and setup:**

   ```bash
   git clone <repository-url>
   cd WeddingTimeline
   npm install
   ```

2. **Configure Azure parameters:**
   Update `azure/parameters.json` with your details:

   ```json
   {
     "repositoryUrl": "https://github.com/YOUR_USERNAME/WeddingTimeline",
     "repositoryToken": "YOUR_GITHUB_TOKEN"
   }
   ```

3. **Deploy Azure resources:**

   ```bash
   # Login to Azure
   az login

   # Deploy infrastructure
   az deployment sub create \
     --location eastus \
     --template-file azure/main.bicep \
     --parameters @azure/parameters.json \
     --parameters repositoryToken="YOUR_GITHUB_TOKEN"
   ```

4. **Configure GitHub Secrets:**
   Add the following secrets to your GitHub repository:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN` - From the Static Web App deployment output

### Manual Deployment

You can also deploy manually using the Azure portal:

1. Create an Azure Static Web App
2. Connect to your GitHub repository
3. Set build configuration:
   - **App location:** `/`
   - **API location:** `` (empty)
   - **Output location:** `out`
   - **Build command:** `npm run build`

## 🏗️ Project Structure

```
WeddingTimeline/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── data/               # Wedding timeline data
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Utility functions
├── azure/                  # Azure infrastructure templates
│   ├── main.bicep         # Main Bicep template
│   ├── modules/           # Bicep modules
│   └── parameters.json    # Deployment parameters
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
└── public/                # Static assets
```

## 📊 Monitoring & Analytics

The application includes Azure Application Insights for:

- Performance monitoring
- Error tracking
- User analytics
- Real-time dashboards

Access your insights through the Azure portal after deployment.

## 🔧 Development

### Code Quality

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling

### Key Components

1. **WeddingTimeline** - Main timeline component
2. **EventCard** - Individual event display
3. **TimelineDay** - Day grouping component
4. **CurrentEventIndicator** - Real-time event tracking

### Data Structure

Wedding events are structured with:

- Time and date information
- Location details with Google Maps integration
- Participant lists
- Categories and icons
- Notes and special instructions

## 🎨 Design System

The wedding theme uses:

- **Colors:** Soft pastels (rose, blush, sage) with rose gold accents
- **Typography:** Playfair Display (headings) + Inter (body)
- **Icons:** Lucide React icon set
- **Animations:** Subtle Framer Motion transitions

## 📞 Support

For technical issues or wedding questions:

- **Carolina:** (980) 297-2290
- **Thor:** (704) 560-3428

## 🙏 Acknowledgments

Built with love for our special day! Thanks to all our family and friends who will be celebrating with us.

---

**🎊 We can't wait to celebrate with you! 💕**
