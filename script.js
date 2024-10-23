document.addEventListener('DOMContentLoaded', () => {
    const url ='https://newsdata.io/api/1/news?apikey=pub_56528e266206da0c710f706965a151404beb7&q=business ';
    const apiKey = 'pub_56528e266206da0c710f706965a151404beb7';

    //Fetching the Url
    fetch(url)
      .then(response => {
        console.log('Raw response object:', response);  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Parsed JSON data:', data);  
        console.log('Articles array:', data.articles);  
        displayArticles(data.articles);  
      })
    
    // Function to dynamically create and display the articles
    function displayArticles(articles) {
      const newsContainer = document.getElementById('main-feed');  
      
      articles.forEach(article => {
        console.log('Article:', article);
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('feed-card');
        const title = document.createElement('h2');
        const truncatedTitle = article.title.length 
        > 30? article.title.slice(0, 30) + "....": article.title;
          title.textContent = truncatedTitle;
        console.log('Title:', article.title);  
        const img = document.createElement('img');
        img.src = article.urlToImage || 'default-image.jpg';  
        img.alt = article.title;
        img.height = 600;
        img.width = 400; 
        console.log('Image URL:', img.src);  
        const description = document.createElement('p');
        description.textContent = article.description || 'No description available';
        console.log('Description:', article.description); 
        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Read more';
        link.target = '_blank'; 
        console.log('Article link:', article.url);  
    
        // Append the elements to the article div
        articleDiv.appendChild(img);
        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.addEventListener("click", () => {
          window.open(link, "_blank");
        });
         newsContainer.appendChild(articleDiv);
      }); 
    
      console.log('Articles rendered successfully!');  
    }; 
    
    //Search box event listener
    searchButton.addEventListener('click', async () => {
      const query = searchBox.value.trim()
      if(query !== ""){
        try{
          const articles = await fetchNewsQuery(query)
          displayArticles(articles)
        }catch(error){
          console.log("Error fetching news by query", error)
        }
      }
    })
    
    function fetchNewsQuery(query){
     query(url)
      .then(response => {
        console.log('Raw response object:', response);
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Passed JSON data', data);
        console.log('Articles array', data.articles);
        displayArticles(data.articles);
      })
    }
});