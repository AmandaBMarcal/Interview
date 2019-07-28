var star = document.getElementsByClassName("fa-star")
var trash = document.getElementsByClassName("fas fa-trash-alt");

// Star
Array.from(star).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const favorite = this.classList.contains("far")
        console.log(favorite);
        fetch('favorite', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'favorite': favorite
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          // console.log(data)
          window.location.reload(true)    //this reloads the whole page
        })
      });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
