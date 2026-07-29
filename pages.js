const pageData = {
  customers: [
    { name: "Aarav Sharma", company: "Myntra Retail", email: "aarav@myntra.demo", value: "₹2.4L", status: "Active", initials: "AS" },
    { name: "Meera Iyer", company: "Axis Fintech", email: "meera@axis.demo", value: "₹1.8L", status: "Active", initials: "MI" },
    { name: "Kabir Singh", company: "Aura Studios", email: "kabir@aura.demo", value: "₹96K", status: "Inactive", initials: "KS" },
    { name: "Sara Khan", company: "Innova Tech", email: "sara@innova.demo", value: "₹3.1L", status: "Active", initials: "SK" },
    { name: "Dev Patel", company: "Wanderly", email: "dev@wanderly.demo", value: "₹1.2L", status: "Active", initials: "DP" }
  ],
  leads: [
    { name: "BluePeak Foods", contact: "Ria Verma", value: "₹85K", stage: "New" },
    { name: "Nova Healthcare", contact: "Arjun Rao", value: "₹1.6L", stage: "Qualified" },
    { name: "UrbanNest", contact: "Nisha Jain", value: "₹72K", stage: "Proposal" },
    { name: "CloudCore", contact: "Manav Shah", value: "₹2.1L", stage: "Qualified" },
    { name: "EcoCart India", contact: "Tara Bose", value: "₹1.3L", stage: "New" },
    { name: "PixelCraft", contact: "Yash Mehta", value: "₹98K", stage: "Proposal" }
  ],
  projects: [
    { name: "E-commerce Redesign", client: "Myntra Retail", owner: "Ananya", progress: 78, due: "05 Aug 2026", status: "In Progress" },
    { name: "Mobile Banking App", client: "Axis Fintech", owner: "Rohan", progress: 100, due: "28 Jul 2026", status: "Completed" },
    { name: "Brand Identity System", client: "Aura Studios", owner: "Priya", progress: 46, due: "18 Aug 2026", status: "In Progress" },
    { name: "Analytics Dashboard", client: "Innova Tech", owner: "Vikram", progress: 62, due: "26 Aug 2026", status: "In Progress" },
    { name: "Travel Portal", client: "Wanderly", owner: "Ananya", progress: 24, due: "10 Sep 2026", status: "On Hold" }
  ],
  tasks: [
    { id: 1, title: "Review homepage wireframes", project: "E-commerce Redesign", priority: "High", due: "Today", done: false },
    { id: 2, title: "Prepare client presentation", project: "Brand Identity System", priority: "Medium", due: "Tomorrow", done: false },
    { id: 3, title: "Run accessibility audit", project: "Mobile Banking App", priority: "High", due: "30 Jul", done: true },
    { id: 4, title: "Finalize analytics events", project: "Analytics Dashboard", priority: "Medium", due: "02 Aug", done: false },
    { id: 5, title: "Approve travel search flow", project: "Travel Portal", priority: "Low", due: "06 Aug", done: false }
  ],
  activities: [
    { person: "Ananya Mehta", initials: "AM", action: "added a new lead", detail: "Myntra Retail", time: "12 min ago", type: "Lead" },
    { person: "Rohan Shah", initials: "RS", action: "completed a task", detail: "Mobile Banking App", time: "34 min ago", type: "Task" },
    { person: "Priya Kapoor", initials: "PK", action: "uploaded 4 files", detail: "Brand Identity System", time: "1 hr ago", type: "File" },
    { person: "Vikram Joshi", initials: "VJ", action: "updated a project", detail: "Analytics Dashboard", time: "2 hrs ago", type: "Project" },
    { person: "Ananya Mehta", initials: "AM", action: "qualified a lead", detail: "Nova Healthcare", time: "3 hrs ago", type: "Lead" },
    { person: "Kautuk Ade", initials: "KA", action: "created a report", detail: "Monthly Business Summary", time: "Yesterday", type: "Report" },
    { person: "Rohan Shah", initials: "RS", action: "changed project status", detail: "Travel Portal · On Hold", time: "Yesterday", type: "Project" },
    { person: "Priya Kapoor", initials: "PK", action: "invited a team member", detail: "Nexora Workspace", time: "2 days ago", type: "Team" }
  ]
};

const storedCustomers = JSON.parse(localStorage.getItem("nexoraCustomers") || "null");
const storedTasks = JSON.parse(localStorage.getItem("nexoraTasks") || "null");
const storedLeads = JSON.parse(localStorage.getItem("nexoraLeads") || "null");
const storedProjects = JSON.parse(localStorage.getItem("nexoraProjects") || "null");
if (Array.isArray(storedCustomers)) pageData.customers = storedCustomers;
if (Array.isArray(storedTasks)) pageData.tasks = storedTasks;
if (Array.isArray(storedLeads)) pageData.leads = storedLeads;
if (Array.isArray(storedProjects)) pageData.projects = storedProjects;

const page = document.body.dataset.page;
const pageTitles = {
  customers: ["Customers", "Manage customer relationships and account value."],
  leads: ["Leads Pipeline", "Track opportunities from first contact to proposal."],
  projects: ["Projects", "Monitor delivery progress, owners and deadlines."],
  tasks: ["Tasks", "Organize priorities and complete daily work."],
  insights: ["Business Insights", "Understand growth, conversion and team performance."],
  reports: ["Reports", "Generate and download business reports."],
  settings: ["Settings", "Manage workspace preferences and notifications."],
  activities: ["Recent Activities", "Review everything happening across your workspace."]
};

function navLink(key, icon, label, badge = "") {
  const active = page === key ? " active" : "";
  return `<a class="nav-item${active}" href="${key === "dashboard" ? "dashboard" : key}.html" ${active ? 'aria-current="page"' : ""}>
    <span class="nav-icon">${icon}</span><span>${label}</span>${badge ? `<span class="nav-badge">${badge}</span>` : ""}
  </a>`;
}

