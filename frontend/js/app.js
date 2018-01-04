// Constants
const CURRENCY = '€';
const API_BASE_ENDPOINT = 'http://localhost:3000/api';
const API_ENDPOINTS = {
    finances: '/finances',
    reports: '/reports',
};

// Vue instance
let app = new Vue({
    el: '#app',
    data: {
        currency: CURRENCY,
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
            fetch(API_BASE_ENDPOINT + API_ENDPOINTS.finances, {
                method: 'GET',
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.entries = data;
                console.log(this.entries);
            });
        },
        createNewEntry() {
            fetch(API_BASE_ENDPOINT + API_ENDPOINTS.finances, {
                method: 'POST',
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.entries.unshift(data);
            });
        },
        deleteEntry(id) {
            fetch(`${API_BASE_ENDPOINT}${API_ENDPOINTS.finances}/${id}`, {
                method: 'DELETE',
            }).then((res) => {
                return res.json();
            }).then((success) => {
                if (!success) console.error(`DELETE-Request of ID "${id}" wasn't successful!`);
            });
        },
    }
});
