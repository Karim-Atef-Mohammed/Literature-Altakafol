// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate bars to form X
            const bars = this.querySelectorAll('.bar');
            bars[0].classList.toggle('active');
            bars[1].classList.toggle('active');
            bars[2].classList.toggle('active');
        });
    }
    
    // Handle dropdown menus on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .rotate-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) rotate(0) scale(1)';
                }, delay * 1000);
            }
        });
    };
    
    // Run on initial load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Vocabulary tab functionality
    function setupTabs(tabContainer, contentPrefix) {
        const tabButtons = document.querySelectorAll(`${tabContainer} .tab-button`);
        
        if (tabButtons.length) {
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Make this the active tab
                    document.querySelectorAll(`${tabContainer} .tab-button`).forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
        }
    }
    
    // Setup tabs if they exist
    setupTabs('.vocabulary-tabs');
    setupTabs('.styles-tabs');
    
    // Style examples highlighting
    const styleExamples = document.querySelectorAll('.style-example');
    
    if (styleExamples.length) {
        styleExamples.forEach(example => {
            example.addEventListener('click', function() {
                const isActive = this.classList.contains('active');
                
                // Remove active class from all examples
                styleExamples.forEach(ex => {
                    ex.classList.remove('active');
                });
                
                // Toggle active class on clicked example
                if (!isActive) {
                    this.classList.add('active');
                }
            });
        });
    }
});

// Functions for tab toggling
function openVocabTab(event, tabId) {
    // Hide all vocabulary content
    const tabContents = document.querySelectorAll('.vocabulary-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Update active button
    const tabButtons = document.querySelectorAll('.vocabulary-tabs .tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
}

function openStylesTab(event, tabId) {
    // Hide all styles content
    const tabContents = document.querySelectorAll('.styles-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Update active button
    const tabButtons = document.querySelectorAll('.styles-tabs .tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
}

function highlightExample(element) {
    // Toggle the active class
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        // Remove active class from all examples
        const examples = document.querySelectorAll('.style-example');
        examples.forEach(example => {
            example.classList.remove('active');
        });
        
        // Add active class to clicked example
        element.classList.add('active');
        
        // Add highlight animation
        element.classList.add('highlight');
        
        // Remove highlight class after animation completes
        setTimeout(() => {
            element.classList.remove('highlight');
        }, 1500);
    }
}