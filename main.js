const searchButton = document.getElementById('searchButton')
searchButton.addEventListener('click', async () => {
    const term = document.getElementById('term').value
    const response = await fetch(`https://indsto.onrender.com/search?term=${term}`)
    const stores = await response.json()
    const resultDiv = document.getElementById('result')
    resultDiv.innerHTML = stores.map(store => {
        console.log(stores.length)
        return `
     <table>
        <thead>
            <tr>
                <th>StoreNumber</th>
                <th>Brand</th>
                <th>LeadershipTeamEmail</th>
                <th>StoreName</th>
                <th>Address</th>
                <th>City</th>
                <th>Phone</th>
                <th>Provance</th>
                <th>PostalCode</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="copy" data-clipboard-text="${store.StoreNumber}">${store.StoreNumber}</td>
                <td class="copy" data-clipboard-text="${store.Brand}">${store.Brand}</td>
                <td class="copy" data-clipboard-text="${store.LeadershipTeamEemail}">${store.LeadershipTeamEemail}</td>
                <td class="copy" data-clipboard-text="${store.Phone}">${store.Phone}</td>

                <td class="copy" data-clipboard-text="${store.StoreName}">${store.StoreName}</td>
                <td class="copy" data-clipboard-text="${store.Address}">${store.Address}</td>
                <td class="copy" data-clipboard-text="${store.City}">${store.City}</td>
                <td class="copy" data-clipboard-text="${store.Provance}">${store.Provance}</td>
                <td class="copy" data-clipboard-text="${store.PostalCode}">${store.PostalCode}</td>
            </tr>
        </tbody>
    </table> 
    `
    }).join('')
});
const copyButtons = document.querySelectorAll('.copy');
const copyIcon = document.querySelector('.copy-icon');
copyIcon.addEventListener('click', (e) => {
    const itemData = e.target.closest('.copy').dataset.clipboardText;
    navigator.clipboard.writeText(itemData);
    copyButtons.classList.add('copied');
});


