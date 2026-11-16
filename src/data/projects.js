export const projects = [
  {
    slug: 'sibas', name: 'SIBAS Attendance System', category: 'Software development', year: '2026',
    summary: 'A PostgreSQL-backed attendance-management prototype adapted from an existing SIBAS product for a university software assignment.',
    contribution: 'Primary application implementation · collaborative assignment', status: 'Completed academic prototype · tested locally', stack: ['Python', 'Streamlit', 'PostgreSQL', 'psycopg2', 'Pandas', 'bcrypt'],
    image: '/images/projects/sibas/admin-dashboard.jpg', imageAlt: 'Original SIBAS administrator dashboard showing high-level student, course and department counts', visualCaption: 'Original administrator dashboard capture. The account sidebar has been cropped out for privacy.',
    githubUrl: 'https://github.com/just-kachi/sibas-attendance-system',
    details: 'SIBAS was a classroom assignment to build a simplified adaptation of an existing attendance-management product. The application brings administrator, lecturer and student workflows into one Streamlit interface backed by PostgreSQL. I was responsible for most of the application layer: building the interface and Python logic, connecting it to a teammate-authored database schema, and implementing the CSV, attendance and reporting workflows.',
    features: ['Role-aware login and separate administrator, lecturer and student navigation', 'Student registration and bulk student import using CSV files', 'Lecturer attendance-session creation and CSV attendance upload', 'Attendance-record correction and course-level reporting', 'Student attendance summaries, percentage calculations and eligibility status', 'CSV report exports and PDF report generation'],
    note: 'Although the full product name contains “Biometrics”, this coursework implementation did not include biometric capture or recognition. Attendance was handled through CSV uploads and lecturer corrections. This was a local academic prototype, not a live university deployment.',
    caseStudy: {
      period: 'Early 2026',
      context: 'University software assignment · collaborative build',
      brief: 'The assignment was to create a simplified educational adaptation of an existing SIBAS attendance-management product. The aim was to demonstrate a working multi-role application connected to a relational PostgreSQL database—not to build a new commercial product or implement biometric identification.',
      designChallenge: 'The main engineering challenge was bringing three different user workflows into one application while keeping account roles distinct, connecting the supplied PostgreSQL schema to the Streamlit interface, and processing attendance data consistently.',
      outcome: 'A working local prototype with administrator, lecturer and student areas. It connected to PostgreSQL on my laptop and the main workflows were functioning when I captured the project screenshots.',
      contribution: [
        'Built the Streamlit interface for the main administrator, lecturer and student workflows.',
        'Implemented most of the Python application logic and role-aware page navigation.',
        'Connected the application to PostgreSQL using psycopg2 and the database schema supplied by a teammate.',
        'Implemented student and attendance CSV validation and processing.',
        'Implemented attendance calculations, correction workflows and reporting logic.'
      ],
      collaboration: 'This was collaborative coursework. A teammate designed and created the PostgreSQL schema; my responsibility was to connect the application to it and build most of the interface and Python logic. Another teammate also contributed an additional student-facing feature. I cannot confidently identify that feature now, so I have not described it as part of my own work.',
      architecture: [
        { title: 'Streamlit interface', detail: 'The screens and role-specific navigation in app.py.' },
        { title: 'Python application logic', detail: 'Authentication, account management, CSV processing, attendance calculations and reports.' },
        { title: 'Database connection', detail: 'Reusable query and connection helpers using psycopg2.' },
        { title: 'PostgreSQL', detail: 'Relational tables and relationships defined in the schema supplied by a teammate.' }
      ],
      roleGroups: [
        { title: 'Administrator', intro: 'Set up and manage the academic structure and user records.', items: ['Create and update student and lecturer accounts', 'Manage departments, programmes and courses', 'Assign lecturers to courses', 'Bulk-register students from CSV files', 'View course reports and manage user accounts'] },
        { title: 'Lecturer', intro: 'Work with assigned courses and their attendance records.', items: ['View assigned courses', 'Create attendance sessions', 'Upload attendance using CSV files', 'Correct attendance records', 'View course attendance reports and export them'] },
        { title: 'Student', intro: 'View personal academic and attendance information.', items: ['View profile information', 'See attendance summaries by course', 'Review attendance percentages', 'See eligibility status against the configured threshold'] }
      ],
      dataModel: 'The supplied schema links user accounts to roles and separate administrator, lecturer and student profiles. It also connects departments, programmes and courses to lecturer assignments, student enrolments, attendance sessions and attendance records. The database instance used for my demonstration was local to my laptop; another setup can recreate it by creating the PostgreSQL database and running the schema script first.',
      roleChallenge: 'I needed to make sure an account opened the correct area of the application, rather than treating an email suffix such as “@admin” as proof of administrator access. Reviewing the implementation shows that the account is linked to a role in the database. The login query retrieves that role, and the app uses it to choose the appropriate menu and pages. The supplied schema also enforces uniqueness for usernames and email addresses.',
      csvChallenge: 'CSV uploads had to match the expected structure before records could be processed. Student imports require a defined set of account, programme and course fields. Attendance imports require a matriculation number and a valid Present or Absent status. The application also checks related course, lecturer and enrolment records before saving attendance.',
      reportingChallenge: 'The student-facing summaries depend on joining enrolments, courses, attendance sessions and attendance records. The application calculates attendance percentages and compares them with the configured eligibility threshold, which defaults to 80% when no setting is found.',
      lessons: [
        'Connecting an existing relational schema to an application requires understanding how the tables and foreign-key relationships fit together, even when someone else created the schema.',
        'Role identity should come from the account’s stored role assignment, not from assumptions about the shape of an email address.',
        'CSV imports need clear validation before data is written to the database; missing columns and unexpected status values should be caught early.',
        'Attendance summaries and eligibility indicators depend on consistent relationships between course enrolments, sessions and individual attendance records.'
      ],
      limitations: [
        'The biometric part of the original product was outside the assignment scope and was not implemented in this version.',
        'The project was demonstrated locally using a PostgreSQL database on my laptop; it was not deployed as a live university service.',
        'The PostgreSQL schema was designed by a teammate. My contribution was integrating it with the application, not claiming authorship of the schema.'
      ],
      gallery: [
        { src: '/images/projects/sibas/academic-setup.jpg', title: 'Academic structure setup', caption: 'Administrator workflow for creating departments, programmes and courses.' },
        { src: '/images/projects/sibas/bulk-student-upload.jpg', title: 'Bulk student upload', caption: 'CSV-based student registration workflow.' },
        { src: '/images/projects/sibas/lecturer-attendance-upload.jpg', title: 'Lecturer attendance upload', caption: 'Course, session and CSV upload fields for recording attendance.' },
        { src: '/images/projects/sibas/student-attendance-summary.jpg', title: 'Student attendance summary', caption: 'Course-level attendance percentages and eligibility indicators.' },
        { src: '/images/projects/sibas/course-catalog.jpg', title: 'Course catalogue', caption: 'Administrator view of registered courses, course codes, titles, credit units and academic levels.' },
        { src: '/images/projects/sibas/programme-setup.jpg', title: 'Programme setup', caption: 'Administrator form for associating a programme with an academic department.' },
        { src: '/images/projects/sibas/lecturer-dashboard.jpg', title: 'Lecturer dashboard', caption: 'Lecturer landing page with assigned courses and academic-session information.' }
      ]
    }
  },
  {
    slug: 'sante-lims', name: 'Sante Diagnostics LIMS', category: 'Software development', year: 'Academic project',
    summary: 'A Java desktop laboratory information management application developed by a three-person team.',
    contribution: 'Backend development & frontend integration · 3-person team', status: 'Completed · functional at project handoff',
    stack: ['Java 21', 'JavaFX', 'PostgreSQL', 'JDBC', 'Maven', 'Jakarta Mail', 'BCrypt'],
    image: '/images/projects/sante/dashboard-overview.jpg', imageAlt: 'Sante Diagnostics super administrator dashboard showing user and request summary cards and administration shortcuts', visualCaption: 'Original super-administrator dashboard, cropped to the application window.',
    githubUrl: 'https://github.com/just-kachi/sante-diagnostics-lims',
    details: 'Sante Diagnostics LIMS is a desktop application developed for an academic assignment to create a medical/laboratory management system. It brings together account management, test-type administration, diagnostic request workflows and audit-related functions. The application was fully functional when the team completed it.',
    features: ['Role-based accounts for super administrators, laboratory attendants and customers', 'User management and email verification', 'Laboratory test-type management, including categories, prices, turnaround times and result formats', 'Diagnostic request queue and request-status handling', 'Audit trail for recording important application actions'],
    contributionDetails: 'I was responsible for the complete backend: database operations, authentication, user management, test types, diagnostic requests and laboratory operations. I also integrated the backend with the separately developed JavaFX frontend, connected interface actions to backend functionality and checked that the buttons, forms and workflows behaved correctly.',
    collaboration: 'This was a three-person project. I handled the backend and frontend-backend integration; one teammate developed the frontend based on the team specification; and the third teammate worked on the Jakarta Mail component used for email-related functionality.',
    learning: 'The biggest lesson was how much work sits between a well-designed interface and a functioning application. Translating frontend components into working backend operations, resolving mismatches between files and checking every interaction taught me to think about the application as one connected system rather than separate frontend and backend deliverables.',
    note: 'The project used PostgreSQL locally and was run through Apache NetBeans. Email verification/notifications depended on configuring Gmail SMTP credentials with a Gmail App Password. No credentials are included in the portfolio.',
    gallery: [
      { src: '/images/projects/sante/test-type-management.jpg', title: 'Test type management', caption: 'Administrative form and catalogue for test names, categories, prices, turnaround times and result formats.' },
      { src: '/images/projects/sante/browse-tests.jpg', title: 'Browse available tests', caption: 'Customer-facing test catalogue with search, category filtering, pricing and turnaround-time information.' },
      { src: '/images/projects/sante/login-screen.jpg', title: 'Sign-in screen', caption: 'Customer sign-in interface with email and password fields.' },
      { src: '/images/projects/sante/customer-registration.jpg', title: 'Customer registration', caption: 'Account creation form for new Sante Diagnostics customers.' }
    ],
    santeCaseStudy: {
      brief: 'The assignment was to build a medical/laboratory management application. Our three-person team split the work across the JavaFX frontend, backend and email-related functionality. The finished application was working when we handed it in.',
      challenge: 'My biggest challenge was integrating the independently developed frontend and backend. The frontend implementation contained additional files and components beyond the original specification, so I had to understand how the pieces fit together, connect each relevant control to the correct backend operation and verify that the workflows made sense.',
      outcome: 'A functional Java desktop application connected to a PostgreSQL database, with role-aware account workflows, laboratory test administration, diagnostic request handling and an email-verification feature.',
      contribution: [
        'Developed the complete backend and application logic for the project.',
        'Implemented database operations and connected the application to PostgreSQL.',
        'Implemented authentication and role-aware account management.',
        'Built the backend functionality for test types, diagnostic requests and laboratory operations.',
        'Integrated the frontend components with the backend and checked that buttons, forms and workflows triggered the intended actions.'
      ],
      team: [
        { role: 'Me · Backend & integration', detail: 'Backend development, database operations, authentication, user management, test types, request workflows, laboratory operations and frontend-backend integration.' },
        { role: 'Frontend teammate', detail: 'Developed the JavaFX interface from the team specification, using Claude as a development aid.' },
        { role: 'Email integration teammate', detail: 'Worked on the Jakarta Mail component supporting email-related functionality.' }
      ],
      architecture: [
        { title: 'JavaFX interface', detail: 'Desktop screens, forms, tables and navigation developed by a teammate.' },
        { title: 'Java backend', detail: 'Application logic, authentication, role-aware operations and workflow handling that I implemented.' },
        { title: 'PostgreSQL via JDBC', detail: 'Persistent user, test, request and audit-related data.' },
        { title: 'Jakarta Mail / SMTP', detail: 'Team email-verification and notification component, configured to use Gmail SMTP with an App Password.' }
      ],
      challenges: [
        { title: 'Connecting separate codebases', detail: 'The interface and backend were developed separately. I had to inspect how the frontend files were structured, resolve mismatches and connect each relevant button and form to the right backend operation.' },
        { title: 'Making the workflows consistent', detail: 'It was not enough for a button to respond. The action had to update the correct data, reflect the right state in the interface and make sense in the wider user workflow.' },
        { title: 'Email configuration', detail: 'The email feature required configuring Gmail SMTP with an App Password. This added another external service and setup dependency to test alongside the desktop application.' }
      ],
      lessons: [
        'Frontend-backend integration requires clear contracts between interface actions, backend methods and the data each operation reads or changes.',
        'Independently developed files can contain assumptions or extra components that need to be reconciled before the application behaves consistently.',
        'Testing every button, form and workflow is essential; a screen that looks complete does not prove that the underlying operation works.',
        'Integrating email services introduces configuration and credential-management concerns beyond the core application logic.'
      ],
      scope: [
        'This was a three-person academic project, not a deployed commercial laboratory platform.',
        'The application used a locally configured PostgreSQL database and was run through Apache NetBeans.',
        'The Jakarta Mail/email component was handled by a teammate as part of the group contribution; my principal responsibility was the backend and frontend-backend integration.'
      ]
    }
  },
  {
    slug: 'task-manager', name: 'Task Manager', category: 'Software development', year: '2025',
    summary: 'A task-management web application developed and iterated during my CWG internship, from an early JavaScript build to a React frontend connected to a Node.js API.',
    contribution: 'Individual development · CWG internship', status: 'Earlier React repository available · later improved source unavailable',
    stack: ['HTML', 'CSS', 'JavaScript', 'SQLite', 'React', 'Node.js', 'Axios'],
    image: '/images/projects/task-manager-original.jpg', imageAlt: 'Archived screenshot of the earlier Task Manager interface',
    legacyImage: '/images/projects/task-manager-original.jpg', visualType: 'task-manager-concept',
    details: 'The Task Manager began as a straightforward web application and evolved through multiple iterations during my CWG internship. The early implementation used HTML, CSS, JavaScript and SQLite. A later iteration moved to a React frontend communicating with a Node.js API. The application focused on giving users a place to create, organise, review and update tasks.',
    features: ['Create, edit and delete tasks with titles and descriptions', 'Set due dates, priorities and categories', 'Add comments and attach files to tasks', 'Search, filter and sort the task list', 'Switch between dark and light themes', 'Use a dynamic interface to review and manage task status'],
    contributionDetails: 'I handled the application design and implementation. I drew inspiration from other interface designs, created my own approach and also worked on translating a colleague’s Figma design into code. I developed the application through its different iterations, including the React frontend and its communication with a Node.js API.',
    developmentStory: 'The project evolved from an HTML/CSS/JavaScript and SQLite version into a React frontend connected to a Node.js API. The feature set was refined across those iterations. The original improved source code was not uploaded to GitHub and is no longer available.',
    learning: 'The most significant lesson was how difficult it can be to translate a Figma design into a working interface. Matching layout, spacing and visual details is only part of the work; those designs also need to become usable, interactive components that behave correctly.',
    note: 'The archived screenshot shows an earlier interface. The improved source was not uploaded to GitHub, and its Netlify demonstration was later taken down. The Taskflow interface shown alongside it is a code-built reconstruction based on the features and direction described; it is not the missing original build.',
    githubUrl: 'https://github.com/just-kachi/task-manager-frontend'
  },
  {
    slug: 'workflow-automation', name: 'Workflow Automation', category: 'Automation', year: '2026',
    summary: 'A set of n8n workflow automations exploring email handling, message notifications and connected services.',
    contribution: 'Workflow development and experimentation', status: 'Screenshots available · some workflows unfinished or no longer accessible', stack: ['n8n', 'Email', 'Slack', 'Google Sheets', 'Discord webhooks'],
    image: '/images/projects/n8n-workspace.jpg', imageAlt: 'n8n workflow workspace overview showing workflow entries', visualCaption: 'Original n8n workspace overview. This shows the workflow list, not proof of successful production execution.',
    details: 'A collection of n8n workflow experiments focused on connecting everyday communication and information-handling tasks. The work explored automated email sending, organising incoming emails with labels, sending Slack notifications and connecting workflows to other services. Some workflows were completed while others remained in progress.',
    features: ['Automated email sending and email-handling workflows', 'Separating and organising incoming emails using labels', 'Slack messages and team notifications', 'Experiments involving Google Sheets, Discord webhooks and AI-agent nodes'],
    note: 'The screenshots document the workflow workspace and examples, but the original workflows are not currently accessible for execution. The portfolio distinguishes completed experiments from unfinished work and does not claim that the automations are live or operational.'
  },
  {
    slug: 'cafeteria-app', name: 'Cafeteria Application', category: 'Software development', year: 'Academic project',
    summary: 'A Java desktop cafeteria application covering customer accounts, menu browsing, cart management and ordering.',
    contribution: 'Academic project', status: 'Project screenshots available', stack: ['Java', 'NetBeans'],
    image: '/images/projects/cafeteria-menu.jpg', imageAlt: 'Cafeteria application menu with food and drinks alongside a shopping cart', visualCaption: 'Original cafeteria menu and cart interface. Personal account and receipt details are not included.',
    details: 'A desktop cafeteria application with customer-facing screens for account access, browsing available food and drinks, building a cart and placing orders. The archived screenshots also show customer profiles and order history.',
    features: ['Registration and login screens', 'Customer profile and menu views', 'Cart, ordering and order history screens'],
    note: 'The screenshot is cropped to the menu area and excludes the account details and receipt information visible in some other archived screens.'
  }
];

