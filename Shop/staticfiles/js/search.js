document.addEventListener("DOMContentLoaded", function (){
    const formSearch = document.querySelector(".formSearch")
    if(formSearch){
        formSearch.addEventListener("submit", function (event) {
            event.preventDefault();
            const keyword = formSearch.querySelector(".inputSearch").value.trim();
            
            if (keyword !== "") {
                window.location.href = "/search?keyword=" + keyword;
                console.log(keyword)
            }
        });
    }
})