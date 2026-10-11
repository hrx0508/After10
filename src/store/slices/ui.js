export const uiSlice=set=>({say:msg=>set({toast:{msg,k:Date.now()}}),openModal:(type,props={})=>set({modal:{type,props}}),closeModal:()=>set({modal:null})});
