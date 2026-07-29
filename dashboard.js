const dashboardData = {
  summary: [
    { label: "Total Customers", value: 2480, display: "2,480", change: "+8.2%", trend: "up", icon: "♙", color: "violet" },
    { label: "Total Leads", value: 384, display: "384", change: "+12.5%", trend: "up", icon: "◎", color: "blue" },
    { label: "Completed Projects", value: 124, display: "124", change: "+5.4%", trend: "up", icon: "◇", color: "green" },
    { label: "Pending Tasks", value: 18, display: "18", change: "-3.1%", trend: "down", icon: "✓", color: "orange" }
  ],
  projects: [
    { name: "E-commerce Redesign", code: "ER", color: "#6067e8", client: "Myntra Retail", progress: 78, deadline: "05 Aug 2026", status: "In Progress" },
    { name: "Mobile Banking App", code: "MB", color: "#16a36a", client: "Axis Fintech", progress: 100, deadline: "28 Jul 2026", status: "Completed" },
    { name: "Brand Identity System", code: "BI", color: "#df8a38", client: "Aura Studios", progress: 46, deadline: "18 Aug 2026", status: "In Progress" },
    { name: "Analytics Dashboard", code: "AD", color: "#3c8cd9", client: "Innova Tech", progress: 62, deadline: "26 Aug 2026", status: "In Progress" },
    { name: "Travel Portal", code: "TP", color: "#9a6cd5", client: "Wanderly", progress: 24, deadline: "10 Sep 2026", status: "On Hold" }
  ],
  activities: [
    { initials: "AM", color: "violet", text: "<strong>Ananya Mehta</strong> added a new lead", meta: "Myntra Retail · 12 min ago" },
    { initials: "RS", color: "blue", text: "<strong>Rohan Shah</strong> completed a task", meta: "Mobile Banking App · 34 min ago" },
    { initials: "PK", color: "green", text: "<strong>Priya Kapoor</strong> uploaded 4 files", meta: "Brand Identity · 1 hr ago" },
    { initials: "VJ", color: "orange", text: "<strong>Vikram Joshi</strong> updated a project", meta: "Analytics Dashboard · 2 hrs ago" }
  ]
};

const savedProjects = JSON.parse(localStorage.getItem("nexoraProjects") || "null");
if (Array.isArray(savedProjects)) {
  dashboardData.projects = savedProjects.map((project, index) => ({
    ...project,
    code: project.code || project.name.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase(),
    color: project.color || ["#6067e8", "#16a36a", "#df8a38", "#3c8cd9", "#9a6cd5"][index % 5],
    deadline: project.deadline || project.due
  }));
}

const summaryCards = document.querySelector("#summaryCards");
const projectsTableBody = document.querySelector("#projectsTableBody");
const activitiesList = document.querySelector("#activitiesList");
const projectSearch = document.querySelector("#projectSearch");
const statusFilter = document.querySelector("#statusFilter");
const emptyState = document.querySelector("#emptyState");
const projectCount = document.querySelector("#projectCount");
const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector("#sidebarOverlay");
const menuButton = document.querySelector("#menuButton");
const addProjectButton = document.querySelector("#dashboardAddProject");
const performancePeriod = document.querySelector("#performancePeriod");
const viewAllProjects = document.querySelector("#viewAllProjects");
const viewAllActivities = document.querySelector("#viewAllActivities");
const profileButton = document.querySelector("#profileButton");
const notificationButton = document.querySelector("#notificationButton");
const profilePopover = document.querySelector("#profilePopover");
const notificationPopover = document.querySelector("#notificationPopover");

const performanceData = {
  sixMonths: {
    revenue: "₹8.42L", target: "₹9.00L", growth: "↗ 12.8%",
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    line: "M8 181 C60 167 88 152 116 160 S188 137 224 130 S295 110 330 118 S404 80 438 90 S512 49 546 62 S606 25 632 30",
    targetPath: "M8 156 C120 146 185 132 224 120 S320 107 330 99 S420 85 438 75 S540 64 632 45"
  },
  year: {
    revenue: "₹15.86L", target: "₹17.20L", growth: "↗ 18.4%",
    labels: ["Aug", "Oct", "Dec", "Feb", "Apr", "Jul"],
    line: "M8 192 C70 180 94 170 116 174 S180 148 224 154 S282 126 330 118 S390 103 438 91 S500 70 546 66 S602 38 632 42",
    targetPath: "M8 178 C110 164 176 148 224 138 S320 117 330 110 S420 91 438 82 S535 62 632 48"
  },
  quarter: {
    revenue: "₹4.18L", target: "₹4.50L", growth: "↗ 9.6%",
    labels: ["Week 1", "Week 3", "Week 5", "Week 7", "Week 9", "Week 12"],
    line: "M8 175 C70 188 88 150 116 157 S190 143 224 126 S286 138 330 108 S400 115 438 83 S510 90 546 59 S600 50 632 33",
    targetPath: "M8 162 C105 154 174 143 224 128 S318 112 330 102 S423 81 438 74 S535 58 632 43"
  }
};

