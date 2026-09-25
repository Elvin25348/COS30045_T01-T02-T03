function loadPage(event, url, linkId) {
    // Prevent the browser's default page navigation behavior
    event.preventDefault();

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load page');
            return response.text();
        })
        .then(html => {
            // Parse the fetched complete HTML string
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract the content inside the target page's <main> and replace the current page's <main>
            const newMainContent = doc.querySelector('main').innerHTML;
            document.querySelector('main').innerHTML = newMainContent;

            // Remove the active highlight state from all navigation links
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active-link');
            });

            // Add the active highlight state to the currently clicked button
            document.getElementById(linkId).classList.add('active-link');
            
            // Optional: Update the browser's URL bar so the user feels like the page actually changed
            window.history.pushState({}, '', url);
        })
        .catch(error => console.error('Fetch error:', error));
}