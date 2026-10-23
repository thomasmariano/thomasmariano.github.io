const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#primary-navigation');

if (menuButton && navigation) {
    const mobileViewport = window.matchMedia('(max-width: 900px)');
    const setExpanded = (expanded) => {
        menuButton.setAttribute('aria-expanded', String(expanded));
        menuButton.setAttribute('aria-label', expanded ? 'Close navigation menu' : 'Open navigation menu');
        navigation.hidden = mobileViewport.matches && !expanded;
    };
    const syncMenu = () => {
        menuButton.hidden = !mobileViewport.matches;
        setExpanded(false);
    };
    menuButton.addEventListener('click', () => {
        setExpanded(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileViewport.matches && menuButton.getAttribute('aria-expanded') === 'true') {
            setExpanded(false);
            menuButton.focus();
        }
    });
    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a') && mobileViewport.matches) setExpanded(false);
    });
    document.addEventListener('click', (event) => {
        if (mobileViewport.matches && !event.target.closest('.nav-container')) {
            setExpanded(false);
        }
    });
    mobileViewport.addEventListener('change', syncMenu);
    syncMenu();
}
