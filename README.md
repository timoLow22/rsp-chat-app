## Overview
A Chat app built with React Native. Specifications and requirements of the app's functionality can be found in this [document](https://drive.google.com/file/d/1MIraHClnTxjFNs4r_3vZTEHRcmO-lldB/view).

## Project structure

```text
rsp-chat-app/
├── android/                        # Android native project files and configurations
├── ios/                            # iOS native project files and configurations
├── app/                            # Core application source code
│   ├── components/                 # Shared, reusable global UI components
│   ├── modules/                    # Feature-based modules (Domain-driven structure)
│   │   └── <moduleName>            # Individual feature module container
│   │       ├── hooks/              # Feature-specific custom React hooks
│   │       ├── src/                # Internal business logic and state management
│   │       ├── navigation/         # Route names and screen setup
│   │       ├── views/              # Screen components and presentation layer
│   │       └── index.d.ts          # TypeScript type definitions for the module
│   └──  App.tsx                    # Main application root and provider setup
├── tests/                          # Global unit, integration, and E2E tests
├── index.js                        # App registry and native entry point
├── .gitignore                      # Files to ignore in Git
├── package.json                    # Project dependencies and scripts
└── README.md                       # Project documentation
```

## Demo

<table>
    <thead>
        <tr>
            <th>Bottom Tabs</th>
            <th>Chats Tab Screen (with infinite scrolling)</th>
            <th>Chat Screen</th>
            <th>Profile Screen (with block/unblock functionality)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <video src="assets/bottom_tab_navigation.mov" controls width="100%"></video>
            </td>
            <td>Attach video here</td>
            <td>Attach video here</td>
            <td>Attach video here</td>
        </tr>
    </tbody>
</table>

## 3rd Party dependencies used in this project

- Icon assets
    - `@react-native-vector-icons/fontawesome`
    - `@react-native-vector-icons/common`  - dev dependency to obtain a script that helps load the icon pack to iOS assets
- Navigation
    - `@react-navigation/bottom-tabs`
    - `@react-navigation/native`
    - `@react-navigation/stack`
    - `react-native-screens` - dependency of react-navigation
- State management
    - `@tanstack/react-query`
    - `react-redux`
        - `@reduxjs/toolkit`