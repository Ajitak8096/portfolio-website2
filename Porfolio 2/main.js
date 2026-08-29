/* =========================================================
   SMOOTH CUSTOM CURSOR
========================================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorCircle =
    document.querySelector(".cursor-circle");

const isTouchDevice =
    window.matchMedia(
        "(hover: none), (pointer: coarse)"
    ).matches;


if (
    cursorDot &&
    cursorCircle &&
    !isTouchDevice
) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let circleX = mouseX;
    let circleY = mouseY;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;


            cursorDot.style.transform =
                `translate3d(
                    ${mouseX}px,
                    ${mouseY}px,
                    0
                ) translate(-50%, -50%)`;

        }
    );


    function animateCursor() {

        /*
         * Lower value = smoother/slower
         * Higher value = faster
         */

        circleX +=
            (mouseX - circleX) * 0.09;

        circleY +=
            (mouseY - circleY) * 0.09;


        cursorCircle.style.transform =
            `translate3d(
                ${circleX}px,
                ${circleY}px,
                0
            ) translate(-50%, -50%)`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /*
     * Cursor hover
     */

    const hoverElements =
        document.querySelectorAll(
            `
            a,
            button,
            input,
            textarea,
            .portfolio-box,
            .skill-group,
            .services-box
            `
        );


    hoverElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorCircle.classList.add(
                        "hover"
                    );

                    cursorDot.classList.add(
                        "hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorCircle.classList.remove(
                        "hover"
                    );

                    cursorDot.classList.remove(
                        "hover"
                    );

                }
            );

        }
    );


    /*
     * Hide cursor outside page
     */

    document.addEventListener(
        "mouseleave",
        () => {

            cursorCircle.style.opacity = "0";
            cursorDot.style.opacity = "0";

        }
    );


    document.addEventListener(
        "mouseenter",
        () => {

            cursorCircle.style.opacity = "1";
            cursorDot.style.opacity = "1";

        }
    );

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuIcon =
    document.querySelector('#menu-icon');

const navbar =
    document.querySelector('.navbar');


if (menuIcon && navbar) {

    menuIcon.addEventListener(
        'click',
        () => {

            const isOpen =
                navbar.classList.toggle(
                    'active'
                );


            menuIcon.innerHTML =
                isOpen
                    ? '<i class="fa-solid fa-xmark"></i>'
                    : '<i class="fa-solid fa-bars"></i>';


            menuIcon.setAttribute(
                'aria-expanded',
                String(isOpen)
            );

        }
    );


    document
        .querySelectorAll('.navbar a')
        .forEach(
            link => {

                link.addEventListener(
                    'click',
                    () => {

                        navbar.classList.remove(
                            'active'
                        );


                        menuIcon.innerHTML =
                            '<i class="fa-solid fa-bars"></i>';


                        menuIcon.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                    }
                );

            }
        );

}


/* =========================================================
   STICKY HEADER + ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        'main section[id]'
    );

const navLinks =
    document.querySelectorAll(
        '.navbar a'
    );

const header =
    document.querySelector('.header');


function updateNavigation() {

    const scrollPosition =
        window.scrollY + 220;


    if (header) {

        header.classList.toggle(
            'sticky',
            window.scrollY > 50
        );

    }


    sections.forEach(
        section => {

            const top =
                section.offsetTop;

            const bottom =
                top + section.offsetHeight;

            const id =
                section.getAttribute(
                    'id'
                );


            if (
                scrollPosition >= top &&
                scrollPosition < bottom
            ) {

                navLinks.forEach(
                    link => {

                        link.classList.remove(
                            'active'
                        );

                    }
                );


                const activeLink =
                    document.querySelector(
                        `.navbar a[href="#${id}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        'active'
                    );

                }

            }

        }
    );

}


window.addEventListener(
    'scroll',
    updateNavigation,
    {
        passive: true
    }
);


updateNavigation();


/* =========================================================
   TYPED HERO TEXT
========================================================= */

