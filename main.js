function connect() {
    var searchTerm = document.getElementById("searchBox").value;
    document.getElementById("searchBox").value = "";
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => display(data.meals));
}

function display(items) {
    var container = document.getElementById("container");
    container.innerHTML = ""; 

    if (!items) {
        container.innerHTML = "<p>No results found</p>";
        return;
    }

    var limit = Math.min(items.length, 5); 

    for (var i = 0; i < limit; i++) {
        var newDiv = createMealCard(items[i]);
        container.appendChild(newDiv);
    }

    if (items.length > 5) {
    
        var showAllButton = document.createElement("button");
        showAllButton.textContent = "SHOW ALL";
        showAllButton.classList.add("showAllButton");
        showAllButton.addEventListener("click", function() {
            for (var i = 5; i < items.length; i++) {
                var newDiv = createMealCard(items[i]);
                container.appendChild(newDiv);
            }
            showAllButton.style.display = "none"; 
        });
        var buttonContainer = document.createElement("div");
        buttonContainer.style.textAlign = "center";
        buttonContainer.appendChild(showAllButton);
        container.appendChild(buttonContainer);
    }
    
    

    document.getElementById("mainImage").style.visibility = "hidden";
}