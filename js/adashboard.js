document.addEventListener('DOMContentLoaded', function() {
    // Set light theme by default
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');

    // DOM Elements
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
    const tabContents = document.querySelectorAll('.tab-content');
    const currentTabTitle = document.getElementById('current-tab');
    const currentBreadcrumb = document.getElementById('current-breadcrumb');
    const addMovieBtn = document.getElementById('add-movie-btn');
    const addTvShowBtn = document.getElementById('add-tvshow-btn');
    const addUserBtn = document.getElementById('add-user-btn');
    const addMovieModal = document.getElementById('add-movie-modal');
    const addTvShowModal = document.getElementById('add-tvshow-modal');
    const addUserModal = document.getElementById('add-user-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
    const movieForm = document.getElementById('movie-form');
    const tvShowForm = document.getElementById('tvshow-form');
    const userForm = document.getElementById('user-form');
    const moviePosterInput = document.getElementById('movie-poster');
    const posterPreview = document.getElementById('poster-preview');
    const tvShowPosterInput = document.getElementById('tvshow-poster');
    const tvShowPosterPreview = document.getElementById('tvshow-poster-preview');
    const userAvatarInput = document.getElementById('user-avatar');
    const avatarPreview = document.getElementById('avatar-preview');
    const settingsTabBtns = document.querySelectorAll('.settings-tab-btn');
    const settingsTabContents = document.querySelectorAll('.settings-tab-content');
    const logoutBtn = document.querySelector('.logout-btn');
    const notificationsBtn = document.querySelector('.notifications');
    const searchInputs = document.querySelectorAll('.search-box input');
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const reportActionBtns = document.querySelectorAll('.report-actions .btn-icon');
    const movieSearchInput = document.getElementById('movie-search');
    const tvShowSearchInput = document.getElementById('tvshow-search');
    const userSearchInput = document.getElementById('user-search');
    const reportSearchInput = document.getElementById('report-search');
    const genreFilter = document.getElementById('genre-filter');
    const tvShowGenreFilter = document.getElementById('tvshow-genre-filter');
    const statusFilter = document.getElementById('status-filter');
    const tvShowStatusFilter = document.getElementById('tvshow-status-filter');
    const roleFilter = document.getElementById('role-filter');
    const reportTypeFilter = document.getElementById('report-type-filter');
    const reportStatusFilter = document.getElementById('report-status-filter');
    const moviesTableBody = document.getElementById('movies-table-body');
    const tvShowsTableBody = document.getElementById('tvshows-table-body');
    const usersTableBody = document.getElementById('users-table-body');
    const customNotification = document.getElementById('customNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const closeNotificationBtn = document.querySelector('.close-notification');
    const totalUsersElement = document.getElementById('total-users');
    const totalMoviesElement = document.getElementById('total-movies');
    const totalTvShowsElement = document.getElementById('total-tvshows');
    const activeViewsElement = document.getElementById('active-viewers');

    // Initialize data from localStorage or empty arrays
    let moviesData = JSON.parse(localStorage.getItem('adminMovies')) || [
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
            trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/6hB3S9bIaco",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/sY1S34973zA",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/qtRKdVHc-cE",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/5xH0HfJHsaY",
            status: "active"
        }
    ];
    
    let tvShowsData = JSON.parse(localStorage.getItem('adminTvShows')) || [
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
            trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/HhesaQXLuRY",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/eW7Twd85m2g",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/bjqEWgDVPe0",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/JWtnJjn6ng0",
            status: "active"
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
            trailer: "https://www.youtube.com/embed/ndl1W4ltcmg",
            status: "active"
        }
    ];
    
    // Get users from localStorage (registered users)
    let usersData = JSON.parse(localStorage.getItem('adminUsers')) || [];
    
    // Initialize stats based on actual data
    let statsData = {
        totalUsers: usersData.length,
        totalMovies: moviesData.length,
        totalTvShows: tvShowsData.length,
        activeViews: Math.floor(Math.random() * 1000) + 500 // Random active viewers for demo
    };

    const reportsData = [
        {
            id: 1,
            type: "spam",
            status: "pending",
            date: "2 hours ago",
            reportedBy: "user123@example.com",
            content: "Movie \"Fight Club\"",
            reason: "This movie contains inappropriate content that violates community guidelines."
        },
        {
            id: 2,
            type: "copyright",
            status: "pending",
            date: "5 hours ago",
            reportedBy: "copyright@studio.com",
            content: "Movie \"The Dark Knight\"",
            reason: "Unauthorized distribution of copyrighted material."
        }
    ];

    // Chart instances
    let userGrowthChart = null;
    let contentViewsChart = null;

    // Initialize the dashboard
    initDashboard();

    // Functions
    function initDashboard() {
        // Save initial data if not exists
        if (!localStorage.getItem('adminMovies')) {
            localStorage.setItem('adminMovies', JSON.stringify(moviesData));
        }
        if (!localStorage.getItem('adminTvShows')) {
            localStorage.setItem('adminTvShows', JSON.stringify(tvShowsData));
        }
        if (!localStorage.getItem('adminStats')) {
            localStorage.setItem('adminStats', JSON.stringify(statsData));
        }
        
        // Load data from localStorage
        moviesData = JSON.parse(localStorage.getItem('adminMovies'));
        tvShowsData = JSON.parse(localStorage.getItem('adminTvShows'));
        usersData = JSON.parse(localStorage.getItem('adminUsers'));
        statsData = JSON.parse(localStorage.getItem('adminStats')) || {
            totalUsers: usersData.length,
            totalMovies: moviesData.length,
            totalTvShows: tvShowsData.length,
            activeViews: Math.floor(Math.random() * 1000) + 500
        };
        
        // Set up event listeners
        setupEventListeners();
        
        // Load initial data
        loadMoviesTable(moviesData);
        loadTvShowsTable(tvShowsData);
        loadUsersTable(usersData);
        
        // Update stats
        updateStats();
        
        // Initialize charts immediately
        initCharts();
        
        // Show dashboard by default
        switchTab('dashboard');
    }

    function updateStats() {
        // Update stats based on current data
        statsData.totalUsers = usersData.length;
        statsData.totalMovies = moviesData.length;
        statsData.totalTvShows = tvShowsData.length;
        
        // Save the updated stats
        localStorage.setItem('adminStats', JSON.stringify(statsData));
        
        // Update UI
        totalUsersElement.textContent = statsData.totalUsers;
        totalMoviesElement.textContent = statsData.totalMovies;
        totalTvShowsElement.textContent = statsData.totalTvShows;
        activeViewsElement.textContent = statsData.activeViews;
    }

    function setupEventListeners() {
        // Sidebar menu navigation
        sidebarMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                const tabName = item.getAttribute('data-tab');
                switchTab(tabName);
                
                // Update active state
                sidebarMenuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Modal open/close
        addMovieBtn.addEventListener('click', () => {
            addMovieModal.classList.add('active');
        });

        addTvShowBtn.addEventListener('click', () => {
            addTvShowModal.classList.add('active');
        });

        addUserBtn.addEventListener('click', () => {
            addUserModal.classList.add('active');
        });

        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                addMovieModal.classList.remove('active');
                addTvShowModal.classList.remove('active');
                addUserModal.classList.remove('active');
            });
        });

        // Image preview for movie poster
        moviePosterInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    posterPreview.innerHTML = `<img src="${event.target.result}" alt="Poster Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // Image preview for TV show poster
        tvShowPosterInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    tvShowPosterPreview.innerHTML = `<img src="${event.target.result}" alt="Poster Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // Image preview for user avatar
        userAvatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    avatarPreview.innerHTML = `<img src="${event.target.result}" alt="Avatar Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // Settings tabs
        settingsTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-settings-tab');
                switchSettingsTab(tabId);
                
                // Update active state
                settingsTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Form submissions
        movieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create new movie object
            const newMovie = {
                id: moviesData.length > 0 ? Math.max(...moviesData.map(m => m.id)) + 1 : 1,
                title: document.getElementById('movie-title').value,
                year: parseInt(document.getElementById('movie-year').value),
                rating: parseFloat(document.getElementById('movie-rating').value),
                genres: Array.from(document.getElementById('movie-genres').selectedOptions).map(opt => opt.value),
                status: document.getElementById('movie-status').value,
                poster: posterPreview.querySelector('img') ? posterPreview.querySelector('img').src : "https://source.unsplash.com/random/300x450/?movie",
                duration: document.getElementById('movie-duration').value,
                director: document.getElementById('movie-director').value,
                cast: document.getElementById('movie-cast').value.split(',').map(s => s.trim()),
                description: document.getElementById('movie-description').value,
                trailer: document.getElementById('movie-trailer').value
            };
            
            // Add to movies data
            moviesData.push(newMovie);
            localStorage.setItem('adminMovies', JSON.stringify(moviesData));
            
            // Update stats
            updateStats();
            
            // Update user dashboard
            updateUserDashboardContent();
            
            // Show success message
            showNotification('Movie added successfully!');
            
            // Reset form and close modal
            movieForm.reset();
            posterPreview.innerHTML = '';
            addMovieModal.classList.remove('active');
            
            // Reload movies table
            loadMoviesTable(moviesData);
        });

        tvShowForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create new TV show object
            const newTvShow = {
                id: tvShowsData.length > 0 ? Math.max(...tvShowsData.map(t => t.id)) + 1 : 1,
                title: document.getElementById('tvshow-title').value,
                year: parseInt(document.getElementById('tvshow-year').value),
                seasons: parseInt(document.getElementById('tvshow-seasons').value),
                rating: parseFloat(document.getElementById('tvshow-rating').value),
                genres: Array.from(document.getElementById('tvshow-genres').selectedOptions).map(opt => opt.value),
                status: document.getElementById('tvshow-status').value,
                poster: tvShowPosterPreview.querySelector('img') ? tvShowPosterPreview.querySelector('img').src : "https://source.unsplash.com/random/300x450/?tvshow",
                creator: document.getElementById('tvshow-creator').value,
                cast: document.getElementById('tvshow-cast').value.split(',').map(s => s.trim()),
                description: document.getElementById('tvshow-description').value,
                trailer: document.getElementById('tvshow-trailer').value
            };
            
            // Add to TV shows data
            tvShowsData.push(newTvShow);
            localStorage.setItem('adminTvShows', JSON.stringify(tvShowsData));
            
            // Update stats
            updateStats();
            
            // Update user dashboard
            updateUserDashboardContent();
            
            // Show success message
            showNotification('TV Show added successfully!');
            
            // Reset form and close modal
            tvShowForm.reset();
            tvShowPosterPreview.innerHTML = '';
            addTvShowModal.classList.remove('active');
            
            // Reload TV shows table
            loadTvShowsTable(tvShowsData);
        });

        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create new user object
            const newUser = {
                id: usersData.length > 0 ? Math.max(...usersData.map(u => u.id)) + 1 : 1,
                name: `${document.getElementById('user-first-name').value} ${document.getElementById('user-last-name').value}`,
                email: document.getElementById('user-email').value,
                role: document.getElementById('user-role').value,
                status: document.getElementById('user-status').value,
                joined: new Date().toISOString().split('T')[0],
                avatar: avatarPreview.querySelector('img') ? avatarPreview.querySelector('img').src : "https://source.unsplash.com/random/100x100/?portrait",
                password: document.getElementById('user-password').value
            };
            
            // Add to users data
            usersData.push(newUser);
            localStorage.setItem('adminUsers', JSON.stringify(usersData));
            
            // Update stats
            updateStats();
            
            // Show success message
            showNotification('User added successfully!');
            
            // Reset form and close modal
            userForm.reset();
            avatarPreview.innerHTML = '';
            addUserModal.classList.remove('active');
            
            // Reload users table
            loadUsersTable(usersData);
        });

        // Logout button
        logoutBtn.addEventListener('click', function() {
            showNotification('You have been logged out.', true, () => {
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('currentUser');
                window.location.href = 'admin.html';
            });
        });

        // Notifications button
        notificationsBtn.addEventListener('click', function() {
            showNotification('You have 3 new notifications: 2 reports and 1 new user registration.');
        });

        // Search functionality
        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const parentId = this.closest('.tab-content').id;
                
                if (parentId === 'movies-tab') {
                    const filteredMovies = moviesData.filter(movie => 
                        movie.title.toLowerCase().includes(searchTerm)
                    );
                    loadMoviesTable(filteredMovies);
                } else if (parentId === 'tvshows-tab') {
                    const filteredTvShows = tvShowsData.filter(tvshow => 
                        tvshow.title.toLowerCase().includes(searchTerm)
                    );
                    loadTvShowsTable(filteredTvShows);
                } else if (parentId === 'users-tab') {
                    const filteredUsers = usersData.filter(user => 
                        user.name.toLowerCase().includes(searchTerm) || 
                        user.email.toLowerCase().includes(searchTerm)
                    );
                    loadUsersTable(filteredUsers);
                } else if (parentId === 'reports-tab') {
                    // Filter reports
                    const filteredReports = reportsData.filter(report => 
                        report.content.toLowerCase().includes(searchTerm) || 
                        report.reportedBy.toLowerCase().includes(searchTerm) ||
                        report.reason.toLowerCase().includes(searchTerm)
                    );
                    // In a real app, you would update the reports list
                }
            });
        });

        // Filter functionality
        genreFilter.addEventListener('change', filterMovies);
        statusFilter.addEventListener('change', filterMovies);
        tvShowGenreFilter.addEventListener('change', filterTvShows);
        tvShowStatusFilter.addEventListener('change', filterTvShows);
        roleFilter.addEventListener('change', filterUsers);
        reportTypeFilter.addEventListener('change', filterReports);
        reportStatusFilter.addEventListener('change', filterReports);

        // Pagination buttons
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (!this.disabled) {
                    showNotification('Pagination would load more data here');
                }
            });
        });

        // Report action buttons
        reportActionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.title.toLowerCase();
                const reportItem = this.closest('.report-item');
                
                if (action === 'resolve') {
                    reportItem.querySelector('.report-status').textContent = 'Resolved';
                    reportItem.querySelector('.report-status').className = 'report-status resolved';
                    showNotification('Report has been marked as resolved.');
                } else if (action === 'dismiss') {
                    reportItem.querySelector('.report-status').textContent = 'Dismissed';
                    reportItem.querySelector('.report-status').className = 'report-status dismissed';
                    showNotification('Report has been dismissed.');
                }
            });
        });
        
        // Close notification button
        closeNotificationBtn.addEventListener('click', () => {
            hideNotification();
        });
    }

    function switchTab(tabName) {
        // Hide all tab contents
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Show the selected tab
        const selectedTab = document.getElementById(`${tabName}-tab`);
        if (selectedTab) {
            selectedTab.classList.add('active');
            
            // Update the tab title and breadcrumb
            const tabTitle = tabName.charAt(0).toUpperCase() + tabName.slice(1);
            currentTabTitle.textContent = tabTitle;
            currentBreadcrumb.textContent = tabTitle;
            
            // Initialize charts if we're on the dashboard
            if (tabName === 'dashboard') {
                initCharts();
                updateStats();
            }
        }
    }

    function switchSettingsTab(tabId) {
        // Hide all settings tab contents
        settingsTabContents.forEach(tab => tab.classList.remove('active'));
        
        // Show the selected settings tab
        const selectedTab = document.getElementById(`${tabId}-settings`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }

    function loadMoviesTable(movies) {
        moviesTableBody.innerHTML = '';
        
        if (movies.length === 0) {
            moviesTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="no-data">No movies found</td>
                </tr>
            `;
            return;
        }
        
        movies.forEach(movie => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${movie.poster}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://source.unsplash.com/random/300x450/?movie'"></td>
                <td>${movie.title}</td>
                <td>${movie.year}</td>
                <td>${movie.rating}</td>
                <td>${movie.genre.join(', ')}</td>
                <td><span class="status-badge ${movie.status}">${movie.status}</span></td>
                <td class="actions">
                    <button class="btn-icon edit-movie" title="Edit" data-id="${movie.id}"><i class='bx bx-edit'></i></button>
                    <button class="btn-icon delete delete-movie" title="Delete" data-id="${movie.id}"><i class='bx bx-trash'></i></button>
                </td>
            `;
            moviesTableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-movie').forEach(btn => {
            btn.addEventListener('click', function() {
                const movieId = parseInt(this.getAttribute('data-id'));
                editMovie(movieId);
            });
        });
        
        document.querySelectorAll('.delete-movie').forEach(btn => {
            btn.addEventListener('click', function() {
                const movieId = parseInt(this.getAttribute('data-id'));
                const movie = moviesData.find(m => m.id === movieId);
                showNotification(`Are you sure you want to delete "${movie.title}"?`, true, () => {
                    deleteMovie(movieId);
                });
            });
        });
    }

    function loadTvShowsTable(tvShows) {
        tvShowsTableBody.innerHTML = '';
        
        if (tvShows.length === 0) {
            tvShowsTableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="no-data">No TV shows found</td>
                </tr>
            `;
            return;
        }
        
        tvShows.forEach(tvShow => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${tvShow.poster}" alt="${tvShow.title}" class="tvshow-poster" onerror="this.src='https://source.unsplash.com/random/300x450/?tvshow'"></td>
                <td>${tvShow.title}</td>
                <td>${tvShow.year}</td>
                <td>${tvShow.seasons}</td>
                <td>${tvShow.rating}</td>
                <td>${tvShow.genre.join(', ')}</td>
                <td><span class="status-badge ${tvShow.status}">${tvShow.status}</span></td>
                <td class="actions">
                    <button class="btn-icon edit-tvshow" title="Edit" data-id="${tvShow.id}"><i class='bx bx-edit'></i></button>
                    <button class="btn-icon delete delete-tvshow" title="Delete" data-id="${tvShow.id}"><i class='bx bx-trash'></i></button>
                </td>
            `;
            tvShowsTableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-tvshow').forEach(btn => {
            btn.addEventListener('click', function() {
                const tvShowId = parseInt(this.getAttribute('data-id'));
                editTvShow(tvShowId);
            });
        });
        
        document.querySelectorAll('.delete-tvshow').forEach(btn => {
            btn.addEventListener('click', function() {
                const tvShowId = parseInt(this.getAttribute('data-id'));
                const tvShow = tvShowsData.find(t => t.id === tvShowId);
                showNotification(`Are you sure you want to delete "${tvShow.title}"?`, true, () => {
                    deleteTvShow(tvShowId);
                });
            });
        });
    }

    function loadUsersTable(users) {
        usersTableBody.innerHTML = '';
        
        if (users.length === 0) {
            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="no-data">No users found</td>
                </tr>
            `;
            return;
        }
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${user.avatar}" alt="${user.name}" class="user-avatar" onerror="this.src='https://source.unsplash.com/random/100x100/?portrait'"></td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><span class="status-badge ${user.status}">${user.status}</span></td>
                <td>${user.joined}</td>
                <td class="actions">
                    <button class="btn-icon edit-user" title="Edit" data-id="${user.id}"><i class='bx bx-edit'></i></button>
                    <button class="btn-icon ban-user" title="${user.status === 'banned' ? 'Unban' : 'Ban'}" data-id="${user.id}">
                        <i class='bx ${user.status === 'banned' ? 'bx-user-check' : 'bx-user-x'}'></i>
                    </button>
                    <button class="btn-icon delete delete-user" title="Delete" data-id="${user.id}"><i class='bx bx-trash'></i></button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-id'));
                editUser(userId);
            });
        });
        
        document.querySelectorAll('.ban-user').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-id'));
                const user = usersData.find(u => u.id === userId);
                const action = user.status === 'banned' ? 'unban' : 'ban';
                showNotification(`Are you sure you want to ${action} user "${user.name}"?`, true, () => {
                    toggleBanUser(userId);
                });
            });
        });
        
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.getAttribute('data-id'));
                const user = usersData.find(u => u.id === userId);
                showNotification(`Are you sure you want to delete user "${user.name}"?`, true, () => {
                    deleteUser(userId);
                });
            });
        });
    }

    function toggleBanUser(userId) {
        const userIndex = usersData.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            usersData[userIndex].status = usersData[userIndex].status === 'banned' ? 'active' : 'banned';
            localStorage.setItem('adminUsers', JSON.stringify(usersData));
            
            const message = usersData[userIndex].status === 'banned' ? 
                'User has been banned and can no longer login.' : 
                'User has been unbanned and can now login.';
            
            showNotification(message);
            loadUsersTable(usersData);
        }
    }

    function editMovie(movieId) {
        const movie = moviesData.find(m => m.id === movieId);
        if (!movie) return;
        
        // Fill the form with movie data
        document.getElementById('movie-title').value = movie.title;
        document.getElementById('movie-year').value = movie.year;
        document.getElementById('movie-rating').value = movie.rating;
        document.getElementById('movie-duration').value = movie.duration || '';
        document.getElementById('movie-director').value = movie.director || '';
        document.getElementById('movie-cast').value = movie.cast ? movie.cast.join(', ') : '';
        document.getElementById('movie-description').value = movie.description || '';
        document.getElementById('movie-trailer').value = movie.trailer || '';
        document.getElementById('movie-status').value = movie.status || 'active';
        
        // Select genres
        const genreSelect = document.getElementById('movie-genres');
        Array.from(genreSelect.options).forEach(option => {
            option.selected = movie.genre.includes(option.value);
        });
        
        // Set poster preview
        posterPreview.innerHTML = `<img src="${movie.poster}" alt="Poster Preview" onerror="this.src='https://source.unsplash.com/random/300x450/?movie'">`;
        
        // Open modal
        addMovieModal.classList.add('active');
        
        // Change form to edit mode
        const formTitle = addMovieModal.querySelector('.modal-header h3');
        formTitle.textContent = 'Edit Movie';
        
        // Change submit button text
        const submitBtn = movieForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Update Movie';
        
        // Remove previous submit event and add new one for update
        movieForm.removeEventListener('submit', movieForm._submitFn);
        movieForm._submitFn = function(e) {
            e.preventDefault();
            
            // Update movie data
            movie.title = document.getElementById('movie-title').value;
            movie.year = parseInt(document.getElementById('movie-year').value);
            movie.rating = parseFloat(document.getElementById('movie-rating').value);
            movie.genre = Array.from(document.getElementById('movie-genres').selectedOptions).map(opt => opt.value);
            movie.status = document.getElementById('movie-status').value;
            movie.duration = document.getElementById('movie-duration').value;
            movie.director = document.getElementById('movie-director').value;
            movie.cast = document.getElementById('movie-cast').value.split(',').map(s => s.trim());
            movie.description = document.getElementById('movie-description').value;
            movie.trailer = document.getElementById('movie-trailer').value;
            
            if (posterPreview.querySelector('img')) {
                movie.poster = posterPreview.querySelector('img').src;
            }
            
            // Save to localStorage
            localStorage.setItem('adminMovies', JSON.stringify(moviesData));
            
            // Update stats
            updateStats();
            
            // Update user dashboard
            updateUserDashboardContent();
            
            // Show success message
            showNotification('Movie updated successfully!');
            
            // Reset form and close modal
            movieForm.reset();
            posterPreview.innerHTML = '';
            addMovieModal.classList.remove('active');
            
            // Reload movies table
            loadMoviesTable(moviesData);
            
            // Reset form to add mode
            formTitle.textContent = 'Add New Movie';
            submitBtn.textContent = 'Save Movie';
            movieForm.removeEventListener('submit', movieForm._submitFn);
            movieForm.addEventListener('submit', movieForm._originalSubmitFn);
        };
        
        // Store original submit function if not already stored
        if (!movieForm._originalSubmitFn) {
            movieForm._originalSubmitFn = movieForm._submitFn;
        }
        
        movieForm.addEventListener('submit', movieForm._submitFn);
    }

    function editTvShow(tvShowId) {
        const tvShow = tvShowsData.find(t => t.id === tvShowId);
        if (!tvShow) return;
        
        // Fill the form with TV show data
        document.getElementById('tvshow-title').value = tvShow.title;
        document.getElementById('tvshow-year').value = tvShow.year;
        document.getElementById('tvshow-seasons').value = tvShow.seasons;
        document.getElementById('tvshow-rating').value = tvShow.rating;
        document.getElementById('tvshow-creator').value = tvShow.creator || '';
        document.getElementById('tvshow-cast').value = tvShow.cast ? tvShow.cast.join(', ') : '';
        document.getElementById('tvshow-description').value = tvShow.description || '';
        document.getElementById('tvshow-trailer').value = tvShow.trailer || '';
        document.getElementById('tvshow-status').value = tvShow.status || 'active';
        
        // Select genres
        const genreSelect = document.getElementById('tvshow-genres');
        Array.from(genreSelect.options).forEach(option => {
            option.selected = tvShow.genre.includes(option.value);
        });
        
        // Set poster preview
        tvShowPosterPreview.innerHTML = `<img src="${tvShow.poster}" alt="Poster Preview" onerror="this.src='https://source.unsplash.com/random/300x450/?tvshow'">`;
        
        // Open modal
        addTvShowModal.classList.add('active');
        
        // Change form to edit mode
        const formTitle = addTvShowModal.querySelector('.modal-header h3');
        formTitle.textContent = 'Edit TV Show';
        
        // Change submit button text
        const submitBtn = tvShowForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Update TV Show';
        
        // Remove previous submit event and add new one for update
        tvShowForm.removeEventListener('submit', tvShowForm._submitFn);
        tvShowForm._submitFn = function(e) {
            e.preventDefault();
            
            // Update TV show data
            tvShow.title = document.getElementById('tvshow-title').value;
            tvShow.year = parseInt(document.getElementById('tvshow-year').value);
            tvShow.seasons = parseInt(document.getElementById('tvshow-seasons').value);
            tvShow.rating = parseFloat(document.getElementById('tvshow-rating').value);
            tvShow.genre = Array.from(document.getElementById('tvshow-genres').selectedOptions).map(opt => opt.value);
            tvShow.status = document.getElementById('tvshow-status').value;
            tvShow.creator = document.getElementById('tvshow-creator').value;
            tvShow.cast = document.getElementById('tvshow-cast').value.split(',').map(s => s.trim());
            tvShow.description = document.getElementById('tvshow-description').value;
            tvShow.trailer = document.getElementById('tvshow-trailer').value;
            
            if (tvShowPosterPreview.querySelector('img')) {
                tvShow.poster = tvShowPosterPreview.querySelector('img').src;
            }
            
            // Save to localStorage
            localStorage.setItem('adminTvShows', JSON.stringify(tvShowsData));
            
            // Update stats
            updateStats();
            
            // Update user dashboard
            updateUserDashboardContent();
            
            // Show success message
            showNotification('TV Show updated successfully!');
            
            // Reset form and close modal
            tvShowForm.reset();
            tvShowPosterPreview.innerHTML = '';
            addTvShowModal.classList.remove('active');
            
            // Reload TV shows table
            loadTvShowsTable(tvShowsData);
            
            // Reset form to add mode
            formTitle.textContent = 'Add New TV Show';
            submitBtn.textContent = 'Save TV Show';
            tvShowForm.removeEventListener('submit', tvShowForm._submitFn);
            tvShowForm.addEventListener('submit', tvShowForm._originalSubmitFn);
        };
        
        // Store original submit function if not already stored
        if (!tvShowForm._originalSubmitFn) {
            tvShowForm._originalSubmitFn = tvShowForm._submitFn;
        }
        
        tvShowForm.addEventListener('submit', tvShowForm._submitFn);
    }

    function editUser(userId) {
        const user = usersData.find(u => u.id === userId);
        if (!user) return;
        
        // Split name into first and last
        const nameParts = user.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        
        // Fill the form with user data
        document.getElementById('user-first-name').value = firstName;
        document.getElementById('user-last-name').value = lastName;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-role').value = user.role;
        document.getElementById('user-status').value = user.status;
        document.getElementById('user-password').value = user.password || '';
        
        // Set avatar preview
        avatarPreview.innerHTML = `<img src="${user.avatar}" alt="Avatar Preview" onerror="this.src='https://source.unsplash.com/random/100x100/?portrait'">`;
        
        // Open modal
        addUserModal.classList.add('active');
        
        // Change form to edit mode
        const formTitle = addUserModal.querySelector('.modal-header h3');
        formTitle.textContent = 'Edit User';
        
        // Change submit button text
        const submitBtn = userForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Update User';
        
        // Remove previous submit event and add new one for update
        userForm.removeEventListener('submit', userForm._submitFn);
        userForm._submitFn = function(e) {
            e.preventDefault();
            
            // Update user data
            user.name = `${document.getElementById('user-first-name').value} ${document.getElementById('user-last-name').value}`;
            user.email = document.getElementById('user-email').value;
            user.role = document.getElementById('user-role').value;
            user.status = document.getElementById('user-status').value;
            user.password = document.getElementById('user-password').value;
            
            if (avatarPreview.querySelector('img')) {
                user.avatar = avatarPreview.querySelector('img').src;
            }
            
            // Save to localStorage
            localStorage.setItem('adminUsers', JSON.stringify(usersData));
            
            // Update stats
            updateStats();
            
            // Show success message
            showNotification('User updated successfully!');
            
            // Reset form and close modal
            userForm.reset();
            avatarPreview.innerHTML = '';
            addUserModal.classList.remove('active');
            
            // Reload users table
            loadUsersTable(usersData);
            
            // Reset form to add mode
            formTitle.textContent = 'Add New User';
            submitBtn.textContent = 'Save User';
            userForm.removeEventListener('submit', userForm._submitFn);
            userForm.addEventListener('submit', userForm._originalSubmitFn);
        };
        
        // Store original submit function if not already stored
        if (!userForm._originalSubmitFn) {
            userForm._originalSubmitFn = userForm._submitFn;
        }
        
        userForm.addEventListener('submit', userForm._submitFn);
    }

    function deleteMovie(movieId) {
        // Remove from movies data
        moviesData = moviesData.filter(m => m.id !== movieId);
        localStorage.setItem('adminMovies', JSON.stringify(moviesData));
        
        // Update stats
        updateStats();
        
        // Update user dashboard
        updateUserDashboardContent();
        
        // Show success message
        showNotification('Movie deleted successfully!');
        
        // Reload movies table
        loadMoviesTable(moviesData);
    }

    function deleteTvShow(tvShowId) {
        // Remove from TV shows data
        tvShowsData = tvShowsData.filter(t => t.id !== tvShowId);
        localStorage.setItem('adminTvShows', JSON.stringify(tvShowsData));
        
        // Update stats
        updateStats();
        
        // Update user dashboard
        updateUserDashboardContent();
        
        // Show success message
        showNotification('TV Show deleted successfully!');
        
        // Reload TV shows table
        loadTvShowsTable(tvShowsData);
    }

    function deleteUser(userId) {
        // Remove from users data
        usersData = usersData.filter(u => u.id !== userId);
        localStorage.setItem('adminUsers', JSON.stringify(usersData));
        
        // Update stats
        updateStats();
        
        // Show success message
        showNotification('User deleted successfully!');
        
        // Reload users table
        loadUsersTable(usersData);
    }

    function filterMovies() {
        const genre = genreFilter.value;
        const status = statusFilter.value;
        
        let filteredMovies = moviesData;
        
        if (genre) {
            filteredMovies = filteredMovies.filter(movie => 
                movie.genre.includes(genre)
            );
        }
        
        if (status) {
            filteredMovies = filteredMovies.filter(movie => 
                movie.status === status
            );
        }
        
        loadMoviesTable(filteredMovies);
    }

    function filterTvShows() {
        const genre = tvShowGenreFilter.value;
        const status = tvShowStatusFilter.value;
        
        let filteredTvShows = tvShowsData;
        
        if (genre) {
            filteredTvShows = filteredTvShows.filter(tvshow => 
                tvshow.genre.includes(genre)
            );
        }
        
        if (status) {
            filteredTvShows = filteredTvShows.filter(tvshow => 
                tvshow.status === status
            );
        }
        
        loadTvShowsTable(filteredTvShows);
    }

    function filterUsers() {
        const role = roleFilter.value;
        const status = document.querySelector('#users-tab #status-filter').value;
        
        let filteredUsers = usersData;
        
        if (role) {
            filteredUsers = filteredUsers.filter(user => 
                user.role === role
            );
        }
        
        if (status) {
            filteredUsers = filteredUsers.filter(user => 
                user.status === status
            );
        }
        
        loadUsersTable(filteredUsers);
    }

    function filterReports() {
        const type = reportTypeFilter.value;
        const status = reportStatusFilter.value;
        
        // In a real app, you would filter the reports data
        console.log(`Filtering reports by type: ${type}, status: ${status}`);
    }

    function initCharts() {
        // Destroy existing charts if they exist
        if (userGrowthChart) {
            userGrowthChart.destroy();
        }
        if (contentViewsChart) {
            contentViewsChart.destroy();
        }
        
        // User Growth Chart
        const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
        userGrowthChart = new Chart(userGrowthCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'New Users',
                    data: [120, 190, 170, 220, 250, 280, 310],
                    backgroundColor: 'rgba(74, 107, 255, 0.1)',
                    borderColor: 'rgba(74, 107, 255, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Content Views Chart
        const contentViewsCtx = document.getElementById('contentViewsChart').getContext('2d');
        contentViewsChart = new Chart(contentViewsCtx, {
            type: 'bar',
            data: {
                labels: ['Movies', 'TV Shows', 'Documentaries', 'Short Films'],
                datasets: [{
                    label: 'Views',
                    data: [45000, 38000, 12000, 8000],
                    backgroundColor: [
                        'rgba(74, 107, 255, 0.7)',
                        'rgba(255, 107, 107, 0.7)',
                        'rgba(107, 255, 107, 0.7)',
                        'rgba(255, 203, 107, 0.7)'
                    ],
                    borderColor: [
                        'rgba(74, 107, 255, 1)',
                        'rgba(255, 107, 107, 1)',
                        'rgba(107, 255, 107, 1)',
                        'rgba(255, 203, 107, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function updateUserDashboardContent() {
        // Save only active content to localStorage for user dashboard
        const activeMovies = moviesData.filter(movie => movie.status === 'active');
        const activeTvShows = tvShowsData.filter(tvshow => tvshow.status === 'active');
        localStorage.setItem('adminMovies', JSON.stringify(activeMovies));
        localStorage.setItem('adminTvShows', JSON.stringify(activeTvShows));
    }

    function showNotification(message, isConfirm = false, confirmCallback = null) {
        notificationMessage.textContent = message;
        customNotification.classList.add('show');
        
        if (isConfirm) {
            // Create confirm buttons
            const confirmDiv = document.createElement('div');
            confirmDiv.className = 'confirm-buttons';
            confirmDiv.innerHTML = `
                <button class="btn-secondary" id="confirmCancel">Cancel</button>
                <button class="btn-primary" id="confirmOk">OK</button>
            `;
            notificationMessage.parentNode.insertBefore(confirmDiv, notificationMessage.nextSibling);
            
            // Add event listeners
            document.getElementById('confirmCancel').addEventListener('click', () => {
                hideNotification();
            });
            
            document.getElementById('confirmOk').addEventListener('click', () => {
                hideNotification();
                if (confirmCallback) confirmCallback();
            });
        } else {
            // Auto-hide after 5 seconds
            setTimeout(() => {
                hideNotification();
            }, 5000);
        }
    }

    function hideNotification() {
        customNotification.classList.remove('show');
        // Remove any confirm buttons
        const confirmDiv = document.querySelector('.confirm-buttons');
        if (confirmDiv) confirmDiv.remove();
    }

    // Theme switcher
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Check for saved theme preference (but default to light)
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});