if (
    typeof Typed !== 'undefined' &&
    document.querySelector('.multiple-text')
) {

    new Typed(
        '.multiple-text',
        {

            strings: [

                'Full-Stack Applications',

                'AI-Powered Solutions',

                'Modern Web Experiences',

                'Scalable Digital Products'

            ],

            typeSpeed: 55,

            backSpeed: 35,

            backDelay: 1400,

            loop: true

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

if (
    typeof ScrollReveal !== 'undefined'
) {

    const reveal =
        ScrollReveal({

            distance: '55px',

            duration: 900,

            delay: 100,

            easing: 'ease-out',

            reset: false

        });


    reveal.reveal(
        '.about-img, .contact-copy',
        {
            origin: 'left'
        }
    );


    reveal.reveal(
        '.about-content, .contact-form',
        {
            origin: 'right'
        }
    );


    reveal.reveal(
        '.section-heading',
        {
            origin: 'top'
        }
    );


    reveal.reveal(
        '.services-box, .skill-group, .portfolio-box',
        {
            origin: 'bottom',

            interval: 120
        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.querySelector(
        '#contact-form'
    );


if (contactForm) {

    contactForm.addEventListener(
        'submit',
        event => {

            event.preventDefault();


            const formData =
                new FormData(
                    contactForm
                );


            const name =
                formData.get('name') || '';

            const email =
                formData.get('email') || '';

            const subject =
                formData.get('subject') ||
                'Portfolio enquiry';

            const company =
                formData.get('company') ||
                'Not provided';

            const message =
                formData.get('message') ||
                '';


            const body = [

                'Hello Ajit,',

                '',

                `Name: ${name}`,

                `Email: ${email}`,

                `Company: ${company}`,

                '',

                'Message:',

                message

            ].join('\n');


            const mailto =
                'mailto:ajitkumar8096@gmail.com' +

                `?subject=${encodeURIComponent(
                    subject
                )}` +

                `&body=${encodeURIComponent(
                    body
                )}`;


            window.location.href =
                mailto;

        }
    );

}
/* =========================================================
   LIVE GITHUB PROFILE
========================================================= */

const GITHUB_USERNAME = "Ajitak8096";

const githubAvatar =
    document.querySelector("#github-avatar");

const githubName =
    document.querySelector("#github-name");

const githubUsername =
    document.querySelector("#github-username");

const githubBio =
    document.querySelector("#github-bio");

const githubRepos =
    document.querySelector("#github-repos");

const githubFollowers =
    document.querySelector("#github-followers");

const githubFollowing =
    document.querySelector("#github-following");

const githubGrid =
    document.querySelector("#github-grid");


async function loadGitHubProfile() {

    if (!githubAvatar) return;


    try {

        /*
         * Get GitHub profile
         */

        const profileResponse =
            await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}`
            );


        if (!profileResponse.ok) {

            throw new Error(
                "Unable to load GitHub profile"
            );

        }


        const profile =
            await profileResponse.json();


        /*
         * Update profile
         */

        githubAvatar.src =
            profile.avatar_url;

        githubName.textContent =
            profile.name ||
            GITHUB_USERNAME;

        githubUsername.textContent =
            `@${profile.login}`;

        githubBio.textContent =
            profile.bio ||
            "Software Developer building full-stack and AI-powered applications.";

        githubRepos.textContent =
            profile.public_repos;

        githubFollowers.textContent =
            profile.followers;

        githubFollowing.textContent =
            profile.following;


        /*
         * Load repositories
         */

        await loadGitHubRepositories();


    } catch (error) {

        console.error(
            "GitHub Error:",
            error
        );


        githubName.textContent =
            "GitHub";

        githubBio.textContent =
            "Unable to load GitHub profile right now.";

        githubGrid.innerHTML = `

            <div class="github-error">

                <i class="fa-brands fa-github"></i>

                <p>
                    GitHub information could not be loaded.
                </p>

                <br>

                <a
                    href="https://github.com/${GITHUB_USERNAME}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link">

                    Visit GitHub

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        `;

    }

}


async function loadGitHubRepositories() {

    try {

        const response =
            await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=6`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load repositories"
            );

        }


        const repositories =
            await response.json();


        githubGrid.innerHTML = "";


        /*
         * Remove forks when possible
         */

        const filteredRepositories =
            repositories
                .filter(repo => !repo.fork)
                .slice(0, 6);


        if (
            filteredRepositories.length === 0
        ) {

            githubGrid.innerHTML = `

                <div class="github-error">

                    <i class="fa-brands fa-github"></i>

                    <p>
                        No public repositories found yet.
                    </p>

                </div>

            `;

            return;

        }


        filteredRepositories.forEach(
            repo => {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "github-repo";


                const description =
                    repo.description ||
                    "No description available.";


                const language =
                    repo.language ||
                    "Code";


                card.innerHTML = `

                    <div class="github-repo-top">

                        <i
                            class="fa-regular fa-folder-open github-repo-icon">
                        </i>


                        <span class="github-repo-stars">

                            <i class="fa-regular fa-star"></i>

                            ${repo.stargazers_count}

                        </span>

                    </div>


                    <h4>
                        ${escapeHTML(repo.name)}
                    </h4>


                    <p>
                        ${escapeHTML(description)}
                    </p>


                    <div class="github-repo-bottom">

                        <span class="github-language">

                            <span class="language-dot"></span>

                            ${escapeHTML(language)}

                        </span>


                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="github-repo-link">

                            View

                            <i class="fa-solid fa-arrow-up-right-from-square"></i>

                        </a>

                    </div>

                `;


                githubGrid.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Repository Error:",
            error
        );


        githubGrid.innerHTML = `

            <div class="github-error">

                <i class="fa-brands fa-github"></i>

                <p>
                    Repositories could not be loaded.
                </p>

            </div>

        `;

    }

}


/*
 * Prevent HTML injection from GitHub text.
 */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/*
 * Start GitHub loading
 */

loadGitHubProfile();
/* =========================================================
   PORTFOLIO AI
========================================================= */

const portfolioAIButton =
    document.querySelector(
        "#portfolio-ai-button"
    );

const portfolioAIPanel =
    document.querySelector(
        "#portfolio-ai-panel"
    );

const aiClose =
    document.querySelector(
        "#ai-close"
    );

const aiMessages =
    document.querySelector(
        "#ai-messages"
    );

const aiForm =
    document.querySelector(
        "#ai-form"
    );

const aiInput =
    document.querySelector(
        "#ai-input"
    );


/*
 * Open AI
 */

if (portfolioAIButton) {

    portfolioAIButton.addEventListener(
        "click",
        () => {

            portfolioAIPanel.classList.add(
                "open"
            );

            setTimeout(
                () => aiInput.focus(),
                300
            );

        }
    );

}


/*
 * Close AI
 */

if (aiClose) {

    aiClose.addEventListener(
        "click",
        () => {

            portfolioAIPanel.classList.remove(
                "open"
            );

        }
    );

}


/*
 * Portfolio knowledge
 */

const portfolioKnowledge = {

    about: `
        Ajit Kumar is a Software Developer focused on
        full-stack development, AI/ML and modern web
        applications. He enjoys solving real-world problems
        and turning ideas into useful software.
    `,

    skills: `
        Ajit's main skills include Java, JavaScript,
        Python, SQL, React, HTML, CSS, Tailwind CSS,
        Node.js, Express.js, REST APIs, JWT, MongoDB,
        MySQL, Scikit-learn, TensorFlow, Pandas,
        Matplotlib, Git, GitHub, Postman and VS Code.
    `,

    project: `
        Ajit's featured project is Smart Learning Planner.
        It is an AI-powered personalized study planning
        platform designed to create adaptive study schedules
        based on exam dates, weak subjects, available time
        and learning progress. The stack includes React,
        Node.js, Express.js, MongoDB and AI.
    `,

    projects: `
        Ajit has worked on Smart Learning Planner,
        AI Code Reviewer, Air Drawing System,
        Gym Management System, AI and Social Media
        Impact Analysis, and a Netflix Clone.
    `,

    experience: `
        Ajit's experience includes a Deloitte Australia
        Data Analytics job simulation, a Google AI/ML
        virtual internship through EduSkills, and
        web development internship experience at Proxenix.
    `,

    contact: `
        You can contact Ajit by email at
        ajitkumar8096@gmail.com.
        You can also connect with him on LinkedIn or GitHub
        using the links available on this portfolio.
    `,

    github: `
        Ajit's GitHub profile is:
        github.com/Ajitak8096
    `

};


/*
 * Generate answer
 */

function getPortfolioAnswer(question) {

    const q =
        question
            .toLowerCase()
            .trim();


    /*
     * About
     */

    if (
        q.includes("who is ajit") ||
        q.includes("about ajit") ||
        q.includes("tell me about ajit") ||
        q.includes("who are you") ||
        q.includes("about him")
    ) {

        return portfolioKnowledge.about;

    }


    /*
     * Skills
     */

    if (
        q.includes("skill") ||
        q.includes("technology") ||
        q.includes("tech stack") ||
        q.includes("know")
    ) {

        return portfolioKnowledge.skills;

    }


    /*
     * Strongest project
     */

    if (
        q.includes("strongest project") ||
        q.includes("best project") ||
        q.includes("featured project") ||
        q.includes("main project")
    ) {

        return portfolioKnowledge.project;

    }


    /*
     * Smart Learning Planner
     */

    if (
        q.includes("smart learning") ||
        q.includes("learning planner") ||
        q.includes("study planner")
    ) {

        return portfolioKnowledge.project;

    }


    /*
     * Projects
     */

    if (
        q.includes("project") ||
        q.includes("built") ||
        q.includes("developed")
    ) {

        return portfolioKnowledge.projects;

    }


    /*
     * Experience
     */

    if (
        q.includes("experience") ||
        q.includes("internship") ||
        q.includes("deloitte") ||
        q.includes("eduskills") ||
        q.includes("proxenix")
    ) {

        return portfolioKnowledge.experience;

    }


    /*
     * Contact
     */

    if (
        q.includes("contact") ||
        q.includes("email") ||
        q.includes("hire") ||
        q.includes("reach")
    ) {

        return portfolioKnowledge.contact;

    }


    /*
     * GitHub
     */

    if (
        q.includes("github") ||
        q.includes("repository") ||
        q.includes("repo")
    ) {

        return portfolioKnowledge.github;

    }


    /*
     * AI / ML
     */

    if (
        q.includes("ai") ||
        q.includes("machine learning") ||
        q.includes("ml")
    ) {

        return `
            Ajit has experience with AI/ML technologies
            including Scikit-learn and TensorFlow.
            His projects include the Smart Learning Planner,
            AI Code Reviewer and AI/Data Analysis work.
        `;

    }


    /*
     * Frontend
     */

    if (
        q.includes("frontend") ||
        q.includes("front end") ||
        q.includes("react")
    ) {

        return `
            Ajit works with React, JavaScript, HTML5,
            CSS3 and Tailwind CSS for frontend development.
            He focuses on responsive interfaces and
            interactive user experiences.
        `;

    }


    /*
     * Backend
     */

    if (
        q.includes("backend") ||
        q.includes("back end") ||
        q.includes("node") ||
        q.includes("server")
    ) {

        return `
            Ajit's backend stack includes Node.js,
            Express.js, REST APIs, JWT authentication,
            MongoDB and MySQL.
        `;

    }


    /*
     * Resume
     */

    if (
        q.includes("resume") ||
        q.includes("cv")
    ) {

        return `
            You can download Ajit's resume using the
            "Download Resume" button in the hero section
            of this portfolio.
        `;

    }


    /*
     * Greeting
     */

    if (
        q === "hi" ||
        q === "hello" ||
        q === "hey" ||
        q.includes("good morning") ||
        q.includes("good evening")
    ) {

        return `
            Hello! 👋 I'm here to tell you about Ajit's
            skills, projects, experience and background.
            What would you like to know?
        `;

    }


    /*
     * Default
     */

    return `
        I can tell you about Ajit's background, skills,
        experience, projects, Smart Learning Planner,
        AI/ML work, GitHub or contact information.

        Try asking:
        "What are Ajit's skills?"
        or
        "Tell me about Smart Learning Planner."
    `;

}


/*
 * Add message
 */

function addAIMessage(
    text,
    type = "bot"
) {

    const message =
        document.createElement(
            "div"
        );


    message.className =
        `ai-message ${type}`;


    if (type === "bot") {

        message.innerHTML = `

            <div class="message-icon">

                <i class="fa-solid fa-sparkles"></i>

            </div>

            <div class="message-content">

                <p>
                    ${formatAIText(text)}
                </p>

            </div>

        `;

    } else {

        message.innerHTML = `

            <div class="message-content">

                <p>
                    ${formatAIText(text)}
                </p>

            </div>

        `;

    }


    aiMessages.appendChild(
        message
    );


    aiMessages.scrollTop =
        aiMessages.scrollHeight;

}


/*
 * Format text
 */

function formatAIText(text) {

    return text
        .trim()
        .replace(
            /\n/g,
            "<br>"
        );

}


/*
 * Typing animation
 */

function showTyping() {

    const typing =
        document.createElement(
            "div"
        );


    typing.className =
        "ai-message";

    typing.id =
        "ai-typing";


    typing.innerHTML = `

        <div class="message-icon">

            <i class="fa-solid fa-sparkles"></i>

        </div>

        <div class="ai-typing">

            <span></span>
            <span></span>
            <span></span>

        </div>

    `;


    aiMessages.appendChild(
        typing
    );


    aiMessages.scrollTop =
        aiMessages.scrollHeight;

}


function removeTyping() {

    const typing =
        document.querySelector(
            "#ai-typing"
        );


    if (typing) {

        typing.remove();

    }

}


/*
 * Ask question
 */

function askPortfolio(question) {

    if (!question.trim()) return;


    addAIMessage(
        question,
        "user"
    );


    aiInput.value = "";


    showTyping();


    /*
     * Small delay makes it feel
     * like an actual assistant.
     */

    setTimeout(
        () => {

            removeTyping();


            const answer =
                getPortfolioAnswer(
                    question
                );


            addAIMessage(
                answer,
                "bot"
            );

        },

        500 + Math.random() * 500
    );

}


/*
 * Form submit
 */

if (aiForm) {

    aiForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            askPortfolio(
                aiInput.value
            );

        }
    );

}


/*
 * Suggestion buttons
 */

document
    .querySelectorAll(
        ".ai-suggestions button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    askPortfolio(
                        button.dataset.question
                    );

                }
            );

        }
    );


