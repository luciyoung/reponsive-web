// 导航什么时候固定
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop")


window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;

    if (window.pageYOffset - height > 800) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky");
    }

    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = "block"
    } else {
        scrollToTop.style.display = "none"
    }
})

// 选取 glide 的 div 作为轮播组件
const glide = new Glide(".glide")

const captionsEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
    // 获取轮播下标
    const caption = captionsEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1], //透明度
        duration: 400, //时间
        easing: "linear", //线性
        delay: anime.stagger(400, {
            start: 300
        }),
        translateY: [anime.stagger([40, 10]), 0]
    })
})

glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach(el => {
        el.style.opacity = 0;
    })
})

// 加载轮播组件
glide.mount()


// 初始化

const isotope = new Isotope(".cases", {
    // 模式
    layoutMode: "fitRows",
    // 盒子
    itemSelector: ".case-item"
})

// js 事件向上有个传播
const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
    let {
        target
    } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({
            filter: filterOption
        });
    }
});



// 滑动动画

// 通用配置项

const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};

ScrollReveal().reveal(".feature", {
    ...staggeringOption,
    interval: 300
});
ScrollReveal().reveal(".service-item", {
    ...staggeringOption,
    interval: 300
});

const dataSectionEl = document.querySelector(".data-section");


ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0, el.innerHTML];
            },
            duration: 2000,
            round: 1,
            easing: "easeInExpo"
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;

    }
});

window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
    }
});

// 菜单点击滑动
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: "header",
    // 滚动到这里 后多余向下滚动80像素
    offset: 80,
})

const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach(exploreBtnEl => {
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    })
})