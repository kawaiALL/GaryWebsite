// 合併後的智能隱藏和條件側邊欄功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 初始化頁面功能');
    
    // === 智能隱藏標籤欄 ===
    const mdTabs = document.querySelector('.md-tabs');
    if (mdTabs) {
        let isHidden = false;
        let scrollTimeout;
        
        function hideTabs() {
            if (!isHidden) {
                mdTabs.classList.add('md-tabs--hidden');
                isHidden = true;
            }
        }
        
        function showTabs() {
            if (isHidden) {
                mdTabs.classList.remove('md-tabs--hidden');
                isHidden = false;
            }
        }
        
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            if (window.scrollY > 200) hideTabs();
            else showTabs();
            scrollTimeout = setTimeout(showTabs, 800);
        });
        
        mdTabs.addEventListener('mouseenter', showTabs);
    }
    
    // === 條件性顯示導覽欄 ===
    const showSidebarPages = ['/about/', '/about/about/', '/about/testing/'];
    const currentPath = window.location.pathname;
    const shouldShowSidebar = showSidebarPages.some(path => currentPath.includes(path));
    
    if (shouldShowSidebar) {
        document.documentElement.classList.add('show-sidebar');
        console.log('✅ 導覽欄已顯示');
    } else {
        document.documentElement.classList.remove('show-sidebar');
        console.log('🚫 導覽欄已隱藏');
    }
});