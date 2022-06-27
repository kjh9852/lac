(() => {

    const door = document.querySelector('.door.on');
    const neonTitle = document.querySelector('.title_neon');
    const neon = document.querySelector('.neon');

    door.addEventListener('mouseenter', () => {
        neon.classList.add('on');
        neonTitle.classList.add('on');
    });
    door.addEventListener('mouseleave', () => {
        neon.classList.remove('on');
        neonTitle.classList.remove('on');
    });
})();