function renderShell() {
  const [title, description] = pageTitles[page];
  document.body.innerHTML = `
    <div class="app-layout">
      <aside class="sidebar" id="sidebar" aria-label="Main navigation">
        <a class="brand" href="dashboard.html"><span class="brand-mark">N</span><span class="brand-copy">NEXORA<small>BUSINESS SUITE</small></span></a>
        <nav class="navigation">
          <p class="nav-label">Workspace</p>
          ${navLink("dashboard", "⌂", "Dashboard")}
          ${navLink("customers", "♙", "Customers")}
          ${navLink("leads", "◎", "Leads")}
          ${navLink("projects", "◇", "Projects")}
          ${navLink("tasks", "✓", "Tasks", "5")}
          <p class="nav-label">Insights</p>
          ${navLink("insights", "◌", "Insights")}
          ${navLink("reports", "⌁", "Reports")}
          ${navLink("settings", "⚙", "Settings")}
        </nav>
      </aside>
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <main class="main-content">
        <header class="top-header">
          <div class="header-left">
            <button class="icon-button menu-button" id="menuButton" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
            <div><p class="eyebrow">Tuesday, 28 July</p><h1>${title}</h1></div>
          </div>
          <div class="header-actions"><button class="icon-button notification-button" id="notificationButton" aria-label="Notifications" aria-expanded="false">♢<span class="notification-dot"></span></button>
            <button class="profile profile-button" id="profileButton" aria-label="Open profile menu" aria-expanded="false"><span class="avatar">KA</span><span class="profile-copy"><strong>Kautuk Ade</strong><small>Administrator</small></span><span class="profile-chevron">⌄</span></button>
            <div class="header-popover notification-popover" id="notificationPopover"><div class="popover-heading"><strong>Notifications</strong><button id="markNotificationsRead">Mark all read</button></div><div class="notification-item unread"><span>◎</span><div><strong>New lead assigned</strong><small>BluePeak Foods · 12 min ago</small></div></div><div class="notification-item unread"><span>✓</span><div><strong>Task due today</strong><small>Review homepage wireframes</small></div></div><div class="notification-item"><span>◇</span><div><strong>Project updated</strong><small>Analytics Dashboard · 2 hrs ago</small></div></div></div>
            <div class="header-popover profile-popover" id="profilePopover"><div class="profile-card"><span class="avatar large">KA</span><div><strong>Kautuk Ade</strong><small>connect@itcyber.in</small><span class="online-status">● Available</span></div></div><button class="popover-action" id="viewProfileAction"><span>♙</span><span><strong>My profile</strong><small>View personal information</small></span></button><a class="popover-action" href="settings.html"><span>⚙</span><span><strong>Account settings</strong><small>Preferences and security</small></span></a><button class="popover-action danger" id="signOutAction"><span>↪</span><span><strong>Sign out</strong><small>End this demo session</small></span></button></div>
          </div>
        </header>
        <div class="dashboard-content page-content">
          <section class="page-heading"><div><p class="section-kicker">NEXORA WORKSPACE</p><h2>${title}</h2><p>${description}</p></div><div id="pageAction"></div></section>
          <div id="pageContent"></div>
          <div class="toast" id="toast" role="status"></div>
          <footer>© 2026 Nexora Business Suite <span>Secure workspace · Last synced just now</span></footer>
        </div>
      </main>
    </div>`;
}

function summaryCards(items) {
  return `<section class="summary-grid">${items.map(item => `
    <article class="summary-card"><div class="card-icon ${item.color}">${item.icon}</div><div class="card-top"><p>${item.label}</p></div>
    <div class="card-value">${item.value}</div><div class="card-change up"><span>↗ ${item.change}</span> this month</div></article>`).join("")}</section>`;
}

function toolbar(placeholder, options = "") {
  return `<div class="list-toolbar"><label class="search-box"><span>⌕</span><input id="listSearch" type="search" placeholder="${placeholder}"></label>${options}</div>`;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function openModal({ title, subtitle, fields, submitLabel, onSubmit }) {
  document.querySelector("#appModal")?.remove();
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.id = "appModal";
  modal.innerHTML = `<section class="app-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-header"><div><p class="section-kicker">CREATE NEW</p><h2 id="modalTitle">${title}</h2><p>${subtitle}</p></div><button class="modal-close" type="button" aria-label="Close form">×</button></div>
    <form id="modalForm"><div class="modal-fields">${fields}</div><div class="modal-actions"><button class="secondary-button modal-cancel" type="button">Cancel</button><button class="primary-button" type="submit">${submitLabel}</button></div></form>
  </section>`;
  document.body.append(modal);
  const close = () => modal.remove();
  modal.querySelector(".modal-close").addEventListener("click", close);
  modal.querySelector(".modal-cancel").addEventListener("click", close);
  modal.addEventListener("click", event => { if (event.target === modal) close(); });
  modal.querySelector("#modalForm").addEventListener("submit", event => {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget));
    close();
  });
  modal.querySelector("input, select")?.focus();
}

