export type NavItem = {
    title: string;
    route: string;
    icon: string;
};

const graphNavItem: NavItem = {
    title: 'Graph',
    route: 'home',
    icon: 'home',
};

const gaugeNavItem: NavItem = {
    title: 'Gauge',
    route: 'gauge',
    icon: 'looks_one',
};


export const APP_NAV_ITEMS = {
    graph: graphNavItem,
    gauge: gaugeNavItem,
};