/*
 * Escape key closes AI
 */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            portfolioAIPanel
        ) {

            portfolioAIPanel.classList.remove(
                "open"
            );

        }

    }
);
/* =========================================================
   BOUNCING TECH STACK
========================================================= */

const techWorld =
    document.querySelector("#tech-world");

const techBalls =
    document.querySelectorAll(".tech-ball");


if (techWorld && techBalls.length) {

    const balls = [];

    /*
     * Create physics data
     */

    techBalls.forEach(
        (ball, index) => {

            const size =
                ball.offsetWidth;

            const maxX =
                techWorld.clientWidth -
                size;

            const maxY =
                techWorld.clientHeight -
                size -
                120;


            /*
             * Spread balls around
             * the entire area.
             */

            const x =
                Math.random() *
                Math.max(maxX, 10);


            const y =
                Math.random() *
                Math.max(maxY, 10);


            /*
             * Different speeds
             */

            const speed =
                0.35 +
                Math.random() * 0.45;


            const angle =
                Math.random() *
                Math.PI *
                2;


            const ballData = {

                element: ball,

                x: x,

                y: y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                size: size,

                paused: false,

                mouseOver: false,

                scale: 1,

                targetScale: 1

            };


            /*
             * CSS custom color
             */

            const color =
                ball.dataset.color ||
                "#59b2f4";


            ball.style.setProperty(
                "--ball-color",
                color
            );


            balls.push(
                ballData
            );


            /*
             * Hover
             */

            ball.addEventListener(
                "mouseenter",
                () => {

                    ballData.mouseOver =
                        true;

                    ballData.targetScale =
                        1.15;

                }
            );


            ball.addEventListener(
                "mouseleave",
                () => {

                    ballData.mouseOver =
                        false;

                    ballData.targetScale =
                        1;

                }
            );

        }
    );


    /*
     * Animation
     */

    function animateTechBalls() {

        const width =
            techWorld.clientWidth;

        const height =
            techWorld.clientHeight;


        balls.forEach(
            ball => {

                /*
                 * Smooth scaling
                 */

                ball.scale +=
                    (
                        ball.targetScale -
                        ball.scale
                    ) * .08;


                /*
                 * Move
                 */

                if (!ball.mouseOver) {

                    ball.x += ball.vx;

                    ball.y += ball.vy;

                }


                /*
                 * Wall collision - left
                 */

                if (
                    ball.x <= 0
                ) {

                    ball.x = 0;

                    ball.vx =
                        Math.abs(
                            ball.vx
                        );

                }


                /*
                 * Wall collision - right
                 */

                if (
                    ball.x + ball.size >= width
                ) {

                    ball.x =
                        width -
                        ball.size;

                    ball.vx =
                        -Math.abs(
                            ball.vx
                        );

                }


                /*
                 * Wall collision - top
                 */

                if (
                    ball.y <= 0
                ) {

                    ball.y = 0;

                    ball.vy =
                        Math.abs(
                            ball.vy
                        );

                }


                /*
                 * Bottom
                 *
                 * Keep balls above
                 * information card.
                 */

                const bottomLimit =
                    height -
                    ball.size -
                    110;


                if (
                    ball.y >= bottomLimit
                ) {

                    ball.y =
                        bottomLimit;

                    ball.vy =
                        -Math.abs(
                            ball.vy
                        );

                }


                /*
                 * Apply transform
                 */

                ball.element.style.transform =
                    `
                    translate3d(
                        ${ball.x}px,
                        ${ball.y}px,
                        0
                    )
                    scale(${ball.scale})
                    `;

            }
        );


        requestAnimationFrame(
            animateTechBalls
        );

    }


    animateTechBalls();


    /*
     * When window changes size,
     * keep balls inside.
     */

    window.addEventListener(
        "resize",
        () => {

            const width =
                techWorld.clientWidth;

            const height =
                techWorld.clientHeight;


            balls.forEach(
                ball => {

                    ball.size =
                        ball.element.offsetWidth;


                    ball.x =
                        Math.min(
                            ball.x,
                            width -
                            ball.size
                        );


                    ball.y =
                        Math.min(
                            ball.y,
                            height -
                            ball.size -
                            110
                        );

                }
            );

        }
    );

}
/* =========================================================
   ABOUT PLANETS — REAL SOLAR SYSTEM ORBIT
   Planets travel BEHIND and IN FRONT of AJ
========================================================= */

