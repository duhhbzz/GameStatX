(function() {
    'use strict';

    const GameStatsX = {
        // Cache DOM elements that will be frequently accessed
        cacheDOM: function() {
            this.themeToggleButton = document.getElementById('theme-toggle');
            this.form = document.getElementById('stats-form');
            this.usernameInput = document.getElementById('username');
            this.userStatsSection = document.getElementById('user-stats');
            this.userInputSection = document.getElementById('user-input');

            this.displayUsername = document.getElementById('display-username');
            this.displayBattlepass = document.getElementById('display-battlepass');

            // Tab elements
            this.tabLinks = document.getElementsByClassName('tablink');
            this.tabContents = document.getElementsByClassName('tabcontent');
        },

        // Bind event listeners to DOM elements
        bindEvents: function() {
            this.themeToggleButton.addEventListener('click', this.toggleTheme.bind(this));
            this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
            window.onload = () => {
                this.openTab('overall-stats'); // Set "Overall" as the default tab on load
            };
        },

        // Toggle between dark and light modes
        toggleTheme: function() {
            document.body.classList.toggle('light-mode');
        },

        // TODO: Implement API Functionality
        // Handle form submission
        handleFormSubmit: function(event) {
            event.preventDefault();
            const username = this.usernameInput.value;

            // TODO: This is where API call will be implemented
            console.log(`Username submitted: ${username}`);
            alert('API call to fetch stats will be implemented in a future milestone.');
        },

        // Function to open the selected tab and hide others
        openTab: function(tabName) {
            for (let i = 0; i < this.tabContents.length; i++) {
                this.tabContents[i].style.display = 'none';
            }
            document.getElementById(tabName).style.display = 'block';

            // Set active class for the selected tab
            for (let i = 0; i < this.tabLinks.length; i++) {
                this.tabLinks[i].classList.remove('active');
            }
            document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
        },

        // Initialize the app
        init: function() {
            this.cacheDOM();
            this.bindEvents();
        }
    };

    // Start the app
    GameStatsX.init();

})();
