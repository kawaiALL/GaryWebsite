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

let calibrationMode = false;
const referencePoints = [];

function enableCalibration() {
    calibrationMode = true;
    console.log('🎯 校準模式啟用：點擊地圖添加參考點');
    alert('校準模式已啟用！請先點擊歷史地圖上的位置，然後點擊現代地圖上的對應位置。');
    map.on('click', handleCalibrationClick);
}

function handleCalibrationClick(e) {
    if (!calibrationMode) return;
    
    const point = {
        latlng: e.latlng,
        type: referencePoints.length % 2 === 0 ? 'historical' : 'modern'
    };
    
    referencePoints.push(point);
    
    // 添加標記（使用顏色區分）
    const marker = L.marker(e.latlng, {
        icon: L.divIcon({
            className: point.type === 'historical' ? 'historical-marker' : 'modern-marker',
            html: `<div style="background: ${point.type === 'historical' ? '#ff4444' : '#44ff44'}; 
                             width: 12px; height: 12px; border-radius: 50%; 
                             border: 2px solid white;"></div>`,
            iconSize: [16, 16]
        })
    }).addTo(map);
    
    marker.bindPopup(`參考點 ${referencePoints.length}:<br>${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}<br>類型: ${point.type}`)
          .openPopup();
    
    console.log(`📍 ${point.type} 參考點 ${Math.ceil(referencePoints.length/2)}:`, e.latlng);
    
    // 每收集一對點就進行計算
    if (referencePoints.length % 2 === 0 && referencePoints.length >= 2) {
        calculateTransformation();
    }
}

function calculateTransformation() {
    const pairs = [];
    for (let i = 0; i < referencePoints.length; i += 2) {
        if (i + 1 < referencePoints.length) {
            pairs.push({
                historical: referencePoints[i].latlng,
                modern: referencePoints[i + 1].latlng
            });
        }
    }
    
    console.log('📐 計算轉換參數:', pairs);
    // 這裡可以實現坐標轉換算法
}

function addVisitCounter() {
    const counterHtml = `
        <div class="visit-counter">
            <img src="https://visitor-badge.laobi.icu/badge?page_id=kawaiALL.GaryWebsite
          &left_color=%23A7D4FA
          &right_color=%231B7CCF
          &left_text_color=%23000000"> 
        </div>
    `;
    
    // 嘗試添加到導航欄內部
    const headerInner = document.querySelector('.md-header__inner');
    if (headerInner) {
        headerInner.insertAdjacentHTML('beforeend', counterHtml);
        console.log('✅ 訪問計數器已添加到導航欄');
    } else {
        console.log('❌ 未找到導航欄容器');
    }
}

// 頁面加載後執行
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addVisitCounter, 100); // 稍延遲確保 DOM 加載完成
});