(function () {

    const universe =
        document.querySelector(".about-universe");

    const core =
        document.querySelector(".about-core");

    if (!universe || !core) return;


    const planets = [

        {
            element:
                document.querySelector(".planet-home"),

            radiusX: 0.39,
            radiusY: 0.23,

            startAngle: Math.PI * 0.95,

            speed: 0.000055
        },


        {
            element:
                document.querySelector(".planet-about"),

            radiusX: 0.30,
            radiusY: 0.17,

            startAngle: Math.PI * 1.65,

            speed: 0.000070
        },


        {
            element:
                document.querySelector(".planet-experience"),

            radiusX: 0.43,
            radiusY: 0.25,

            startAngle: Math.PI * 0.05,

            speed: 0.000048
        },


        {
            element:
                document.querySelector(".planet-skills"),

            radiusX: 0.48,
            radiusY: 0.29,

            startAngle: Math.PI * 0.60,

            speed: 0.000042
        },


        {
            element:
                document.querySelector(".planet-project"),

            radiusX: 0.35,
            radiusY: 0.21,

            startAngle: Math.PI * 1.05,

            speed: 0.000060
        },


        {
            element:
                document.querySelector(".planet-contact"),

            radiusX: 0.46,
            radiusY: 0.28,

            startAngle: Math.PI * 1.42,

            speed: 0.000050
        }

    ];


    const startTime =
        performance.now();


    function animateSolarSystem(time) {

        const elapsed =
            time - startTime;


        const width =
            universe.offsetWidth;

        const height =
            universe.offsetHeight;


        const centerX =
            width / 2;

        const centerY =
            height / 2;


        planets.forEach((planet) => {

            if (!planet.element) return;


            /*
             * Continuous orbital movement
             */

            const angle =
                planet.startAngle +
                elapsed * planet.speed;


            /*
             * Elliptical orbit
             */

            const x =
                Math.cos(angle) *
                width *
                planet.radiusX;


            const y =
                Math.sin(angle) *
                height *
                planet.radiusY;


            /*
             * DEPTH
             *
             * sin(angle) determines whether
             * the planet is in front or behind AJ.
             */

            const depth =
                Math.sin(angle);


            /*
             * Front of orbit
             * = larger and above AJ
             *
             * Back of orbit
             * = smaller and behind AJ
             */

            const scale =
                0.82 +
                ((depth + 1) / 2) * 0.20;


            /*
             * IMPORTANT:
             *
             * Behind AJ:
             * z-index = 2
             *
             * In front of AJ:
             * z-index = 30+
             */

            let zIndex;


            if (depth < 0) {

                zIndex = 2;

            } else {

                zIndex =
                    30 +
                    Math.round(depth * 10);

            }


            /*
             * Smoothly fade planets slightly
             * when travelling behind AJ.
             */

            const opacity =
                depth < -0.65
                    ? 0.72
                    : 1;


            planet.element.style.transform =
                `translate3d(
                    ${x}px,
                    ${y}px,
                    0
                ) scale(${scale})`;


            planet.element.style.zIndex =
                zIndex;


            planet.element.style.opacity =
                opacity;


            /*
             * Slight brightness/depth effect
             */

            if (depth < 0) {

                planet.element.style.filter =
                    "brightness(.78)";

            } else {

                planet.element.style.filter =
                    "brightness(1)";

            }

        });


        /*
         * AJ MUST remain between
         * front and back planets.
         */

        core.style.zIndex = "15";


        requestAnimationFrame(
            animateSolarSystem
        );

    }


    requestAnimationFrame(
        animateSolarSystem
    );

})();
/* =========================================================
   FINAL SOLAR SYSTEM REVOLUTION
   Planets move BEHIND and IN FRONT of AJ
========================================================= */

