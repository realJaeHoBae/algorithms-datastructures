var calculate = function(s) {
    //1. init values
    s = s.split(' ').join('');//replace space with empty
    const stack = [];//stack to store the block value
    let i =0; //moving start index
    let sign = '+';//init as positive

    //2. loop through all element in string
    while(i<s.length){

        let c = s[i];

        if(c==='('){ // find the closed block use it to recursivly calculate the value inside

            let left_block = 1;
            let index = i+1;

            while(index<s.length&&left_block > 0){ //until the block is close which means left_block reduce to zero
                if(s[index]==='(') left_block ++;
                else if(s[index]===')') left_block --;
                index++;
            }

            let innerValue = calculate(s.substring(i+1,index-1));//include all elements in the closed block recursively

            i = index;//place the i to the position after close block
            //get back from recursive result and add to current stack

            operation(innerValue,sign,stack);//DO the operation process

        } else if (c.match(/\d/)){ // if it is a number

            let index = i;
            let num = 0;

            while(index<s.length&&s[index].match(/\d/)) // loop to the end to get the entire number
            { //parse all digit string to number
                num = num*10 + parseInt(s[index++]);
            }

            i = index;

        operation(num,sign,stack); // do the operation process

        } else { //if not () or number it must be sign
            sign = c;
            i++;
        }
    }

    function operation(num,sign,stack){//base on the operation

            if (sign == '+'){
                stack.push(num);//+ just add value to stack
            }
        else if (sign === '-'){
                stack.push(-num);//- add - value to stack
            }
        else if (sign === '*'){
            // since the * have piority pop previous number and do * then push back
                stack.push(stack.pop()*num);
            }
        else if (sign === '/'){
            // since the * have piority pop previous number and do * then push back
                stack.push(stack.pop()/num);
            }

    }

    let result = 0;
    while(stack.length!==0) result += stack.pop();//add all value in stack together since it only +/-

    return Math.floor(result);
};

console.log(calculate('((3*(2)+(2))*2)'))