let timeout;
export const debounce=(input,callback,timer=1000)=>{
    if(timeout) clearTimeout(timeout); 
     timeout = setTimeout(() => {
          if (!input) return;
        //   setDebouncedValue(input);
        callback(input);
        }, timer);
}