function renderCustomers() {
  document.querySelector("#pageAction").innerHTML = `<button class="primary-button" id="addCustomer">＋ Add customer</button>`;
  document.querySelector("#pageContent").innerHTML = summaryCards([
    { label: "Total Customers", value: "2,480", change: "8.2%", icon: "♙", color: "violet" },
    { label: "Active Accounts", value: "2,126", change: "6.4%", icon: "✓", color: "green" },
    { label: "New This Month", value: "186", change: "12.1%", icon: "＋", color: "blue" },
    { label: "Lifetime Value", value: "₹42.8L", change: "9.8%", icon: "₹", color: "orange" }
  ]) + `<section class="panel data-panel"><div class="projects-heading"><div><p class="section-kicker">DIRECTORY</p><h2>Customer accounts</h2></div>${toolbar("Search customers...", `<select id="statusSelect"><option>All status</option><option>Active</option><option>Inactive</option></select>`)}</div><div class="table-wrap"><table><thead><tr><th>Customer</th><th>Company</th><th>Email</th><th>Account value</th><th>Status</th><th>Actions</th></tr></thead><tbody id="dataRows"></tbody></table></div><div class="table-footer" id="resultCount"></div></section>`;
  const draw = () => {
    const query = document.querySelector("#listSearch").value.toLowerCase();
    const status = document.querySelector("#statusSelect").value;
    const filtered = pageData.customers.filter(x => `${x.name} ${x.company} ${x.email}`.toLowerCase().includes(query) && (status === "All status" || x.status === status));
    document.querySelector("#dataRows").innerHTML = filtered.map(x => {
      const index = pageData.customers.indexOf(x);
      return `<tr><td><div class="person-cell"><span class="mini-avatar">${x.initials}</span><strong>${x.name}</strong></div></td><td>${x.company}</td><td>${x.email}</td><td><strong>${x.value}</strong></td><td><select class="customer-status-select ${x.status.toLowerCase()}" data-customer="${index}" aria-label="Change status for ${x.name}"><option ${x.status === "Active" ? "selected" : ""}>Active</option><option ${x.status === "Inactive" ? "selected" : ""}>Inactive</option></select></td><td><div class="customer-actions"><button class="table-action view-customer" type="button" data-customer="${index}">View</button><button class="table-action edit-customer" type="button" data-customer="${index}">Edit</button></div></td></tr>`;
    }).join("");
    document.querySelector("#resultCount").textContent = `${filtered.length} customers shown`;
  };
  document.querySelector("#listSearch").addEventListener("input", draw);
  document.querySelector("#statusSelect").addEventListener("change", draw);
  document.querySelector("#dataRows").addEventListener("change", event => {
    if (!event.target.matches(".customer-status-select")) return;
    const customer = pageData.customers[Number(event.target.dataset.customer)];
    customer.status = event.target.value;
    localStorage.setItem("nexoraCustomers", JSON.stringify(pageData.customers));
    event.target.className = `customer-status-select ${customer.status.toLowerCase()}`;
    showToast(`${customer.name} is now ${customer.status.toLowerCase()}.`);
  });
  document.querySelector("#dataRows").addEventListener("click", event => {
    const button = event.target.closest(".view-customer, .edit-customer");
    if (!button) return;
    const customer = pageData.customers[Number(button.dataset.customer)];
    if (button.classList.contains("view-customer")) {
      openModal({
        title: customer.name,
        subtitle: "Customer account details and current status.",
        submitLabel: "Close",
        fields: `<div class="customer-profile-summary"><span class="mini-avatar">${customer.initials}</span><div><strong>${customer.name}</strong><small>${customer.status} account</small></div></div><label>Company<input value="${customer.company}" readonly></label><label>Email address<input value="${customer.email}" readonly></label><div class="form-grid"><label>Account value<input value="${customer.value}" readonly></label><label>Status<input value="${customer.status}" readonly></label></div>`,
        onSubmit: () => {}
      });
      return;
    }
    openModal({
      title: `Edit ${customer.name}`,
      subtitle: "Update customer details and account status.",
      submitLabel: "Save customer",
      fields: `<label>Customer name<input name="name" required value="${customer.name}"></label><label>Company<input name="company" required value="${customer.company}"></label><label>Email address<input name="email" type="email" required value="${customer.email}"></label><div class="form-grid"><label>Account value<input name="value" required value="${customer.value}"></label><label>Status<select name="status"><option ${customer.status === "Active" ? "selected" : ""}>Active</option><option ${customer.status === "Inactive" ? "selected" : ""}>Inactive</option></select></label></div>`,
      onSubmit: form => {
        const name = form.get("name").trim();
        Object.assign(customer, { name, company: form.get("company").trim(), email: form.get("email").trim(), value: form.get("value").trim(), status: form.get("status"), initials: name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase() });
        localStorage.setItem("nexoraCustomers", JSON.stringify(pageData.customers));
        draw();
        showToast(`${name} updated successfully.`);
      }
    });
  });
  document.querySelector("#addCustomer").addEventListener("click", () => openModal({
    title: "Add customer",
    subtitle: "Create a customer account in your workspace.",
    submitLabel: "Add customer",
    fields: `<label>Customer name<input name="name" required placeholder="e.g. Neha Kulkarni"></label><label>Company<input name="company" required placeholder="e.g. Bright Labs"></label><label>Email address<input name="email" type="email" required placeholder="name@company.com"></label><div class="form-grid"><label>Account value<input name="value" required placeholder="₹1.5L"></label><label>Status<select name="status"><option>Active</option><option>Inactive</option></select></label></div>`,
    onSubmit: form => {
      const name = form.get("name").trim();
      pageData.customers.unshift({ name, company: form.get("company").trim(), email: form.get("email").trim(), value: form.get("value").trim(), status: form.get("status"), initials: name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase() });
      localStorage.setItem("nexoraCustomers", JSON.stringify(pageData.customers));
      draw();
      showToast(`${name} added successfully.`);
    }
  }));
  draw();
}

function renderLeads() {
  document.querySelector("#pageAction").innerHTML = `<button class="primary-button" id="addLead">＋ Add lead</button>`;
  document.querySelector("#pageContent").innerHTML = summaryCards([
    { label: "Open Leads", value: "384", change: "12.5%", icon: "◎", color: "blue" },
    { label: "Pipeline Value", value: "₹18.4L", change: "8.7%", icon: "₹", color: "violet" },
    { label: "Conversion Rate", value: "24.8%", change: "3.2%", icon: "↗", color: "green" },
    { label: "Avg. Deal Size", value: "₹1.12L", change: "5.6%", icon: "◇", color: "orange" }
  ]) + `<div class="kanban" id="leadBoard"></div>`;
  const draw = () => {
    const stages = ["New", "Qualified", "Proposal"];
    document.querySelector("#leadBoard").innerHTML = stages.map(stage => `<section class="kanban-column"><div class="kanban-title"><h3>${stage}</h3><span>${pageData.leads.filter(x => x.stage === stage).length}</span></div>${pageData.leads.filter(x => x.stage === stage).map((x, index) => `<article class="lead-card"><p class="section-kicker">${x.value} OPPORTUNITY</p><h4>${x.name}</h4><p>${x.contact}</p><button class="move-lead" data-name="${x.name}" data-stage="${stage}">${stage === "Proposal" ? "Mark won" : "Move forward"} →</button></article>`).join("")}</section>`).join("");
    document.querySelectorAll(".move-lead").forEach(button => button.addEventListener("click", () => {
      const lead = pageData.leads.find(x => x.name === button.dataset.name);
      lead.stage = lead.stage === "New" ? "Qualified" : lead.stage === "Qualified" ? "Proposal" : "Won";
      localStorage.setItem("nexoraLeads", JSON.stringify(pageData.leads));
      showToast(lead.stage === "Won" ? `${lead.name} marked as won!` : `${lead.name} moved to ${lead.stage}.`);
      draw();
    }));
  };
  document.querySelector("#addLead").addEventListener("click", () => openModal({
    title: "Add lead",
    subtitle: "Create a new sales opportunity.",
    submitLabel: "Add lead",
    fields: `<label>Company or lead name<input name="name" required placeholder="e.g. Vertex Foods"></label><label>Contact person<input name="contact" required placeholder="Contact name"></label><div class="form-grid"><label>Opportunity value<input name="value" required placeholder="₹1.25L"></label><label>Pipeline stage<select name="stage"><option>New</option><option>Qualified</option><option>Proposal</option></select></label></div>`,
    onSubmit: form => {
      const lead = { name: form.get("name").trim(), contact: form.get("contact").trim(), value: form.get("value").trim(), stage: form.get("stage") };
      pageData.leads.unshift(lead);
      localStorage.setItem("nexoraLeads", JSON.stringify(pageData.leads));
      draw();
      showToast(`${lead.name} added to ${lead.stage}.`);
    }
  }));
  draw();
}

