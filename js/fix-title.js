// 阻止Material主题更新标题
document.addEventListener('DOMContentLoaded', function() {
    // 保存原始标题
    const originalTitle = 'Historical Hong Kong: Maritime Lens';
    
    // 重写可能修改标题的函数
    const originalPushState = history.pushState;
    history.pushState = function() {
        originalPushState.apply(this, arguments);
        // 强制恢复标题
        setTimeout(restoreTitle, 100);
    };
    
    function restoreTitle() {
        const titleElements = document.querySelectorAll('.md-header__topic, .md-header__ellipsis');
        titleElements.forEach(el => {
            if (el.textContent !== originalTitle) {
                el.textContent = originalTitle;
                el.innerHTML = `<span class="md-ellipsis">${originalTitle}</span>`;
            }
        });
    }
    
    // 初始设置
    restoreTitle();
    
    // 监听所有变化
    new MutationObserver(restoreTitle).observe(document.body, {
        childList: true,
        subtree: true
    });
});