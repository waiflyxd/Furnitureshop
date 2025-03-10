let btnagree = document.querySelectorAll('.agreebtn');
let input = document.querySelectorAll('.inputinfo');
btnagree.forEach(button => {

    button.addEventListener('click', (event) => {
        input.forEach(input => {
            if(button.dataset.id == input.dataset.id){
                button.disabled = 'true'; 
                input.disabled = 'true'; 
                button.style.background = 'gray'; 
            }
            
        })
        
    });
});