function renderProjects() {
  document.querySelector("#pageAction").innerHTML = `<button class="primary-button" id="addProject">＋ New project</button>`;
  document.querySelector("#pageContent").innerHTML = summaryCards([
    { label: "All Projects", value: "156", change: "7.8%", icon: "◇", color: "violet" },
    { label: "In Progress", value: "24", change: "4.2%", icon: "↗", color: "blue" },
    { label: "Completed", value: "124", change: "5.4%", icon: "✓", color: "green" },
    { label: "On Hold", value: "8", change: "1.1%", icon: "Ⅱ", color: "orange" }
  ]) + `<section class="panel data-panel"><div class="projects-heading"><div><p class="section-kicker">DELIVERY</p><h2>All projects</h2></div>${toolbar("Search projects...", `<select id="statusSelect"><option>All status</option><option>In Progress</option><option>Completed</option><option>On Hold</option></select>`)}</div><div class="table-wrap"><table><thead><tr><th>Project</th><th>Client</th><th>Owner</th><th>Progress</th><th>Deadline</th><th>Status</th><th>Actions</th></tr></thead><tbody id="dataRows"></tbody></table></div><div class="table-footer" id="resultCount"></div></section>`;
  const draw = () => {
    const query = document.querySelector("#listSearch").value.toLowerCase();
    const status = document.querySelector("#statusSelect").value;
    const filtered = pageData.projects.filter(x => `${x.name} ${x.client} ${x.owner}`.toLowerCase().includes(query) && (status === "All status" || x.status === status));
    document.querySelector("#dataRows").innerHTML = filtered.map(x => `<tr><td><strong>${x.name}</strong></td><td>${x.client}</td><td>${x.owner || "Kautuk Ade"}</td><td><div class="progress-cell"><span class="progress-track"><i style="width:${x.progress}%"></i></span><strong>${x.progress}%</strong></div></td><td>${x.due || x.deadline}</td><td><span class="status ${x.status.toLowerCase().replace(" ", "-")}">${x.status}</span></td><td class="actions-cell"><button class="row-menu" data-project="${encodeURIComponent(x.name)}" aria-label="Options for ${x.name}" aria-expanded="false">•••</button><div class="row-actions"><button data-action="edit" data-project="${encodeURIComponent(x.name)}">✎ Edit project</button><button class="delete" data-action="delete" data-project="${encodeURIComponent(x.name)}">⌫ Delete project</button></div></td></tr>`).join("");
    document.querySelector("#resultCount").textContent = `${filtered.length} projects shown`;
  };
  document.querySelector("#listSearch").addEventListener("input", draw);
  document.querySelector("#statusSelect").addEventListener("change", draw);
  document.querySelector("#addProject").addEventListener("click", () => openModal({
    title: "Create project",
    subtitle: "Add a project to the delivery workspace.",
    submitLabel: "Create project",
    fields: `<label>Project name<input name="name" required placeholder="e.g. Customer Portal"></label><label>Client<input name="client" required placeholder="Client company"></label><div class="form-grid"><label>Owner<input name="owner" required placeholder="Team member"></label><label>Deadline<input name="due" type="date" required></label></div><div class="form-grid"><label>Initial progress<input name="progress" type="number" min="0" max="100" value="0" required></label><label>Status<select name="status"><option>In Progress</option><option>On Hold</option><option>Completed</option></select></label></div>`,
    onSubmit: form => {
      const dueDate = new Date(`${form.get("due")}T00:00:00`);
      const project = { name: form.get("name").trim(), client: form.get("client").trim(), owner: form.get("owner").trim(), progress: Number(form.get("progress")), due: dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), status: form.get("status") };
      pageData.projects.unshift(project);
      localStorage.setItem("nexoraProjects", JSON.stringify(pageData.projects));
      draw();
      showToast(`${project.name} created successfully.`);
    }
  }));
  document.querySelector("#dataRows").addEventListener("click", event => {
    const menuButton = event.target.closest(".row-menu");
    if (menuButton) {
      const menu = menuButton.nextElementSibling;
      document.querySelectorAll(".row-actions.open").forEach(item => { if (item !== menu) item.classList.remove("open"); });
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      return;
    }
    const action = event.target.closest("[data-action]");
    if (!action) return;
    const project = pageData.projects.find(item => item.name === decodeURIComponent(action.dataset.project));
    if (!project) return;
    if (action.dataset.action === "edit") {
      const currentDate = project.due || project.deadline || "";
      const parsedDate = new Date(currentDate);
      const dateValue = !Number.isNaN(parsedDate.valueOf()) ? parsedDate.toISOString().slice(0, 10) : "";
      openModal({
        title: "Edit project", subtitle: "Update project details and delivery status.", submitLabel: "Save changes",
        fields: `<label>Project name<input name="name" required value="${project.name}"></label><label>Client<input name="client" required value="${project.client}"></label><div class="form-grid"><label>Owner<input name="owner" required value="${project.owner || "Kautuk Ade"}"></label><label>Deadline<input name="due" type="date" value="${dateValue}" required></label></div><div class="form-grid"><label>Progress<input name="progress" type="number" min="0" max="100" value="${project.progress}" required></label><label>Status<select name="status"><option ${project.status === "In Progress" ? "selected" : ""}>In Progress</option><option ${project.status === "On Hold" ? "selected" : ""}>On Hold</option><option ${project.status === "Completed" ? "selected" : ""}>Completed</option></select></label></div>`,
        onSubmit: form => {
          const dueDate = new Date(`${form.get("due")}T00:00:00`);
          Object.assign(project, { name: form.get("name").trim(), client: form.get("client").trim(), owner: form.get("owner").trim(), progress: Number(form.get("progress")), due: dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), deadline: dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), status: form.get("status") });
          localStorage.setItem("nexoraProjects", JSON.stringify(pageData.projects));
          draw();
          showToast(`${project.name} updated successfully.`);
        }
      });
    }
    if (action.dataset.action === "delete") {
      openModal({
        title: "Delete project?", subtitle: "This action cannot be undone.", submitLabel: "Delete project",
        fields: `<div class="delete-warning"><span>!</span><p><strong>${project.name}</strong> will be permanently removed from your project list.</p></div>`,
        onSubmit: () => {
          pageData.projects.splice(pageData.projects.indexOf(project), 1);
          localStorage.setItem("nexoraProjects", JSON.stringify(pageData.projects));
          draw();
          showToast(`${project.name} deleted.`);
        }
      });
    }
  });
  draw();
}

