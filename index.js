
if (localStorage.getItem('email')) {
    location.replace('shoppingcart.html')
}

  
const SubmitData = (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way
  
    const email = document.getElementById('exampleInputEmail1');
    const pass = document.getElementById('inputPassword6');
  
    let evalue = email.value.trim();
    let pvalue = pass.value.trim();
  localStorage.setItem('email',JSON.stringify(evalue))
  localStorage.setItem('passward',JSON.stringify(pvalue))
  location.replace('shoppingcart.html')
 
   
  
  };