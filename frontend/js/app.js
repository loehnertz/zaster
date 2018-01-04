// Constants
const CURRENCY = '€';
const API_BASE_ENDPOINT = 'http://localhost:3000/api';
const API_ENDPOINTS = {
    finances: '/finances',
    financesChoices: '/finances/choices',
    reports: '/reports',
};

// Vue instance
let app = new Vue({
    el: '#app',
    data: {
        currency: CURRENCY,
        choices: {},
        entries: [],
        newEntry: {
            amount: '',
            name: '',
            type: '',
            category: '',
            description: '',
        }
    },
    mounted() {
        this.getInitialData();
    },
    methods: {
        getInitialData() {
            this.retrieveChoices();
            this.retrieveAllEntries();
        },
        retrieveChoices() {
            fetch(`${API_BASE_ENDPOINT}${API_ENDPOINTS.financesChoices}`, {
                method: 'GET',
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.choices = data;
                console.log(this.choices);
            });
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