function renderTasks() {
  document.querySelector("#pageAction").innerHTML = `<button class="primary-button" id="addTask">＋ Add task</button>`;
  document.querySelector("#pageContent").innerHTML = `<div class="task-layout"><section class="panel task-list-panel"><div class="projects-heading"><div><p class="section-kicker">MY WORK</p><h2>Task list</h2></div><select id="taskFilter"><option>All tasks</option><option>Open</option><option>Completed</option></select></div><div id="taskList"></div></section><aside class="panel focus-panel"><p class="section-kicker">TODAY</p><h2>Focus score</h2><div class="focus-ring"><strong id="focusScore">0%</strong></div><p>Complete tasks to improve today’s focus score.</p></aside></div>`;
  const draw = () => {
    const filter = document.querySelector("#taskFilter").value;
    const visible = pageData.tasks.filter(x => filter === "All tasks" || (filter === "Completed" ? x.done : !x.done));
    document.querySelector("#taskList").innerHTML = visible.map(x => `<label class="task-row ${x.done ? "done" : ""}"><input type="checkbox" data-id="${x.id}" ${x.done ? "checked" : ""}><span class="task-check"></span><span class="task-copy"><strong>${x.title}</strong><small>${x.project}</small></span><span class="priority ${x.priority.toLowerCase()}">${x.priority}</span><span class="task-due">${x.due}</span></label>`).join("");
    const completed = pageData.tasks.filter(x => x.done).length;
    document.querySelector("#focusScore").textContent = `${Math.round(completed / pageData.tasks.length * 100)}%`;
    document.querySelectorAll(".task-row input").forEach(box => box.addEventListener("change", () => {
      pageData.tasks.find(x => x.id === Number(box.dataset.id)).done = box.checked;
      localStorage.setItem("nexoraTasks", JSON.stringify(pageData.tasks));
      showToast(box.checked ? "Task completed—nice work!" : "Task reopened.");
      draw();
    }));
  };
  document.querySelector("#taskFilter").addEventListener("change", draw);
  document.querySelector("#addTask").addEventListener("click", () => openModal({
    title: "Add task",
    subtitle: "Add a new item to your team’s task list.",
    submitLabel: "Create task",
    fields: `<label>Task title<input name="title" required placeholder="What needs to be done?"></label><label>Project<input name="project" required placeholder="Project name"></label><div class="form-grid"><label>Priority<select name="priority"><option>High</option><option selected>Medium</option><option>Low</option></select></label><label>Due date<input name="due" type="date" required></label></div>`,
    onSubmit: form => {
      const title = form.get("title").trim();
      const dueDate = new Date(`${form.get("due")}T00:00:00`);
      pageData.tasks.unshift({ id: Date.now(), title, project: form.get("project").trim(), priority: form.get("priority"), due: dueDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), done: false });
      localStorage.setItem("nexoraTasks", JSON.stringify(pageData.tasks));
      draw();
      showToast(`Task “${title}” created.`);
    }
  }));
  draw();
}

function renderInsights() {
  document.querySelector("#pageContent").innerHTML = summaryCards([
    { label: "Monthly Revenue", value: "₹8.42L", change: "12.8%", icon: "₹", color: "violet" },
    { label: "Lead Conversion", value: "24.8%", change: "3.2%", icon: "◎", color: "green" },
    { label: "Client Retention", value: "91.4%", change: "2.1%", icon: "♙", color: "blue" },
    { label: "Team Utilization", value: "82%", change: "4.7%", icon: "↗", color: "orange" }
  ]) + `<div class="insights-grid"><section class="panel insight-chart"><div class="panel-header"><div><p class="section-kicker">REVENUE</p><h2>Revenue by month</h2></div><select><option>Last 6 months</option></select></div><div class="bar-chart">${[42,56,51,68,76,92].map((height,i) => `<div><span style="height:${height}%"></span><small>${["Feb","Mar","Apr","May","Jun","Jul"][i]}</small></div>`).join("")}</div></section><section class="panel insight-chart"><p class="section-kicker">ACQUISITION</p><h2>Lead sources</h2><div class="source-list">${[["Organic search",38],["Referrals",27],["Social media",21],["Paid campaigns",14]].map(x => `<div><p><span>${x[0]}</span><strong>${x[1]}%</strong></p><i><b style="width:${x[1]}%"></b></i></div>`).join("")}</div></section></div><section class="panel recommendation"><span class="card-icon violet">✦</span><div><p class="section-kicker">SMART INSIGHT</p><h2>Your conversion rate is 3.2% higher this month</h2><p>Referral leads convert 1.8× better than other sources. Consider increasing your referral campaign budget.</p></div><button class="secondary-button" id="reviewInsight">Review insight</button></section>`;
  document.querySelector("#reviewInsight").addEventListener("click", () => openModal({
    title: "Referral growth insight",
    subtitle: "Turn this recommendation into a tracked action.",
    submitLabel: "Save action",
    fields: `<div class="insight-detail"><span class="card-icon violet">✦</span><div><strong>Referral leads convert 1.8× better</strong><p>Referral leads produced a 34.6% conversion rate compared with 19.2% from other sources during the selected period.</p></div></div><label>Action owner<input name="owner" required value="Kautuk Ade"></label><div class="form-grid"><label>Budget increase<select name="budget"><option>10%</option><option selected>20%</option><option>30%</option></select></label><label>Review date<input name="date" type="date" required></label></div><label>Notes<input name="notes" placeholder="Optional campaign note"></label>`,
    onSubmit: form => {
      localStorage.setItem("nexoraInsightAction", JSON.stringify({ owner: form.get("owner"), budget: form.get("budget"), date: form.get("date"), notes: form.get("notes"), createdAt: new Date().toISOString() }));
      showToast("Insight action saved to your workspace.");
    }
  }));
}

