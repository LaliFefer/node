const func=require('./users.json');
func.readFile(users.json,'utf8')
then(function(error,data){
    if(error){
        console.error(error);
        return;
    }
    console.log(data);
})
const num=5;
const one=func.splice(0,num);
const two=func.splice(num,one.length+num);
const three=func.splice(two.length,two.length+num);
let globalAmmount=0;
const ammountActiveUsers=(arr)=>{
    Promise=new Promise((resolve,reject)=>{
        if(resolve)
            globalAmmount+=arr.filter(arr=>arr.active).length;
        else
            reject('Error');
    });
    return globalAmmount;
}