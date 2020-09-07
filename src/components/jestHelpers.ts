export const delay = (a: any) => {
    return new Promise(
      (resolve, reject)=>{setTimeout(
        ()=>{resolve()}, a
        )
      })
    }