function renderReports() {
  const reports = [
    ["Monthly Business Summary", "Revenue, customers, leads and delivery overview", "CSV", "28 Jul 2026"],
    ["Project Performance", "Progress, deadlines and team utilization", "CSV", "25 Jul 2026"],
    ["Customer Growth", "Acquisition, retention and account value", "CSV", "20 Jul 2026"],
    ["Sales Pipeline", "Lead stages, probability and forecast", "CSV", "18 Jul 2026"]
  ];
  const csvCell = value => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const downloadCsv = (name, rows) => {
    const csv = `\uFEFF${rows.map(row => row.map(csvCell).join(",")).join("\r\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name.toLowerCase().replaceAll(" ", "-")}.csv`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };
  const reportRows = reportName => {
    if (reportName === "Project Performance") return [["Project", "Client", "Owner", "Progress", "Deadline", "Status"], ...pageData.projects.map(x => [x.name, x.client, x.owner, `${x.progress}%`, x.due || x.deadline, x.status])];
    if (reportName === "Customer Growth") return [["Customer", "Company", "Email", "Account Value", "Status"], ...pageData.customers.map(x => [x.name, x.company, x.email, x.value, x.status])];
    if (reportName === "Sales Pipeline") return [["Lead", "Contact", "Opportunity Value", "Pipeline Stage"], ...pageData.leads.map(x => [x.name, x.contact, x.value, x.stage])];
    return [["Metric", "Value"], ["Monthly Revenue", "₹8.42L"], ["Total Customers", pageData.customers.length], ["Open Leads", pageData.leads.filter(x => x.stage !== "Won").length], ["Completed Projects", pageData.projects.filter(x => x.status === "Completed").length], ["Pending Tasks", pageData.tasks.filter(x => !x.done).length]];
  };
  document.querySelector("#pageAction").innerHTML = `<button class="primary-button" id="createReport">＋ Create report</button>`;
  document.querySelector("#pageContent").innerHTML = `<section class="report-grid">${reports.map((x,i) => `<article class="panel report-card"><span class="report-icon">${x[2] === "PDF" ? "▤" : "▦"}</span><div><p class="section-kicker">${x[2]} REPORT</p><h3>${x[0]}</h3><p>${x[1]}</p><small>Updated ${x[3]}</small></div><button class="secondary-button download-report" data-index="${i}">Download</button></article>`).join("")}</section><section class="panel schedule-panel"><div><p class="section-kicker">AUTOMATION</p><h2>Scheduled reports</h2><p>Weekly business summary is sent every Monday at 9:00 AM.</p></div><label class="switch"><input type="checkbox" id="reportSchedule" checked><span></span></label></section>`;
  document.querySelectorAll(".download-report").forEach(button => button.addEventListener("click", () => {
    const report = reports[Number(button.dataset.index)];
    downloadCsv(report[0], reportRows(report[0]));
    showToast(`${report[0]} downloaded as Excel-ready CSV.`);
  }));
  document.querySelector("#createReport").addEventListener("click", () => openModal({
    title: "Create report",
    subtitle: "Choose the content and date range for your report.",
    submitLabel: "Generate report",
    fields: `<label>Report name<input name="name" required placeholder="e.g. Weekly Sales Review"></label><label>Report type<select name="type"><option>Business summary</option><option>Sales pipeline</option><option>Project performance</option><option>Customer growth</option></select></label><div class="form-grid"><label>From date<input name="from" type="date" required></label><label>To date<input name="to" type="date" required></label></div><label>Export format<select name="format"><option value="csv">Excel-ready CSV (.csv)</option></select></label>`,
    onSubmit: form => {
      const name = form.get("name").trim();
      const type = form.get("type");
      const matchedReport = ({ "Business summary": "Monthly Business Summary", "Sales pipeline": "Sales Pipeline", "Project performance": "Project Performance", "Customer growth": "Customer Growth" })[type];
      const rows = [["Report", name], ["Type", type], ["From", form.get("from")], ["To", form.get("to")], [], ...reportRows(matchedReport)];
      downloadCsv(name, rows);
      const history = JSON.parse(localStorage.getItem("nexoraCustomReports") || "[]");
      history.unshift({ name, type, format: "CSV", date: new Date().toLocaleDateString("en-IN") });
      localStorage.setItem("nexoraCustomReports", JSON.stringify(history));
      showToast(`${name} generated as Excel-ready CSV.`);
    }
  }));
  document.querySelector("#reportSchedule").addEventListener("change", event => showToast(event.target.checked ? "Weekly report enabled." : "Weekly report paused."));
}

function renderActivitiesPage() {
  document.querySelector("#pageContent").innerHTML = `<section class="panel data-panel"><div class="projects-heading"><div><p class="section-kicker">ACTIVITY LOG</p><h2>Workspace history</h2></div>${toolbar("Search activities...", `<select id="activityFilter"><option>All types</option><option>Lead</option><option>Task</option><option>Project</option><option>Report</option><option>Team</option></select>`)}</div><div class="full-activity-list" id="fullActivityList"></div><div class="table-footer" id="resultCount"></div></section>`;
  const draw = () => {
    const query = document.querySelector("#listSearch").value.toLowerCase();
    const type = document.querySelector("#activityFilter").value;
    const filtered = pageData.activities.filter(item => `${item.person} ${item.action} ${item.detail}`.toLowerCase().includes(query) && (type === "All types" || item.type === type));
    document.querySelector("#fullActivityList").innerHTML = filtered.map(item => `<article class="full-activity"><span class="mini-avatar">${item.initials}</span><div><p><strong>${item.person}</strong> ${item.action}</p><small>${item.detail}</small></div><span class="activity-type">${item.type}</span><time>${item.time}</time></article>`).join("");
    document.querySelector("#resultCount").textContent = `${filtered.length} activities shown`;
  };
  document.querySelector("#listSearch").addEventListener("input", draw);
  document.querySelector("#activityFilter").addEventListener("change", draw);
  draw();
}

