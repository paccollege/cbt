document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation Bar Toggle (Hamburger Menu) ---
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        if (burger) {
            burger.addEventListener('click', () => {
                // Toggle nav to slide in/out
                nav.classList.toggle('nav-active');

                // Animate links (fade in sequentially)
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = ''; // Reset animation
                    } else {
                        // Use navLinkFade keyframe defined in style.css
                        link.style.animation = `navLinkFade 0.4s ease forwards ${index * 0.2 + 0.5}s`;
                    }
                });

                // Burger animation (X shape)
                burger.classList.toggle('toggle');
            });
        }
    }

    // --- 2. Home Page Banner Interactivity (Modal) ---
    const banners = document.querySelectorAll('.exam-banner');
    const modal = document.getElementById('explanation-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close-btn');

    // Content for the modal pop-ups
    const explanations = {
        proctored: {
            title: 'Proctored Examination',
            text: 'This exam is supervised either physically or virtually using advanced monitoring software to ensure academic integrity and prevent cheating. Students must adhere strictly to all proctoring guidelines.'
        },
        timed: {
            title: 'Timed Examination',
            text: 'You will have a strict time limit to complete the test. Once the timer starts, it cannot be paused, and the test will automatically submit when the time runs out. Manage your time wisely!'
        },
        objective: {
            title: 'Objective Questions Only',
            text: 'The examination consists solely of multiple-choice, true/false, or matching questions. There are no essay or subjective answers required. Focus on choosing the best single option for each question.'
        }
    };

    banners.forEach(banner => {
        banner.addEventListener('click', () => {
            const mode = banner.getAttribute('data-mode');
            const data = explanations[mode];
            
            // Populate and show the modal
            if (modal && modalTitle && modalText && data) {
                 modalTitle.textContent = data.title;
                 modalText.textContent = data.text;
                 modal.style.display = 'block';
            }
        });
    });

    // Close modal functions
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- 3. Exam Page Search and Link Logic ---
    const subjectSearch = document.getElementById('subject-search');
    const subjectButtons = document.querySelectorAll('.subject-btn');
    
    // ⚠️ ACTION REQUIRED: REPLACE THESE PLACEHOLDERS WITH YOUR ACTUAL GOOGLE FORM URLs
    const SUBJECT_LINKS = {
        'Sample': 'https://forms.gle/1zSncCL4tPp4mHhn7',
    };

    // Subject Filtering (only runs if the element exists, i.e., on exam.html)
    if (subjectSearch) {
        subjectSearch.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            subjectButtons.forEach(button => {
                const subjectName = button.textContent.toLowerCase();
                if (subjectName.includes(searchTerm)) {
                    button.style.display = 'block';
                } else {
                    button.style.display = 'none';
                }
            });
        });
    }

    // Subject Button Click (Links to Specific Google Form)
    subjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retrieve the subject name from the button's data-subject attribute
            const subject = button.getAttribute('data-subject'); 
            
            // Look up the URL in the SUBJECT_LINKS map
            const formURL = SUBJECT_LINKS[subject];

            if (formURL) {
                // Open the specific Google Form link in a new tab
                window.open(formURL, '_blank');
            } else {
                console.error(`Error: No link found for subject: ${subject}`);
                alert(`The exam link for ${subject} is not yet available. Please update the Subject.`);
            }
        });
    });
    
    // Initialize navigation on load
    navSlide();
});