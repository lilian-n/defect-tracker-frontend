# Defect Tracker
**Live Demo**  
https://immense-coast-76928.herokuapp.com/

## Description
A web application to store and manage defects. You can create projects and defects related to each project, along with assigning developers to fix defects.

## Installation
Refer to the live demo to see it running, or clone to view my code. 

## Technologies Used
- React 17
- Redux 4.0.5
- Redux-Thunk 2.3
- Redux JS Toolkit 1.5
- React Bootstrap 8.4.1
- Recharts 2.0.4  
  
Used the Paper Dashboard, a Bootstrap 4 based admin template from Creative Tim.

## Directory
```
├── LICENSE.md
├── README.md
├── jsconfig.json
├── package.json
├── public
│   ├── apple-icon.png
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── index.js
    ├── logo-white.svg
    ├── logo.svg
    ├── routes.js
    ├── auth
    │   ├── Auth0ProviderWithHistory.js
    │   ├── LoginButton.js
    │   ├── LogoutButton.js
    │   ├── ProtectedRoute.js
    │   └── SignupButton.js
    ├── components
    │   ├── Defects
    │   ├── FixedPlugin
    │   ├── Footer
    │   ├── Home
    │   ├── Navbars
    │   ├── Projects
    │   └── Sidebar
    │   ├── Users
    │   ├── Can.js
    │   ├── datePicker.js
    │   └── Loading.js
    ├── layouts
    │   └── Admin.js
    ├── redux-store
    │   ├── authUserSlice.js
    │   ├── defectFilterReducer.js
    │   ├── defectSlice.js
    │   ├── helperFunctions.js
    │   ├── projectSlice.js
    │   ├── schemas.js
    │   ├── store.js
    │   └── userSlice.js
    ├── variables
    │   ├── charts.js
    │   └── icons.js
    ├── services
    │   ├── constants.js
    │   ├── defects.js
    │   ├── projects.js
    │   └── users.js
    ├── views
    │   ├── Defects
    │   ├── Projects
    │   ├── Users
    │   ├── Dashboard.js
    │   ├── Home.js
    │   └── NotFound.js
    └── assets
        ├── css
        │   ├── paper-dashboard.css
        │   ├── paper-dashboard.css.map
        │   └── paper-dashboard.min.css
        ├── demo
        ├── fonts
        ├── github
        ├── img
        │   └── faces
        └── scss
            ├── paper-dashboard
            │   ├── cards
            │   ├── mixins
            │   ├── plugins
            │   └── react
            │       ├── custom
            │       └── react-differences.scss
            └── paper-dashboard.scss
```

### Folder Descriptions
**auth**: Files and components related to Auth0 and authentication.  
**components**: Within folder, files grouped by features.  
**redux-store**: Contains files related to state management.  
**services**: Contains files related to communication with backend API.  
**views**: Contains all of the "pages" of the application. Files grouped by features.  



