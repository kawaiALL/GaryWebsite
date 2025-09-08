

// 智能隱藏標籤欄 - 使用這個版本
document.addEventListener('DOMContentLoaded', function() {
    const mdTabs = document.querySelector('.md-tabs');
    const mdHeader = document.querySelector('.md-header');
    let scrollTimeout;
    
    if (!mdTabs) return;
    
    function hideTabs() {
        mdTabs.classList.add('md-tabs--hidden');
    }
    
    function showTabs() {
        mdTabs.classList.remove('md-tabs--hidden');
    }
    
    // 滾動事件
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        if (window.scrollY > 100) {
            hideTabs();
        } else {
            showTabs();
        }
        
        // 滾動停止後顯示
        scrollTimeout = setTimeout(showTabs, 1500);
    });
    
    // 鼠標懸停顯示
    mdHeader.addEventListener('mouseenter', showTabs);
    mdTabs.addEventListener('mouseenter', showTabs);
    
    // 鼠標離開後延遲隱藏
    mdTabs.addEventListener('mouseleave', function() {
        if (window.scrollY > 100) {
            setTimeout(hideTabs, 1000);
        }
    });
    
});