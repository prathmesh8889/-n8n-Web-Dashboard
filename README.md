# Nexora — n8n Business Dashboard

A clean, professional and fully responsive multi-page business dashboard built using **HTML5, CSS3 and Vanilla JavaScript**. It provides interactive tools for managing customers, leads, projects, tasks, reports, workspace activity and n8n automation settings.

No React, Bootstrap, Tailwind CSS or other frontend framework is used.

## Live Links

- **GitHub:** [prathmesh8889/-n8n-Web-Dashboard](https://github.com/prathmesh8889/-n8n-Web-Dashboard)
- **Live Demo:** [[Add your Netlify URL here](https://majestic-tapioca-fe7e2a.netlify.app/dashboard.html](https://simple-db-prathmesh.netlify.app/))

## Screenshots

Add your project screenshots inside a `screenshots` folder and update these paths:

```markdown
![Desktop Dashboard](screenshots/desktop-dashboard.png)
![Mobile Dashboard](screenshots/mobile-dashboard.png)
```

## Main Features

### Dashboard

- Dynamic summary cards generated from JavaScript data
- Total customers, leads, completed projects and pending tasks
- Interactive monthly performance chart
- Searchable and filterable recent-project table
- Working project action menu with edit and delete controls
- Recent workspace activity section

### Customer Management

- Add new customers
- Search customer accounts
- Filter accounts by Active or Inactive status
- View complete customer details
- Edit customer information and account value
- Change account status directly from the customer table
- Persist customer changes using `localStorage`

### Leads, Projects and Tasks

- Add and manage sales leads
- Move leads through pipeline stages
- Create, edit and delete projects
- Search projects and filter them by status
- Add tasks and mark tasks as completed
- Responsive task priority and focus views

### Reports

- Monthly business summary
- Project performance report
- Customer growth report
- Sales pipeline report
- Custom report builder
- Excel-ready `.csv` downloads with proper rows and columns
- UTF-8 CSV support for Indian currency and special characters
- Scheduled-report toggle and saved report history

### n8n Configuration

- Dedicated **Settings → n8n Configuration** tab
- n8n Cloud and self-hosted instance URL support
- API-key authentication field with Show/Hide control
- Production webhook URL with Copy action
- Environment and event-trigger configuration
- Enable or disable outgoing workspace events
- Real n8n API connection test with timeout and status feedback
- Direct links to n8n hosting and webhook documentation

> **Security note:** This is a frontend demonstration project. API keys stored in browser storage are not suitable for production. Use a secure backend or serverless proxy to protect credentials in a real deployment.

### Workspace Experience

- Separate working pages for every major section
- Responsive sidebar and mobile hamburger menu
- Notification panel with Mark all read
- Interactive profile menu for **Prathmesh Dake**
- General, Notifications, Security, Team and n8n settings
- Team invitations and role updates
- Searchable recent-activity history
- Data persistence through browser `localStorage`
- Keyboard navigation and visible focus states

## Technologies

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic page structure |
| CSS3 | Layout, design and responsive styling |
| Vanilla JavaScript | Dynamic data and interactions |
| CSS Grid | Dashboard cards and complex layouts |
| Flexbox | Navigation and component alignment |
| Local Storage | Browser-side demo persistence |
| Git and GitHub | Version control and source hosting |
| Netlify | Static-site deployment |
| n8n API/Webhooks | Automation configuration interface |

## Project Structure

```text
.
├── index.html             # Main dashboard entry page
├── dashboard.html         # Dashboard page
├── customers.html         # Customer management
├── leads.html             # Lead pipeline
├── projects.html          # Project management
├── tasks.html             # Task management
├── insights.html          # Business insights
├── reports.html           # Reports and CSV exports
├── settings.html          # Workspace and n8n settings
├── activities.html        # Complete activity history
├── mobile-preview.html    # Mobile preview helper
├── dashboard.css          # Shared responsive styles
├── dashboard.js           # Dashboard data and actions
├── pages.js               # Multi-page rendering and interactions
├── _redirects             # Netlify routing configuration
└── README.md
```

## Run Locally

### Option 1 — VS Code Live Server

1. Download or clone the repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

### Option 2 — Python Static Server

```bash
python -m http.server 5500
```

Open `http://localhost:5500` in your browser.

### Clone from GitHub

```bash
git clone git@github.com:prathmesh8889/-n8n-Web-Dashboard.git
cd -n8n-Web-Dashboard
```

## Configure n8n

1. Open **Settings** from the dashboard sidebar.
2. Select **n8n Configuration**.
3. Choose Production, Staging or Development.
4. Enter the n8n instance URL without `/api/v1`.
5. Add an n8n API key.
6. Add the production webhook URL.
7. Choose the event trigger.
8. Click **Test connection**.
9. Enable outgoing events and save the settings.

If the test fails, verify the instance URL, API key, HTTPS certificate and CORS configuration.

## Deploy on Netlify

1. Push the complete project to GitHub.
2. Sign in to Netlify.
3. Select **Add new site → Import an existing project**.
4. Choose GitHub and select this repository.
5. Leave the build command empty.
6. Set the publish directory to `.`.
7. Deploy the site.

The `_redirects` file is already included for static routing.

## Git Workflow

Use meaningful commits for different development stages:

```bash
git add .
git commit -m "feat: add responsive business dashboard"
git commit -am "feat: add customer and project management"
git commit -am "feat: add CSV reports and n8n configuration"
git commit -am "docs: improve project documentation"
git push origin main
```

## Testing Checklist

- [x] Separate dashboard pages work correctly
- [x] Customer add, view, edit and status controls work
- [x] Lead pipeline actions work
- [x] Project add, edit, search, filter and delete work
- [x] Task creation and completion work
- [x] Report downloads use Excel-ready CSV format
- [x] n8n configuration fields and test action work
- [x] Profile and notification menus work
- [x] Browser data persistence works
- [x] Desktop, tablet and mobile layouts are responsive
- [x] JavaScript files pass syntax validation
- [x] ZIP archive passes integrity validation

## Limitations

- The project uses demo data and browser storage instead of a backend database.
- Authentication and password settings are UI demonstrations.
- n8n API access depends on the remote instance allowing browser requests.
- Production credentials should always be handled by a secure backend.

## Future Improvements

- Secure backend authentication
- Database integration
- Server-side n8n credential storage
- Role-based access control
- Real-time activity updates
- PDF report generation
- Automated testing

## Author

**Prathmesh Dake**

- GitHub: [@prathmesh8889](https://github.com/prathmesh8889)
- Role: Frontend Developer

## License

This project is created for learning, demonstration and portfolio purposes.
