(function () {
    const apiUrl = 'https://fortnite-api.com/v2/stats/br/v2';
    const apiToken = '8ac9f71d-d572-40fa-9c1e-5becff4f342a';

    const GameStatsX = {
        // Initialize the application
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.loadDefaultTheme();
        },

        // Cache DOM elements
        cacheDom: function () {
            this.form = document.getElementById('stats-form');
            this.usernameInput = document.getElementById('username');
            this.themeToggleButton = document.getElementById('theme-toggle');
            this.newSearchButton = document.getElementById('new-search');
            this.tabButtons = document.querySelectorAll('.tabs button');
        },

        // Bind event listeners to DOM elements
        bindEvents: function () {
            this.themeToggleButton.addEventListener('click', this.toggleTheme.bind(this));
            this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
            this.newSearchButton.addEventListener('click', this.resetSearch.bind(this));

            this.tabButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const tabName = event.target.getAttribute('data-tab');
                    this.openTab(tabName);
                });
            });

            window.onload = () => {
                this.openTab('overall-stats'); // Set "Overall" as the default tab on load
            };
        },

        // Toggle between dark and light modes
        toggleTheme: function () {
            document.body.classList.toggle('light-mode');
            this.themeToggleButton.textContent = document.body.classList.contains('light-mode') ? 'Switch to Dark Mode' : 'Switch to Light Mode';
        },

        // Handle form submission
        handleFormSubmit: function (event) {
            event.preventDefault();
            const username = this.usernameInput.value;
            this.fetchStats(username);
        },

        // Fetch stats from Fortnite API
        fetchStats: function (username) {
            const url = `${apiUrl}?name=${username}&accountType=epic&timeWindow=lifetime&image=all`;

            fetch(url, {
                headers: {
                    'Authorization': apiToken
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    this.displayStats(data.data);
                } else {
                    alert('Error fetching stats. Please check the username and try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch stats. Please try again later.');
            });
        },

        // Display the stats in the HTML
        displayStats: function (data) {
            document.getElementById('user-stats').style.display = 'block';
            document.getElementById('user-input').style.display = 'none';

            const usernameElem = document.getElementById('display-username');
            const battlepassElem = document.getElementById('battle-pass-level');

            if (usernameElem) usernameElem.textContent = data.account.name;
            if (battlepassElem) battlepassElem.textContent = data.battlePass.level;

            this.updateTabContent('overall-stats', data.stats.all.overall);
            this.updateTabContent('solo-stats', data.stats.all.solo);
            this.updateTabContent('duo-stats', data.stats.all.duo);
            this.updateTabContent('squad-stats', data.stats.all.squad);
        },

        updateTabContent: function (tabId, stats) {
            const killsElem = document.getElementById(`${tabId}-kills`);
            const kdElem = document.getElementById(`${tabId}-kd`);
            const winsElem = document.getElementById(`${tabId}-wins`);
            const top3Elem = document.getElementById(`${tabId}-top3`);
            const top5Elem = document.getElementById(`${tabId}-top5`);
            const top10Elem = document.getElementById(`${tabId}-top10`);
            const matchesElem = document.getElementById(`${tabId}-matches`);
            const winrateElem = document.getElementById(`${tabId}-winrate`);
            const lastUpdatedElem = document.getElementById(`${tabId}-lastupdated`);

            if (killsElem) killsElem.textContent = stats.kills || 'N/A';
            if (kdElem) kdElem.textContent = stats.kd || 'N/A';
            if (winsElem) winsElem.textContent = stats.wins || 'N/A';
            if (top3Elem) top3Elem.textContent = stats.top3 || 'N/A';
            if (top5Elem) top5Elem.textContent = stats.top5 || 'N/A';
            if (top10Elem) top10Elem.textContent = stats.top10 || 'N/A';
            if (matchesElem) matchesElem.textContent = stats.matches || 'N/A';
            if (winrateElem) winrateElem.textContent = Math.round(stats.winRate) + '%' || 'N/A';
            if (lastUpdatedElem) lastUpdatedElem.textContent = new Date(stats.lastModified).toLocaleString() || 'N/A';
        },

        // Handle tab switching
        openTab: function (tabName) {
            const tabs = document.getElementsByClassName('tabcontent');
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].style.display = 'none';
            }
            document.getElementById(tabName).style.display = 'block';
        },

        // Reset search to allow user to enter a new username
        resetSearch: function () {
            window.location.reload();
        },

        // Load the default theme
        loadDefaultTheme: function () {
            if (document.body.classList.contains('light-mode')) {
                this.themeToggleButton.textContent = 'Switch to Dark Mode';
            } else {
                this.themeToggleButton.textContent = 'Switch to Light Mode';
            }
        }
    };

    GameStatsX.init();
})();