export const experience = [
  {
    period: 'Jun—Aug 2026', company: 'Digital Encode', role: 'Intern — Information Security & GRC',
    points: [
      'Worked in a cybersecurity, information security and GRC advisory environment, gaining exposure to security consulting, compliance and risk management.',
      'Anchored and documented departmental GRC meetings, helping maintain meeting notes and records of discussions.',
      'Reviewed ISO/IEC 27001:2022 learning material and course content, including Foundation, Lead Implementer and Lead Auditor topics.',
      'Contributed to an ISMS kick-off presentation for an enterprise client.',
      'Explored n8n workflow automation alongside information security and GRC activities.'
    ]
  },
  {
    period: 'Jul—Sep 2025', company: 'Computer Warehouse Group', role: 'Intern — Technology',
    points: [
      'Developed and iterated a task-management web application, progressing from HTML, CSS, JavaScript and SQLite to a React frontend connected to a Node.js API.',
      'Built Python-based AI chatbot prototypes using REST APIs and local models such as Ollama, with GUI-supported query handling.',
      'Supported IT operations through system diagnostics, laptop configuration, domain-registration support, troubleshooting and user assistance.',
      'Conducted network performance testing and monitoring across company buildings, documenting results and creating visual representations for technical reporting.',
      'Used enterprise tools including SharePoint, ManageEngine, Power BI and Sophos during support, monitoring and reporting activities.',
      'Worked with existing BI dashboards and datasets, modifying views and creating simpler reporting outputs with message notifications.'
    ]
  },
  {
    period: 'Aug—Sep 2024', company: 'BluDive Technologies', role: 'Intern — Technical Training',
    points: [
      'Gained hands-on exposure to Linux-based servers, basic server configuration and system administration concepts.',
      'Studied computer hardware components, internal system functions and operating-system behaviour.',
      'Developed foundational understanding of IT infrastructure, troubleshooting and technical support environments.'
    ]
  }
];
