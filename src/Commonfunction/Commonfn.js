export const Moneyconvert=(curr)=>{
    let res = curr;
    if (curr > 1000) {
      res = (curr / 1000).toFixed(1) + "K";
    }
    if (curr > 1000000) {
      res = (curr / 1000000).toFixed(1) + "M";
    }
    if (curr > 1000000000) {
      res = (curr / 1000000000).toFixed(1) + "B";
    }
    if (curr > 1000000000000) {
      res = (curr / 1000000000000).toFixed(1) + "T";
    }
    return res;
}
export const RepresentMoney=(curr)=>{
  let decimal_part="";
  curr=String(curr);
  let end_index;
  if(curr.includes(".")){
      end_index=curr.indexOf(".")-1;
      decimal_part=curr.slice(curr.indexOf("."),curr.length);
  }
  else{
      end_index=curr.length-1;
  }
  // console.log(end_index);
  let count=0;
  let res="";
  for(;end_index>=0;end_index--){
      if(count===2 && end_index!==0){
          res=","+curr[end_index]+res;
          count=0;
      }
      else{
          count++;
          res=curr[end_index]+res;
      }
  }
  return res+decimal_part;
}
