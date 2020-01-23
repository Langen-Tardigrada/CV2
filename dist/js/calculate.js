console.log('ffff')
let n = Math.floor(Math.random()*100+1);

console.log(`${n}`);
var count = 0;
var check = true;
document.querySelector('button.input').addEventListener('click', function(e) {       
    console.log(5);    
    e.preventDefault();
    document.querySelector('.hidejs').style.visibility = 'visible';
    let data = document.getElementById('number').value;   
    document.getElementById('number').value = '';
    let pre = document.querySelector('.previous');
    let ans = document.querySelector('.result');
    let hint = document.querySelector('.hint');
    if(data == n){
        pre.style.visibility = 'visible';
        pre.textContent += " " + `${data}`;
        ans.innerHTML = "&emsp;Congratulations! You got it right!";
        ans.style.backgroundColor = 'olivedrab';
        hint.innerHTML = "";
        document.querySelector('button.new').style.visibility = 'visible';
        document.querySelector('button.new').addEventListener('click', ()=>{
            location.reload();
        });
        document.getElementById('number').disabled = true;
        return;// i want to exit from this function that user can't input. But i can't do this. Why?
    }else{
        pre.style.visibility = 'visible';
        pre.textContent += " " + `${data}`;
        ans.innerHTML = "&emsp;Wrong!";
        ans.style.backgroundColor = 'lightcoral';
        if(data>n){
            hint.innerHTML = "Last guess was too high!";
        }else{
            hint.innerHTML = "Last guess was too less!";
        }
        document.guess.focus();
    }
    if(count >= 9){
        ans.innerHTML = "GAME OVER!!!";
        document.querySelector('button.new').style.visibility = 'visible';
        document.querySelector('button.new').addEventListener('click', ()=>{
            location.reload();
        });
        document.getElementById('number').disabled = true;
        return;// i want to exit from this function that user can't input. But i can't do this. Why? : Cause User answers it again. Right?
    }
    count++;
});           















