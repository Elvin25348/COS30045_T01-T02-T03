function loadPage(event, url, linkId) {
    // 阻止瀏覽器預設的跳轉頁面行為
    event.preventDefault();

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('無法載入頁面');
            return response.text();
        })
        .then(html => {
            // 解析抓取到的完整 HTML 字串
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 提取目標頁面 <main> 裡面的內容，並替換當前頁面的 <main>
            const newMainContent = doc.querySelector('main').innerHTML;
            document.querySelector('main').innerHTML = newMainContent;

            // 清除所有導覽列按鈕的高亮狀態
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active-link');
            });

            // 為當前點擊的按鈕加上高亮狀態
            document.getElementById(linkId).classList.add('active-link');
            
            // 可選：更新瀏覽器的網址列，讓使用者感覺真的切換了頁面
            window.history.pushState({}, '', url);
        })
        .catch(error => console.error('Fetch 錯誤:', error));
}