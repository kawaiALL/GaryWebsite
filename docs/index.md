<div class="map-container">
    <div id="my-custom-map" style="height: 700px; width: 100%;"></div>
</div>


<script>
document.addEventListener('DOMContentLoaded', function() {
    // 初始化地圖
    var map = L.map('my-custom-map').setView([22.3193, 114.1694], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
        // 移除 opacity: 0.5 這行，恢復完全不透明
    }).addTo(map);
    
    // 添加你的自定義歷史地圖
    
    L.tileLayer('https://mapwarper.net/maps/tile/96884/{z}/{x}/{y}.png', {
        attribution: '© Map Warper',
        maxZoom: 18,
        minZoom: 10
    }).addTo(map);
    
    
    var marker1 = L.marker([22.2933, 114.1699]).addTo(map);
    marker1.bindPopup(`
        <h3>Victoria Harbour</h3>
        <p>The harbour has historically been defined by its deep, sheltered waters and strategic location on South China Sea. These factors were also instrumental in Hong Kong's establishment as a British colony in 1841 and its subsequent development as a trading hub.</p>
        <img src="../Tamar.jpg" width="200">
        <br><small><a href="/mysite/map3/more/">閱讀更多</a></small>
    `);
    
    
    var marker2 = L.marker([22.2823, 114.1583]).addTo(map);
    marker2.bindPopup(`
        <h3>Central</h3>
        <p>Central (Chinese: 中環), also known as Central District, is the central business district of Hong Kong. It is located in the northeastern corner of the Central and Western District, on the north shore of Hong Kong Island, across Victoria Harbour from Tsim Sha Tsui, the southernmost point of Kowloon Peninsula. The area was the heart of Victoria City, although that name is rarely used today.As the central business district of Hong Kong, it is the area where many multinational financial services corporations have their headquarters. Consulates of many countries are also located in this area, as is Government Hill, the site of the government headquarters until 2011. The area, with its proximity to Victoria Harbour, has served as the centre of trade and financial activities from the earliest days of the British colonial era in 1841, and continues to flourish and serve as the place of administration since the handover to China in 1997.</p>
        <ul>
            <li>歷史事件一</li>
            <li>歷史事件二</li>
        </ul>
    `);
    
    // 5. 添加第三個標記點（尖沙咀示例）
    var marker3 = L.marker([22.2974, 114.1722]).addTo(map);
    marker3.bindPopup(`
        <h3>Tsim Sha Tsui</h3>
        <p>often abbreviated as TST, is an area in southern Kowloon, Hong Kong. The area is administratively part of the Yau Tsim Mong District.</p>
    `);

    var marker4 = L.marker([22.41956114292878, 114.2033541327952]).addTo(map);
    marker4.bindPopup(`
        <h3>Fung King-Hey Building</h3>
        <p>Department of History, The Chinese University of Hong Kong.</p>
        <a href="https://www.history.cuhk.edu.hk/" target="_blank">More information</a>
    `);
    
    // 6. 自動打開第一個標記的彈窗
    //marker4.openPopup();
});
</script>

