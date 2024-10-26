// const http=require('http')

// const port=3002;

//  const app=http.createServer((req,res)=>{
//     res.write("hello")
//     res.end()
//  })
//  app.listen(port,(req,res)=>{
//     console.log('server is started')
//  })

// const express=require('express')
// const app=express()

// const port=1000

// app.get('/login',(req,res)=>{
   
//    const id=req.query.id

// if(id%2==0){
//    res.send("Even")
// }else{
//    res.send("Odd")
// }
   
// })




// app.listen(port,()=>{
//    console.log("  Server is started");
// })



// function add(x){
//    return function(y){
//       return function(z){
//          return x+y+z
//       }
//    }
// }
// const y=add(10)
// const z=y(67)


// console.log(z(78))

// var nums=5670087
// var numstoString=nums.toString()
// var replace=numstoString.replace(/0+$/,'')
// var reverse=parseInt(replace.toString().split('').reverse().join(''))
// console.log(reverse);

// var array=[12,34,56,78,90]

// //  array=array.reverse()
// // console.log(array);
// let n=array.length
// for(let i=0;i<=array.length/2;i++){
//    var temp=array[i]
//        array[i]=array[n-i-1]
//        array[n-i-1]=temp

// }
// console.log(array);



// const express=require('express')
// const app=express()

// const port=1000

// app.post('/',(req,res)=>{
   
//    const id=req.query.id
//    console.log(id);

// if(id%2==0){
//    res.send("Even")
// }else{
//    res.send("Odd")
// }
   
// })

// app.listen(port,()=>{
//    console.log("  Server is started");
// })

// let arr=[12,34,56,778,867,34,90]

//  arr.filter((x)=>  x<30)
// console.log(arr);




// function* gen(num){
// let number=2;
// while(true){
//   yield number
//    number+=2
// }
// }
// let gens=gen()
// for(let i=0;i<=20;i++){
//    console.log(gens.next().value);
// }



// let number=[12,34,56,78,3,45,43,23,56]
// let prime=[]
// let j=0;
// for(let i=0;i<=Math.sqrt(number);i++){

//    if(!number%i==0){
//       prime[j]=number
//       console.log(prime);
//    }
//    j++;
// }



// const fs=require('fs')

// const data=`console.log("Hello this for test")`

// const filepath='example.js'

// fs.writeFile(filepath,data,(err)=>{
//    if(err){
//       console.log("err",err);
//    }else{
//       console.log("sucessfully saved");
//    }
// })





// function greet(name,age) {
//    console.log(`Hello, ${name}! My name is ${this.name}. i am ${age} years old`);
//  }
 
//  const person = { name: 'John' };
 
//  greet.apply(person, ['Alice',67]);
   
//

// const fs = require('fs')
// async function ad(){
//   const data=await fs.readFile("test.js","utf-8",(err,data)=>{
//     console.log(data);
//   })
// }
// ad()


// const data = true;

// const pr=new Promise((res,rej)=>{
//   if(data==true){
//     res(()=>{

//     })
//   }else{
//     rej('no data')
//   }

// })
// pr.then((reso)=>{
//   console.log(reso)
// }).catch((err)=>{
//   console.log(err);
// })


// let userAge=90// This might be a valid age
// const age = userAge ?? 18; // Only uses the default value 18 if userAge is null or undefined

// console.log(age);
"use strict";
const arr=[1,2,3,3,2,5,5,8,6,7,7,7]
const ar=[1,2,3,3,2,5,6,7]
const ar3=[...arr,...ar]
console.log(ar3);



console.log('anas'+123);







// const arr3=[12,23,45,67,78]



// const ad=arr3.reduce(acc,curr,()=>{
// acc+=curr
// },0)
// console.log(ad);

// function add(){
//     let a=10
//     inner()
//     function inner(){
//         console.log(a);
//     }
// }


// const fs=require('fs')
//  const data="hai i bro"

//  fs.writeFile("examples.txt",data,(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
//  })


// console.log("tyr"+23+89)


// setTimeout(()=>{
// console.log("Hai");
// },5000)

// process.nextTick(()=>{
//     setTimeout(()=>{
//         console.log("process");
//         },10000)
// })

// setTimeout(()=>{
//     console.log("end");
//     },7000)