(() => {

    const universe =
        document.querySelector(".about-universe");

    const core =
        document.querySelector(".about-core");

    if (!universe || !core) return;


    const planets = [

        {
            el:
                document.querySelector(".planet-home"),

            rx: .39,
            ry: .235,

            angle: Math.PI * .95,

            speed: .000052
        },

        {
            el:
                document.querySelector(".planet-about"),

            rx: .30,
            ry: .175,

            angle: Math.PI * 1.68,

            speed: .000068
        },

        {
            el:
                document.querySelector(".planet-experience"),

            rx: .43,
            ry: .255,

            angle: Math.PI * .08,

            speed: .000047
        },

        {
            el:
                document.querySelector(".planet-skills"),

            rx: .48,
            ry: .295,

            angle: Math.PI * .63,

            speed: .000041
        },

        {
            el:
                document.querySelector(".planet-project"),

            rx: .36,
            ry: .215,

            angle: Math.PI * 1.05,

            speed: .000057
        },

        {
            el:
                document.querySelector(".planet-contact"),

            rx: .46,
            ry: .285,

            angle: Math.PI * 1.45,

            speed: .000049
        }

    ];


    const start =
        performance.now();


    function animate(time) {

        const elapsed =
            time - start;


        const width =
            universe.clientWidth;

        const height =
            universe.clientHeight;


        planets.forEach((planet) => {

            if (!planet.el) return;


            /*
             * Current orbital angle
             */

            const angle =
                planet.angle +
                elapsed * planet.speed;


            /*
             * Elliptical movement
             */

            const x =
                Math.cos(angle) *
                width *
                planet.rx;


            const y =
                Math.sin(angle) *
                height *
                planet.ry;


            /*
             * DEPTH
             *
             * Negative = behind AJ
             * Positive = in front of AJ
             */

            const depth =
                Math.sin(angle);


            /*
             * Perspective size
             */

            const scale =
                .82 +
                ((depth + 1) / 2) * .18;


            /*
             * Behind AJ:
             *
             *   z-index 5
             *
             * AJ:
             *
             *   z-index 15
             *
             * Front:
             *
             *   z-index 30+
             */

            let z;


            if (depth < 0) {

                z = 5;

            } else {

                z =
                    25 +
                    Math.round(depth * 15);

            }


            /*
             * Slightly darker when
             * moving behind AJ.
             */

            const brightness =
                depth < -.35
                    ? .68 + ((depth + 1) * .18)
                    : 1;


            /*
             * Slight depth opacity
             */

            const opacity =
                depth < -.8
                    ? .72
                    : 1;


            planet.el.style.transform =
                `translate3d(
                    ${x}px,
                    ${y}px,
                    0
                )
                scale(${scale})`;


            planet.el.style.zIndex =
                z;


            planet.el.style.opacity =
                opacity;


            planet.el.style.filter =
                `brightness(${brightness})`;

        });


        /*
         * AJ stays exactly between
         * front and back planets.
         */

        core.style.zIndex =
            15;


        requestAnimationFrame(
            animate
        );

    }


    requestAnimationFrame(
        animate
    );

})();
