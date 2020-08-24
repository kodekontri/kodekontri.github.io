var num_buttons = document.querySelectorAll('.btn-num');
var opr_buttons = document.querySelectorAll('.btn-opr');
var func_buttons = document.querySelectorAll('.btn-func');
var screen = document.getElementById('screen')
var init_num;
var operator;
var has_operator = false;
var screenLimit = 9;


//event listeners for number buttons
for(button of num_buttons){
    button.addEventListener('click',function(){
        output(this.textContent)
    })
}

//event listeners for operator buttons
for(button of opr_buttons){
    button.addEventListener('click',function(){
        has_operator = true;
        if(this.textContent == '='){
            var answer =  String(calculate());
            if(answer.length > screenLimit){
                answer = answer.slice(0,screenLimit+1);
            }
            output(answer); 
            return;
        }
        init_num = screen.textContent
        operator = this.textContent;
    })
}


//event listeners for function buttons
for(button of func_buttons){
    button.addEventListener('click',function(){
       if(this.textContent == '<'){
            screen.textContent = screen.textContent.slice(0,-1)
            if(screen.textContent == ''){
                output(0)
            }
       }

       if(this.textContent == 'C'){
            reset()
        }
    })
}


// Functions

// output to screen
function output(value){
    // Check for NAN value
    if(value === 'NaN'){
        screen.style.border = '4px solid red';
        setTimeout(function(){
            screen.style.border = '';
        }, 2000);
        return;
    }
    //check screen limit
    if(screen.textContent.length > screenLimit){return;}

    //check if screen is zero or operator is press to output a fresh value
    if(screen.textContent == '0' || has_operator){
        //Check for dot
        if(value == '.'){
            screen.textContent = '0'+value;
            return
        }
        screen.textContent = value;
    }else{
        //Check for dot
        if(screen.textContent.includes('.') && value == '.'){
            return
        }
        screen.textContent += value
    } 
    has_operator = false;
}


// calculate
function calculate(){
    if(!operator){
        return screen.textContent
    }

    var b = parseFloat(screen.textContent)
    var a = parseFloat(init_num)

    if(operator == '+'){
        return a + b
    }

    if(operator == '-'){
        return a - b
    }

    if(operator == '*'  || operator == 'x'){
        return a * b
    }

    if(operator == '/'){
        console.log(operator)
        return (a / b)
    }

    return 0;
}

function reset() {
    screen.textContent = 0;
    operator = false;
    has_operator = false
}