function renderSettings() {
  const saved = JSON.parse(localStorage.getItem("nexoraSettings") || "{}");
  const n8nConfig = JSON.parse(localStorage.getItem("nexoraN8nConfig") || "{}");
  document.querySelector("#pageContent").innerHTML = `<form class="settings-layout" id="settingsForm">
    <nav class="panel settings-nav" aria-label="Settings sections"><button type="button" class="active" data-tab="general">General</button><button type="button" data-tab="notifications">Notifications</button><button type="button" data-tab="security">Security</button><button type="button" data-tab="team">Team</button><button type="button" data-tab="n8n"><span class="integration-dot"></span>n8n Configuration</button></nav>
    <section class="panel settings-panel">
      <div class="settings-tab active" data-panel="general"><div class="settings-section"><p class="section-kicker">WORKSPACE</p><h2>General settings</h2><label>Company name<input name="company" required value="${saved.company || "Nexora Business Suite"}"></label><label>Business email<input name="email" type="email" required value="${saved.email || "hello@nexora.demo"}"></label><div class="form-grid"><label>Timezone<select name="timezone"><option>Asia/Kolkata</option><option>UTC</option></select></label><label>Currency<select name="currency"><option>INR (₹)</option><option>USD ($)</option></select></label></div></div></div>
      <div class="settings-tab" data-panel="notifications"><div class="settings-section"><p class="section-kicker">PREFERENCES</p><h2>Notification settings</h2><label class="setting-toggle"><span><strong>Project updates</strong><small>Alerts when project status changes.</small></span><input type="checkbox" name="projects" ${saved.projects !== false ? "checked" : ""}></label><label class="setting-toggle"><span><strong>New leads</strong><small>Alerts when a new lead is created.</small></span><input type="checkbox" name="leads" ${saved.leads !== false ? "checked" : ""}></label><label class="setting-toggle"><span><strong>Task reminders</strong><small>Daily reminders for pending tasks.</small></span><input type="checkbox" name="tasks" ${saved.tasks !== false ? "checked" : ""}></label><label>Daily summary time<input name="summaryTime" type="time" value="${saved.summaryTime || "09:00"}"></label></div></div>
      <div class="settings-tab" data-panel="security"><div class="settings-section"><p class="section-kicker">ACCOUNT SAFETY</p><h2>Security</h2><label>Current password<input name="currentPassword" type="password" placeholder="Enter current password"></label><div class="form-grid"><label>New password<input name="newPassword" type="password" minlength="6" placeholder="Minimum 6 characters"></label><label>Confirm password<input name="confirmPassword" type="password" placeholder="Repeat new password"></label></div><label class="setting-toggle"><span><strong>Two-factor authentication</strong><small>Require an additional verification step.</small></span><input type="checkbox" name="twoFactor" ${saved.twoFactor ? "checked" : ""}></label><button class="secondary-button" id="signOutSessions" type="button">Sign out other sessions</button></div></div>
      <div class="settings-tab" data-panel="team"><div class="settings-section"><div class="team-heading"><div><p class="section-kicker">MEMBERS</p><h2>Team management</h2></div><button class="secondary-button" id="inviteMember" type="button">＋ Invite member</button></div><div class="team-list" id="teamList"></div></div></div>
      <div class="settings-tab" data-panel="n8n">
        <div class="settings-section n8n-heading">
          <div class="integration-title"><span class="n8n-logo">n8n</span><div><p class="section-kicker">AUTOMATION INTEGRATION</p><h2>Connect n8n</h2><p>Connect your n8n instance to automate leads, tasks, projects and reports.</p></div></div>
          <div class="connection-status" id="n8nConnectionStatus" data-state="${n8nConfig.status || "not-tested"}"><span></span><strong>${n8nConfig.status === "connected" ? "Connected" : "Not tested"}</strong></div>
        </div>
        <div class="settings-section">
          <div class="n8n-section-title"><div><h3>Instance details</h3><p>Use your n8n Cloud or self-hosted instance URL.</p></div><a href="https://docs.n8n.io/hosting/" target="_blank" rel="noopener">Hosting guide ↗</a></div>
          <div class="form-grid">
            <label>Environment<select name="n8nEnvironment"><option ${n8nConfig.environment === "Production" ? "selected" : ""}>Production</option><option ${n8nConfig.environment === "Staging" ? "selected" : ""}>Staging</option><option ${n8nConfig.environment === "Development" ? "selected" : ""}>Development</option></select></label>
            <label>Authentication<select name="n8nAuth"><option ${n8nConfig.auth === "API Key" ? "selected" : ""}>API Key</option><option ${n8nConfig.auth === "Webhook only" ? "selected" : ""}>Webhook only</option></select></label>
          </div>
          <label>n8n instance URL<input name="n8nBaseUrl" id="n8nBaseUrl" type="url" placeholder="https://your-workspace.app.n8n.cloud" value="${n8nConfig.baseUrl || ""}"><small class="field-help">Do not add <code>/api/v1</code>; the dashboard adds it automatically.</small></label>
          <label>API key<div class="secret-input"><input name="n8nApiKey" id="n8nApiKey" type="password" autocomplete="off" placeholder="n8n_api_••••••••" value="${n8nConfig.apiKey || ""}"><button type="button" id="toggleN8nKey" aria-label="Show API key">Show</button></div><small class="field-help">Create a key in n8n: Settings → n8n API → Create API key.</small></label>
        </div>
        <div class="settings-section">
          <div class="n8n-section-title"><div><h3>Webhook configuration</h3><p>Send dashboard events to an active n8n Webhook node.</p></div><a href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/" target="_blank" rel="noopener">Webhook docs ↗</a></div>
          <label>Production webhook URL<div class="copy-input"><input name="n8nWebhookUrl" id="n8nWebhookUrl" type="url" placeholder="https://your-workspace.app.n8n.cloud/webhook/dashboard" value="${n8nConfig.webhookUrl || ""}"><button type="button" id="copyWebhook">Copy</button></div></label>
          <div class="form-grid">
            <label>Event trigger<select name="n8nTrigger"><option ${n8nConfig.trigger === "All workspace events" ? "selected" : ""}>All workspace events</option><option ${n8nConfig.trigger === "New leads only" ? "selected" : ""}>New leads only</option><option ${n8nConfig.trigger === "Completed tasks only" ? "selected" : ""}>Completed tasks only</option><option ${n8nConfig.trigger === "Project updates only" ? "selected" : ""}>Project updates only</option></select></label>
            <label>Request method<select name="n8nMethod"><option>POST</option></select></label>
          </div>
          <label class="setting-toggle"><span><strong>Enable outgoing events</strong><small>Send selected workspace events to the production webhook.</small></span><input type="checkbox" name="n8nEnabled" ${n8nConfig.enabled ? "checked" : ""}></label>
        </div>
        <div class="settings-section n8n-test-panel">
          <div><h3>Connection test</h3><p id="n8nTestMessage">Save your details or test access to the n8n API.</p></div>
          <button class="secondary-button" id="testN8nConnection" type="button"><span>↻</span> Test connection</button>
        </div>
      </div>
      <div class="settings-actions"><button type="button" class="secondary-button" id="resetSettings">Reset</button><button class="primary-button" type="submit">Save changes</button></div>
    </section></form>`;
  const teamMembers = JSON.parse(localStorage.getItem("nexoraTeam") || '[{"name":"Kautuk Ade","email":"connect@itcyber.in","role":"Administrator"},{"name":"Ananya Mehta","email":"ananya@nexora.demo","role":"Project Manager"}]');
  const drawTeam = () => {
    document.querySelector("#teamList").innerHTML = teamMembers.map((member, index) => `<div class="team-member"><span class="mini-avatar">${member.name.split(" ").map(x => x[0]).join("").slice(0,2)}</span><div><strong>${member.name}</strong><small>${member.email}</small></div><select data-member="${index}"><option ${member.role === "Administrator" ? "selected" : ""}>Administrator</option><option ${member.role === "Project Manager" ? "selected" : ""}>Project Manager</option><option ${member.role === "Member" ? "selected" : ""}>Member</option></select></div>`).join("");
  };
  drawTeam();
  document.querySelectorAll(".settings-nav button").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".settings-nav button").forEach(item => item.classList.toggle("active", item === button));
    document.querySelectorAll(".settings-tab").forEach(panel => panel.classList.toggle("active", panel.dataset.panel === button.dataset.tab));
  }));
  document.querySelector("#inviteMember").addEventListener("click", () => openModal({
    title: "Invite team member", subtitle: "Add a new person to the Nexora workspace.", submitLabel: "Send invite",
    fields: `<label>Full name<input name="name" required placeholder="Team member name"></label><label>Email address<input name="email" type="email" required placeholder="member@company.com"></label><label>Role<select name="role"><option>Member</option><option>Project Manager</option><option>Administrator</option></select></label>`,
    onSubmit: form => { teamMembers.push({ name: form.get("name").trim(), email: form.get("email").trim(), role: form.get("role") }); localStorage.setItem("nexoraTeam", JSON.stringify(teamMembers)); drawTeam(); showToast("Team invitation added."); }
  }));
  document.querySelector("#teamList").addEventListener("change", event => {
    if (!event.target.matches("select")) return;
    teamMembers[Number(event.target.dataset.member)].role = event.target.value;
    localStorage.setItem("nexoraTeam", JSON.stringify(teamMembers));
    showToast("Member role updated.");
  });
  document.querySelector("#signOutSessions").addEventListener("click", () => showToast("Other sessions signed out."));
  const setN8nStatus = (state, label, message) => {
    const status = document.querySelector("#n8nConnectionStatus");
    status.dataset.state = state;
    status.querySelector("strong").textContent = label;
    document.querySelector("#n8nTestMessage").textContent = message;
  };
  document.querySelector("#toggleN8nKey").addEventListener("click", event => {
    const keyInput = document.querySelector("#n8nApiKey");
    const shouldShow = keyInput.type === "password";
    keyInput.type = shouldShow ? "text" : "password";
    event.currentTarget.textContent = shouldShow ? "Hide" : "Show";
    event.currentTarget.setAttribute("aria-label", `${shouldShow ? "Hide" : "Show"} API key`);
  });
  document.querySelector("#copyWebhook").addEventListener("click", async () => {
    const webhookUrl = document.querySelector("#n8nWebhookUrl").value.trim();
    if (!webhookUrl) { showToast("Add a webhook URL first."); return; }
    try {
      await navigator.clipboard.writeText(webhookUrl);
      showToast("Webhook URL copied.");
    } catch {
      document.querySelector("#n8nWebhookUrl").select();
      showToast("Webhook URL selected. Press Ctrl+C to copy.");
    }
  });
  document.querySelector("#testN8nConnection").addEventListener("click", async event => {
    const baseUrl = document.querySelector("#n8nBaseUrl").value.trim().replace(/\/+$/, "");
    const apiKey = document.querySelector("#n8nApiKey").value.trim();
    if (!baseUrl || !apiKey) { setN8nStatus("error", "Details required", "Enter both the n8n instance URL and API key."); return; }
    try { new URL(baseUrl); } catch { setN8nStatus("error", "Invalid URL", "Enter a complete HTTPS n8n instance URL."); return; }
    const button = event.currentTarget;
    button.disabled = true;
    button.innerHTML = "<span>↻</span> Testing…";
    setN8nStatus("testing", "Testing", "Contacting your n8n instance…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(`${baseUrl}/api/v1/workflows?limit=1`, { headers: { "X-N8N-API-KEY": apiKey }, signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setN8nStatus("connected", "Connected", "Connection successful. The n8n API is ready.");
      showToast("n8n connected successfully.");
    } catch (error) {
      const detail = error.name === "AbortError" ? "Connection timed out." : "Could not reach the API. Check URL, key and CORS settings.";
      setN8nStatus("error", "Connection failed", detail);
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.innerHTML = "<span>↻</span> Test connection";
    }
  });
  document.querySelector("#settingsForm").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("newPassword") && form.get("newPassword") !== form.get("confirmPassword")) { showToast("New passwords do not match."); return; }
    localStorage.setItem("nexoraSettings", JSON.stringify({ company: form.get("company"), email: form.get("email"), projects: form.get("projects") === "on", leads: form.get("leads") === "on", tasks: form.get("tasks") === "on", summaryTime: form.get("summaryTime"), twoFactor: form.get("twoFactor") === "on" }));
    const baseUrl = (form.get("n8nBaseUrl") || "").trim().replace(/\/+$/, "");
    const webhookUrl = (form.get("n8nWebhookUrl") || "").trim();
    if (baseUrl && !baseUrl.startsWith("https://")) { showToast("n8n instance URL must use HTTPS."); return; }
    localStorage.setItem("nexoraN8nConfig", JSON.stringify({ environment: form.get("n8nEnvironment"), auth: form.get("n8nAuth"), baseUrl, apiKey: form.get("n8nApiKey"), webhookUrl, trigger: form.get("n8nTrigger"), method: form.get("n8nMethod"), enabled: form.get("n8nEnabled") === "on", status: document.querySelector("#n8nConnectionStatus").dataset.state === "connected" ? "connected" : "not-tested" }));
    showToast("Settings saved successfully.");
  });
  document.querySelector("#resetSettings").addEventListener("click", () => { localStorage.removeItem("nexoraSettings"); localStorage.removeItem("nexoraN8nConfig"); location.reload(); });
}

