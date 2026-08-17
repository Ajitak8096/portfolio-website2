/* =========================================================
   CUSTOM CIRCLE CURSOR
========================================================= */

const cursorDot =
    document.querySelector('.cursor-dot');

const cursorCircle =
    document.querySelector('.cursor-circle');


const isTouchDevice =
    window.matchMedia(
        '(hover: none), (pointer: coarse)'
    ).matches;


if (
    cursorDot &&
    cursorCircle &&
    !isTouchDevice
) {

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let circleX = mouseX;
    let circleY = mouseY;


    document.addEventListener(
        'mousemove',
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;


            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        circleX +=
            (mouseX - circleX) * 0.12;

        circleY +=
            (mouseY - circleY) * 0.12;


        cursorCircle.style.left =
            `${circleX}px`;

        cursorCircle.style.top =
            `${circleY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const cursorTargets =
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


    cursorTargets.forEach(
        element => {

            element.addEventListener(
                'mouseenter',
                () => {

                    cursorCircle.classList.add(
                        'hover'
                    );

                    cursorDot.classList.add(
                        'hover'
                    );

                }
            );


            element.addEventListener(
                'mouseleave',
                () => {

                    cursorCircle.classList.remove(
                        'hover'
                    );

                    cursorDot.classList.remove(
                        'hover'
                    );

                }
            );

        }
    );


    document.addEventListener(
        'mouseleave',
        () => {

            cursorCircle.style.opacity = '0';

            cursorDot.style.opacity = '0';

        }
    );


    document.addEventListener(
        'mouseenter',
        () => {

            cursorCircle.style.opacity = '1';

            cursorDot.style.opacity = '1';

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
