// Constants
const apiBaseEndpoint = 'http://localhost:3000/api';
const apiEndpoints = {
    finances: '/finances',
    reports: '/reports',
};

// Vue instance
let app = new Vue({
    el: '#app',
    data: {
        entries: [],
    },
    mounted() {
        this.getInitialData();
    },
    methods: {
        getInitialData() {
            this.retrieveAllEntries();
        },
        retrieveAllEntries() {
            fetch(apiBaseEndpoint + apiEndpoints.finances, {
                method: 'GET',
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.entries = data;
            });
        }
    }
});
