document.querySelector(".btnSearch").addEventListener("submit",function(event){
    event.preventDefault();
    const keyword = document.querySelector(".btnSearch").value;
    console.log(keyword)
    window.location.href="/search?keyword=" + keyword
})