export type NavItem = {
    title: string;
    route: string;
    icon: string;
};

const graphNavItem: NavItem = {
    title: 'Graph',
    route: 'home',
    icon: 'show_chart',
};

const gaugeNavItem: NavItem = {
    title: 'Gauge',
    route: 'gauge',
    icon: 'speed',
};


export const APP_NAV_ITEMS = {
    graph: graphNavItem,
    gauge: gaugeNavItem,
};
