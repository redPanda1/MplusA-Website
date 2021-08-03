export const DOMAIN = "https://api.mentorsplusangels.com/"
export const SUBMISSION_STRUCTURE = [
    {title: "Basic Information",
    questions: [
        {companyName: {type: "text"}},
        {website: {type: "url"}},
        {contactName: {type: "text"}},
        {contactEmail: {type: "email"}},
        {files: ["url"]}
    ]},
    {title: "Business Information",
    questions: [
        {problem: {type: "text"}},
        {solution: {type: "url"}},
        {customer: {type: "text"}},
        {technology: {type: "email"}},
        {progress: ["url"]}
    ]},
    {title: "Challenges",
    questions: [
        {reason: {type: "text"}},
        {mentorship: {type: "url"}}
    ]}]
    
export const ADMIN_MENU_STRUCTURE = {
    company: {
      title: 'Companies',
      id: 'company-pages',
      children: {
        companies: {
          groupTitle: 'Companies',
          pages: [
            {
              title: 'All Companies',
              href: '/admin/company/list',
            }
          ],
        },
      },
    },
    event: {
      title: 'Events',
      id: 'event-pages',
      children: {
        events: {
          groupTitle: 'Events',
          pages: [
            {
              title: 'All Events',
              href: '/admin/events',
            }
          ],
        },
      },
    },
    admin: {
      title: 'Admin',
      id: 'admin-pages',
      children: {
        settings: {
          groupTitle: 'Settings',
          pages: [
            {
              title: 'General',
              href: '/admin/settings',
            },
            {
              title: 'Users',
              href: '/admin/users',
            },
          ],
        },
      },
    },
  };

export const SECTOR_OPTIONS = [
    { title: "Advertising"},
    { title: "Agriculture"},
    { title: "Construction"},
    { title: "Consumer Products"},
    { title: "Consumer Services"},
    { title: "Education"},
    { title: "Electronics/High Tech"},
    { title: "Energy"},
    { title: "Fashion"},
    { title: "Financial Services"},
    { title: "Food & Beverage"},
    { title: "Gaming"},
    { title: "Healthcare"},
    { title: "Legal"},
    { title: "Life Sciences"},
    { title: "Logistics"},
    { title: "Manufacturing"},
    { title: "Media/Entertainment"},
    { title: "Professional Services"},
    { title: "Real Estate"},
    { title: "Retail Tech"},
    { title: "Software/IT"},
    { title: "Sports"},
    { title: "Transportation"},
    { title: "Travel & Leisure"}]
    
export const MODEL_OPTIONS = [
    { title: "Advertising"},
    { title: "Agriculture"},
    { title: "Construction"},
    { title: "Consumer Products"},
    { title: "Consumer Services"},
    { title: "Education"},
    { title: "Electronics/High Tech"},
    { title: "Energy"},
    { title: "Fashion"},
    { title: "Financial Services"},
    { title: "Food & Beverage"},
    { title: "Gaming"},
    { title: "Healthcare"},
    { title: "Legal"},
    { title: "Life Sciences"},
    { title: "Logistics"},
    { title: "Manufacturing"},
    { title: "Media/Entertainment"},
    { title: "Professional Services"},
    { title: "Real Estate"},
    { title: "Retail Tech"},
    { title: "Software/IT"},
    { title: "Sports"},
    { title: "Transportation"},
    { title: "Travel & Leisure"}]