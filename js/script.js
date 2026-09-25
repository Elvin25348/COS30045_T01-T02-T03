function swapPage(targetPageId) {
    // 1. 隱藏所有的頁面內容區塊
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    // 2. 移除導覽列所有按鈕的高亮 (active) 狀態
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.classList.remove('active-link');
    });

    // 3. 顯示用戶點擊的目標頁面
    document.getElementById(targetPageId).classList.add('active-page');

    // 4. 將導覽列對應的按鈕加上高亮狀態
    document.getElementById('link-' + targetPageId).classList.add('active-link');
}