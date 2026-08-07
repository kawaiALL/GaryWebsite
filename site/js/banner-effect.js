// banner-effect.js - 安全版本
(function() {
    console.log('🔍 Banner 脚本加载');
    
    // 等待页面完全加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
    function init() {
        console.log('🚀 初始化 Banner');
        
        try {
            // 1. 先创建 Banner
            createBanner();
            
            // 2. 等待一下再设置事件
            setTimeout(setupEvents, 200);
            
            console.log('✅ Banner 初始化完成');
        } catch (error) {
            console.error('❌ Banner 初始化失败:', error);
        }
    }
    
    function createBanner() {
        // 如果已经存在，跳过
        if (document.querySelector('.site-header')) {
            return;
        }
        
        const banner = document.createElement('header');
        banner.className = 'site-header';
        banner.innerHTML = `
            <div class="header-bg"></div>
            <div class="header-overlay"></div>
            <nav class="fixed-nav" id="mainNav">
                <a href="https://kawaiall.github.io/GaryWebsite/" class="nav-title">Historical Hong Kong</a>
                <div class="nav-links">
                    <a href="https://kawaiall.github.io/GaryWebsite/" class="nav-link">Home</a>
                    <a href="https://kawaiall.github.io/GaryWebsite/about/about/" class="nav-link">About</a>
                    <a href="#map" class="nav-link">Map</a>
                </div>
            </nav>
            <div class="banner-content">
                <h1 class="banner-title">Historical Hong Kong</h1>
                <p class="banner-subtitle">Maritime Lens</p>
            </div>
        `;
        
        // 插入到页面开头
        document.body.insertBefore(banner, document.body.firstChild);
    }
    
    function setupEvents() {
        const nav = document.getElementById('mainNav');
        if (!nav) return;
        
        // 简单的滚动效果
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY > 20;
            nav.classList.toggle('scrolled', scrolled);
        });
    }
})();