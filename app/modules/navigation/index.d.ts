declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppTabParamList {}
    }
}

// makes this file a module so declare global is valid
export {};