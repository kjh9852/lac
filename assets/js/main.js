(() => {
    let yOffset = 0;
    const header = document.querySelector('header');
    const container = document.querySelector('#container');
    const gloNav = $('.glo_nav > ul > li');
    const mgloNav = $('.mglo_nav > ul > li');
    let wWidth = window.innerWidth;
    const sec01 = document.querySelector('.buy_nft');
    const sec03 = document.querySelector('.loadmap_wrap');
    const sec02 = document.querySelector('.team_setcion');
    const buy = document.querySelectorAll('.buy');
    const team = document.querySelectorAll('.team');
    const loadmap = document.querySelectorAll('.loadmap_btn');

    const loadmapList = document.querySelectorAll('.loadmap_list > div');
    const mloadmapList = document.querySelectorAll('.mobile.loadmap_list > div');

    const title = document.querySelector('.filter_title');
    const filterBox = document.querySelector('.filter_box');
    const gallery = document.querySelector('.gallery');

    let mobile = (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);

    function hexaMouse(index) {
        if (mobile) {
            for (let i = 0; i < index.length; i++) {
                index[i].addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    let target = e.target;
                    for (let j = 0; j < index.length; j++) {
                        index[j].classList.remove('active');
                        console.log("삭제")
                    }
                    if (target.classList.contains('active')) {
                        target.classList.remove('active');
                        console.log("타겟삭제")
                    } else {
                        target.classList.add('active');
                        console.log("타겟추가")
                    }
                    console.log("추가")
                });
            }
        }
        for (let i = 0; i < index.length; i++) {
            index[i].addEventListener('click', (e) => {
                e.preventDefault();
                let target = e.target;
                for (let j = 0; j < index.length; j++) {
                    index[j].classList.remove('active');
                    console.log("삭제")
                }
                if (target.classList.contains('active')) {
                    target.classList.remove('active');
                    console.log("타겟삭제")
                } else {
                    target.classList.add('active');
                    console.log("타겟추가")
                }
                console.log("추가")
            });
            if (!mobile) {
                index[i].addEventListener('mouseover', (e) => {
                    let targetCss = getComputedStyle(index[i]).getPropertyValue("transform");
                    let childCss = getComputedStyle(index[i].children[1]).getPropertyValue("transform");
                    let scale = 1.1;
                    const matrix = targetCss;
                    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

                    console.log(matrixValues[4]);
                    index[i].style.transform = `translate(${matrixValues[4] + "px"}) scale(${scale})`;
                    index[i].classList.add('hover');

                });

                index[i].addEventListener('mouseleave', (e) => {
                    let targetCss = getComputedStyle(index[i]).getPropertyValue("transform");
                    let scale = 1;
                    const matrix = targetCss;
                    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
                    console.log(matrixValues[4]);;
                    index[i].style.transform = `translate(${matrixValues[4] + "px"}) scale(${scale})`;
                    index[i].classList.remove('hover');
                });
            }
        }
    }

    function Fadein(index) {
        scrollTo(0, 0);
        index.classList.add('active');
    }

    $('.mobile_btn').click(function () {
        $('.mglo_nav').slideToggle();
    });

    function scrollSmooth() {
        buy.forEach(i => {
            i.addEventListener('click', (e) => {
                e.preventDefault();
                const sec01Offset = sec01.offsetTop - 200;
                scrollTo({
                    top: `${sec01Offset}`,
                    left: 0,
                    behavior: 'smooth'
                });
            });
        });

        team.forEach(i => {
            i.addEventListener('click', (e) => {
                e.preventDefault();
                const sec02Offset = sec02.offsetTop;
                scrollTo({
                    top: `${sec02Offset}`,
                    left: 0,
                    behavior: 'smooth'
                });
            });
        });
        loadmap.forEach(i => {
            i.addEventListener('click', (e) => {
                e.preventDefault();
                const sec03Offset = sec03.offsetTop;
                console.log(sec03Offset);
                scrollTo({
                    top: `${sec03Offset}`,
                    left: 0,
                    behavior: 'smooth'
                });
            });
        });
    };

    window.addEventListener('load', () => {
        if (container) {
            Fadein(container);
        }
        if (title) {
            Fadein(title)
        }
        if (filterBox) {
            Fadein(filterBox)
        }
        if (gallery) {
            Fadein(gallery)
        }
        if (Fadein) {
            setTimeout(() => {
                document.querySelector('html').scrollTop = 0;
            }, 10);
        }
        let page_url = window.location.href;
        let page_id = page_url.substring(page_url.lastIndexOf('#') + 1);

        if (page_id == 'nft') {
            $('html, body').animate({
                scrollTop: $('#' + page_id).offset().top
            }, 500);
        }
        else if (page_id == 'team') {
            $('html, body').animate({
                scrollTop: $('#' + page_id).offset().top
            }, 500);
        }
        else if (page_id == "loadmap") {
            $('html, body').animate({
                scrollTop: $('#' + page_id).offset().top
            }, 500);
        }
        scrollSmooth();
        hexaMouse(loadmapList);
        hexaMouse(mloadmapList);
    });

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

})();