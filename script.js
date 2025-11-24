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
        'CRS': 'https://extendedforms.io/form/a068a960-7fab-40d3-b692-61e9ddfd9b20/login',
        'Literature': 'https://extendedforms.io/form/a06898ef-8e50-4081-922e-0a1ddae3fa2a/login',
        'Physics': 'https://extendedforms.io/form/a0689b56-83d0-4327-aef4-8d6dc15ffe5e/login',
        'Economics': 'https://extendedforms.io/form/a068a681-7df2-457d-aecc-913ca9418ebe/login',
        'Technical': 'https://extendedforms.io/form/a068ac81-3c6a-47da-8bea-4149c472ab33/login',
        'Biology': 'https://extendedforms.io/form/a06699b2-2cde-4ca4-87bc-d497e528c07c/login',
        'Civic': 'https://extendedforms.io/form/a063e8c3-9a3d-4091-a880-dc06eb86498e/login',
        'Catering': 'https://extendedforms.io/form/a06e98b6-c5cd-457b-b0d2-d850232ef6c9/login',
        'Accounting': 'https://extendedforms.io/form/a0691ff2-cde9-4c89-bd76-a3e618cf83dc/login',
        'Commerce': 'https://extendedforms.io/form/a06e9eb1-d33c-4cb5-94a8-f6167c7a1c1d/login',
        'Fmaths': 'https://extendedforms.io/form/a06ea0c6-3a0e-45b1-9ccf-cd4e13217bad/login',
        'Igbo': 'https://extendedforms.io/form/a06ea4cb-bf6f-445f-b4af-5b0e51c40865/login',
        'Computer': 'https://extendedforms.io/form/a06ea843-826e-41dd-ba29-16e441655304/login',
        'Agric': 'https://extendedforms.io/form/a06ec5e2-e509-4d68-9a27-004560929546/login',
        'Food': 'https://extendedforms.io/form/a06ec85c-620b-432c-8ac0-d24d0f925e5f/login',
        'English': 'https://extendedforms.io/form/a06ed1a7-47eb-41b5-8d64-5255416be975/login',
        'Oral': 'https://extendedforms.io/form/a06ed491-46dd-4291-895a-1e6d95dfdb1f/login',
        
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