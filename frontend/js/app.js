// Constants
const CURRENCY = '€';
const DEFAULT_REPORT = 'distribution-category';
const API_BASE_ENDPOINT = 'http://localhost:3000/api';
const API_ENDPOINTS = {
    finances: '/finances',
    financesChoices: '/finances/choices',
    reports: '/report',
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
            title: '',
            type: '',
            category: '',
        },
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
                this.retrieveNewReportAndRenderChart(DEFAULT_REPORT);
            });
        },
        retrieveAllEntries() {
            fetch(API_BASE_ENDPOINT + API_ENDPOINTS.finances, {
                method: 'GET',
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.entries = data.reverse();
            });
        },
        createNewEntry() {
            fetch(API_BASE_ENDPOINT + API_ENDPOINTS.finances, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(this.newEntry),
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.entries.unshift(data);
            });
        },
        deleteEntry(id) {
            if (confirm('Soll der Eintrag wirklich gelöscht werden?')) {
                fetch(`${API_BASE_ENDPOINT}${API_ENDPOINTS.finances}/${id}`, {
                    method: 'DELETE',
                }).then((res) => {
                    return res.json();
                }).then((success) => {
                    if (success) {
                        for (let entry in this.entries) {
                            if (this.entries[entry]["_id"] === id) {
                                this.entries.splice(parseInt(entry), 1);
                            }
                        }
                    } else {
                        console.error(`DELETE-Request of ID "${id}" wasn't successful!`);
                    }
                });
            }
        },
        retrieveNewReportAndRenderChart(report) {
            this.retrieveReport(report).then((data) => {
                let colors = [];
                for (let i = 0; i < data.labels.length; i++) {
                    colors.push(this.generateRandomColor());
                }

                this.renderChart(
                    'doughnut',
                    {
                        labels: data.labels,
                        datasets: [{
                            label: data.label,
                            data: data.values,
                            backgroundColor: colors,
                        }]
                    },
                    {
                        responsive: false,
                    },
                );
            });
        },
        retrieveReport() {
            return new Promise((resolve, reject) => {
                resolve({
                    label: 'Verteilung auf die Kategorien',
                    labels: Object.values(this.choices.category),
                    values: [1, 2, 3, 4, 5, 6, 7],
                });
            });
        },
        renderChart(type, data, options) {
            new Chart(document.getElementById("chart"), {
                type: type,
                data: data,
                options: options,
            });
        },
        generateRandomColor() {
            return ('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
        }
    }
});