function renderSummaryCards() {
  summaryCards.innerHTML = dashboardData.summary.map((item) => `
    <article class="summary-card">
      <div class="card-icon ${item.color}" aria-hidden="true">${item.icon}</div>
      <div class="card-top"><p>${item.label}</p><button aria-label="${item.label} options">•••</button></div>
      <div class="card-value">${item.display}</div>
      <div class="card-change ${item.trend}">
        <span>${item.trend === "up" ? "↗" : "↘"} ${item.change}</span> vs last month
      </div>
    </article>
  `).join("");
}

function renderActivities() {
  activitiesList.innerHTML = dashboardData.activities.map((activity) => `
    <div class="activity">
      <span class="activity-avatar ${activity.color}">${activity.initials}</span>
      <div><p>${activity.text}</p><small>${activity.meta}</small></div>
    </div>
  `).join("");
}

function getFilteredProjects() {
  const searchTerm = projectSearch.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  return dashboardData.projects.filter((project) => {
    const searchableText = `${project.name} ${project.client}`.toLowerCase();
    return searchableText.includes(searchTerm) && (selectedStatus === "All" || project.status === selectedStatus);
  });
}

function renderProjects() {
  const filteredProjects = getFilteredProjects();
  projectsTableBody.innerHTML = filteredProjects.map((project) => `
    <tr>
      <td><div class="project-name"><span class="project-logo" style="--logo-color:${project.color}">${project.code}</span><strong>${project.name}</strong></div></td>
      <td>${project.client}</td>
      <td>
        <div class="progress-cell"><span class="progress-track"><i style="width:${project.progress}%"></i></span><strong>${project.progress}%</strong></div>
      </td>
      <td>${project.deadline}</td>
      <td><span class="status ${project.status.toLowerCase().replace(" ", "-")}">${project.status}</span></td>
      <td class="actions-cell"><button class="row-menu" data-project="${encodeURIComponent(project.name)}" aria-label="Options for ${project.name}" aria-expanded="false">•••</button>
        <div class="row-actions"><button data-action="edit" data-project="${encodeURIComponent(project.name)}">✎ Edit project</button><button class="delete" data-action="delete" data-project="${encodeURIComponent(project.name)}">⌫ Delete project</button></div>
      </td>
    </tr>
  `).join("");
  emptyState.hidden = filteredProjects.length !== 0;
  projectCount.textContent = `Showing ${filteredProjects.length} of ${dashboardData.projects.length} projects`;
}

function showDashboardToast(message) {
  let toast = document.querySelector("#dashboardToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.id = "dashboardToast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function openProjectModal(existingProject = null) {
  const editing = Boolean(existingProject);
  const currentDate = existingProject?.due || existingProject?.deadline || "";
  const parsedDate = currentDate ? new Date(currentDate) : null;
  const dateValue = parsedDate && !Number.isNaN(parsedDate.valueOf()) ? parsedDate.toISOString().slice(0, 10) : "";
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.id = "appModal";
  modal.innerHTML = `<section class="app-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-header"><div><p class="section-kicker">${editing ? "UPDATE" : "CREATE NEW"}</p><h2 id="modalTitle">${editing ? "Edit project" : "Create project"}</h2><p>${editing ? "Update project information and delivery status." : "Add a project to your delivery workspace."}</p></div><button class="modal-close" type="button" aria-label="Close form">×</button></div><form id="projectForm"><div class="modal-fields"><label>Project name<input name="name" required value="${existingProject?.name || ""}" placeholder="e.g. Customer Portal"></label><label>Client<input name="client" required value="${existingProject?.client || ""}" placeholder="Client company"></label><div class="form-grid"><label>Owner<input name="owner" required value="${existingProject?.owner || "Kautuk Ade"}" placeholder="Team member"></label><label>Deadline<input name="due" type="date" value="${dateValue}" required></label></div><div class="form-grid"><label>Progress<input name="progress" type="number" min="0" max="100" value="${existingProject?.progress ?? 0}" required></label><label>Status<select name="status"><option ${existingProject?.status === "In Progress" ? "selected" : ""}>In Progress</option><option ${existingProject?.status === "On Hold" ? "selected" : ""}>On Hold</option><option ${existingProject?.status === "Completed" ? "selected" : ""}>Completed</option></select></label></div></div><div class="modal-actions"><button class="secondary-button modal-cancel" type="button">Cancel</button><button class="primary-button" type="submit">${editing ? "Save changes" : "Create project"}</button></div></form></section>`;
  document.body.append(modal);
  const close = () => modal.remove();
  modal.querySelector(".modal-close").addEventListener("click", close);
  modal.querySelector(".modal-cancel").addEventListener("click", close);
  modal.addEventListener("click", event => { if (event.target === modal) close(); });
  modal.querySelector("#projectForm").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const dueDate = new Date(`${form.get("due")}T00:00:00`);
    const name = form.get("name").trim();
    const project = {
      name, client: form.get("client").trim(), owner: form.get("owner").trim(),
      progress: Number(form.get("progress")), due: dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      deadline: dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: form.get("status"), code: name.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase(), color: "#6067e8"
    };
    if (editing) {
      const index = dashboardData.projects.indexOf(existingProject);
      dashboardData.projects[index] = { ...existingProject, ...project };
    } else {
      dashboardData.projects.unshift(project);
    }
    localStorage.setItem("nexoraProjects", JSON.stringify(dashboardData.projects));
    renderProjects();
    close();
    showDashboardToast(`${name} ${editing ? "updated" : "created"} successfully.`);
  });
  modal.querySelector("input").focus();
}

