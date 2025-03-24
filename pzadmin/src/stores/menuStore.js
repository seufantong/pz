import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => {
        const storedData = localStorage.getItem('v3pz');
        return storedData ? JSON.parse(storedData).menu : {
            isCollapse: false,
            selectMenu: [],
            routerList: [],
            menuActive: '1-1'
        };
    },
    actions: {
        collapseMenu() {
            this.isCollapse = !this.isCollapse;
            this.saveToLocalStorage();
        },
        addMenu(payload) {
            if (this.selectMenu.findIndex(item => item.path === payload.path) === -1) {
                this.selectMenu.push(payload);
                this.saveToLocalStorage();
            }
        },
        updateMenuActive(value) {
            this.menuActive = value;
            this.saveToLocalStorage();
        },
        closeMenu(item) {
            const index = this.selectMenu.findIndex(val => val.name === item.name);
            if (index!== -1) {
                this.selectMenu.splice(index, 1);
                this.saveToLocalStorage();
            }
        },
        dynamicMenu(payload) {
            const modules = import.meta.glob('../views/**/**/*.vue');
            function routerSet(router) {
                router.forEach(route => {
                    if (!route.children) {
                        const url = `../views${route.meta.path}/index.vue`;
                        route.component = modules[url];
                    } else {
                        routerSet(route.children);
                    }
                });
            }
            routerSet(payload);
            this.routerList = payload;
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            const data = {
                menu: {
                    isCollapse: this.isCollapse,
                    selectMenu: this.selectMenu,
                    routerList: this.routerList,
                    menuActive: this.menuActive
                }
            };
            localStorage.setItem('v3pz', JSON.stringify(data));
        }
    }
});
    