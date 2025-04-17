// Sidebar Toggle for Mobile Responsiveness
const sidebarToggle = document.querySelector('#sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Search Filter for Tables
function searchTable(tableId, inputId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toUpperCase();
    const table = document.getElementById(tableId);
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td');
        let match = false;

        // Loop through each cell in the row
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                const cellValue = td[j].textContent || td[j].innerText;
                if (cellValue.toUpperCase().indexOf(filter) > -1) {
                    match = true;
                }
            }
        }

        if (match) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Event listeners for search functionality (can be applied to each table)
document.getElementById('search-blog').addEventListener('keyup', () => {
    searchTable('blog-table', 'search-blog');
});

document.getElementById('search-user').addEventListener('keyup', () => {
    searchTable('user-table', 'search-user');
});
