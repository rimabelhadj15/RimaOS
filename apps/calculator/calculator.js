console.log("Calculator loaded");


const display = document.getElementById("calc-display");


document.querySelectorAll(".calculator-buttons button")
.forEach(button=>{

    button.onclick=function(){

        let value = this.innerText;


        if(value === "C"){

            display.value = "";

        }

        else if(value === "="){

            try{

                display.value = eval(display.value);

            }

            catch{

                display.value = "Error";

            }

        }

        else{

            display.value += value;

        }

    };

});