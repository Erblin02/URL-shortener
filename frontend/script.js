// Function to add a shortened URL with a delete button to the list
function addUrlToList(shortenedUrl, shortCode) {
    const urlList = document.getElementById('url-list');
    const listItem = document.createElement('li');
  
    listItem.id = `url-${shortCode}`;
    listItem.innerHTML = `
      <a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a>
      <button onclick="deleteUrl('${shortCode}')">Delete</button>
    `;
  
    urlList.appendChild(listItem);
  }
  
  // Function to delete a URL and remove it from the list
  async function deleteUrl(shortCode) {
    try {
      const response = await fetch(`http://localhost:3001/delete/${shortCode}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message); 
  
        const listItem = document.getElementById(`url-${shortCode}`);
        if (listItem) {
          listItem.remove(); 
        }
      } else {
        alert(result.error || 'Failed to delete URL');
      }
    } catch (error) {
      console.error('Error deleting URL:', error);
      alert('Failed to delete the URL. Please try again.');
    }
  }
  
  // Function to handle the shortening of the URL
  document.getElementById('shorten-btn').addEventListener('click', async () => {
    const originalUrl = document.getElementById('url-input').value;
    const expirationTime = document.getElementById('expiration-select').value;
  
    if (!originalUrl) {
      alert('Please enter a URL.');
      return;
    }
  
    if (!expirationTime) {
      alert('Please select an expiration time.');
      return;
    }
  
    const data = {
      original_url: originalUrl,
      expiration_time: expirationTime,
    };
  
    try {
      const response = await fetch('http://localhost:3001/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Add the shortened URL to the list with a delete button
        addUrlToList(result.shortened_url, result.short_code);
      } else {
        alert(result.error || 'Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      alert('Failed to shorten the URL. Please try again.');
    }
  });
  