function confirmProjectDelete(project) {
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.id = "appModal";
  modal.innerHTML = `<section class="app-modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="deleteTitle"><div class="delete-icon">!</div><h2 id="deleteTitle">Delete project?</h2><p><strong>${project.name}</strong> will be removed from Recent Projects. This action cannot be undone.</p><div class="modal-actions"><button class="secondary-button modal-cancel" type="button">Cancel</button><button class="danger-button" id="confirmDelete" type="button">Delete project</button></div></section>`;
  document.body.append(modal);
  const close = () => modal.remove();
  modal.querySelector(".modal-cancel").addEventListener("click", close);
  modal.querySelector("#confirmDelete").addEventListener("click", () => {
    dashboardData.projects.splice(dashboardData.projects.indexOf(project), 1);
    localStorage.setItem("nexoraProjects", JSON.stringify(dashboardData.projects));
    renderProjects();
    close();
    showDashboardToast(`${project.name} deleted.`);
  });
}

function updatePerformance(period) {
  const data = performanceData[period];
  document.querySelector("#revenueValue").textContent = data.revenue;
  document.querySelector("#targetValue").textContent = data.target;
  document.querySelector("#growthValue").textContent = data.growth;
  document.querySelector("#revenuePath").setAttribute("d", data.line);
  document.querySelector("#chartArea").setAttribute("d", `${data.line} L632 220 L8 220 Z`);
  document.querySelector("#targetPath").setAttribute("d", data.targetPath);
  document.querySelector("#chartLabels").innerHTML = data.labels.map(label => `<span>${label}</span>`).join("");
  showDashboardToast("Performance period updated.");
}

function setupDashboardHeaderMenus() {
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
    showDashboardToast("All notifications marked as read.");
  });
  document.querySelector("#viewProfileAction").addEventListener("click", () => {
    profilePopover.innerHTML = `<div class="profile-detail"><span class="avatar profile-large">KA</span><h3>Kautuk Ade</h3><p>Administrator · Nexora Business Suite</p><dl><div><dt>Email</dt><dd>connect@itcyber.in</dd></div><div><dt>Location</dt><dd>India</dd></div><div><dt>Status</dt><dd class="available">● Available</dd></div></dl><button class="secondary-button" id="backToProfileMenu">← Back</button></div>`;
    profilePopover.querySelector("#backToProfileMenu").addEventListener("click", () => location.reload());
  });
  document.querySelector("#signOutAction").addEventListener("click", () => { closeMenus(); showDashboardToast("Demo session signed out successfully."); });
}

function setSidebar(open) {
  sidebar.classList.toggle("open", open);
  sidebarOverlay.classList.toggle("visible", open);
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

projectSearch.addEventListener("input", renderProjects);
statusFilter.addEventListener("change", renderProjects);
addProjectButton.addEventListener("click", openProjectModal);
performancePeriod.addEventListener("change", event => updatePerformance(event.target.value));
viewAllProjects.addEventListener("click", () => { window.location.href = "projects.html"; });
viewAllActivities.addEventListener("click", () => { window.location.href = "activities.html"; });
setupDashboardHeaderMenus();
projectsTableBody.addEventListener("click", event => {
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
  const project = dashboardData.projects.find(item => item.name === decodeURIComponent(action.dataset.project));
  if (!project) return;
  if (action.dataset.action === "edit") openProjectModal(project);
  if (action.dataset.action === "delete") confirmProjectDelete(project);
});
document.addEventListener("click", event => {
  if (!event.target.closest(".actions-cell")) document.querySelectorAll(".row-actions.open").forEach(menu => menu.classList.remove("open"));
});
menuButton.addEventListener("click", () => setSidebar(!sidebar.classList.contains("open")));
sidebarOverlay.addEventListener("click", () => setSidebar(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setSidebar(false);
});
renderSummaryCards();
renderActivities();
renderProjects();
