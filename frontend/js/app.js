// Constants
const CURRENCY = '€';
const DEFAULT_REPORT = ['distribution', 'type'];
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
        chart: null,
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
            this.retrieveAllEntries();
            this.retrieveChoices();
        },
        retrieveChoices() {
            fetch(`${API_BASE_ENDPOINT}${API_ENDPOINTS.financesChoices}`, {
                method: 'GET',
            }).then((res) => {
                return res.json();
            }).then((data) => {
                this.choices = data;
                this.retrieveNewReportAndRenderChart(DEFAULT_REPORT[0], DEFAULT_REPORT[1]);
            });
        },
        retrieveReport(endpoint) {
            return new Promise((resolve, reject) => {
                fetch(`${API_BASE_ENDPOINT}${API_ENDPOINTS.reports}${endpoint}`, {
                    method: 'GET',
                }).then((res) => {
                    return res.json();
                }).then((report) => {
                    resolve(report);
                });
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
                this.retrieveNewReportAndRenderChart(DEFAULT_REPORT[0], DEFAULT_REPORT[1]);
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
                        this.retrieveNewReportAndRenderChart(DEFAULT_REPORT[0], DEFAULT_REPORT[1]);
                    } else {
                        console.error(`DELETE-Request of ID "${id}" wasn't successful!`);
                    }
                });
            }
        },
        retrieveNewReportAndRenderChart(reportType, reportTarget) {
            this.retrieveReport(`/${reportType}/${reportTarget}`).then((report) => {
                let colors = [];
                for (let i = 0; i < report.labels.length; i++) {
                    colors.push(this.generateRandomColor());
                }

                this.renderChart(
                    'doughnut',
                    {
                        labels: report.labels,
                        datasets: [{
                            label: report.label,
                            data: report.values,
                            backgroundColor: colors,
                        }]
                    },
                    {
                        responsive: false,
                    },
                );
            });
        },
        renderChart(type, data, options) {
            if (this.chart) this.chart.destroy();
            this.chart = new Chart(document.getElementById('chart'), {
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
