document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
        localStorage.setItem('theme', document.body.dataset.theme);
        updateUserThemePreference();
    });

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    // Initialize user profile data
    function initUserProfile() {
        if (isLoggedIn && currentUser) {
            document.body.classList.add('user-logged-in');
            
            // Set profile info
            document.getElementById('username-display').textContent = currentUser.username || 'User';
            document.getElementById('email-display').textContent = currentUser.email || '';
            
            // Set profile picture if exists
            if (currentUser.profilePic) {
                document.getElementById('profile-pic').src = currentUser.profilePic;
                document.getElementById('settings-profile-pic').src = currentUser.profilePic;
            } else {
                // Set default profile picture
                const defaultPic = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.username || 'User') + '&background=8A2BE2&color=fff';
                document.getElementById('profile-pic').src = defaultPic;
                document.getElementById('settings-profile-pic').src = defaultPic;
            }
            
            // Load user preferences
            if (currentUser.preferences) {
                if (currentUser.preferences.theme) {
                    document.body.dataset.theme = currentUser.preferences.theme;
                    themeToggle.innerHTML = currentUser.preferences.theme === 'dark' ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
                }
                
                if (currentUser.preferences.notifications) {
                    document.getElementById('email-notifications').checked = currentUser.preferences.notifications.email;
                    document.getElementById('push-notifications').checked = currentUser.preferences.notifications.push;
                    document.getElementById('new-releases').checked = currentUser.preferences.notifications.newReleases;
                }
            }
        } else {
            document.body.classList.remove('user-logged-in');
            document.getElementById('username-display').textContent = 'Guest';
            document.getElementById('email-display').textContent = 'Not logged in';
            
            // Set default profile picture for guest
            const defaultPic = 'https://ui-avatars.com/api/?name=Guest&background=636e72&color=fff';
            document.getElementById('profile-pic').src = defaultPic;
            document.getElementById('settings-profile-pic').src = defaultPic;
        }
    }
    
    initUserProfile();

    // Update user theme preference in their profile
    function updateUserThemePreference() {
        if (isLoggedIn && currentUser) {
            if (!currentUser.preferences) currentUser.preferences = {};
            currentUser.preferences.theme = document.body.dataset.theme;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }

    // Profile picture upload
    document.getElementById('profile-upload').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profile-pic').src = event.target.result;
                
                // Save to current user if logged in
                if (isLoggedIn && currentUser) {
                    currentUser.profilePic = event.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Settings profile picture upload
    document.getElementById('settings-profile-upload').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('settings-profile-pic').src = event.target.result;
                document.getElementById('profile-pic').src = event.target.result;
                
                // Save to current user if logged in
                if (isLoggedIn && currentUser) {
                    currentUser.profilePic = event.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Settings modal
    const settingsModal = document.getElementById('settingsModal');
    const settingsBtn = document.getElementById('settings-btn');
    const closeSettingsModal = document.querySelector('.close-settings-modal');
    
    settingsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        settingsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Populate settings form with user data if logged in
        if (isLoggedIn && currentUser) {
            document.getElementById('settings-username').value = currentUser.username || '';
            document.getElementById('settings-email').value = currentUser.email || '';
        }
    });
    
    closeSettingsModal.addEventListener('click', function() {
        settingsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Help modal
    const helpModal = document.getElementById('helpModal');
    const helpBtn = document.getElementById('help-btn');
    const closeHelpModal = document.querySelector('.close-help-modal');
    
    helpBtn.addEventListener('click', function(e) {
        e.preventDefault();
        helpModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeHelpModal.addEventListener('click', function() {
        helpModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            helpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Settings tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.settings-tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const tabId = this.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Save profile
    document.getElementById('save-profile').addEventListener('click', function() {
        if (!isLoggedIn || !currentUser) {
            showNotification('Please login to save profile changes');
            return;
        }
        
        const newUsername = document.getElementById('settings-username').value.trim();
        const newEmail = document.getElementById('settings-email').value.trim();
        
        if (newUsername) {
            currentUser.username = newUsername;
            document.getElementById('username-display').textContent = newUsername;
        }
        
        if (newEmail) {
            currentUser.email = newEmail;
            document.getElementById('email-display').textContent = newEmail;
        }
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Profile updated successfully');
    });

    // Save preferences
    document.getElementById('save-preferences').addEventListener('click', function() {
        if (!isLoggedIn || !currentUser) {
            showNotification('Please login to save preferences');
            return;
        }
        
        // Get selected theme
        const themeOption = document.querySelector('.theme-option.active');
        const selectedTheme = themeOption ? themeOption.dataset.theme : 'light';
        
        // Update theme if changed
        if (selectedTheme !== document.body.dataset.theme) {
            document.body.dataset.theme = selectedTheme;
            localStorage.setItem('theme', selectedTheme);
            themeToggle.innerHTML = selectedTheme === 'dark' ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
        }
        
        // Save preferences
        if (!currentUser.preferences) currentUser.preferences = {};
        currentUser.preferences.theme = selectedTheme;
        currentUser.preferences.notifications = {
            email: document.getElementById('email-notifications').checked,
            push: document.getElementById('push-notifications').checked,
            newReleases: document.getElementById('new-releases').checked
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Preferences saved successfully');
    });

    // Theme options
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
        
        // Set active theme option
        if (option.dataset.theme === (document.body.dataset.theme || 'light')) {
            option.classList.add('active');
        }
    });

    // Save password
    document.getElementById('save-password').addEventListener('click', function() {
        if (!isLoggedIn || !currentUser) {
            showNotification('Please login to change password');
            return;
        }
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Please fill all password fields', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        // In a real app, you would verify current password and update it securely
        showNotification('Password changed successfully');
        
        // Clear password fields
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
    });

    // Logout functionality - Updated to redirect to user-login.html
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('currentUser');
        currentUser = null;
        document.body.classList.remove('user-logged-in');
        showNotification('Logged out successfully');
        
        // Close any open dropdowns/modals
        document.querySelector('.dropdown-content').style.display = 'none';
        if (settingsModal) settingsModal.style.display = 'none';
        if (helpModal) helpModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });

    // User dropdown toggle
    const userBtn = document.querySelector('.user-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close dropdown when clicking outside
    window.addEventListener('click', function() {
        dropdownContent.style.display = 'none';
    });

    // Watchlist dropdown button
    document.getElementById('watchlist-dropdown-btn').addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up to window click handler
        dropdownContent.style.display = 'none'; // Close the dropdown
        
        // Show my-list section
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelector('.nav-link[data-section="my-list"]').classList.add('active');
        
        // Hide all sections except my-list
        document.querySelectorAll('section[id$="-section"]').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById('my-list-section').style.display = 'block';
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Render watchlist
        renderWatchlist();
    });

    // Login redirect
    document.getElementById('loginRedirect').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('loginNotification');
        notification.querySelector('p').textContent = message;
        
        // Set notification color based on type
        if (type === 'error') {
            notification.style.background = 'linear-gradient(to right, var(--error), #e74c3c)';
        } else if (type === 'warning') {
            notification.style.background = 'linear-gradient(to right, var(--warning), #f39c12)';
        } else {
            notification.style.background = 'linear-gradient(to right, var(--primary), var(--secondary))';
        }
        
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Movie Data - Now fetches from localStorage (set by admin) with fallback to default
    function getMovies() {
        const adminMovies = JSON.parse(localStorage.getItem('adminMovies')) || [];
        
        // Default movies
        const defaultMovies = [
            {
                id: 1,
                title: "Inception",
                poster: "assets/inception.jpeg",
                year: 2010,
                rating: 8.8,
                genre: ["Sci-Fi", "Action"],
                duration: "2h 28m",
                description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                director: "Christopher Nolan",
                cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
                trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
            },
            {
                id: 2,
                title: "The Shawshank Redemption",
                poster: "assets/shawhank.jpeg",
                year: 1994,
                rating: 9.3,
                genre: ["Drama"],
                duration: "2h 22m",
                description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                director: "Frank Darabont",
                cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
                trailer: "https://www.youtube.com/embed/6hB3S9bIaco"
            },
            {
                id: 3,
                title: "The Dark Knight",
                poster: "assets/knight.jpeg",
                year: 2008,
                rating: 9.0,
                genre: ["Action", "Crime", "Drama"],
                duration: "2h 32m",
                description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                director: "Christopher Nolan",
                cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
                trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
            },
            {
                id: 4,
                title: "Pulp Fiction",
                poster: "assets/fiction.jpeg",
                year: 1994,
                rating: 8.9,
                genre: ["Crime", "Drama"],
                duration: "2h 34m",
                description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                director: "Quentin Tarantino",
                cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
                trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY"
            },
            {
                id: 5,
                title: "The Godfather",
                poster: "assets/father.jpeg",
                year: 1972,
                rating: 9.2,
                genre: ["Crime", "Drama"],
                duration: "2h 55m",
                description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                director: "Francis Ford Coppola",
                cast: ["Marlon Brando", "Al Pacino", "James Caan"],
                trailer: "https://www.youtube.com/embed/sY1S34973zA"
            },
            {
                id: 6,
                title: "Fight Club",
                poster: "assets/club.jpeg",
                year: 1999,
                rating: 8.8,
                genre: ["Drama"],
                duration: "2h 19m",
                description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
                director: "David Fincher",
                cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
                trailer: "https://www.youtube.com/embed/qtRKdVHc-cE"
            },
            {
                id: 7,
                title: "Interstellar",
                poster: "assets/interstellar.jpeg",
                year: 2014,
                rating: 8.6,
                genre: ["Sci-Fi", "Adventure", "Drama"],
                duration: "2h 49m",
                description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                director: "Christopher Nolan",
                cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
                trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
            },
            {
                id: 8,
                title: "Parasite",
                poster: "assets/parasite.jpeg",
                year: 2019,
                rating: 8.5,
                genre: ["Comedy", "Drama", "Thriller"],
                duration: "2h 12m",
                description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
                director: "Bong Joon Ho",
                cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
                trailer: "https://www.youtube.com/embed/5xH0HfJHsaY"
            }
        ];

        // TV Shows Data
        const defaultTVShows = [
            {
                id: 101,
                title: "Stranger Things",
                poster: "assets/stranger.jpeg",
                year: 2016,
                rating: 8.7,
                genre: ["Sci-Fi", "Horror", "Drama"],
                seasons: 4,
                duration: "50m",
                description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
                creator: "The Duffer Brothers",
                cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
                trailer: "https://www.youtube.com/embed/b9EkMc79ZSU"
            },
            {
                id: 102,
                title: "Breaking Bad",
                poster: "assets/bad.jpeg",
                year: 2008,
                rating: 9.5,
                genre: ["Crime", "Drama", "Thriller"],
                seasons: 5,
                duration: "49m",
                description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
                creator: "Vince Gilligan",
                cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
                trailer: "https://www.youtube.com/embed/HhesaQXLuRY"
            },
            {
                id: 103,
                title: "The Mandalorian",
                poster: "assets/mandalorian.jpeg",
                year: 2019,
                rating: 8.7,
                genre: ["Sci-Fi", "Action", "Adventure"],
                seasons: 3,
                duration: "40m",
                description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
                creator: "Jon Favreau",
                cast: ["Pedro Pascal", "Gina Carano", "Carl Weathers"],
                trailer: "https://www.youtube.com/embed/eW7Twd85m2g"
            },
            {
                id: 104,
                title: "Game of Thrones",
                poster: "assets/throne.jpeg",
                year: 2011,
                rating: 9.2,
                genre: ["Fantasy", "Drama", "Adventure"],
                seasons: 8,
                duration: "57m",
                description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
                creator: "David Benioff, D.B. Weiss",
                cast: ["Emilia Clarke", "Kit Harington", "Peter Dinklage"],
                trailer: "https://www.youtube.com/embed/bjqEWgDVPe0"
            },
            {
                id: 105,
                title: "The Crown",
                poster: "assets/crown.jpeg",
                year: 2016,
                rating: 8.6,
                genre: ["Drama", "History"],
                seasons: 5,
                duration: "58m",
                description: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
                creator: "Peter Morgan",
                cast: ["Olivia Colman", "Imelda Staunton", "Claire Foy"],
                trailer: "https://www.youtube.com/embed/JWtnJjn6ng0"
            },
            {
                id: 106,
                title: "The Witcher",
                poster: "assets/witcher.jpeg",
                year: 2019,
                rating: 8.2,
                genre: ["Fantasy", "Action", "Adventure"],
                seasons: 3,
                duration: "60m",
                description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
                creator: "Lauren Schmidt Hissrich",
                cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
                trailer: "https://www.youtube.com/embed/ndl1W4ltcmg"
            }
        ];

        // Only include admin movies that are marked as "active"
        const activeAdminMovies = adminMovies.filter(movie => movie.status === 'active');
        
        // Combine admin movies with default movies, removing duplicates
        const allMovies = [...activeAdminMovies];
        defaultMovies.forEach(defaultMovie => {
            if (!allMovies.some(movie => movie.id === defaultMovie.id)) {
                allMovies.push(defaultMovie);
            }
        });

        return {
            movies: allMovies,
            tvShows: defaultTVShows
        };
    }

    // Get or initialize user watchlist
    function getUserWatchlist() {
        const userWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        return userWatchlist;
    }

    // Save user watchlist
    function saveUserWatchlist(watchlist) {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }

    // Render Content
    const moviesGrid = document.querySelector('.movies-grid');
    const moviesSlider = document.querySelector('.movies-slider');
    const tvShowsGrid = document.querySelector('.tv-shows-grid');
    const watchlistGrid = document.querySelector('.watchlist-grid');
    const watchlist = getUserWatchlist();
    
    function renderContent(contentToRender = null) {
        const content = contentToRender || getMovies();
        const { movies, tvShows } = content;
        
        // Render Movies
        moviesGrid.innerHTML = '';
        moviesSlider.innerHTML = '';
        
        movies.forEach(movie => {
            const inWatchlist = watchlist.some(item => item.id === movie.id);
            
            // For grid view
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span>${movie.year}</span>
                        <span class="movie-rating">★ ${movie.rating}</span>
                    </div>
                    ${inWatchlist ? '<span class="watchlist-badge">In Watchlist</span>' : ''}
                </div>
            `;
            movieCard.addEventListener('click', () => openMovieModal(movie));
            moviesGrid.appendChild(movieCard);
            
            // For slider view
            const sliderCard = movieCard.cloneNode(true);
            sliderCard.style.minWidth = '220px';
            sliderCard.addEventListener('click', () => openMovieModal(movie));
            moviesSlider.appendChild(sliderCard);
        });
        
        // Render TV Shows
        tvShowsGrid.innerHTML = '';
        tvShows.forEach(tvShow => {
            const inWatchlist = watchlist.some(item => item.id === tvShow.id);
            
            const tvShowCard = document.createElement('div');
            tvShowCard.className = 'tv-show-card';
            tvShowCard.innerHTML = `
                <img src="${tvShow.poster}" alt="${tvShow.title}" class="tv-show-poster">
                <div class="tv-show-info">
                    <h3 class="tv-show-title">${tvShow.title}</h3>
                    <div class="tv-show-meta">
                        <span>${tvShow.year} • ${tvShow.seasons} Seasons</span>
                        <span class="tv-show-rating">★ ${tvShow.rating}</span>
                    </div>
                    ${inWatchlist ? '<span class="watchlist-badge">In Watchlist</span>' : ''}
                </div>
            `;
            tvShowCard.addEventListener('click', () => openMovieModal(tvShow));
            tvShowsGrid.appendChild(tvShowCard);
        });
        
        // Render Watchlist
        renderWatchlist();
    }
    
    function renderWatchlist() {
        watchlistGrid.innerHTML = '';
        
        if (watchlist.length === 0) {
            watchlistGrid.innerHTML = `
                <div class="empty-watchlist">
                    <i class='bx bx-movie'></i>
                    <p>Your watchlist is empty</p>
                    ${!isLoggedIn ? '<p class="login-prompt">Login to add movies to your watchlist</p>' : ''}
                </div>
            `;
        } else {
            watchlist.forEach(item => {
                const watchlistItem = document.createElement('div');
                watchlistItem.className = item.creator ? 'tv-show-card' : 'movie-card';
                watchlistItem.innerHTML = `
                    <img src="${item.poster}" alt="${item.title}" class="${item.creator ? 'tv-show-poster' : 'movie-poster'}">
                    <div class="${item.creator ? 'tv-show-info' : 'movie-info'}">
                        <h3 class="${item.creator ? 'tv-show-title' : 'movie-title'}">${item.title}</h3>
                        <div class="${item.creator ? 'tv-show-meta' : 'movie-meta'}">
                            <span>${item.year}${item.seasons ? ` • ${item.seasons} Seasons` : ''}</span>
                            <span class="${item.creator ? 'tv-show-rating' : 'movie-rating'}">★ ${item.rating}</span>
                        </div>
                        <span class="watchlist-badge">In Watchlist</span>
                    </div>
                `;
                watchlistItem.addEventListener('click', () => openMovieModal(item));
                watchlistGrid.appendChild(watchlistItem);
            });
        }
    }
    
    renderContent();

    // Movie Modal
    const movieModal = document.getElementById('movieModal');
    const closeMovieModal = document.querySelector('.close-movie-modal');
    
    function openMovieModal(item) {
        const inWatchlist = watchlist.some(watchItem => watchItem.id === item.id);
        const modalBody = document.querySelector('.movie-modal-body');
        
        modalBody.innerHTML = `
            <img src="${item.poster}" alt="${item.title}" class="movie-modal-poster">
            <div class="movie-modal-details">
                <h2 class="movie-modal-title">${item.title}</h2>
                <div class="movie-modal-meta">
                    <span>${item.year}</span>
                    <span>${item.duration || (item.seasons ? `${item.seasons} Seasons` : '')}</span>
                    <span class="movie-modal-rating">★ ${item.rating}</span>
                </div>
                <div class="movie-modal-genres">
                    ${item.genre.map(g => `<span>${g}</span>`).join('')}
                </div>
                <div class="movie-modal-cast">
                    <h4>${item.director ? 'Director:' : 'Creator:'} <span>${item.director || item.creator}</span></h4>
                    <h4>Cast: <span>${item.cast.join(', ')}</span></h4>
                </div>
                <p class="movie-modal-overview">${item.description}</p>
                <div class="movie-modal-actions">
                    <button class="watch-btn ${inWatchlist ? 'in-watchlist' : ''}">
                        ${inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </button>
                    <button class="trailer-btn">Watch Trailer <i class='bx bx-play'></i></button>
                </div>
            </div>
        `;
        
        movieModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add event listeners to new buttons
        const watchBtn = document.querySelector('.watch-btn');
        watchBtn.addEventListener('click', () => {
            if (!isLoggedIn) {
                showNotification('Please login to manage your watchlist');
                return;
            }
            
            toggleWatchlist(item);
            watchBtn.textContent = watchBtn.classList.contains('in-watchlist') ? 
                'Remove from Watchlist' : 'Add to Watchlist';
            watchBtn.classList.toggle('in-watchlist');
            renderContent();
        });
        
        document.querySelector('.trailer-btn').addEventListener('click', () => {
            window.open(item.trailer, '_blank');
        });
    }
    
    function toggleWatchlist(item) {
        const index = watchlist.findIndex(watchItem => watchItem.id === item.id);
        if (index === -1) {
            watchlist.push(item);
        } else {
            watchlist.splice(index, 1);
        }
        saveUserWatchlist(watchlist);
        renderWatchlist();
    }
    
    closeMovieModal.addEventListener('click', () => {
        movieModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === movieModal) {
            movieModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Genre Filter
    const genreCards = document.querySelectorAll('.genre-card');
    genreCards.forEach(card => {
        card.addEventListener('click', () => {
            const genre = card.dataset.genre;
            const { movies } = getMovies();
            const filteredMovies = movies.filter(movie => 
                movie.genre.map(g => g.toLowerCase()).includes(genre)
            );
            
            // Update the movies grid with filtered movies
            renderContent({ movies: filteredMovies, tvShows: [] });
            
            // Show "Back to All" button
            const existingBackButton = document.querySelector('.back-to-all');
            if (existingBackButton) return;
            
            const backButton = document.createElement('button');
            backButton.className = 'back-to-all';
            backButton.innerHTML = '<i class="bx bx-arrow-back"></i> Back to All Movies';
            backButton.addEventListener('click', () => {
                renderContent();
                backButton.remove();
            });
            
            const featuredSection = document.querySelector('.featured-section');
            featuredSection.insertBefore(backButton, moviesGrid);
        });
    });

    // Search Functionality
    const searchBox = document.querySelector('.search-box input');
    searchBox.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const query = searchBox.value.trim().toLowerCase();
            if (query) {
                const { movies, tvShows } = getMovies();
                const filteredMovies = movies.filter(movie => 
                    movie.title.toLowerCase().includes(query) ||
                    movie.director.toLowerCase().includes(query) ||
                    movie.cast.some(actor => actor.toLowerCase().includes(query))
                );
                
                const filteredTVShows = tvShows.filter(show => 
                    show.title.toLowerCase().includes(query) ||
                    show.creator.toLowerCase().includes(query) ||
                    show.cast.some(actor => actor.toLowerCase().includes(query))
                );
                
                // Update the content with search results
                renderContent({ 
                    movies: filteredMovies.length ? filteredMovies : [], 
                    tvShows: filteredTVShows.length ? filteredTVShows : [] 
                });
                
                if (filteredMovies.length === 0 && filteredTVShows.length === 0) {
                    moviesGrid.innerHTML = '<p class="no-results">No results found matching your search.</p>';
                }
                
                // Show "Back to All" button
                const existingBackButton = document.querySelector('.back-to-all');
                if (!existingBackButton) {
                    const backButton = document.createElement('button');
                    backButton.className = 'back-to-all';
                    backButton.innerHTML = '<i class="bx bx-arrow-back"></i> Back to All';
                    backButton.addEventListener('click', () => {
                        renderContent();
                        backButton.remove();
                        searchBox.value = '';
                    });
                    
                    const featuredSection = document.querySelector('.featured-section');
                    featuredSection.insertBefore(backButton, moviesGrid);
                }
            }
        }
    });

    // Navigation Active State and Section Switching
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = {
        'home': document.getElementById('home-section'),
        'movies': document.getElementById('movies-section'),
        'tv-shows': document.getElementById('tv-shows-section'),
        'genres': document.getElementById('genres-section'),
        'my-list': document.getElementById('my-list-section')
    };
    
    // Hide all sections except home initially
    Object.keys(sections).forEach(key => {
        if (key !== 'home') {
            sections[key].style.display = 'none';
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show the selected section and hide others
            Object.keys(sections).forEach(key => {
                sections[key].style.display = key === section ? 'block' : 'none';
            });
            
            // Special handling for My List section
            if (section === 'my-list') {
                renderWatchlist();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // Poll for new movies added by admin (simulated)
    function checkForNewMovies() {
        const lastMovieCount = localStorage.getItem('lastMovieCount') || 0;
        const currentMovies = getMovies().movies;
        
        if (currentMovies.length > lastMovieCount) {
            localStorage.setItem('lastMovieCount', currentMovies.length);
            renderContent();
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'new-movie-notification';
            notification.innerHTML = `
                <p>${currentMovies.length - lastMovieCount} new movies added!</p>
                <button class="close-notification">&times;</button>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            notification.querySelector('.close-notification').addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        }
    }

    // Check for new movies every 30 seconds
    setInterval(checkForNewMovies, 30000);
    localStorage.setItem('lastMovieCount', getMovies().movies.length);
});

// Add some CSS for the notification
const style = document.createElement('style');
style.textContent = `
.new-movie-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateY(100px);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
    z-index: 1000;
}

.new-movie-notification.show {
    transform: translateY(0);
    opacity: 1;
}

.new-movie-notification p {
    margin: 0;
    font-size: 14px;
}

.close-notification {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
}

.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem;
    color: var(--gray);
    font-size: 1.2rem;
}
`;
document.head.appendChild(style);