
document.addEventListener('DOMContentLoaded', () => {
    new Splide('.bestSeller', {
        perPage: 2.5,
        perMove: 1,
        gap: '10px',
        pagination: false,
        autoplay: true,
    }).mount();

    document.querySelectorAll('.megaMenu').forEach((element) => {
        new Splide(element, {
            perPage: 4,
            perMove: 1,
            gap: '14px',
            pagination: false,
            autoplay: true,
            breakpoints: {
                1024: {
                    perPage: 2.5,
                    gap: '10px',
                },
            },
        }).mount();
    });

    // close notification bar

    const notiClose = document.querySelector('.btn-close')

    const closeNotification = () => {
        notiClose.addEventListener('click', () => {
            document.querySelector('.notification-bar').classList.add('.close')
        })
    }

    // Open submenu
    const menuItems = document.querySelectorAll('.menu_item.has-sub-menu');

    const openSubmenu = () => {
        menuItems.forEach(menuItem => {
            menuItem.addEventListener('click', (event) => {
                event.stopPropagation();
                const submenu = menuItem.querySelector('.sub-menu');
                if (submenu) {
                    menuItems.forEach(item => {
                        if (item !== menuItem) {
                            item.classList.remove('sub-menu-active');
                        }
                    });

                    menuItem.classList.toggle('sub-menu-active');
                }
            });
        });
    };
    openSubmenu();

    menuItems.forEach(menuItem => {
        const submenu = menuItem.querySelector('.sub-menu');
        if (submenu) {
            submenu.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
    });


    const closeSubmenuOnClickOutside = () => {
        document.addEventListener('click', () => {
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('sub-menu-active');
            });
        });
    };


    closeSubmenuOnClickOutside();


    if (window.innerWidth < 1025) {
        // mobile menu toggle

        const menuButton = document.querySelector('.toggle-menu')
        const menu = document.querySelector('.header-menu')

        const toggleMenu = () => {
            menuButton.addEventListener('click', () => {
                menu.classList.toggle('open');
                menuButton.classList.toggle('close');
            })
        }
        toggleMenu();

        // Open back
        const backMenus = document.querySelectorAll('.sub-menu_back');

        const backMenu = () => {
            backMenus.forEach(backMenu => {
                backMenu.addEventListener('click', (event) => {
                    event.stopPropagation();
                    menuItems.forEach(menuItem => {
                        if (menuItem.classList.contains('sub-menu-active')) {
                            menuItem.classList.remove('sub-menu-active');
                        }
                    });
                    console.log('back button click');
                });
            });
        };

        backMenu();
    }

    // slider 

    const splide = new Splide('#main-carousel', {
        pagination: false,
        arrows: false,
        autoplay: true,
    });

    const thumbnails = document.getElementsByClassName('thumbnail');
    let current;

    for (let i = 0; i < thumbnails.length; i++) {
        initThumbnail(thumbnails[i], i);
    }

    function initThumbnail(thumbnail, index) {
        thumbnail.addEventListener('click', function () {
            splide.go(index);
            console.log('click');
        });
    }

    splide.on('mounted move', function () {
        const thumbnail = thumbnails[splide.index];

        if (thumbnail) {
            if (current) {
                current.classList.remove('is-active');
            }

            thumbnail.classList.add('is-active');
            current = thumbnail;
        }
    });

    splide.mount();

});