function setupNavigation() {
  const sidebar = document.querySelector("#sidebar");
  const overlay = document.querySelector("#sidebarOverlay");
  const menuButton = document.querySelector("#menuButton");
  const setOpen = open => {
    sidebar.classList.toggle("open", open);
    overlay.classList.toggle("visible", open);
    menuButton.setAttribute("aria-expanded", String(open));
  };
  menuButton.addEventListener("click", () => setOpen(!sidebar.classList.contains("open")));
  overlay.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", event => { if (event.key === "Escape") setOpen(false); });
}

function setupHeaderMenus() {
  const profileButton = document.querySelector("#profileButton");
  const notificationButton = document.querySelector("#notificationButton");
  const profilePopover = document.querySelector("#profilePopover");
  const notificationPopover = document.querySelector("#notificationPopover");
  const closeMenus = () => {
    profilePopover.classList.remove("open");
    notificationPopover.classList.remove("open");
    profileButton.setAttribute("aria-expanded", "false");
    notificationButton.setAttribute("aria-expanded", "false");
  };
  profileButton.addEventListener("click", event => {
    event.stopPropagation();
    const open = !profilePopover.classList.contains("open");
    closeMenus();
    profilePopover.classList.toggle("open", open);
    profileButton.setAttribute("aria-expanded", String(open));
  });
  notificationButton.addEventListener("click", event => {
    event.stopPropagation();
    const open = !notificationPopover.classList.contains("open");
    closeMenus();
    notificationPopover.classList.toggle("open", open);
    notificationButton.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", event => { if (!event.target.closest(".header-popover")) closeMenus(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenus(); });
  document.querySelector("#markNotificationsRead").addEventListener("click", () => {
    document.querySelectorAll(".notification-item").forEach(item => item.classList.remove("unread"));
    document.querySelector(".notification-dot").hidden = true;
    showToast("All notifications marked as read.");
  });
  document.querySelector("#viewProfileAction").addEventListener("click", () => {
    profilePopover.innerHTML = `<div class="profile-detail"><span class="avatar profile-large">KA</span><h3>Kautuk Ade</h3><p>Administrator · Nexora Business Suite</p><dl><div><dt>Email</dt><dd>connect@itcyber.in</dd></div><div><dt>Location</dt><dd>India</dd></div><div><dt>Status</dt><dd class="available">● Available</dd></div></dl><button class="secondary-button" id="backToProfileMenu">← Back</button></div>`;
    profilePopover.querySelector("#backToProfileMenu").addEventListener("click", () => location.reload());
  });
  document.querySelector("#signOutAction").addEventListener("click", () => { closeMenus(); showToast("Demo session signed out successfully."); });
}

renderShell();
setupNavigation();
setupHeaderMenus();
({ customers: renderCustomers, leads: renderLeads, projects: renderProjects, tasks: renderTasks, insights: renderInsights, reports: renderReports, settings: renderSettings, activities: renderActivitiesPage })[page]();
